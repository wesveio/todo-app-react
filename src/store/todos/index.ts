import { Reducer } from "redux";
import { TodosState, TodosTypes } from "./types";

const INIT_STATE: TodosState = {
  data: {
    status: "",
    todos: {},
    error: ""
  },
  error: false,
  loading: false
};

const reducer: Reducer<TodosState> = (state = INIT_STATE, action) => {
  switch (action.type) {
    case TodosTypes.ALTER_TODO:
    case TodosTypes.CREATE_TODO:
    case TodosTypes.DELETE_TODO:
      return { ...state, loading: true };
    case TodosTypes.LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: {
          ...state.data,
          ...action.payload
        }
      };
    case TodosTypes.LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        data: {
          ...state.data
        }
      };
    default:
      return state;
  }
};

export default reducer;
