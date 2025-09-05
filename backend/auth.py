from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas
from config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def verify_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = schemas.TokenData(email=email)
    except JWTError:
        raise credentials_exception
    return token_data

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token_data = verify_token(token, credentials_exception)
    
    # First check regular users
    user = db.query(models.User).filter(models.User.email == token_data.email).first()
    if user is not None:
        return user
    
    # If no regular user found, check approved account applications
    application = db.query(models.AccountApplication).filter(
        models.AccountApplication.email == token_data.email,
        models.AccountApplication.status == "approved"
    ).first()
    
    if application is not None:
        # Return a user-like object for approved applications
        return type('User', (), {
            'id': application.id,
            'email': application.email,
            'name': application.legal_name,
            'phone': application.tel_business,
            'account_number': application.account_number,
            'is_application': True,
            'is_admin': False  # Approved applications are not admin users
        })()
    
    raise credentials_exception

def get_current_active_user(current_user: models.User = Depends(get_current_user)):
    return current_user

def get_current_admin_user(current_user: models.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    return current_user

def authenticate_user(db: Session, email: str, password: str):
    # First check regular users
    user = db.query(models.User).filter(models.User.email == email).first()
    if user:
        if not verify_password(password, user.hashed_password):
            return False
        return user
    
    # If no regular user found, check approved account applications
    application = db.query(models.AccountApplication).filter(
        models.AccountApplication.email == email,
        models.AccountApplication.status == "approved"
    ).first()
    
    if application:
        if not verify_password(password, application.hashed_password):
            return False
        # Return a user-like object for approved applications
        return type('User', (), {
            'id': application.id,
            'email': application.email,
            'name': application.legal_name,
            'phone': application.tel_business,
            'account_number': application.account_number,
            'is_application': True
        })()
    
    return False
