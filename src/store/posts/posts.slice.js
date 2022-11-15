import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  rootComments: [],
  reply: [],
  loadReplies: false,
};

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
    putReply(state, action) {
      if (action.payload !== null) state.nestedBody = action.payload;
    },
    loadReplies(state, action) {
      state.loadReplies = action.payload;
    },
  },
});

export const postActions = viewsSlice.actions;
export default viewsSlice.reducer;
