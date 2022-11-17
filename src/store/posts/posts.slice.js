import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  comments: [],
  loadRepliesFor: [],
  replies: [],
};

const viewsSlice = createSlice({
  name: 'views',
  initialState,
  reducers: {
    putNewPosts(state, action) {
      state.posts = action.payload;
    },
    putRootComments(state, action) {
      if (action.payload.at(0) !== null) {
        state.comments = action.payload;
      }
    },
    putReply(state, action) {
      if (action.payload.commentData !== null)
        state.replies.push(action.payload);
    },
    loadReply(state, action) {
      if (!state.loadRepliesFor.includes(action.payload))
        state.loadRepliesFor.push(action.payload);
    },
  },
});

export const postActions = viewsSlice.actions;
export default viewsSlice.reducer;
