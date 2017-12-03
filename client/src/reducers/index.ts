import { combineReducers, Reducer } from 'redux';
import user from './user';
import posts from "./posts";

export interface RootState {
  user: Community.User;
  posts: Community.Post;
}

export default combineReducers<RootState>({
  user,
  posts
});
