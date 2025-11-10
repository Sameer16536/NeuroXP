from pydantic import BaseModel
from typing import Optional
from enum import Enum

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

class HabitCreate(HabitBase):
    pass

class HabitResponse(HabitBase):
    id: int
    class Config:
        orm_mode = True
