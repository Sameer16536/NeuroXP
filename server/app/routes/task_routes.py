from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.task_model import Task
from app.schemas.task_Schema import TaskCreate, TaskResponse
from typing import List

# Create a router for all task-related endpoints
router = APIRouter()


# Dependency: gives a fresh DB session to each request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Get all tasks for authenticated user
@router.get("/", response_model=List[TaskResponse])
def get_tasks(user_id: int, db: Session = Depends(get_db)):
    """Get all tasks for the current user"""
    tasks = db.query(Task).filter(Task.user_id == user_id).all()
    return tasks


# Create a new task
@router.post("/", response_model=TaskResponse)
def create_task(task: TaskCreate, user_id: int, db: Session = Depends(get_db)):
    """Create a new task for the current user"""
    db_task = Task(**task.dict(), user_id=user_id)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


# Complete a task and earn XP
@router.post("/{id}/complete", response_model=dict)
def complete_task(id: int, user_id: int, db: Session = Depends(get_db)):
    """Mark a task as completed and earn XP"""
    task = db.query(Task).filter(Task.id == id, Task.user_id == user_id).first()
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if task.is_completed:
        raise HTTPException(status_code=400, detail="Task already completed")
    
    # Mark as completed
    task.is_completed = True
    
    # Update user XP
    from app.models.user_model import User
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        user.current_xp += task.xp_reward
        # Check for level up
        if user.current_xp >= user.xp_to_next_level:
            user.level += 1
            user.current_xp -= user.xp_to_next_level
            user.xp_to_next_level = int(user.xp_to_next_level * 1.1)  # Increase next level requirement
    
    db.commit()
    return {"success": True, "xp_gained": task.xp_reward}


# Delete a task
@router.delete("/{id}", response_model=dict)
def delete_task(id: int, user_id: int, db: Session = Depends(get_db)):
    """Delete a task"""
    task = db.query(Task).filter(Task.id == id, Task.user_id == user_id).first()
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.delete(task)
    db.commit()
    return {"success": True}
