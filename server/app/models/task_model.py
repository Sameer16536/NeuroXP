from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean
from app.core.database import Base
from datetime import datetime


class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    deadline = Column(String, nullable=True)
    xp_reward = Column(Integer, default=10)
    is_completed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
