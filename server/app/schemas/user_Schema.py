from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# Base schema for User
class UserBase(BaseModel):
    email: EmailStr
    name: Optional[str] = None
    
    
# For Signup
class UserCreate(UserBase):
    password: str
    

class LoginRequest(BaseModel):
    email: EmailStr
    password: str



# For Response
class UserResponse(UserBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True
    
    
    
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    

class TokenData(BaseModel):
    id: Optional[int] = None    
    
    
    