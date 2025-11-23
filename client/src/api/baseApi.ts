import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../app/store';


// Base URL for FastAPI backend
const API_URL = import.meta.env.VITE_BACKEND_URL ;

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  tagTypes: ['Habits', 'User', 'Tasks'],
  endpoints: () => ({}),
});