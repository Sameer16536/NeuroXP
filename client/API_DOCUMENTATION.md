# NeuroXP Frontend API Documentation

**Base URL:** `${VITE_BACKEND_URL}` (configured via environment variable)

**Authentication:** All requests (except login and signup) require a Bearer token in the Authorization header.

---

## Table of Contents
1. [Authentication APIs](#authentication-apis)
2. [Habits APIs](#habits-apis)
3. [Tasks APIs](#tasks-apis)
4. [Data Types & Interfaces](#data-types--interfaces)

---

## Authentication APIs

### 1. Login
**Endpoint:** `POST /users/login`

**Description:** Authenticate a user and obtain an access token.

**Request Body:**
```typescript
{
  email: string;
  password: string;
}
```

**Response (200 OK):**
```typescript
{
  access_token: string;
  token_type: string;
  user: {
    id: string;
    email: string;
    username: string;
    level: number;
    current_xp: number;
    xp_to_next_level: number;
    streak_days: number;
  }
}
```

**Usage (React Hook):**
```typescript
const [login, { isLoading, error }] = useLoginMutation();
await login({ email: "user@example.com", password: "password123" });
```

---

### 2. Signup
**Endpoint:** `POST /users/signup`

**Description:** Register a new user account.

**Request Body:**
```typescript
{
  email: string;
  password: string;
  username: string;
  [additional user fields as required]
}
```

**Response (201 Created):**
```typescript
{
  user: {
    id: string;
    email: string;
    username: string;
    level: number;
    current_xp: number;
    xp_to_next_level: number;
    streak_days: number;
  },
  access_token: string;
}
```

**Usage (React Hook):**
```typescript
const [signup, { isLoading, error }] = useSignupMutation();
await signup({ 
  email: "newuser@example.com", 
  password: "password123",
  username: "newuser"
});
```

---

### 3. Get Current User
**Endpoint:** `GET /users/me`

**Description:** Fetch the currently authenticated user's profile information.

**Authentication:** Required (Bearer Token)

**Response (200 OK):**
```typescript
{
  id: string;
  email: string;
  username: string;
  level: number;
  current_xp: number;
  xp_to_next_level: number;
  streak_days: number;
}
```

**Usage (React Hook):**
```typescript
const { data: user, isLoading, error } = useGetMeQuery();
```

---

## Habits APIs

### 1. Get All Habits
**Endpoint:** `GET /habits/`

**Description:** Fetch all habits for the authenticated user.

**Authentication:** Required (Bearer Token)

**Response (200 OK):**
```typescript
[
  {
    id: string;
    title: string;
    description?: string;
    frequency: "DAILY" | "WEEKLY";
    priority: "LOW" | "MEDIUM" | "HIGH";
    xp_reward: number;
    is_completed_today: boolean;
  },
  ...
]
```

**Usage (React Hook):**
```typescript
const { data: habits, isLoading, error } = useGetHabitsQuery();
```

**Cache Tags:** `Habits` (LIST)

---

### 2. Create Habit
**Endpoint:** `POST /habits/`

**Description:** Create a new habit for the authenticated user.

**Authentication:** Required (Bearer Token)

**Request Body:**
```typescript
{
  title: string;
  description?: string;
  frequency: "DAILY" | "WEEKLY";
  priority: "LOW" | "MEDIUM" | "HIGH";
  xp_reward: number;
}
```

**Response (201 Created):**
```typescript
{
  id: string;
  title: string;
  description?: string;
  frequency: "DAILY" | "WEEKLY";
  priority: "LOW" | "MEDIUM" | "HIGH";
  xp_reward: number;
  is_completed_today: boolean;
}
```

**Usage (React Hook):**
```typescript
const [createHabit, { isLoading, error }] = useCreateHabitMutation();
await createHabit({
  title: "Morning Exercise",
  description: "30 minutes of exercise",
  frequency: "DAILY",
  priority: "HIGH",
  xp_reward: 50
});
```

**Cache Invalidation:** Invalidates `Habits` LIST tag

---

### 3. Complete Habit
**Endpoint:** `POST /habits/{id}/complete`

**Description:** Mark a habit as completed and earn XP.

**Authentication:** Required (Bearer Token)

**Path Parameters:**
- `id` (string, required): The ID of the habit to complete

**Response (200 OK):**
```typescript
{
  success: boolean;
  xp_gained: number;
}
```

**Usage (React Hook):**
```typescript
const [completeHabit, { isLoading, error }] = useCompleteHabitMutation();
await completeHabit(habitId);
```

**Cache Invalidation:** Invalidates specific Habit tag and User tag (as XP changes)

---

## Tasks APIs

### 1. Get All Tasks
**Endpoint:** `GET /tasks/`

**Description:** Fetch all tasks for the authenticated user.

**Authentication:** Required (Bearer Token)

**Response (200 OK):**
```typescript
[
  {
    id: string;
    title: string;
    description?: string;
    deadline?: string;
    xp_reward: number;
    is_completed: boolean;
  },
  ...
]
```

**Usage (React Hook):**
```typescript
const { data: tasks, isLoading, error } = useGetTasksQuery();
```

**Cache Tags:** `Tasks` (LIST)

---

### 2. Create Task
**Endpoint:** `POST /tasks/`

**Description:** Create a new task for the authenticated user.

**Authentication:** Required (Bearer Token)

**Request Body:**
```typescript
{
  title: string;
  description?: string;
  deadline?: string;
  xp_reward: number;
}
```

**Response (201 Created):**
```typescript
{
  id: string;
  title: string;
  description?: string;
  deadline?: string;
  xp_reward: number;
  is_completed: boolean;
}
```

**Usage (React Hook):**
```typescript
const [createTask, { isLoading, error }] = useCreateTaskMutation();
await createTask({
  title: "Complete project",
  description: "Finish the NeuroXP project",
  deadline: "2025-12-31",
  xp_reward: 100
});
```

**Cache Invalidation:** Invalidates `Tasks` LIST tag

---

### 3. Complete Task
**Endpoint:** `POST /tasks/{id}/complete`

**Description:** Mark a task as completed and earn XP.

**Authentication:** Required (Bearer Token)

**Path Parameters:**
- `id` (string, required): The ID of the task to complete

**Response (200 OK):**
```typescript
{
  success: boolean;
  xp_gained: number;
}
```

**Usage (React Hook):**
```typescript
const [completeTask, { isLoading, error }] = useCompleteTaskMutation();
await completeTask(taskId);
```

**Cache Invalidation:** Invalidates specific Task tag and User tag (as XP changes)

---

### 4. Delete Task
**Endpoint:** `DELETE /tasks/{id}`

**Description:** Delete a task permanently.

**Authentication:** Required (Bearer Token)

**Path Parameters:**
- `id` (string, required): The ID of the task to delete

**Response (200 OK):**
```typescript
{
  success: boolean;
}
```

**Usage (React Hook):**
```typescript
const [deleteTask, { isLoading, error }] = useDeleteTaskMutation();
await deleteTask(taskId);
```

**Cache Invalidation:** Invalidates `Tasks` LIST tag

---

## Data Types & Interfaces

### User
```typescript
interface User {
  id: string;                // Unique user identifier
  email: string;             // User's email address
  username: string;          // User's username
  level: number;             // Current user level
  current_xp: number;        // Current XP points
  xp_to_next_level: number;  // XP required to reach next level
  streak_days: number;       // Consecutive days of activity
}
```

### Habit
```typescript
interface Habit {
  id: string;                // Unique habit identifier
  title: string;             // Habit title
  description?: string;      // Optional description
  frequency: HabitFrequency; // "DAILY" | "WEEKLY"
  priority: HabitPriority;   // "LOW" | "MEDIUM" | "HIGH"
  xp_reward: number;         // XP earned on completion
  is_completed_today: boolean; // Whether completed in current day/week
}

enum HabitFrequency {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY"
}

enum HabitPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH"
}
```

### Task
```typescript
interface Task {
  id: string;           // Unique task identifier
  title: string;        // Task title
  description?: string; // Optional description
  deadline?: string;    // Optional deadline date
  xp_reward: number;    // XP earned on completion
  is_completed: boolean; // Whether the task is completed
}
```

### Authentication Responses
```typescript
interface LoginResponse {
  access_token: string;  // JWT token for authenticated requests
  token_type: string;    // Token type (usually "bearer")
  user: User;           // Authenticated user object
}

interface SignupResponse {
  user: User;           // Newly created user object
  access_token: string; // JWT token for authenticated requests
}

interface AuthState {
  user: User | null;    // Current user or null if not authenticated
  token: string | null; // Current auth token or null
}
```

---

## Error Handling

All API endpoints return appropriate HTTP status codes:

- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Missing or invalid authentication token
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

**Error Response Format:**
```json
{
  "detail": "Error message describing what went wrong"
}
```

---

## Authentication Header Format

All authenticated requests require the following header:

```
Authorization: Bearer <access_token>
```

The `access_token` is obtained from the login or signup response and is automatically added by the `baseApi` configuration when making requests.

---

## Redux RTK Query Integration

All API endpoints are managed through Redux Toolkit Query with the following features:

- **Automatic caching**: Data is cached and reused to minimize API calls
- **Automatic invalidation**: Related data is automatically refreshed when mutations occur
- **Loading states**: `isLoading`, `isFetching` flags available for UI feedback
- **Error handling**: `error` object with detailed error information
- **Type safety**: Full TypeScript support with proper typing

---

## Example Component Usage

```typescript
import { useGetHabitsQuery, useCompleteHabitMutation } from '../features/habits/habitsApi';

export function HabitsList() {
  const { data: habits, isLoading } = useGetHabitsQuery();
  const [completeHabit] = useCompleteHabitMutation();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {habits?.map(habit => (
        <div key={habit.id}>
          <h3>{habit.title}</h3>
          <p>XP: {habit.xp_reward}</p>
          <button onClick={() => completeHabit(habit.id)}>
            Complete
          </button>
        </div>
      ))}
    </div>
  );
}
```

---

## Environment Variables

Configure the following environment variable in your `.env` file:

```
VITE_BACKEND_URL=http://localhost:8000
```

This sets the base URL for all API requests.

---

**Last Updated:** November 25, 2025
**API Version:** 1.0
