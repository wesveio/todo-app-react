import { action } from "typesafe-actions";
import { SessionTypes, iSession } from "./types";

export const loadRequest = () => action(SessionTypes.LOAD_REQUEST);

export const initSession = (payload?: number) =>
  action(SessionTypes.INIT_SESSION, payload);

export const alterSession = (payload: number) =>
  action(SessionTypes.ALTER_SESSION, payload);

export const deleteSession = () => action(SessionTypes.DELETE_SESSION);

export const loadSuccess = (data: iSession[]) =>
  action(SessionTypes.LOAD_SUCCESS, data);

export const loadFailure = () => action(SessionTypes.LOAD_FAILURE);
