# 🧠 NeuroXP — Gamify Your Life, Level Up in Reality

> **Track your habits, gain XP, and let AI analyze your real-life growth.**
> NeuroXP turns self-improvement into a game — combining productivity tracking, gamification, and AI-driven insights that help you become 1% better every day.

---

## 🚀 Overview

**NeuroXP** is a full-stack web application that transforms your daily routine into an RPG experience.
Earn XP for completing real-life habits (coding, workouts, reading), unlock levels, and receive personalized AI insights based on your progress.

This is not just a habit tracker — it’s your **personal growth engine** powered by **AI analytics**, **real-time tracking**, and **data-driven feedback**.

---

## 🧩 Key Features

| Category                            | Features                                                        |
| ----------------------------------- | --------------------------------------------------------------- |
| 🎮 **Gamification Engine**          | Create habits → Earn XP → Level up over time                    |
| 📅 **Task & Habit Tracker**         | Organize goals with customizable frequency (daily/weekly)       |
| 🔔 **Streaks & Notifications**      | Redis-based real-time streak system and reminders               |
| 📊 **Analytics Dashboard**          | Visualize XP trends, consistency, and productivity              |
| 🧠 **AI Insights**                  | LangChain + OpenAI powered summaries of your weekly performance |
| ⚡ **Real-time XP Counter**          | WebSockets for instant XP updates                               |
| 🤖 **AI Quest Generator (Planned)** | Smart task generator based on your progress patterns            |
| ☁️ **Cloud-Ready**                  | Fully containerized for scalable deployment                     |

---

## 🧱 Tech Stack

| Layer                | Tech                                            |
| -------------------- | ----------------------------------------------- |
| **Frontend**         | React + TailwindCSS                             |
| **Backend API**      | FastAPI                                         |
| **Database**         | PostgreSQL                                      |
| **Cache / Queue**    | Redis + RQ / Celery                             |
| **AI Layer**         | LangChain + OpenAI / Gemini                     |
| **Auth**             | JWT / OAuth                                     |
| **Containerization** | Docker + Docker Compose                         |
| **Deployment**       | Nginx + AWS ECS / Render / Railway              |

---

## 🧠 Architecture

```
               ┌────────────────────────────┐
               │        Frontend (React)    │
               │   UI + State + Charts      │
               └──────────────┬─────────────┘
                              │ REST / WS
                              ▼
          ┌───────────────────────────────┐
          │       FastAPI Backend         │
          │ Auth | XP Logic | CRUD | API  │
          └──────────┬────────────────────┘
                     │
   ┌─────────────────┼─────────────────────────────┐
   │                 │                             │
   ▼                 ▼                             ▼
PostgreSQL       Redis (Cache)            AI Engine (LangChain)
(User, XP,       (Streaks, Leaderboards)  (Weekly Insights,
 Habits, Logs)                              Quest Gen)
```

---

## 🧬 Database Schema (MVP)

### **User**

| Field         | Type      | Notes           |
| ------------- | --------- | --------------- |
| id            | UUID      | Primary key     |
| name          | String    |                 |
| email         | String    | Unique          |
| password_hash | String    |                 |
| total_xp      | Integer   |                 |
| level         | Integer   | Derived from XP |
| created_at    | Timestamp |                 |

### **Habit**

| Field     | Type      | Notes                       |
| --------- | --------- | --------------------------- |
| id        | UUID      |                             |
| user_id   | FK → User |                             |
| name      | String    | e.g. “Code 1 hour”          |
| xp_value  | Integer   | XP per completion           |
| frequency | Enum      | {daily, weekly}             |
| category  | Enum      | {Health, Study, Work, Game} |

### **XPLog**

| Field      | Type       | Notes    |
| ---------- | ---------- | -------- |
| id         | UUID       |          |
| user_id    | FK → User  |          |
| habit_id   | FK → Habit |          |
| xp_earned  | Integer    |          |
| mood_score | Integer    | optional |
| timestamp  | Timestamp  |          |

### **AIInsight**

| Field        | Type      | Notes                       |
| ------------ | --------- | --------------------------- |
| id           | UUID      |                             |
| user_id      | FK → User |                             |
| summary_text | Text      | AI-generated summary        |
| insight_type | Enum      | productivity, mood, pattern |
| created_at   | Timestamp |                             |

---

## 🧠 AI Integration Plan

### **Phase 1 — Insight Generation**

* Aggregate user XP + habit logs weekly.
* Send structured data to LangChain → OpenAI API.
* Prompt Example:

  ```text
  Analyze this user’s week: summarize their top habits, productivity trend, and suggest 1 improvement.
  ```
* Store AI response in `AIInsight`.

### **Phase 2 — Quest Generator**

* AI generates new challenges using prompt-based learning from user XP trends.
* Example:
  “User’s coding consistency dropped by 30%. Suggest a motivating daily quest.”

### **Phase 3 — Predictive Analytics**

* Integrate small ML models to predict streak continuation probability.
* Visualize predicted consistency graph in dashboard.

---

---

## 🧭 Roadmap

| Phase      | Focus                               | Status        |
| ---------- | ----------------------------------- | ------------- |
| 🧩 Phase 1 | Core XP System + Auth + Habits      | ✅ In Progress |
| ⚙️ Phase 2 | AI Insights (LangChain Integration) | 🔜 Planned    |
| ⚡ Phase 3  | Realtime XP & Leaderboards          | 🔜 Planned    |
| 🤖 Phase 4 | AI Quest Generator + ML Analytics   | 🔜 Planned    |
| ☁️ Phase 5 | Dockerized Deployment (AWS)         | 🔜 Planned    |

---

## 📊 Example Dashboard Preview (Planned UI)

```
+-------------------------------------------------------------+
| NeuroXP Dashboard                                           |
|-------------------------------------------------------------|
| XP Level: 12    |  Streak: 🔥 23 Days  |   Rank: #34 Global |
|-------------------------------------------------------------|
| [ XP Over Time Chart ]     [ AI Insights Summary ]          |
|                                                             |
| “You’re 32% more productive on days you limit gaming < 2h.” |
+-------------------------------------------------------------+
```

---

