import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { postsApi } from './posts/posts.api';
import viewReducer from './posts/posts.slice';

const rootReducer = combineReducers({
  [postsApi.reducerPath]: postsApi.reducer,
  views: viewReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});
