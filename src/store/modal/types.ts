export enum ModalTypes {
  MODAL_SHOW = "@modal/MODAL_SHOW",
  MODAL_HIDE = "@modal/MODAL_HIDE",
  MODAL_EDIT = "@modal/MODAL_EDIT",
  MODAL_TODO = "@modal/MODAL_TODO"
}

export interface ModalState {
  loading: boolean;
  error: boolean;
  showModal: boolean;
  selectedTodo?: any;
  isEdit?: boolean;
}
