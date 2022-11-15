import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
  reducerPath: 'api/latest',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://st-news-api-production.up.railway.app/',
    mode: 'cors',
  }),
  endpoints: (build) => ({
    getLatestPosts: build.query({
      query: () => '/api/latest',
    }),
    getKids: build.query({
      query: (root) => `/api/kids/${root}`,
    }),
  }),
});

export const { useGetLatestPostsQuery, useGetKidsQuery } = postsApi;
