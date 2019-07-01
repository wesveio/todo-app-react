import { Reducer } from "redux";
import { ModalState, ModalTypes } from "./types";

const INIT_STATE: ModalState = {
  error: false,
  loading: false,
  showModal: false,
  selectedTodo: {},
  isEdit: false
};

const reducer: Reducer<ModalState> = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ModalTypes.MODAL_SHOW:
      return { ...state, showModal: true };
    case ModalTypes.MODAL_HIDE:
      return {
        ...state,
        error: false,
        loading: false,
        showModal: false,
        selectedTodo: {},
        isEdit: false
      };
    case ModalTypes.MODAL_EDIT:
      return { ...state, showModal: true, isEdit: true };
    case ModalTypes.MODAL_TODO:
      return {
        ...state,
        selectedTodo: {
          ...state.selectedTodo,
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export default reducer;
