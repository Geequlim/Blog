import { combineReducers, Reducer } from 'redux';
import user from './user';
import posts from "./posts";

export interface RootState {
    post : Community.Post;
    user: Community.User[];
    posts : Community.Post[];
    fragments: Community.Fragment[];
}

export default combineReducers<RootState>({
    user,
    posts
});
