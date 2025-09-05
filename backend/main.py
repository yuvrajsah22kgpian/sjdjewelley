from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from datetime import timedelta
from typing import List, Optional
import json
import os
import shutil
from pathlib import Path

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
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:5174"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files for serving uploaded documents
app.mount("/documents", StaticFiles(directory="documents"), name="documents")

# File upload utility functions
def save_uploaded_file(file: UploadFile, folder: str, account_number: str) -> str:
    """Save uploaded file and return the file path"""
    # Create directory if it doesn't exist
    upload_dir = Path(f"documents/uploads/{folder}")
    upload_dir.mkdir(parents=True, exist_ok=True)
    
    # Generate unique filename
    file_extension = Path(file.filename).suffix if file.filename else ""
    filename = f"{account_number}_{file.filename}"
    file_path = upload_dir / filename
    
    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Return relative path for database storage
    return f"uploads/{folder}/{filename}"

def delete_file(file_path: str) -> bool:
    """Delete a file from the documents directory"""
    try:
        full_path = Path(f"documents/{file_path}")
        if full_path.exists():
            full_path.unlink()
            return True
        return False
    except Exception as e:
        print(f"Error deleting file {file_path}: {e}")
        return False

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

# Account Application endpoints
@app.post("/account-applications", response_model=schemas.AccountApplication)
async def create_account_application(
    # Form data fields
    email: str = Form(...),
    password: str = Form(...),
    account_type: str = Form(...),
    other_account_type: Optional[str] = Form(None),
    legal_name: str = Form(...),
    business_start_date: str = Form(...),
    dba_trade_name: str = Form(...),
    physical_address: str = Form(...),
    physical_kiosk: Optional[str] = Form(None),
    physical_city: str = Form(...),
    physical_state: str = Form(...),
    physical_zip_code: str = Form(...),
    tel_business: str = Form(...),
    fax: Optional[str] = Form(None),
    shipping_address: str = Form(...),
    shipping_kiosk: Optional[str] = Form(None),
    shipping_address_type: str = Form(...),
    shipping_city: str = Form(...),
    shipping_state: str = Form(...),
    shipping_zip_code: str = Form(...),
    store_lease_holder: Optional[str] = Form(None),
    existing_store_annual_sales: Optional[str] = Form(None),
    new_store_annual_sales_projected: Optional[str] = Form(None),
    fed_tax_id: Optional[str] = Form(None),
    resale_tax_id: Optional[str] = Form(None),
    jbt_id: Optional[str] = Form(None),
    dnb_number: Optional[str] = Form(None),
    owner_first_name: Optional[str] = Form(None),
    owner_last_name: Optional[str] = Form(None),
    owner_ssn: Optional[str] = Form(None),
    owner_driver_license: Optional[str] = Form(None),
    owner_dob: Optional[str] = Form(None),
    owner_home_address: Optional[str] = Form(None),
    owner_home_kiosk: Optional[str] = Form(None),
    owner_home_city: Optional[str] = Form(None),
    owner_home_state: Optional[str] = Form(None),
    owner_home_zip_code: Optional[str] = Form(None),
    owner_tel_home: Optional[str] = Form(None),
    owner_cell: Optional[str] = Form(None),
    authorized_buyer_1: Optional[str] = Form(None),
    authorized_buyer_2: Optional[str] = Form(None),
    authorized_buyer_3: Optional[str] = Form(None),
    authorized_buyer_4: Optional[str] = Form(None),
    certificate_number: Optional[str] = Form(None),
    certificate_state: Optional[str] = Form(None),
    corporate_owner_print_name: Optional[str] = Form(None),
    corporate_owner_title: Optional[str] = Form(None),
    partner_print_name: Optional[str] = Form(None),
    partner_title: Optional[str] = Form(None),
    # File uploads
    driver_license_file: Optional[UploadFile] = File(None),
    sales_tax_permit_file: Optional[UploadFile] = File(None),
    lease_agreement_file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    # Check if email already exists in applications or users
    existing_application = crud.get_account_application_by_email(db, email)
    if existing_application:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An application with this email already exists"
        )
    
    # Check if user already exists
    existing_user = crud.get_user_by_email(db, email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists"
        )
    
    # Create application data
    application_data = {
        "email": email,
        "password": password,
        "account_type": account_type,
        "other_account_type": other_account_type,
        "legal_name": legal_name,
        "business_start_date": business_start_date,
        "dba_trade_name": dba_trade_name,
        "physical_address": physical_address,
        "physical_kiosk": physical_kiosk,
        "physical_city": physical_city,
        "physical_state": physical_state,
        "physical_zip_code": physical_zip_code,
        "tel_business": tel_business,
        "fax": fax,
        "shipping_address": shipping_address,
        "shipping_kiosk": shipping_kiosk,
        "shipping_address_type": shipping_address_type,
        "shipping_city": shipping_city,
        "shipping_state": shipping_state,
        "shipping_zip_code": shipping_zip_code,
        "store_lease_holder": store_lease_holder,
        "existing_store_annual_sales": existing_store_annual_sales,
        "new_store_annual_sales_projected": new_store_annual_sales_projected,
        "fed_tax_id": fed_tax_id,
        "resale_tax_id": resale_tax_id,
        "jbt_id": jbt_id,
        "dnb_number": dnb_number,
        "owner_first_name": owner_first_name,
        "owner_last_name": owner_last_name,
        "owner_ssn": owner_ssn,
        "owner_driver_license": owner_driver_license,
        "owner_dob": owner_dob,
        "owner_home_address": owner_home_address,
        "owner_home_kiosk": owner_home_kiosk,
        "owner_home_city": owner_home_city,
        "owner_home_state": owner_home_state,
        "owner_home_zip_code": owner_home_zip_code,
        "owner_tel_home": owner_tel_home,
        "owner_cell": owner_cell,
        "authorized_buyer_1": authorized_buyer_1,
        "authorized_buyer_2": authorized_buyer_2,
        "authorized_buyer_3": authorized_buyer_3,
        "authorized_buyer_4": authorized_buyer_4,
        "certificate_number": certificate_number,
        "certificate_state": certificate_state,
        "corporate_owner_print_name": corporate_owner_print_name,
        "corporate_owner_title": corporate_owner_title,
        "partner_print_name": partner_print_name,
        "partner_title": partner_title,
    }
    
    # Create the application first to get the account number
    application_schema = schemas.AccountApplicationCreate(**application_data)
    db_application = crud.create_account_application(db=db, application=application_schema)
    
    # Handle file uploads
    file_paths = {}
    try:
        if driver_license_file and driver_license_file.filename:
            file_paths["driver_license_file_path"] = save_uploaded_file(
                driver_license_file, "driver_licenses", db_application.account_number
            )
        
        if sales_tax_permit_file and sales_tax_permit_file.filename:
            file_paths["sales_tax_permit_file_path"] = save_uploaded_file(
                sales_tax_permit_file, "sales_tax_permits", db_application.account_number
            )
        
        if lease_agreement_file and lease_agreement_file.filename:
            file_paths["lease_agreement_file_path"] = save_uploaded_file(
                lease_agreement_file, "lease_agreements", db_application.account_number
            )
        
        # Update the application with file paths
        if file_paths:
            for field, path in file_paths.items():
                setattr(db_application, field, path)
            db.commit()
            db.refresh(db_application)
    
    except Exception as e:
        # If file upload fails, clean up the application
        db.delete(db_application)
        db.commit()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"File upload failed: {str(e)}"
        )
    
    return db_application

@app.get("/account-applications", response_model=List[schemas.AccountApplication])
async def get_account_applications(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    return crud.get_account_applications(db=db, skip=skip, limit=limit, status=status)

@app.get("/account-applications/{application_id}", response_model=schemas.AccountApplication)
async def get_account_application(
    application_id: int,
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    application = crud.get_account_application(db=db, application_id=application_id)
    if application is None:
        raise HTTPException(status_code=404, detail="Account application not found")
    return application

@app.put("/account-applications/{application_id}/status")
async def update_application_status(
    application_id: int,
    status_update: dict,
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    status = status_update.get("status")
    review_notes = status_update.get("review_notes")
    
    if status not in ["pending", "approved", "rejected", "under_review"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid status. Must be one of: pending, approved, rejected, under_review"
        )
    
    application = crud.update_account_application_status(
        db=db, 
        application_id=application_id, 
        status=status, 
        reviewed_by=current_user.id,
        review_notes=review_notes
    )
    
    if application is None:
        raise HTTPException(status_code=404, detail="Account application not found")
    
    return {"message": f"Application status updated to {status}", "application": application}

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
