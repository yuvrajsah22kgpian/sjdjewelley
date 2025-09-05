from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from typing import List, Optional
import models
import schemas
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

# User CRUD operations
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        email=user.email,
        name=user.name,
        phone=user.phone,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_id: int, user_update: schemas.UserUpdate):
    db_user = get_user(db, user_id)
    if not db_user:
        return None
    
    update_data = user_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_user, field, value)
    
    db.commit()
    db.refresh(db_user)
    return db_user

# Product CRUD operations
def get_product(db: Session, product_id: int):
    return db.query(models.Product).filter(models.Product.id == product_id).first()

def get_products(
    db: Session, 
    skip: int = 0, 
    limit: int = 100,
    category: Optional[str] = None,
    material: Optional[str] = None,
    gemstone: Optional[str] = None,
    occasion: Optional[str] = None,
    in_stock: Optional[bool] = None,
    new_arrivals: Optional[bool] = None,
    certified: Optional[bool] = None,
    customizable: Optional[bool] = None
):
    query = db.query(models.Product)
    
    if category:
        query = query.filter(models.Product.category == category)
    if material:
        query = query.filter(models.Product.material == material)
    if gemstone:
        query = query.filter(models.Product.gemstone == gemstone)
    if occasion:
        query = query.filter(models.Product.occasion == occasion)
    if in_stock is not None:
        query = query.filter(models.Product.in_stock == in_stock)
    if new_arrivals is not None:
        query = query.filter(models.Product.new_arrivals == new_arrivals)
    if certified is not None:
        query = query.filter(models.Product.certified == certified)
    if customizable is not None:
        query = query.filter(models.Product.customizable == customizable)
    
    return query.offset(skip).limit(limit).all()

def search_products(db: Session, query: str, filters: Optional[schemas.ProductFilters] = None, skip: int = 0, limit: int = 20):
    search_query = db.query(models.Product)
    
    # Text search
    if query:
        search_query = search_query.filter(
            or_(
                models.Product.name.ilike(f"%{query}%"),
                models.Product.description.ilike(f"%{query}%"),
                models.Product.category.ilike(f"%{query}%"),
                models.Product.material.ilike(f"%{query}%")
            )
        )
    
    # Apply filters
    if filters:
        if filters.category:
            search_query = search_query.filter(models.Product.category.in_(filters.category))
        if filters.material:
            search_query = search_query.filter(models.Product.material.in_(filters.material))
        if filters.gemstone:
            search_query = search_query.filter(models.Product.gemstone.in_(filters.gemstone))
        if filters.occasion:
            search_query = search_query.filter(models.Product.occasion.in_(filters.occasion))
        if filters.price_min is not None:
            search_query = search_query.filter(models.Product.sale_price >= filters.price_min)
        if filters.price_max is not None:
            search_query = search_query.filter(models.Product.sale_price <= filters.price_max)
        if filters.in_stock is not None:
            search_query = search_query.filter(models.Product.in_stock == filters.in_stock)
        if filters.new_arrivals is not None:
            search_query = search_query.filter(models.Product.new_arrivals == filters.new_arrivals)
        if filters.certified is not None:
            search_query = search_query.filter(models.Product.certified == filters.certified)
        if filters.customizable is not None:
            search_query = search_query.filter(models.Product.customizable == filters.customizable)
    
    return search_query.offset(skip).limit(limit).all()

def create_product(db: Session, product: schemas.ProductCreate):
    db_product = models.Product(
        name=product.name,
        description=product.description,
        original_price=product.original_price,
        sale_price=product.sale_price,
        discount=product.discount,
        category=product.category,
        material=product.material,
        gemstone=product.gemstone,
        occasion=product.occasion,
        in_stock=product.in_stock,
        new_arrivals=product.new_arrivals,
        certified=product.certified,
        customizable=product.customizable,
        specifications=product.specifications
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    
    # Add images
    for image_data in product.images:
        db_image = models.ProductImage(
            product_id=db_product.id,
            src=image_data.src,
            alt=image_data.alt,
            is_primary=image_data.is_primary
        )
        db.add(db_image)
    
    db.commit()
    db.refresh(db_product)
    return db_product

def update_product(db: Session, product_id: int, product_update: schemas.ProductUpdate):
    db_product = get_product(db, product_id)
    if not db_product:
        return None
    
    update_data = product_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_product, field, value)
    
    db.commit()
    db.refresh(db_product)
    return db_product

