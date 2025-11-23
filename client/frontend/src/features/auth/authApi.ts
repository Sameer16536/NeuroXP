import { baseApi } from '../../api/baseApi';
import { LoginResponse, SignupResponse, User } from  "../../types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, any>({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation<SignupResponse, any>({
      query: (userData) => ({
        url: '/users/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    getMe: builder.query<User, void>({
      query: () => '/users/me', // Assuming an endpoint to get current user details exists
      providesTags: ['User'],
    })
  }),
});

export const { useLoginMutation, useSignupMutation, useGetMeQuery } = authApi;