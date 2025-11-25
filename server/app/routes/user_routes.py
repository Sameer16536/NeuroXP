from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer

from app.core.database import SessionLocal
from app.models.user_model import User
from app.schemas.user_Schema import UserCreate, UserResponse, Token, LoginRequest
from app.core.security import hash_password, verify_password, create_access_token, verify_token
from typing import List

router = APIRouter()


# DB Dependency 
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Get current user by token
def get_current_user(token: str = Depends(OAuth2PasswordBearer(tokenUrl="login")), db: Session = Depends(get_db)):
    """Extract user from JWT token"""
    user_id = verify_token(token)
    if user_id is None:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user


# USER SIGNUP
@router.post("/signup", response_model=Token)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    """Register a new user account"""
    # Check if email already exists
    existing_email = db.query(User).filter(User.email == user.email).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Check if username already exists
    existing_username = db.query(User).filter(User.username == user.username).first()
    if existing_username:
        raise HTTPException(status_code=400, detail="Username already taken")

    # Hash password
    hashed_pwd = hash_password(user.password)

    # Create user
    new_user = User(
        email=user.email,
        username=user.username,
        password=hashed_pwd
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Create JWT token
    access_token = create_access_token(data={"id": new_user.id})

    return Token(
        access_token=access_token, 
        token_type="bearer",
        user=UserResponse.from_orm(new_user)
    )


# LOGIN -> returns JWT
@router.post("/login", response_model=Token)
def login(credentials: LoginRequest, db: Session = Depends(get_db)):
    """Authenticate a user and obtain an access token"""
    # Find user by email
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    # Check password
    if not verify_password(credentials.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    # Create JWT token
    access_token = create_access_token(data={"id": user.id})

    return Token(
        access_token=access_token, 
        token_type="bearer",
        user=UserResponse.from_orm(user)
    )


# GET CURRENT USER
@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    """Fetch the currently authenticated user's profile information"""
    return UserResponse.from_orm(current_user)
