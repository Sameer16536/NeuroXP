from pydantic import BaseModel
from typing import Optional
from enum import Enum

# Enums for Request/Response Validation
class FrequencyEnum(str, Enum):
    daily = "daily"
    weekly = "weekly"
    monthly = "monthly"

class PriorityEnum(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"

class HabitBase(BaseModel):
    name: str
    description: Optional[str] = None
    xp_value: Optional[int] = 10
    priority: PriorityEnum = PriorityEnum.medium
    frequency: FrequencyEnum = FrequencyEnum.daily

# Schema for creating a new Habit
class HabitCreate(HabitBase):
    pass

# Schema for sending response back to user
class HabitResponse(HabitBase):
    id: int
    
    # This allows Pydantic to convert SQLAlchemy Model → JSON automatically
    class Config:
        orm_mode = True
