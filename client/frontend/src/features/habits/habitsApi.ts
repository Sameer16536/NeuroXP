import { baseApi } from '../../api/baseApi';
import { Habit } from '../../types';

export const habitsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHabits: builder.query<Habit[], void>({
      query: () => '/habits/',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Habits' as const, id })),
              { type: 'Habits', id: 'LIST' },
            ]
          : [{ type: 'Habits', id: 'LIST' }],
    }),
    createHabit: builder.mutation<Habit, Partial<Habit>>({
      query: (body) => ({
        url: '/habits/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Habits', id: 'LIST' }],
    }),
    completeHabit: builder.mutation<{ success: boolean; xp_gained: number }, string>({
      query: (id) => ({
        url: `/habits/${id}/complete`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Habits', id },
        'User' // Completing a habit changes User XP
      ],
    }),
  }),
});

export const { useGetHabitsQuery, useCreateHabitMutation, useCompleteHabitMutation } = habitsApi;