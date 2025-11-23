import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '../../types';

// Initialize state from localStorage if available
const token = localStorage.getItem('neuroxp_token');
// Note: In a real app, we might verify the token validity or fetch user profile on boot
const initialState: AuthState = {
  user: null,
  token: token || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = user;
      state.token = token;
      localStorage.setItem('neuroxp_token', token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('neuroxp_token');
    },
    updateUserXP: (state, action: PayloadAction<Partial<User>>) => {
       if (state.user) {
         state.user = { ...state.user, ...action.payload };
       }
    }
  },
});

export const { setCredentials, logout, updateUserXP } = authSlice.actions;

export default authSlice.reducer;