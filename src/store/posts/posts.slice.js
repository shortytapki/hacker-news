import { createSlice } from '@reduxjs/toolkit';

const initialState = { posts: [], rootComments: [], nestedBody: [] };

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
    putBody(state, action) {
      if (action.payload.at(0) !== null && action.payload !== undefined)
        state.nestedBody = action.payload;
    },
  },
});

export const postActions = viewsSlice.actions;
export default viewsSlice.reducer;
