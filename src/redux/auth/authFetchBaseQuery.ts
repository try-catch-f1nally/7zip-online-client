import {BaseQueryFn, FetchArgs, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {AuthResponse} from './types';
import {RootState} from '../store';
import {setAuth} from './slice';
import {FetchBaseQueryArgs} from '@reduxjs/toolkit/dist/query/fetchBaseQuery';

type AuthFetchBaseQueryType = (
  options: FetchBaseQueryArgs
) => BaseQueryFn<string | FetchArgs, unknown, unknown>;

export const authFetchBaseQuery: AuthFetchBaseQueryType = (options) => {
  const baseQuery = fetchBaseQuery({
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
    ...options
  }) as BaseQueryFn<string | FetchArgs, unknown, {status: number; data: {message: string}}>;

  return async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
      const baseQueryWithCredentials = fetchBaseQuery({credentials: 'include'});
      const response = await baseQueryWithCredentials(
        {
          url: `${process.env.REACT_APP_SERVER_API_URL}/auth/refresh`,
          method: 'POST'
        },
        api,
        extraOptions
      );
      if (response.data) {
        api.dispatch(setAuth(response.data as AuthResponse));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(setAuth(null));
      }
    }
    return result;
  };
};
