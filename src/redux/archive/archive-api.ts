import {createApi, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react';
import {ArchivingProgress} from './types';
import {authFetchBaseQuery} from '../auth/authFetchBaseQuery';

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const baseUrl = `${process.env.REACT_APP_SERVER_API_URL}/archives`;

export const archiveApi = createApi({
  reducerPath: 'api/archives',
  baseQuery: authFetchBaseQuery({baseUrl, credentials: 'include'}) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    {data: {message: string}}
  >,
  endpoints: (builder) => ({
    create: builder.mutation<void, FormData>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body
      })
    }),
    getProgress: builder.query<ArchivingProgress, void>({
      query: () => ({
        url: 'progress'
      })
    })
  })
});

export const {useCreateMutation, useGetProgressQuery} = archiveApi;
export default archiveApi.reducer;
