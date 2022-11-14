import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
  reducerPath: 'api/latest',
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://st-news-api-production.up.railway.app/',
    mode: 'cors',
  }),
  endpoints: (build) => ({
    getLatestPosts: build.query({
      query: () => '/api/latest',
    }),

    getComments: build.query({
      query: (id) => `/api/root/${id}`,
    }),
    getReplies: build.query({
      query: (id) => `/api/kids/${id}`,
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useGetLatestPostsQuery,
  useGetRepliesQuery,
} = postsApi;
