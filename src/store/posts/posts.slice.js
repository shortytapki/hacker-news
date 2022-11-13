import { createSlice } from '@reduxjs/toolkit';

const initialState = [];
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    loadPosts: (state, action) => {},
  },
});

export const updateReducer = postsSlice.reducer;
export const postsActions = postsSlice.actions;
