import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { postActions } from '../store/posts/posts.slice';

const actions = { ...postActions };

export const usePostActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
