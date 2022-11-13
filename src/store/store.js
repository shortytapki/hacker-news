import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { useDispatch } from 'react-redux';
import { postsApi } from './posts/posts.api';
import { updateReducer } from './posts/posts.slice';
// import postsReducer from './reducers/UseSlice';

const rootReducer = combineReducers({
  [postsApi.reducerPath]: postsApi.reducer,
  update: updateReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});
