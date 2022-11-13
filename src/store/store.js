import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { postsApi } from './posts/posts.api';
import { updateReducer } from './posts/posts.slice';

const rootReducer = combineReducers({
  [postsApi.reducerPath]: postsApi.reducer,
  update: updateReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});
