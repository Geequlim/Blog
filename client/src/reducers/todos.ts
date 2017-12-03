import { createAction, handleActions} from 'redux-actions';

/** 动作 */
export namespace Actions {

  export const ADD_TODO        = 'ADD_TODO';
  export const EDIT_TODO       = 'EDIT_TODO';
  export const DELETE_TODO     = 'DELETE_TODO';
  export const COMPLETE_TODO   = 'COMPLETE_TODO';
  export const COMPLETE_ALL    = 'COMPLETE_ALL';
  export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';

  export const addTodo         = createAction<Todos.TodoItemData>(ADD_TODO);
  export const editTodo        = createAction<Todos.TodoItemData>(EDIT_TODO);
  export const deleteTodo      = createAction<Todos.TodoItemId>(DELETE_TODO);
  export const completeTodo    = createAction<Todos.TodoItemId>(COMPLETE_TODO);
  export const completeAll     = createAction(COMPLETE_ALL);
  export const clearCompleted  = createAction(CLEAR_COMPLETED);

}

/** 筛选器 */
export namespace Filters {
  export const SHOW_ALL:       Todos.TodoFilterType = 'SHOW_ALL';
  export const SHOW_ACTIVE:    Todos.TodoFilterType = 'SHOW_ACTIVE';
  export const SHOW_COMPLETED: Todos.TodoFilterType = 'SHOW_COMPLETED';
  export const FILTER_TYPES                         = [SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED];
}

/** 初始状态 */
const initialState: Todos.TodoStoreState = [{
  id: 0,
  text: 'Use Redux',
  completed: false
}];


/** reducer */
export default handleActions<Todos.TodoStoreState, Todos.TodoItemData>({
  [Actions.ADD_TODO]: (state, action) => {
    return [{
      id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      completed: false,
      ...action.payload,
    }, ...state];
  },

  [Actions.DELETE_TODO]: (state, action) => {
    return state.filter(todo => todo.id !== action.payload);
  },

  [Actions.EDIT_TODO]: (state, action) => {
    return state.map(todo => {
      return todo.id === action.payload.id
        ? { ...todo, text: action.payload.text }
        : todo;
    });
  },

  [Actions.COMPLETE_TODO]: (state, action) => {
    return state.map(todo => {
      return todo.id === action.payload
        ? { ...todo, completed: !todo.completed }
        : todo;
    });
  },

  [Actions.COMPLETE_ALL]: (state, action) => {
    const areAllMarked = state.every(todo => todo.completed);
    return state.map(todo => {
      return {
        ...todo,
        completed: !areAllMarked
      };
    });
  },

  [Actions.CLEAR_COMPLETED]: (state, action) => {
    return state.filter(todo => todo.completed === false);
  }
}, initialState);
