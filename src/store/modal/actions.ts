import { action } from "typesafe-actions";
import { ModalTypes } from "./types";

interface payload {
  payload: {};
}

export const modalShow = () => action(ModalTypes.MODAL_SHOW);

export const modalHide = () => action(ModalTypes.MODAL_HIDE);

export const modalEdit = () => action(ModalTypes.MODAL_EDIT);

export const modalTodo = (payload: payload) =>
  action(ModalTypes.MODAL_TODO, payload);
