from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# Base schema for User
class UserBase(BaseModel):
    email: EmailStr
    username: str
    
    
# For Signup
class UserCreate(UserBase):
    password: str
    

class LoginRequest(BaseModel):
    email: EmailStr
    password: str



# For Response
class UserResponse(UserBase):
    id: int
    level: int
    current_xp: int
    xp_to_next_level: int
    streak_days: int
    created_at: datetime
    class Config:
        from_attributes = True
    
    
    
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Optional['UserResponse'] = None
    

class TokenData(BaseModel):
    id: Optional[int] = None    
    
    
    