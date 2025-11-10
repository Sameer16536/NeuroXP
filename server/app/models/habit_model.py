from sqlalchemy import Column, Integer, String, ForeignKey, Enum, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum
from datetime import datetime,pytz

# Enums
class FrequencyEnum(str,enum.Enum):
    daily ="daily"
    weekly = "weekly"
    monthly = "monthly"
    
class PriorityEnum(str, enum.Enum):
    low = "low"
    medium = "medium"
    high = "high"
    
class Habit(Base):
    __tablename__ = "habits"
    
    id = Column(Integer,primary_key=True,index=True)
    name = Column(String,nullable=False)
    description = Column(String,nullable=False)
    xp_value = Column(Integer,default=0)
    priority = Column(Enum(PriorityEnum),default=PriorityEnum.medium)
    frequency = Column(Enum(FrequencyEnum),default=FrequencyEnum.daily)
    created_at = Column(DateTime,default=datetime.now())
    
