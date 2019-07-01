import { all, takeLatest, takeEvery } from "redux-saga/effects";

import { SessionTypes } from "./session/types";
import * as sessionSaga from "./session/sagas";
import { TodosTypes } from "./todos/types";
import * as todosSaga from "./todos/sagas";

export default function* rootSaga() {
  return yield all([
    /* Session */
    takeLatest(SessionTypes.INIT_SESSION, sessionSaga.initSession),
    takeLatest(SessionTypes.ALTER_SESSION, sessionSaga.alterSession),
    takeLatest(SessionTypes.DELETE_SESSION, sessionSaga.deleteSession),

    /* Todos */
    takeLatest(TodosTypes.GET_TODOS, todosSaga.getTodos),
    takeLatest(TodosTypes.CREATE_TODO, todosSaga.createTodo),
    takeLatest(TodosTypes.ALTER_TODO, todosSaga.alterTodo),
    takeEvery(TodosTypes.DELETE_TODO, todosSaga.deleteTodo)
  ]);
}
