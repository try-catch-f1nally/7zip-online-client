import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {AuthResponse, SignupBody, LoginBody} from './types';

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const baseUrl = `${process.env.REACT_APP_SERVER_API_URL}/auth`;

export const authApi = createApi({
  reducerPath: 'api/auth',
  baseQuery: fetchBaseQuery({baseUrl, credentials: 'include'}) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    {data: {message: string}}
  >,
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, SignupBody>({
      query: (body) => ({
        url: 'register',
        method: 'POST',
        body
      })
    }),
    login: builder.mutation<AuthResponse, LoginBody>({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body
      })
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'logout',
        method: 'POST'
      })
    })
  })
});

export const {useRegisterMutation, useLoginMutation, useLogoutMutation} = authApi;
export default authApi.reducer;
