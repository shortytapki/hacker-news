import { createSlice } from '@reduxjs/toolkit';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
  },
  reducers: {
    loadPosts: (state, action) => {},
  },
});

export const updateReducer = postsSlice.reducer;
export const postsActions = postsSlice.actions;
