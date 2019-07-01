import { call, put, select } from "redux-saga/effects";
import api from "../../service/api";
import { loadSuccess, loadFailure } from "./actions";

interface payload {
  payload: any;
}

const sessionId = (state: any) => state.session.data.sessionId;
const stateTodos = (state: any) => state.todos.data.todos;

export function* getTodos() {
  const currentSessionId = yield select(sessionId);
  let headers = {
    headers: {
      sessionId: currentSessionId
    }
  };
  try {
    const { data } = yield call(api.get, "/todos", headers);
    yield put(loadSuccess(data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* createTodo(payload: any) {
  const currentSessionId = yield select(sessionId);
  const todo = payload.payload;
  const todos = yield select(stateTodos);
  let headers = {
    headers: {
      sessionId: currentSessionId
    }
  };
  try {
    const { data } = yield call(api.post, "/todos", todo, headers);

    let createdTodo: any = {
      status: data.status,
      todos: {
        ...todos,
        [data.todo.id]: data.todo
      }
    };

    yield put(loadSuccess(createdTodo));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* alterTodo(payload: any) {
  const currentSessionId = yield select(sessionId);
  const todo = payload.payload;
  const todos = yield select(stateTodos);
  let headers = {
    headers: {
      sessionId: currentSessionId
    }
  };
  try {
    const { data } = yield call(api.patch, `/todos/${todo.id}`, todo, headers);
    let alteredTodos: any = {
      status: data.status,
      todos: {
        ...todos,
        [data.todo.id]: data.todo
      }
    };
    yield put(loadSuccess(alteredTodos));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* deleteTodo(payload: any) {
  const todoID = payload.payload;
  const currentSessionId = yield select(sessionId);
  let headers = {
    headers: {
      sessionId: currentSessionId
    }
  };
  try {
    const { data } = yield call(api.delete, `/todos/${todoID}`, headers);
    yield put(loadSuccess(data));
  } catch (error) {
    yield put(loadFailure());
  }
}
