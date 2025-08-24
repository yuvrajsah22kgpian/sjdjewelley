from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    name: str
    phone: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None

class User(UserBase):
    id: int
    is_admin: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Auth schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Product schemas
class ProductImageBase(BaseModel):
    src: str
    alt: Optional[str] = None
    is_primary: bool = False

class ProductImageCreate(ProductImageBase):
    pass

class ProductImage(ProductImageBase):
    id: int
    product_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    original_price: float
    sale_price: float
    discount: float = 0
    category: Optional[str] = None
    material: Optional[str] = None
    gemstone: Optional[str] = None
    occasion: Optional[str] = None
    in_stock: bool = True
    new_arrivals: bool = False
    certified: bool = False
    customizable: bool = False
    specifications: Optional[Dict[str, Any]] = None

class ProductCreate(ProductBase):
    images: List[ProductImageCreate] = []

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    original_price: Optional[float] = None
    sale_price: Optional[float] = None
    discount: Optional[float] = None
    category: Optional[str] = None
    material: Optional[str] = None
    gemstone: Optional[str] = None
    occasion: Optional[str] = None
    in_stock: Optional[bool] = None
    new_arrivals: Optional[bool] = None
    certified: Optional[bool] = None
    customizable: Optional[bool] = None
    specifications: Optional[Dict[str, Any]] = None

class Product(ProductBase):
    id: int
    images: List[ProductImage] = []
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Order schemas
class OrderItemBase(BaseModel):
    product_id: int
    quantity: int
    price: float

class OrderItemCreate(OrderItemBase):
    pass

class OrderItem(OrderItemBase):
    id: int
    order_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class OrderBase(BaseModel):
    total_amount: float
    status: str = "pending"
    shipping_address: Optional[Dict[str, Any]] = None

class OrderCreate(OrderBase):
    items: List[OrderItemCreate]

class Order(OrderBase):
    id: int
    user_id: int
    items: List[OrderItem] = []
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Wishlist schemas
class WishlistItemBase(BaseModel):
    product_id: int

class WishlistItemCreate(WishlistItemBase):
    pass

class WishlistItem(WishlistItemBase):
    id: int
    user_id: int
    product: Product
    created_at: datetime

    class Config:
        from_attributes = True

# Search and filter schemas
class ProductFilters(BaseModel):
    category: Optional[List[str]] = None
    material: Optional[List[str]] = None
    gemstone: Optional[List[str]] = None
    occasion: Optional[List[str]] = None
    price_min: Optional[float] = None
    price_max: Optional[float] = None
    in_stock: Optional[bool] = None
    new_arrivals: Optional[bool] = None
    certified: Optional[bool] = None
    customizable: Optional[bool] = None

class ProductSearch(BaseModel):
    query: Optional[str] = None
    filters: Optional[ProductFilters] = None
    page: int = 1
    limit: int = 20
