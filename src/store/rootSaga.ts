import { all, takeLatest } from "redux-saga/effects";

import { SessionTypes } from "./session/types";
import * as sessionSaga from "./session/sagas";

export default function* rootSaga() {
  return yield all([
    /* Session */
    takeLatest(SessionTypes.INIT_SESSION, sessionSaga.initSession),
    takeLatest(SessionTypes.ALTER_SESSION, sessionSaga.alterSession),
    takeLatest(SessionTypes.DELETE_SESSION, sessionSaga.deleteSession)
  ]);
}
