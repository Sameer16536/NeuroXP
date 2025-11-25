from pydantic import BaseModel
from typing import Optional
from enum import Enum

# Enums for Request/Response Validation
class FrequencyEnum(str, Enum):
    DAILY = "DAILY"
    WEEKLY = "WEEKLY"

class PriorityEnum(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"

class HabitBase(BaseModel):
    title: str
    description: Optional[str] = None
    xp_reward: int = 10
    priority: PriorityEnum = PriorityEnum.MEDIUM
    frequency: FrequencyEnum = FrequencyEnum.DAILY

# Schema for creating a new Habit
class HabitCreate(HabitBase):
    pass

# Schema for sending response back to user
class HabitResponse(HabitBase):
    id: int
    user_id: int
    is_completed_today: bool
    
    # This allows Pydantic to convert SQLAlchemy Model → JSON automatically
    class Config:
        from_attributes = True
