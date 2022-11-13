import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
  reducerPath: 'api/latest',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://st-news-api.herokuapp.com',
    mode: 'cors',
  }),
  endpoints: (build) => ({
    getLatestPosts: build.query({
      query: () => 'api/latest',
    }),
  }),
});

export const { useGetPostQuery, useGetLatestPostsQuery } = postsApi;
