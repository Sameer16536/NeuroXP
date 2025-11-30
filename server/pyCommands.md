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


---

# 📌 **Alembic Commands Cheat Sheet**

## 🔧 **Initialize Alembic (run once per project)**

```bash
alembic init alembic
```

---

## 🏗️ **Create a New Migration**

### Autogenerate from SQLAlchemy models:

```bash
alembic revision --autogenerate -m "your message"
```

### Create an empty migration:

```bash
alembic revision -m "empty migration"
```

---

## 🚀 **Apply Migrations**

### Upgrade to latest (HEAD):

```bash
alembic upgrade head
```

### Upgrade step-by-step:

```bash
alembic upgrade +1
```

### Upgrade to a specific revision:

```bash
alembic upgrade <revision_id>
```

---

## ⬅️ **Rollback / Downgrade**

### Rollback last migration:

```bash
alembic downgrade -1
```

### Rollback to base:

```bash
alembic downgrade base
```

### Rollback to a specific revision:

```bash
alembic downgrade <revision_id>
```

---

## 📝 **Check Migration Status**

### Show current version:

```bash
alembic current
```

### Show full migration history:

```bash
alembic history
```

### Show detailed migration tree:

```bash
alembic history --verbose
```

---

## 🧪 **Stamp Database Without Running Migrations**

### Mark current DB as at specific revision (dangerous):

```bash
alembic stamp head
```

---

## 🔄 **Revision ID Helpers**

### Show heads:

```bash
alembic heads
```

### Show branches:

```bash
alembic branches
```

---

