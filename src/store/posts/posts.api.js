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
    getComment: build.query({
      query: (id) => `api/comment/${id}`,
    }),
    getKids: build.query({
      query: (root) => `/api/roots/${root}`,
    }),
  }),
});

export const { useGetLatestPostsQuery, useGetKidsQuery, useGetCommentQuery } =
  postsApi;
