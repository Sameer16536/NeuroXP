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


class TaskResponse(TaskBase):
    id: int
    user_id: int
    is_completed: bool
    created_at: datetime
    
    class Config:
        from_attributes = True
