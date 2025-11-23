# 🚀 **NEUROXP API DOCUMENTATION (FastAPI)**

*(For Login, Signup, Habits — current backend)*

---

# 🔐 **AUTH ROUTES**

Base prefix: **`/users`**

---

## 1️⃣ **Signup (Create User)**

### **POST** `/users/signup`

### **📤 Request Body (JSON)**

```json
{
  "email": "test@example.com",
  "name": "Sameer",
  "password": "mypassword123"
}
```

### **📥 Success Response (201)**

```json
{
  "id": 1,
  "email": "test@example.com",
  "name": "Sameer"
}
```

### **❌ Errors**

* 400 — Email already registered
* 422 — Missing fields

---

## 2️⃣ **Login (Generate JWT Token)**

### **POST** `/users/login`

⚠️ **IMPORTANT:**
Login uses **form-data**, NOT JSON.
(This is because OAuth2PasswordRequestForm is used.)

### **📤 Request (x-www-form-urlencoded)**

* **username:** `test@example.com`
* **password:** `mypassword123`

### Example inside Postman:

Go to **Body → x-www-form-urlencoded**, add:

| Key      | Value                                       |
| -------- | ------------------------------------------- |
| username | [test@example.com](mailto:test@example.com) |
| password | mypassword123                               |

### **📥 Success Response**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....",
  "token_type": "bearer"
}
```

Save this token for all protected routes.

### **❌ Errors**

* 400 — Invalid credentials
* 401 — Incorrect token format

---

# 🧠 **AUTH HEADERS (For All Protected Routes)**

Use the JWT token from login.

```
Authorization: Bearer <your_token_here>
```

Example:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI...
```

---

# 🧱 **HABITS ROUTES**

Base prefix: **`/habits`**

---

## 3️⃣ **Create Habit**

### **POST** `/habits/`

### **Headers**

```
Authorization: Bearer <token>
Content-Type: application/json
```

### **📤 Request Body**

```json
{
  "name": "Drink Water",
  "description": "8 glasses",
  "xp_value": 15,
  "priority": "high",
  "frequency": "daily"
}
```

### Allowed values:

**priority:**

* low
* medium
* high

**frequency:**

* daily
* weekly
* monthly

### **📥 Response**

```json
{
  "id": 1,
  "name": "Drink Water",
  "description": "8 glasses",
  "xp_value": 15,
  "priority": "high",
  "frequency": "daily"
}
```

---

## 4️⃣ **Get All Habits**

### **GET** `/habits/`

### **Headers**

```
Authorization: Bearer <token>
```

### **📥 Response**

```json
[
  {
    "id": 1,
    "name": "Drink Water",
    "description": "8 glasses",
    "xp_value": 15,
    "priority": "high",
    "frequency": "daily"
  },
  {
    "id": 2,
    "name": "Gym",
    "description": "45-minute workout",
    "xp_value": 30,
    "priority": "medium",
    "frequency": "daily"
  }
]
```

---

# 🛠️ **HOW TO TEST EVERYTHING IN POSTMAN**

### ✅ **Step 1 — Signup**

* POST `/users/signup`
* Send JSON body
  You’ll get:
  ✔️ `id`
  ✔️ `email`

---

### ✅ **Step 2 — Login**

* POST `/users/login`
* Body → x-www-form-urlencoded
  Gets you:
  ✔️ `access_token`

---

### ✅ **Step 3 — Set Environment in Postman**

Set variable:

* **token = <JWT_TOKEN>**

Or manually paste:

```
Authorization: Bearer <token>
```

---

### ✅ **Step 4 — Create a Habit**

POST `/habits/`
Add Header:
`Authorization: Bearer <token>`

Send JSON body.

---

### ➕ If you want, I can also generate:

* Postman Collection JSON
* Full API Documentation README.md
* Testing instructions for frontend
* Swagger customization
* Task endpoints next
* XP system endpoints next

