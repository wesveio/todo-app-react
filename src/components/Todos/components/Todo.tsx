import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import * as TodosActions from "../../../store/todos/actions";
interface StateProps {
  todo: [];
}

interface DispatchProps {
  alterTodo: (data: any) => void;
  deleteTodo: (data: any) => void;
}

interface OwnProps {
  editTodo: any;
}

type Props = StateProps & DispatchProps & OwnProps;

class Todo extends Component<Props> {
  componentDidMount() {}

  toggleComplete(todo: any) {
    let request = {
      ...this.props.todo,
      isCompleted: !todo.isCompleted
    };
    this.props.alterTodo(request);
  }

  deleteTodo(todoID: any) {
    this.props.deleteTodo(todoID);
  }

  render() {
    const todo: any = this.props.todo;

    let classCompleted = todo.isCompleted ? "completed" : "";
    return (
      <Fragment>
        <div
          className={
            "todo ui accordion three column padded grid middle aligned " +
            classCompleted
          }
        >
          <div
            className={
              "column one wide todo__level urgency__" + todo["urgency"]
            }
          >
            <i className="circle icon" />
          </div>
          <div className="column eleven wide todo__name">{todo["text"]}</div>
          <div className="column four wide todo__actions">
            <button
              className="edit__button"
              onClick={() => this.props.editTodo(todo)}
            >
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                <path d="M8.071 21.586l-7.071 1.414 1.414-7.071 14.929-14.929 5.657 5.657-14.929 14.929zm-.493-.921l-4.243-4.243-1.06 5.303 5.303-1.06zm9.765-18.251l-13.3 13.301 4.242 4.242 13.301-13.3-4.243-4.243z" />
              </svg>
            </button>
            <button
              className="delete__button"
              onClick={() => this.deleteTodo(todo.id)}
            >
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                <path d="M9 3h6v-1.75c0-.066-.026-.13-.073-.177-.047-.047-.111-.073-.177-.073h-5.5c-.066 0-.13.026-.177.073-.047.047-.073.111-.073.177v1.75zm11 1h-16v18c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-18zm-10 3.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm5 0c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm8-4.5v1h-2v18c0 1.105-.895 2-2 2h-14c-1.105 0-2-.895-2-2v-18h-2v-1h7v-2c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v2h7z" />
              </svg>
            </button>
            <div className="done__button">
              <input
                id={todo["id"]}
                name={todo["id"]}
                type="checkbox"
                // defaultChecked={todo.isCompleted}
                checked={todo.isCompleted || false}
                onChange={() => this.toggleComplete(todo)}
              />
              <label htmlFor={todo["id"]} />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(TodosActions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Todo);
