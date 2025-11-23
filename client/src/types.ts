export interface User {
  id: string;
  email: string;
  username: string;
  level: number;
  current_xp: number;
  xp_to_next_level: number;
  streak_days: number;
}

export enum HabitFrequency {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
}

export enum HabitPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export interface Habit {
  id: string;
  title: string;
  description?: string;
  frequency: HabitFrequency;
  priority: HabitPriority;
  xp_reward: number;
  is_completed_today: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
  xp_reward: number;
  is_completed: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface SignupResponse {
  user: User;
  access_token: string;
}