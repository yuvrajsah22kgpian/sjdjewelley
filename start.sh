#!/bin/bash

echo "Starting SJ Jewelry Platform..."

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "Port $1 is already in use"
        return 1
    else
        return 0
    fi
}

# Check if ports are available
echo "Checking ports..."
if ! check_port 8000; then
    echo "Backend port 8000 is already in use. Please stop the service using that port."
    exit 1
fi

if ! check_port 5173; then
    echo "Frontend port 5173 is already in use. Please stop the service using that port."
    exit 1
fi

if ! check_port 3001; then
    echo "Admin panel port 3001 is already in use. Please stop the service using that port."
    exit 1
fi

echo "All ports are available!"

# Start backend
echo "Starting backend..."
cd backend
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate
pip install -r requirements.txt

# Seed the database
echo "Seeding database..."
python seed_data.py

# Start backend in background
echo "Starting FastAPI server..."
python main.py &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "Starting frontend..."
cd my-app
npm install
npm run dev &
FRONTEND_PID=$!
cd ..

# Start admin panel
echo "Starting admin panel..."
cd adminPanel
npm install
npm run dev &
ADMIN_PID=$!
cd ..

echo ""
echo "🎉 SJ Jewelry Platform is starting up!"
echo ""
echo "Services:"
echo "  Backend API:    http://localhost:8000"
echo "  Frontend:       http://localhost:5173"
echo "  Admin Panel:    http://localhost:3001"
echo ""
echo "Admin credentials:"
echo "  Email: admin@sjewelry.com"
echo "  Password: admin123"
echo ""
echo "Press Ctrl+C to stop all services"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Stopping services..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    kill $ADMIN_PID 2>/dev/null
    echo "All services stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for all background processes
wait
