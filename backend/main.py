from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from typing import List, Optional
import json

from database import engine, get_db
import models
import schemas
import crud
import auth
from config import settings

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="SJ Jewelry API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Authentication endpoints
@app.post("/token", response_model=schemas.Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/register", response_model=schemas.User)
async def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    return crud.create_user(db=db, user=user)

@app.get("/me", response_model=schemas.User)
async def read_users_me(current_user: models.User = Depends(auth.get_current_active_user)):
    return current_user

# Product endpoints
@app.get("/products", response_model=List[schemas.Product])
async def get_products(
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    material: Optional[str] = None,
    gemstone: Optional[str] = None,
    occasion: Optional[str] = None,
    in_stock: Optional[bool] = None,
    new_arrivals: Optional[bool] = None,
    certified: Optional[bool] = None,
    customizable: Optional[bool] = None,
    db: Session = Depends(get_db)
):
    products = crud.get_products(
        db, skip=skip, limit=limit,
        category=category, material=material, gemstone=gemstone,
        occasion=occasion, in_stock=in_stock, new_arrivals=new_arrivals,
        certified=certified, customizable=customizable
    )
    return products

@app.get("/products/search", response_model=List[schemas.Product])
async def search_products(
    query: Optional[str] = None,
    category: Optional[str] = None,
    material: Optional[str] = None,
    gemstone: Optional[str] = None,
    occasion: Optional[str] = None,
    metalType: Optional[str] = None,
    metalTones: Optional[str] = None,
    diamondWeight: Optional[str] = None,
    priceRange: Optional[str] = None,
    price_min: Optional[float] = None,
    price_max: Optional[float] = None,
    in_stock: Optional[bool] = None,
    new_arrivals: Optional[bool] = None,
    certified: Optional[bool] = None,
    customizable: Optional[bool] = None,
    page: int = 1,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    # Handle multiple values for filters (comma-separated)
    categories = category.split(',') if category else []
    materials = material.split(',') if material else []
    gemstones = gemstone.split(',') if gemstone else []
    occasions = occasion.split(',') if occasion else []
    metalTypes = metalType.split(',') if metalType else []
    metalTonesList = metalTones.split(',') if metalTones else []
    diamondWeights = diamondWeight.split(',') if diamondWeight else []
    priceRanges = priceRange.split(',') if priceRange else []
    
    # Process price ranges
    if priceRanges:
        for price_range in priceRanges:
            if price_range == "under-100":
                price_min = 0
                price_max = 100
            elif price_range == "100-500":
                price_min = 100
                price_max = 500
            elif price_range == "500-1000":
                price_min = 500
                price_max = 1000
            elif price_range == "1000-2500":
                price_min = 1000
                price_max = 2500
            elif price_range == "over-2500":
                price_min = 2500
                price_max = None
    
    filters = schemas.ProductFilters(
        category=categories if categories else None,
        material=materials if materials else None,
        gemstone=gemstones if gemstones else None,
        occasion=occasions if occasions else None,
        price_min=price_min,
        price_max=price_max,
        in_stock=in_stock,
        new_arrivals=new_arrivals,
        certified=certified,
        customizable=customizable
    )
    
    skip = (page - 1) * limit
    products = crud.search_products(db, query=query, filters=filters, skip=skip, limit=limit)
    
    # Apply additional filters that aren't in the schema
    filtered_products = products
    
    # Filter by metal type if specified
    if metalTypes:
        filtered_products = [p for p in filtered_products if any(mt.lower() in p.material.lower() for mt in metalTypes)]
    
    # Filter by metal tones if specified
    if metalTonesList:
        filtered_products = [p for p in filtered_products if any(mt.lower() in p.material.lower() for mt in metalTonesList)]
    
    # Filter by diamond weight if specified
    if diamondWeights:
        filtered_products = [p for p in filtered_products if any(dw in str(p.specifications or {}) for dw in diamondWeights)]
    
    return filtered_products

@app.get("/products/{product_id}", response_model=schemas.Product)
async def get_product(product_id: int, db: Session = Depends(get_db)):
    product = crud.get_product(db, product_id=product_id)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.get("/products/category/{category}", response_model=List[schemas.Product])
async def get_products_by_category(category: str, db: Session = Depends(get_db)):
    products = crud.get_products(db, category=category)
    return products

@app.get("/products/material/{material}", response_model=List[schemas.Product])
async def get_products_by_material(material: str, db: Session = Depends(get_db)):
    products = crud.get_products(db, material=material)
    return products

# Admin endpoints for product management
@app.post("/admin/products", response_model=schemas.Product)
async def create_product(
    product: schemas.ProductCreate,
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    return crud.create_product(db=db, product=product)

@app.put("/admin/products/{product_id}", response_model=schemas.Product)
async def update_product(
    product_id: int,
    product_update: schemas.ProductUpdate,
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    product = crud.update_product(db=db, product_id=product_id, product_update=product_update)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.delete("/admin/products/{product_id}")
async def delete_product(
    product_id: int,
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    success = crud.delete_product(db=db, product_id=product_id)
    if not success:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}

# Order endpoints
@app.post("/orders", response_model=schemas.Order)
async def create_order(
    order: schemas.OrderCreate,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    return crud.create_order(db=db, order=order, user_id=current_user.id)

@app.get("/orders", response_model=List[schemas.Order])
async def get_user_orders(
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    return crud.get_user_orders(db=db, user_id=current_user.id)

@app.get("/orders/{order_id}", response_model=schemas.Order)
async def get_order(
    order_id: int,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    order = crud.get_order(db=db, order_id=order_id)
    if order is None or order.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

# Wishlist endpoints
@app.get("/wishlist", response_model=List[schemas.WishlistItem])
async def get_wishlist(
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    return crud.get_wishlist_items(db=db, user_id=current_user.id)

@app.post("/wishlist/{product_id}", response_model=schemas.WishlistItem)
async def add_to_wishlist(
    product_id: int,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    return crud.add_to_wishlist(db=db, user_id=current_user.id, product_id=product_id)

@app.delete("/wishlist/{product_id}")
async def remove_from_wishlist(
    product_id: int,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    success = crud.remove_from_wishlist(db=db, user_id=current_user.id, product_id=product_id)
    if not success:
        raise HTTPException(status_code=404, detail="Wishlist item not found")
    return {"message": "Item removed from wishlist"}

# Initialize admin user
@app.on_event("startup")
async def startup_event():
    db = next(get_db())
    admin_user = crud.get_user_by_email(db, settings.ADMIN_EMAIL)
    if not admin_user:
        admin_user_data = schemas.UserCreate(
            email=settings.ADMIN_EMAIL,
            name="Admin",
            password=settings.ADMIN_PASSWORD
        )
        admin_user = crud.create_user(db=db, user=admin_user_data)
        admin_user.is_admin = True
        db.commit()
        print(f"Admin user created: {settings.ADMIN_EMAIL}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
