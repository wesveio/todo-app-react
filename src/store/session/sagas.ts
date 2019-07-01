import { call, put, select } from "redux-saga/effects";
import api from "../../service/api";
import { loadSuccess, loadFailure } from "./actions";
import { getTodos } from "../todos/actions";

const sessionId = (state: any) => state.session.data.sessionId;

export function* initSession(payload?: any) {
  let errorRate = {
    errorRate: payload ? payload.payload : 1
  };
  try {
    const { data } = yield call(api.post, "/session", errorRate);
    yield put(loadSuccess(data));
    yield put(getTodos());
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* alterSession(payload: any) {
  const currentSessionId = yield select(sessionId);
  let headers = {
    headers: {
      sessionId: currentSessionId
    }
  };

  let errorRate = {
    errorRate: payload.payload
  };

  try {
    const { data } = yield call(
      api.patch,
      "/session",
      { ...errorRate },
      headers
    );
    yield put(loadSuccess(data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* deleteSession() {
  const currentSessionId = yield select(sessionId);
  let headers = {
    headers: {
      sessionId: currentSessionId
    }
  };

  try {
    const { data } = yield call(api.delete, "/session", headers);
    yield put(loadSuccess(data));
  } catch (error) {
    yield put(loadFailure());
  }
}
