import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../../store";
import { bindActionCreators, Dispatch } from "redux";
import * as TodosActions from "../../../store/todos/actions";

interface StateProps {
  loading: boolean;
  error: boolean;
}

interface DispatchProps {
  alterTodo: (data: any) => any;
}

interface OwnProps {
  showModal: boolean;
  cancelClick(e?: any): any;
  isEdit?: boolean;
  todo?: any;
}

interface OwnState {
  text: string;
  urgency: number;
}

type Props = StateProps & DispatchProps & OwnProps;

class Todo extends Component<Props, OwnState> {
  constructor(props: any) {
    super(props);
    this.state = {
      text: "",
      urgency: 0
    };
  }

  static getDerivedStateFromProps(props: any, state: any) {
    return {
      text: !state.text ? props.todo.text : state.text,
      urgency: !state.urgency ? props.todo.urgency : state.urgency
    };
  }

  componentDidMount() {}

  handleTitleChange = (e: any) => {
    this.setState({ text: e.target.value });
  };

  handleUrgencyChange = (e: any) => {
    this.setState({ urgency: parseInt(e.target.value) });
  };

  handleSubmit(e: any) {
    e.preventDefault();
    let data = {
      ...this.props.todo,
      text: this.state.text,
      urgency: this.state.urgency
    };
    this.props.alterTodo({ ...data });
  }

  clearForm() {
    this.setState({ text: "" });
    this.setState({ urgency: 0 });
  }

  render() {
    const props = this.props;
    const state = this.state;

    const isValid = state.text && state.text.length > 2 && state.urgency;

    return (
      <Fragment>
        <div
          className={"add-todo__modal " + (props.showModal ? "show" : "hide")}
        >
          <div className="ui active dimmer">
            <div className="add-todo__wrapper">
              <form
                className="add-todo__form"
                onSubmit={e => {
                  this.handleSubmit(e);
                }}
              >
                <input
                  onChange={e => this.handleTitleChange(e)}
                  value={state.text || ""}
                  className="todo__form-input"
                  type="text"
                  name="text"
                  placeholder="What I need to do?"
                />
                <label className="todo__form-label">Level of urgency:</label>
                <ul className="todo__form-urgency">
                  <li className="urgency__1">
                    <input
                      id="urgency-1"
                      value="1"
                      type="radio"
                      name={"urgency_" + props.todo.id}
                      checked={state.urgency === 1}
                      onChange={e => this.handleUrgencyChange(e)}
                    />
                    <label htmlFor="urgency-1">Lowest</label>
                  </li>
                  <li className="urgency__2">
                    <input
                      id="urgency-2"
                      value="2"
                      type="radio"
                      name={"urgency_" + props.todo.id}
                      checked={state.urgency === 2}
                      onChange={e => this.handleUrgencyChange(e)}
                    />
                    <label htmlFor="urgency-2">Low</label>
                  </li>
                  <li className="urgency__3">
                    <input
                      id="urgency-3"
                      value="3"
                      type="radio"
                      name={"urgency_" + props.todo.id}
                      checked={state.urgency === 3}
                      onChange={e => this.handleUrgencyChange(e)}
                    />
                    <label htmlFor="urgency-3">Medium</label>
                  </li>
                  <li className="urgency__4">
                    <input
                      id="urgency-4"
                      value="4"
                      type="radio"
                      name={"urgency_" + props.todo.id}
                      checked={state.urgency === 4}
                      onChange={e => this.handleUrgencyChange(e)}
                    />
                    <label htmlFor="urgency-4">High</label>
                  </li>
                  <li className="urgency__5">
                    <input
                      id="urgency-5"
                      value="5"
                      type="radio"
                      name={"urgency_" + props.todo.id}
                      checked={state.urgency === 5}
                      onChange={e => this.handleUrgencyChange(e)}
                    />
                    <label htmlFor="urgency-5">Highest</label>
                  </li>
                </ul>
                <div className="add-todo__actions">
                  <button
                    className="cancel__buton"
                    onClick={event => {
                      props.cancelClick(event);
                      this.clearForm();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className={
                      "add-todo__button " + (!isValid ? "disabled" : "")
                    }
                    disabled={!isValid}
                  >
                    {" "}
                    {props.loading ? <div className="ui loader" /> : "Save"}
                  </button>
                </div>
                <div
                  className={
                    "messages modal " + (props.error ? "show" : "hide")
                  }
                >
                  <div className="message error ">
                    opss...something went wrong, please try again!
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  loading: state.todos.loading,
  error: state.todos.error
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(TodosActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);
