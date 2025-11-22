from pydantic import BaseModel, EmailStr
from typing import Optional


# Base schema for User
class UserBase(BaseModel):
    emaii: EmailStr
    name: Optional[str] = None
    
    
# For Signup
class UserCreate(UserBase):
    password: str


# For Response
class UserResponse(UserBase):
    id: int
    created_at: Optional[str]  # ISO formatted datetime string

    class Config:
        orm_mode = True
    
    
    
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    

class TokenData(BaseModel):
    id: Optional[int] = None    
    
    
    