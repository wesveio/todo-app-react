export enum TodosTypes {
  // LOAD_REQUEST = '@todos/LOAD_REQUEST',
  GET_TODOS = "@todos/GET_TODOS",
  CREATE_TODO = "@todos/CREATE_TODO",
  ALTER_TODO = "@todos/ALTER_TODO",
  DELETE_TODO = "@todos/DELETE_TODO",
  LOAD_SUCCESS = "@todos/LOAD_SUCCESS",
  LOAD_FAILURE = "@todos/LOAD_FAILURE"
}

export interface iTodos {
  status: string;
  todos: any /* object */;
  error: string;
}

export interface TodosState {
  data: iTodos;
  loading: boolean;
  error: boolean;
}
