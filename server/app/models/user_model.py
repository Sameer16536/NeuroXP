from sqlalchemy import Column, Integer, String, DateTime
from app.core.database import Base
from datetime import datetime



class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    level = Column(Integer, default=1)
    current_xp = Column(Integer, default=0)
    xp_to_next_level = Column(Integer, default=100)
    streak_days = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)