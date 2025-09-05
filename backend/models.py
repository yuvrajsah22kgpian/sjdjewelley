from sqlalchemy import Column, Integer, String, Float, Boolean, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    phone = Column(String)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    orders = relationship("Order", back_populates="user")
    wishlist_items = relationship("WishlistItem", back_populates="user")

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    original_price = Column(Float, nullable=False)
    sale_price = Column(Float, nullable=False)
    discount = Column(Float, default=0)
    category = Column(String)
    material = Column(String)
    gemstone = Column(String)
    occasion = Column(String)
    in_stock = Column(Boolean, default=True)
    new_arrivals = Column(Boolean, default=False)
    certified = Column(Boolean, default=False)
    customizable = Column(Boolean, default=False)
    specifications = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    images = relationship("ProductImage", back_populates="product", cascade="all, delete-orphan")
    order_items = relationship("OrderItem", back_populates="product")
    wishlist_items = relationship("WishlistItem", back_populates="product")

class ProductImage(Base):
    __tablename__ = "product_images"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    src = Column(String, nullable=False)
    alt = Column(String)
    is_primary = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    product = relationship("Product", back_populates="images")

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    total_amount = Column(Float, nullable=False)
    status = Column(String, default="pending")  # pending, confirmed, shipped, delivered, cancelled
    shipping_address = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")

class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    order = relationship("Order", back_populates="items")
    product = relationship("Product", back_populates="order_items")

class WishlistItem(Base):
    __tablename__ = "wishlist_items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    user = relationship("User", back_populates="wishlist_items")
    product = relationship("Product", back_populates="wishlist_items")

class AccountApplication(Base):
    __tablename__ = "account_applications"

    id = Column(Integer, primary_key=True, index=True)
    
    # Authentication
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    account_number = Column(String, unique=True, index=True, nullable=False)
    
    # Account Type
    account_type = Column(String, nullable=False)
    other_account_type = Column(String)
    
    # Company Information
    legal_name = Column(String, nullable=False)
    business_start_date = Column(String, nullable=False)
    dba_trade_name = Column(String, nullable=False)
    
    # Physical Address
    physical_address = Column(String, nullable=False)
    physical_kiosk = Column(String)
    physical_city = Column(String, nullable=False)
    physical_state = Column(String, nullable=False)
    physical_zip_code = Column(String, nullable=False)
    
    # Contact Information
    tel_business = Column(String, nullable=False)
    fax = Column(String)
    
    # Shipping Address
    shipping_address = Column(String, nullable=False)
    shipping_kiosk = Column(String)
    shipping_address_type = Column(String, nullable=False)
    shipping_city = Column(String, nullable=False)
    shipping_state = Column(String, nullable=False)
    shipping_zip_code = Column(String, nullable=False)
    
    # Store Lease Information
    store_lease_holder = Column(String)
    existing_store_annual_sales = Column(String)
    new_store_annual_sales_projected = Column(String)
    
    # Tax Information
    fed_tax_id = Column(String)
    resale_tax_id = Column(String)
    jbt_id = Column(String)
    dnb_number = Column(String)
    
    # Owner Information
    owner_first_name = Column(String)
    owner_last_name = Column(String)
    owner_ssn = Column(String)
    owner_driver_license = Column(String)
    owner_dob = Column(String)
    
    # Owner Home Address
    owner_home_address = Column(String)
    owner_home_kiosk = Column(String)
    owner_home_city = Column(String)
    owner_home_state = Column(String)
    owner_home_zip_code = Column(String)
    owner_tel_home = Column(String)
    owner_cell = Column(String)
    
    
    # Authorized Buyers
    authorized_buyer_1 = Column(String)
    authorized_buyer_2 = Column(String)
    authorized_buyer_3 = Column(String)
    authorized_buyer_4 = Column(String)
    
    # Sales Tax Certificate
    certificate_number = Column(String)
    certificate_state = Column(String)
    
    # Signatures
    corporate_owner_print_name = Column(String)
    corporate_owner_title = Column(String)
    partner_print_name = Column(String)
    partner_title = Column(String)
    
    # Document Uploads (file paths)
    driver_license_file_path = Column(String)
    sales_tax_permit_file_path = Column(String)
    lease_agreement_file_path = Column(String)
    
    # Application Status
    status = Column(String, default="pending")  # pending, approved, rejected, under_review
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    reviewed_by = Column(Integer, ForeignKey("users.id"))
    reviewed_at = Column(DateTime(timezone=True))
    review_notes = Column(Text)
    
    # Relationships
    reviewer = relationship("User", foreign_keys=[reviewed_by])
