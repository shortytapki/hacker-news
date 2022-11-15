import { createSlice } from '@reduxjs/toolkit';

const initialState = { posts: [], rootComments: [], toddlers: [] };

const viewsSlice = createSlice({
  name: 'views',
  initialState,
  reducers: {
    putNewPosts(state, action) {
      state.posts = action.payload;
    },
    putRootComments(state, action) {
      if (action.payload.at(0) !== null) state.rootComments = action.payload;
    },
    putToddlers(state, action) {
      state.toddlers = action.payload;
    },
  },
});

export const postActions = viewsSlice.actions;
export default viewsSlice.reducer;
