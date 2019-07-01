import { createStore, applyMiddleware, Store, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { SessionState } from "./session/types";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

export interface ApplicationState {
  session: SessionState;
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store: Store<ApplicationState> = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
