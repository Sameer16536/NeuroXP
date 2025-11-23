## Create Virtual Env
python -m venv .venv

## Activate Virtual ENV
.venv\Scripts\Activate.ps1

## Upgrade PIP
python -m pip install --upgrade pip

## Requirements commands
pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic[email] python-dotenv
pip install python-jose[cryptography] bcrypt==4.1.2 passlib[bcrypt]==1.7.4



## Run the server
fastapi dev main.py

uvicorn app.main:app --reload


## For Table creation
'''
python
from app.core.database import Base, engine
from app.models.user_model import User
from app.models.habit_model import Habit
Base.metadata.create_all(bind=engine)

'''