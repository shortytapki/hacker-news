import { createSlice } from '@reduxjs/toolkit';

const initialState = { posts: [], rootComments: [], replies: [] };

const viewsSlice = createSlice({
  name: 'views',
  initialState,
  reducers: {
    putNewPosts(state, action) {
      state.posts = action.payload;
    },
    putNewComments(state, action) {
      state.rootComments = action.payload;
    },
    putNewReplies(state, action) {
      state.replies.push(action.payload);
    },
  },
});

export const postActions = viewsSlice.actions;
export default viewsSlice.reducer;
