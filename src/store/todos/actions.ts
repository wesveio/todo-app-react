import { action } from "typesafe-actions";
import { TodosTypes, iTodos } from "./types";

interface payload {
  payload: {};
}

export const getTodos = () => action(TodosTypes.GET_TODOS);

export const createTodo = (payload: payload) =>
  action(TodosTypes.CREATE_TODO, payload);

export const alterTodo = (payload: payload) =>
  action(TodosTypes.ALTER_TODO, payload);

export const deleteTodo = (payload: payload) =>
  action(TodosTypes.DELETE_TODO, payload);

export const loadSuccess = (data: iTodos[]) =>
  action(TodosTypes.LOAD_SUCCESS, data);

export const loadFailure = () => action(TodosTypes.LOAD_FAILURE);
