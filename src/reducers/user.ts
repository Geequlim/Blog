import {createAction, handleActions} from 'redux-actions';

/** 动作 */
export namespace Actions {

  export const SIGNUP = 'SIGNUP';
  export const SIGNIN = 'SIGNIN';
  export const SIGNOUT = 'LOGOUT';

  export const signup = createAction < Community.User > (SIGNUP);
  export const signin = createAction < Community.User > (SIGNIN);
  export const signout = createAction(SIGNOUT);
}

/** 初始状态 */
const initialState : Community.UserStoreState = null;

/** reducer */
export default handleActions < Community.UserStoreState, Community.User > ({
  [Actions.SIGNUP] : (state, action) => {
    return {...action.payload};
  },
  [Actions.SIGNIN] : (state, action) => {
    return { ...action.payload };
  },
  [Actions.SIGNOUT] : (state, action) => {
    return initialState;
  },
}, initialState);
