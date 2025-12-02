from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.task_model import Task
from app.models.user_model import User
from app.schemas.task_Schema import TaskCreate, TaskResponse, TaskUpdate
from app.core.security import verify_token
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


# Get current user by token
def get_current_user(token: str = Depends(OAuth2PasswordBearer(tokenUrl="token")), db: Session = Depends(get_db)):
    """Extract user from JWT token"""
    user_id = verify_token(token)
    if user_id is None:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user


# Get all tasks for authenticated user
@router.get("/", response_model=List[TaskResponse])
def get_tasks(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Get all tasks for the current user"""
    tasks = db.query(Task).filter(Task.user_id == current_user.id).all()
    return tasks


# Create a new task
@router.post("/", response_model=TaskResponse)
def create_task(task: TaskCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Create a new task for the current user"""
    try:
        db_task = Task(**task.dict(), user_id=current_user.id)
        db.add(db_task)
        db.commit()
        db.refresh(db_task)
        return db_task
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to create task")
    


# Complete a task and earn XP
@router.post("/{id}/complete", response_model=dict)
def complete_task(id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Mark a task as completed and earn XP"""
    task = db.query(Task).filter(Task.id == id, Task.user_id == current_user.id).first()
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if task.is_completed:
        raise HTTPException(status_code=400, detail="Task already completed")
    
    # Mark as completed
    task.is_completed = True
    
    # Update user XP
    user = db.query(User).filter(User.id == current_user.id).first()
    if user:
        user.current_xp += task.xp_reward
        # Check for level up
        if user.current_xp >= user.xp_to_next_level:
            user.level += 1
            user.current_xp -= user.xp_to_next_level
            user.xp_to_next_level = int(user.xp_to_next_level * 1.1)  # Increase next level requirement
    try:
        db.commit()
        return {"success": True, "xp_gained": task.xp_reward}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to complete task")



# Delete a task
@router.delete("/{id}", response_model=dict)
def delete_task(id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Delete a task"""
    task = db.query(Task).filter(Task.id == id, Task.user_id == current_user.id).first()
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    try:
        db.delete(task)
        db.commit()
        return {"success": True}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to delete task")
    
    

# Edit a task
@router.put("/{id}", response_model=TaskResponse)
def edit_task(id: int, task_update: TaskUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Edit an existing task"""
    task = db.query(Task).filter(Task.id == id, Task.user_id == current_user.id).first()
    
    if not task:
        raise HTTPException(status_code=404, detail="task not found")
    
    updatedData = task_update.dict(exclude_unset=True) 
    
    # Update fields
    for key, value in updatedData.items():
        setattr(task, key, value)
    
    try:
        db.commit()
        db.refresh(task)
        return task
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to update task")