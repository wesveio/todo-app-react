import { Reducer } from "redux";
import { SessionTypes, SessionState } from "./types";

const INIT_STATE: SessionState = {
  data: {
    status: "",
    sessionId: "",
    errorRate: 0
  },
  error: false,
  loading: true
};

const reducer: Reducer<SessionState> = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SessionTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case SessionTypes.LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: {
          ...state.data,
          ...action.payload
        }
      };
    case SessionTypes.LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
        //data: [] //if failed stay with older data
      };
    case SessionTypes.DELETE_SESSION:
      return { ...state, ...INIT_STATE };
    default:
      return state;
  }
};

export default reducer;
