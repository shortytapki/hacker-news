import { createSlice } from '@reduxjs/toolkit';

const initialState = { posts: [] };

const viewsSlice = createSlice({
  name: 'views',
  initialState,
  reducers: {
    putNew(state, action) {
      state.posts = action.payload;
    },
  },
});

export const postActions = viewsSlice.actions;
export default viewsSlice.reducer;
