# SJ Jewelry E-commerce Platform

A complete full-stack e-commerce platform for SJ Jewelry, featuring a React frontend, FastAPI backend, and React admin panel with advanced filtering capabilities.

## Architecture

- **Frontend**: React + TypeScript + Tailwind CSS + Zustand
- **Backend**: FastAPI + SQLAlchemy + SQLite + JWT Authentication
- **Admin Panel**: React + TypeScript + Tailwind CSS + Elegant Jewelry Theme
- **Database**: SQLite with comprehensive product and user management

## Quick Start

### Option 1: Automated Setup (Recommended)

#### For macOS/Linux:
```bash
chmod +x start.sh
./start.sh
```

#### For Windows:
```bash
start.bat
```

### Option 2: Manual Setup

#### 1. Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

#### 2. Frontend Setup
```bash
cd my-app
npm install
npm run dev
```

#### 3. Admin Panel Setup
```bash
cd adminPanel
npm install
npm run dev
```

## Project Structure

```
SJDjwellery/
├── backend/                 # FastAPI backend
│   ├── main.py             # Main FastAPI application
│   ├── models.py           # SQLAlchemy database models
│   ├── schemas.py          # Pydantic schemas
│   ├── crud.py             # CRUD operations
│   ├── auth.py             # JWT authentication
│   ├── database.py         # Database configuration
│   ├── config.py           # Application settings
│   ├── seed_data.py        # Database seeding
│   └── requirements.txt    # Python dependencies
├── my-app/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── FilterPanel.tsx      # Advanced filtering
│   │   │   ├── FilteredProducts.tsx # Filtered product display
│   │   │   ├── MaterialGrid.tsx     # Material-based browsing
│   │   │   ├── CategoryGrid.tsx     # Category-based browsing
│   │   │   └── Stylegrid.tsx        # Style-based browsing
│   │   ├── pages/          # Page components
│   │   ├── store/          # Zustand state management
│   │   └── data/           # API service functions
│   └── package.json
├── adminPanel/             # React admin panel
│   ├── src/
│   │   ├── components/     # Admin components
│   │   │   └── Sidebar.tsx # Elegant sidebar with jewelry theme
│   │   ├── pages/          # Admin pages
│   │   │   ├── Dashboard.tsx        # Enhanced dashboard
│   │   │   ├── ProductManagement.tsx # Product CRUD operations
│   │   │   └── Login.tsx            # Secure admin login
│   │   └── contexts/       # React contexts
│   └── package.json
├── start.sh               # Unix startup script
└── start.bat              # Windows startup script
```

## Features

### Backend API
- **Authentication**: JWT-based user authentication with bcrypt password hashing
- **Products**: Full CRUD operations for jewelry products with image management
- **Advanced Search & Filtering**: Multi-parameter product search with real-time filtering
- **Admin Management**: Role-based access control with admin privileges
- **Database**: SQLite with SQLAlchemy ORM and automatic migrations

### Frontend
- **Product Catalog**: Browse products by category, material, style with compact single-screen layout
- **Advanced Filtering**: Real-time product filtering with multiple criteria
- **Search**: Real-time product search with instant results
- **Shopping Cart**: Add/remove items with quantity management
- **User Authentication**: Login/signup functionality
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Admin Panel
- **Product Management**: Add, edit, delete products with image upload
- **Enhanced Dashboard**: Beautiful jewelry-themed dashboard with statistics
- **Secure Access**: Admin-only authentication with elegant login interface
- **Real-time Updates**: Immediate product updates with live preview
- **Elegant Design**: Gold-themed UI with Playfair Display typography

## Access Points

- **Backend API**: http://localhost:8000
- **Frontend**: http://localhost:5173
- **Admin Panel**: http://localhost:3002
- **API Documentation**: http://localhost:8000/docs

## Default Credentials

### Admin Access
- **Email**: admin@sjewelry.com
- **Password**: admin123

## Database Schema

### Users
- id, email, name, hashed_password, phone, is_admin, created_at, updated_at

### Products
- id, name, description, original_price, sale_price, discount, category, material, gemstone, occasion, in_stock, new_arrivals, certified, customizable, specifications, created_at, updated_at

### ProductImages
- id, product_id, src, alt, is_primary, created_at

### Orders
- id, user_id, total_amount, status, created_at, updated_at

### OrderItems
- id, order_id, product_id, quantity, price

### WishlistItems
- id, user_id, product_id, created_at

## API Endpoints

### Authentication
- `POST /token` - Login and get JWT token
- `POST /register` - User registration
- `GET /me` - Get current user info

### Products (Public)
- `GET /products` - Get all products with filters
- `GET /products/{id}` - Get product by ID
- `GET /products/search` - Advanced search with multiple filter parameters
- `GET /products/category/{category}` - Get products by category
- `GET /products/material/{material}` - Get products by material

### Products (Admin)
- `POST /admin/products` - Create new product
- `PUT /admin/products/{id}` - Update product
- `DELETE /admin/products/{id}` - Delete product

