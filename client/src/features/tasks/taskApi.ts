import { baseApi } from '../../api/baseApi';
import type{ Task } from '../../types';

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => '/tasks/',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Tasks' as const, id })),
              { type: 'Tasks', id: 'LIST' },
            ]
          : [{ type: 'Tasks', id: 'LIST' }],
    }),
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (body) => ({
        url: '/tasks/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
    completeTask: builder.mutation<{ success: boolean; xp_gained: number }, string>({
      query: (id) => ({
        url: `/tasks/${id}/complete`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Tasks', id },
        'User' // Completing a task changes User XP
      ],
    }),
    deleteTask: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
  }),
});

export const { 
  useGetTasksQuery, 
  useCreateTaskMutation, 
  useCompleteTaskMutation,
  useDeleteTaskMutation 
} = tasksApi;