## Create Virtual Env
python -m venv .venv

## Activate Virtual ENV
.venv\Scripts\Activate.ps1

## Upgrade PIP
python -m pip install --upgrade pip

## Requirements commands
pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic[email] python-dotenv


## Run the server
fastapi dev main.py

uvicorn app.main:app --reload
