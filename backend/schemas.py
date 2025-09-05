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

# Account Application schemas
class AccountApplicationBase(BaseModel):
    # Authentication
    email: EmailStr
    password: str
    account_number: Optional[str] = None
    
    # Account Type
    account_type: str
    other_account_type: Optional[str] = None
    
    # Company Information
    legal_name: str
    business_start_date: str
    dba_trade_name: str
    
    # Physical Address
    physical_address: str
    physical_kiosk: Optional[str] = None
    physical_city: str
    physical_state: str
    physical_zip_code: str
    
    # Contact Information
    tel_business: str
    fax: Optional[str] = None
    
    # Shipping Address
    shipping_address: str
    shipping_kiosk: Optional[str] = None
    shipping_address_type: str
    shipping_city: str
    shipping_state: str
    shipping_zip_code: str
    
    # Store Lease Information
    store_lease_holder: Optional[str] = None
    existing_store_annual_sales: Optional[str] = None
    new_store_annual_sales_projected: Optional[str] = None
    
    # Tax Information
    fed_tax_id: Optional[str] = None
    resale_tax_id: Optional[str] = None
    jbt_id: Optional[str] = None
    dnb_number: Optional[str] = None
    
    # Owner Information
    owner_first_name: Optional[str] = None
    owner_last_name: Optional[str] = None
    owner_ssn: Optional[str] = None
    owner_driver_license: Optional[str] = None
    owner_dob: Optional[str] = None
    
    # Owner Home Address
    owner_home_address: Optional[str] = None
    owner_home_kiosk: Optional[str] = None
    owner_home_city: Optional[str] = None
    owner_home_state: Optional[str] = None
    owner_home_zip_code: Optional[str] = None
    owner_tel_home: Optional[str] = None
    owner_cell: Optional[str] = None
    
    
    # Authorized Buyers
    authorized_buyer_1: Optional[str] = None
    authorized_buyer_2: Optional[str] = None
    authorized_buyer_3: Optional[str] = None
    authorized_buyer_4: Optional[str] = None
    
    # Sales Tax Certificate
    certificate_number: Optional[str] = None
    certificate_state: Optional[str] = None
    
    # Signatures
    corporate_owner_print_name: Optional[str] = None
    corporate_owner_title: Optional[str] = None
    partner_print_name: Optional[str] = None
    partner_title: Optional[str] = None
    
    # Document Uploads (file paths)
    driver_license_file_path: Optional[str] = None
    sales_tax_permit_file_path: Optional[str] = None
    lease_agreement_file_path: Optional[str] = None

class AccountApplicationCreate(AccountApplicationBase):
    pass

class AccountApplicationResponse(BaseModel):
    # Authentication
    email: EmailStr
    account_number: str
    
    # Account Type
    account_type: str
    other_account_type: Optional[str] = None
    
    # Company Information
    legal_name: str
    business_start_date: str
    dba_trade_name: str
    
    # Physical Address
    physical_address: str
    physical_kiosk: Optional[str] = None
    physical_city: str
    physical_state: str
    physical_zip_code: str
    
    # Contact Information
    tel_business: str
    fax: Optional[str] = None
    
    # Shipping Address
    shipping_address: str
    shipping_kiosk: Optional[str] = None
    shipping_address_type: str
    shipping_city: str
    shipping_state: str
    shipping_zip_code: str
    
    # Store Lease Information
    store_lease_holder: Optional[str] = None
    existing_store_annual_sales: Optional[str] = None
    new_store_annual_sales_projected: Optional[str] = None
    
    # Tax Information
    fed_tax_id: Optional[str] = None
    resale_tax_id: Optional[str] = None
    jbt_id: Optional[str] = None
    dnb_number: Optional[str] = None
    
    # Owner Information
    owner_first_name: Optional[str] = None
    owner_last_name: Optional[str] = None
    owner_ssn: Optional[str] = None
    owner_driver_license: Optional[str] = None
    owner_dob: Optional[str] = None
    
    # Owner Home Address
    owner_home_address: Optional[str] = None
    owner_home_kiosk: Optional[str] = None
    owner_home_city: Optional[str] = None
    owner_home_state: Optional[str] = None
    owner_home_zip_code: Optional[str] = None
    owner_tel_home: Optional[str] = None
    owner_cell: Optional[str] = None
    
    
    # Authorized Buyers
    authorized_buyer_1: Optional[str] = None
    authorized_buyer_2: Optional[str] = None
    authorized_buyer_3: Optional[str] = None
    authorized_buyer_4: Optional[str] = None
    
    # Sales Tax Certificate
    certificate_number: Optional[str] = None
    certificate_state: Optional[str] = None
    
    # Signatures
    corporate_owner_print_name: Optional[str] = None
    corporate_owner_title: Optional[str] = None
    partner_print_name: Optional[str] = None
    partner_title: Optional[str] = None
    
    # Document Uploads (file paths)
    driver_license_file_path: Optional[str] = None
    sales_tax_permit_file_path: Optional[str] = None
    lease_agreement_file_path: Optional[str] = None

class AccountApplication(AccountApplicationResponse):
    id: int
    status: str = "pending"  # pending, approved, rejected, under_review
    created_at: datetime
    updated_at: Optional[datetime] = None
    reviewed_by: Optional[int] = None
    reviewed_at: Optional[datetime] = None
    review_notes: Optional[str] = None

    class Config:
        from_attributes = True
