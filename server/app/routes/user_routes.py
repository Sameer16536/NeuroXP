from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from app.core.database import SessionLocal
from app.models.user_model import User
from app.schemas.user_Schema import UserCreate, UserResponse, Token
from app.core.security import hash_password, verify_password, create_access_token
from typing import List

router = APIRouter()


# DB Dependency 
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# USER SIGNUP
@router.post("/signup", response_model=UserResponse)
def signup(user: UserCreate, db: Session = Depends(get_db)):

    # Check if email already exists
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash password
    hashed_pwd = hash_password(user.password)

    # Create user
    new_user = User(
        email=user.email,
        name=user.name,
        password=hashed_pwd
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user



# LOGIN -> returns JWT
@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(),
          db: Session = Depends(get_db)):

    # Verify email exists
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    # Verify password
    if not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    # Create JWT token
    access_token = create_access_token(data={"id": user.id})

    return Token(access_token=access_token)
