export enum SessionTypes {
  LOAD_REQUEST = "@session/LOAD_REQUEST",
  INIT_SESSION = "@session/INIT_SESSION",
  ALTER_SESSION = "@session/ALTER_SESSION",
  DELETE_SESSION = "@session/DELETE_SESSION",
  LOAD_SUCCESS = "@session/LOAD_SUCCESS",
  LOAD_FAILURE = "@session/LOAD_FAILURE"
}

export interface iSession {
  status: string;
  sessionId: string;
  errorRate: number;
  // error: string;
}

export interface SessionState {
  data: iSession;
  loading: boolean;
  error: boolean;
}
