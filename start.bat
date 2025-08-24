@echo off
echo Starting SJ Jewelry Platform...

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Python is not installed or not in PATH
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js is not installed or not in PATH
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo npm is not installed or not in PATH
    pause
    exit /b 1
)

echo All prerequisites are installed!

REM Start backend
echo Starting backend...
cd backend
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

call venv\Scripts\activate.bat
pip install -r requirements.txt

REM Seed the database
echo Seeding database...
python seed_data.py

REM Start backend in background
echo Starting FastAPI server...
start "Backend" python main.py
cd ..

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend
echo Starting frontend...
cd my-app
npm install
start "Frontend" npm run dev
cd ..

REM Start admin panel
echo Starting admin panel...
cd adminPanel
npm install
start "Admin Panel" npm run dev
cd ..

echo.
echo 🎉 SJ Jewelry Platform is starting up!
echo.
echo Services:
echo   Backend API:    http://localhost:8000
echo   Frontend:       http://localhost:5173
echo   Admin Panel:    http://localhost:3000
echo.
echo Admin credentials:
echo   Email: admin@sjewelry.com
echo   Password: admin123
echo.
echo All services are starting in separate windows.
echo Close the windows to stop the services.
pause
