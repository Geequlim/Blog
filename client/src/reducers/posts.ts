import {createAction, handleActions} from 'redux-actions';

/** 动作 */
export namespace Actions {

  export const ADD_POST = 'ADD_POST';
  export const EDIT_POST = 'EDIT_POST';
  export const DELETE_POST = 'DELETE_POST';

  export const add_post = createAction < Community.Post > (ADD_POST);
  export const edit_post = createAction < Community.Post > (EDIT_POST);
  export const delete_post = createAction(DELETE_POST);

}

/** 初始状态 */
const initialState : Community.PostStoreState = [];

/** reducer */
export default handleActions < Community.PostStoreState, Community.Post > ({
  [Actions.ADD_POST] : (state, action) => {
    return [ { ...action.payload}, ...state ];
  },

  [Actions.EDIT_POST]: (state, action) => {
    return state.map(post => {
      return post.uid === action.payload.uid ? { ...post, ...(action.payload) } : post;
    });
  },

  [Actions.DELETE_POST]: (state, action) => {
    return state.filter(post => post.uid != action.payload.uid);
  }
}, initialState);
