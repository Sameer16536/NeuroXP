from fastapi import FastAPI
from app.routes import user_routes,habit_routes
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="NeuroXP",version="1.0.0")

#Include routers
app.include_router(user_routes.router,prefix="/users",tags=["Users"])
app.include_router(habit_routes.router,prefix="/habits",tags=["Habits"])

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

# Basic route to check if the server is running
@app.get("/")

def root():
    return {"message": "Welcome to NeuroXP"}