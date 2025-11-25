from sqlalchemy import Column, Integer, String, ForeignKey, Enum, DateTime, Boolean
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum
from datetime import datetime

# Enums
class FrequencyEnum(str, enum.Enum):
    DAILY = "DAILY"
    WEEKLY = "WEEKLY"
    
class PriorityEnum(str, enum.Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"

# SQLAlchemy Habit Model ---> Table in PostgreSQL
class Habit(Base):
    __tablename__ = "habits"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    xp_reward = Column(Integer, default=10)
    priority = Column(Enum(PriorityEnum), default=PriorityEnum.MEDIUM)
    frequency = Column(Enum(FrequencyEnum), default=FrequencyEnum.DAILY)
    is_completed_today = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
