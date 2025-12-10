from fastapi import FastAPI,Depends,HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db, engine, Base
from worker import  generate_ai_insight
from pydantic import BaseModel
from app.routes import user_routes, habit_routes, task_routes
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

app = FastAPI(title="NeuroXP", version="1.0.0")

# Include routers
app.include_router(user_routes.router, prefix="/users", tags=["Users"])
app.include_router(habit_routes.router, prefix="/habits", tags=["Habits"])
app.include_router(task_routes.router, prefix="/tasks", tags=["Tasks"])

origins = [
    "http://localhost:5173", 
    "http://localhost:3000", 
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,             # Frontend URLs allowed
    allow_credentials=True,
    allow_methods=["*"],               # Allow all HTTP methods
    allow_headers=["*"],               # Allow all headers (auth tokens, content-type, etc.)
)


@asynccontextmanager
# Initialize DB (In production, use Alembic for migrations)
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


# Basic route to check if the server is running
@app.get("/")
def root():
    return {"message": "Welcome to NeuroXP"}


# TODO: Move to separate file later
# --- Pydantic Models (Data Validation) ---
class HabitRequest(BaseModel):
    user_id: int
    habits: list[str]
    
@app.post("/api/insights/generate")
async def trigger_insight(request: HabitRequest):
    """
    SaaS Pattern: Async Task Trigger
    """
    # 1. Send task to Redis queue
    task = generate_ai_insight.delay(request.user_id, request.habits)
    
    # 2. Return immediately (Don't make user wait!)
    return {
        "message": "AI is analyzing your habits...",
        "task_id": task.id,
        "status": "processing"
    }

from celery.result import AsyncResult

@app.get("/api/insights/status/{task_id}")
async def get_insight_status(task_id: str):
    """
    Polling Endpoint: Frontend checks this every 2 seconds
    to see if AI is done.
    """
    task_result = AsyncResult(task_id)
    
    if task_result.state == 'PENDING':
        return {"status": "processing"}
    elif task_result.state == 'SUCCESS':
        return {"status": "completed", "data": task_result.result}
    else:
        return {"status": task_result.state}