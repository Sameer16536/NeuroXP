from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.habit_model import Habit
from app.schemas.habit_Schema import HabitCreate, HabitResponse
from typing import List

# Create a router for all habit-related endpoints
router = APIRouter()

# Dependency :  gives a fresh DB session to each request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        # Avoids memory leaks
        db.close()


# Create a new habit
@router.post("/", response_model=HabitResponse)
def create_habit(habit: HabitCreate, db: Session = Depends(get_db)):
    db_habit = Habit(**habit.dict())
    db.add(db_habit)
    db.commit()
    db.refresh(db_habit)
    return db_habit

# Get all habits
@router.get("/", response_model=List[HabitResponse])
def get_habits(db: Session = Depends(get_db)):
    return db.query(Habit).all()
