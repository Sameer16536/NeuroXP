from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.habit_model import Habit
from app.schemas.habit_Schema import HabitCreate, HabitResponse, HabitUpdate
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


# Get all habits for authenticated user
@router.get("/gethabits", response_model=List[HabitResponse])
def get_habits(user_id: int, db: Session = Depends(get_db)):
    """Get all habits for the current user"""
    habits = db.query(Habit).filter(Habit.user_id == user_id).all()
    return habits


# Create a new habit
@router.post("/createhabit", response_model=HabitResponse)
def create_habit(habit: HabitCreate, user_id: int, db: Session = Depends(get_db)):
    """Create a new habit for the current user"""
    db_habit = Habit(**habit.dict(), user_id=user_id)
    db.add(db_habit)
    db.commit()
    db.refresh(db_habit)
    return db_habit


# Complete a habit and earn XP
@router.post("/{id}/complete", response_model=dict)
def complete_habit(id: int, user_id: int, db: Session = Depends(get_db)):
    """Mark a habit as completed and earn XP"""
    habit = db.query(Habit).filter(Habit.id == id, Habit.user_id == user_id).first()
    
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")
    
    # Mark as completed
    habit.is_completed_today = True
    
    # Update user XP
    from app.models.user_model import User
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        user.current_xp += habit.xp_reward
        # Check for level up
        if user.current_xp >= user.xp_to_next_level:
            user.level += 1
            user.current_xp -= user.xp_to_next_level
            user.xp_to_next_level = int(user.xp_to_next_level * 1.1)  # Increase next level requirement
    
    db.commit()
    return {"success": True, "xp_gained": habit.xp_reward}


# Delete a Habit
@router.delete("/{id}/delete", response_model=dict)
def delete_habit(id: int, user_id: int, db: Session = Depends(get_db)):
    """Delete a habit"""
    habit = db.query(Habit).filter(Habit.id == id, Habit.user_id == user_id).first()
    
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")
    
    try:
        db.delete(habit)
        db.commit()
        return {"success": True, "message": "Habit deleted"}
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Could not delete habit")

# Edit a Habit
@router.put("/{id}/edit", response_model=HabitResponse)
def edit_habit(id: int, habit_update: HabitUpdate, user_id: int, db: Session = Depends(get_db)):
    """Edit an existing habit"""
    habit = db.query(Habit).filter(Habit.id == id, Habit.user_id == user_id).first()
    
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")
    
    updatedData = habit_update.dict(exclude_unset=True) 
    
    # Update fields
    for key, value in updatedData.items():
        setattr(habit, key, value)
    
    db.commit()
    db.refresh(habit)
    return habit