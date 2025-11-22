## Create Virtual Env
python -m venv .venv

## Activate Virtual ENV
.venv\Scripts\Activate.ps1

## Upgrade PIP
python -m pip install --upgrade pip

## Requirements commands
pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic[email] python-dotenv
pip install python-jose[cryptography] passlib[bcrypt]



## Run the server
fastapi dev main.py

uvicorn app.main:app --reload


## For Table creation
'''
python
from app.models.habit_model import Habit
from app.core.database import Base, engine
Base.metadata.create_all(bind=engine)
'''