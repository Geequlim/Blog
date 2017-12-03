import { combineReducers, Reducer } from 'redux';
import todos from './todos';
import user from './user';
import posts from "./posts";

export interface RootState {
  todos: Todos.TodoStoreState;
  user: Community.User;
  posts: Community.Post;
}

export default combineReducers<RootState>({
  todos,
  user,
  posts
});
