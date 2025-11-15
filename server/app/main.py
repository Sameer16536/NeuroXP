from fastapi import FastAPI
from app.routes import user_routes,habit_routes


app = FastAPI(title="NeuroXP",version="1.0.0")

#Include routers
app.include_router(user_routes.router,prefix="/users",tags=["Users"])
app.include_router(habit_routes.router,prefix="/habits",tags=["Habits"])



# Basic route to check if the server is running
@app.get("/")

def root():
    return {"message": "Welcome to NeuroXP"}