def delete_product(db: Session, product_id: int):
    db_product = get_product(db, product_id)
    if not db_product:
        return False
    
    db.delete(db_product)
    db.commit()
    return True

# Order CRUD operations
def get_order(db: Session, order_id: int):
    return db.query(models.Order).filter(models.Order.id == order_id).first()

def get_user_orders(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    return db.query(models.Order).filter(models.Order.user_id == user_id).offset(skip).limit(limit).all()

def create_order(db: Session, order: schemas.OrderCreate, user_id: int):
    db_order = models.Order(
        user_id=user_id,
        total_amount=order.total_amount,
        status=order.status,
        shipping_address=order.shipping_address
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    
    # Add order items
    for item_data in order.items:
        db_item = models.OrderItem(
            order_id=db_order.id,
            product_id=item_data.product_id,
            quantity=item_data.quantity,
            price=item_data.price
        )
        db.add(db_item)
    
    db.commit()
    db.refresh(db_order)
    return db_order

# Wishlist CRUD operations
def get_wishlist_items(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    return db.query(models.WishlistItem).filter(models.WishlistItem.user_id == user_id).offset(skip).limit(limit).all()

def add_to_wishlist(db: Session, user_id: int, product_id: int):
    # Check if already in wishlist
    existing_item = db.query(models.WishlistItem).filter(
        and_(models.WishlistItem.user_id == user_id, models.WishlistItem.product_id == product_id)
    ).first()
    
    if existing_item:
        return existing_item
    
    db_wishlist_item = models.WishlistItem(
        user_id=user_id,
        product_id=product_id
    )
    db.add(db_wishlist_item)
    db.commit()
    db.refresh(db_wishlist_item)
    return db_wishlist_item

def remove_from_wishlist(db: Session, user_id: int, product_id: int):
    db_wishlist_item = db.query(models.WishlistItem).filter(
        and_(models.WishlistItem.user_id == user_id, models.WishlistItem.product_id == product_id)
    ).first()
    
    if not db_wishlist_item:
        return False
    
    db.delete(db_wishlist_item)
    db.commit()
    return True

# Account Application CRUD operations
def generate_account_number(db: Session) -> str:
    """Generate a unique account number"""
    import random
    import string
    
    while True:
        # Generate a 8-digit account number starting with 'SJD'
        account_number = f"SJD{''.join(random.choices(string.digits, k=8))}"
        
        # Check if it already exists
        existing = db.query(models.AccountApplication).filter(
            models.AccountApplication.account_number == account_number
        ).first()
        
        if not existing:
            return account_number

def create_account_application(db: Session, application: schemas.AccountApplicationCreate):
    # Hash the password
    hashed_password = get_password_hash(application.password)
    
    # Generate unique account number
    account_number = generate_account_number(db)
    
    # Create the application data dict, excluding password
    application_data = application.dict()
    application_data.pop('password')
    application_data['hashed_password'] = hashed_password
    application_data['account_number'] = account_number
    
    db_application = models.AccountApplication(**application_data)
    db.add(db_application)
    db.commit()
    db.refresh(db_application)
    return db_application

def get_account_application(db: Session, application_id: int):
    return db.query(models.AccountApplication).filter(models.AccountApplication.id == application_id).first()

def get_account_applications(db: Session, skip: int = 0, limit: int = 100, status: Optional[str] = None):
    query = db.query(models.AccountApplication)
    if status:
        query = query.filter(models.AccountApplication.status == status)
    return query.offset(skip).limit(limit).all()

def update_account_application_status(db: Session, application_id: int, status: str, reviewed_by: int, review_notes: Optional[str] = None):
    db_application = db.query(models.AccountApplication).filter(models.AccountApplication.id == application_id).first()
    if not db_application:
        return None
    
    db_application.status = status
    db_application.reviewed_by = reviewed_by
    db_application.reviewed_at = func.now()
    if review_notes:
        db_application.review_notes = review_notes
    
    db.commit()
    db.refresh(db_application)
    return db_application

def get_account_application_by_email(db: Session, email: str):
    return db.query(models.AccountApplication).filter(models.AccountApplication.email == email).first()
