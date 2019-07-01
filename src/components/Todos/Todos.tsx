import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { iTodos } from "../../store/todos/types";
import { ApplicationState } from "../../store";
import * as TodosActions from "../../store/todos/actions";
import * as ModalActions from "../../store/modal/actions";
import Todo from "./components/Todo";

interface StateProps {
  data: iTodos;
  loading: boolean;
  error: boolean;
  modal: any;
}

interface DispatchProps {
  getTodos: () => void;
  modalShow: () => void;
  modalHide: () => void;
  modalEdit: () => void;
  modalTodo: (payload: any) => void;
}

interface OwnProps {
  search: string;
}

interface OwnState {
  showEditModal: boolean;
  selectedTodo: any;
  isEdit: boolean;
}

type Props = StateProps & DispatchProps & OwnProps;

class Todos extends Component<Props, OwnState> {
  state = {
    showEditModal: false,
    isEdit: false,
    selectedTodo: {}
  };

  componentDidMount() {
    // this.props.getTodos();
  }

  handleEditModal = (selectedTodo: any) => {
    const props = this.props;
    props.modalTodo(selectedTodo);
    props.modal.isEdit ? props.modalHide() : props.modalEdit();
  };

  render() {
    const { data }: any = this.props;

    const isTodosEmpty =
      Object.entries(data.todos).length === 0 &&
      data.todos.constructor === Object;

    let todos: any;

    if (!isTodosEmpty) {
      todos = Object.keys(data.todos)
        .filter(
          key =>
            data.todos[key].text
              .toLowerCase()
              .indexOf(this.props.search.toLowerCase()) !== -1
        )
        .reduce((obj: any, key: string) => {
          obj[key] = data.todos[key];
          return obj;
        }, {});
    }

    return (
      <div className="todos">
        {!isTodosEmpty ? (
          Object.keys(todos).map((todo: any) => (
            <Todo
              key={todos[todo].id}
              todo={todos[todo]}
              editTodo={this.handleEditModal}
            />
          ))
        ) : (
          <p className="todos__no-data">There is no Todos to show!</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  data: state.todos.data,
  loading: state.todos.loading,
  error: state.todos.error,
  modal: state.modal
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ ...TodosActions, ...ModalActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);
