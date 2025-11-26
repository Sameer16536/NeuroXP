from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    deadline: Optional[str] = None
    xp_reward: int = 10


class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    deadline: Optional[str] = None
    xp_reward: Optional[int] = None
    is_completed: Optional[bool] = None

class TaskResponse(TaskBase):
    id: int
    user_id: int
    is_completed: bool
    created_at: datetime
    
    class Config:
        from_attributes = True