### Orders
- `GET /orders` - Get user orders
- `POST /orders` - Create new order

### Wishlist
- `GET /wishlist` - Get user wishlist
- `POST /wishlist/{product_id}` - Add to wishlist
- `DELETE /wishlist/{product_id}` - Remove from wishlist

## Advanced Filtering System

### Filter Categories
- **Material**: Gold, Silver, Diamond, Natural Diamond, Lab Grown Diamond, Pearl
- **Category**: Rings, Earrings, Necklaces, Pendants, Bangles/Bracelets, Accessories
- **Metal Type**: 10k, 14k, 18k, Sterling Silver, Platinum
- **Metal Tones**: Yellow Gold, White Gold, Rose Gold, Two Tone, Silver
- **Diamond Weight**: <0.25, 0.25, 0.50, 0.75, 1.00, 1.50, 2.00, >2.00 CT
- **Price Range**: Under $100, $100-$500, $500-$1000, $1000-$2500, Over $2500

### Filter Features
- Real-time filtering without category selection
- Multiple filter combinations
- Active filter display with badges
- Clear filters functionality
- Product count and filter count display
- Responsive filter panel for mobile and desktop

## Development

### Adding New Products
1. Log into the admin panel at http://localhost:3002
2. Use the enhanced Product Management interface
3. Fill in product details including:
   - Basic info (name, description, pricing)
   - Category and material classification
   - Product specifications and features
   - Multiple product images with primary image selection
4. Products will be immediately available on the frontend with filtering

### Customizing the Frontend
- Modify components in `my-app/src/components/`
- Update pages in `my-app/src/pages/`
- Adjust styling using Tailwind CSS classes
- Enhance filtering logic in `FilterPanel.tsx` and `FilteredProducts.tsx`

### Backend Customization
- Add new models in `backend/models.py`
- Create corresponding schemas in `backend/schemas.py`
- Implement CRUD operations in `backend/crud.py`
- Add API endpoints in `backend/main.py`
- Enhance search functionality in the search endpoint

### Admin Panel Customization
- Update the elegant jewelry theme in `adminPanel/src/index.css`
- Modify admin components in `adminPanel/src/components/`
- Enhance admin pages in `adminPanel/src/pages/`
- Customize the gold color palette in `adminPanel/tailwind.config.js`

## Deployment

### Backend Deployment
1. Set up a production database (PostgreSQL recommended)
2. Update `DATABASE_URL` in environment variables
3. Set `SECRET_KEY` for JWT tokens
4. Configure CORS for production domains
5. Deploy using uvicorn or gunicorn

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Update API base URL in the frontend configuration
4. Configure environment variables for production

### Admin Panel Deployment
1. Build the production version: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Update API base URL in the admin panel configuration
4. Ensure secure admin access in production

## Security Features

- JWT token-based authentication with secure token handling
- Password hashing with bcrypt and proper salt rounds
- Role-based access control with admin privileges
- Input validation with Pydantic schemas
- CORS configuration for secure cross-origin requests
- SQL injection protection with SQLAlchemy ORM
- Secure admin panel with authentication checks

## Responsive Design

The platform is fully responsive and optimized for:
- **Desktop**: Full-featured experience with sidebar filters
- **Tablet**: Adaptive layout with touch-friendly controls
- **Mobile**: Mobile-first design with collapsible filter panel
- **All modern browsers**: Chrome, Firefox, Safari, Edge

## UI/UX Features

### Frontend
- Modern, clean design with jewelry-focused aesthetics
- Compact single-screen layout for efficient browsing
- Intuitive navigation with clear category organization
- Fast loading times with optimized images
- Smooth animations and hover effects
- Accessible design patterns for all users

### Admin Panel
- Elegant jewelry theme with gold color palette
- Professional typography using Playfair Display
- Beautiful gradients and shadows for depth
- Responsive admin interface
- Intuitive product management workflow
- Real-time updates and feedback

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on all components
5. Ensure responsive design works on all devices
6. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
1. Check the API documentation at http://localhost:8000/docs
2. Review the code comments and documentation
3. Test the filter functionality on the frontend
4. Verify admin panel access and functionality
5. Open an issue on the repository

## Recent Updates

### Filter System Enhancement
- Independent filter operation without category selection
- Real-time product filtering with multiple criteria
- Enhanced backend search endpoint with advanced parameters
- Beautiful filter UI with active filter badges
- Responsive filter panel for all devices

### Admin Panel Improvements
- Elegant jewelry-themed design with gold accents
- Enhanced product management with image handling
- Improved dashboard with statistics and quick actions
- Professional typography and visual hierarchy
- Secure authentication with admin privileges

### Frontend Optimizations
- Compact single-screen layout
- Reduced image sizes for better performance
- Optimized spacing and typography
- Enhanced mobile responsiveness
- Improved loading states and error handling

---

**SJ Jewelry E-commerce Platform** - A complete solution for jewelry retail management and online sales with advanced filtering capabilities.
