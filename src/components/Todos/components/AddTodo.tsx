import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../../store";
import { bindActionCreators, Dispatch } from "redux";
import * as TodosActions from "../../../store/todos/actions";

interface StateProps {
  loading: boolean;
}

interface DispatchProps {
  createTodo: (data: any) => void;
}

interface OwnProps {
  showModal: boolean;
  cancelClick(e: any): any;
}

interface OwnState {
  text: string;
  urgency: number;
}

type Props = StateProps & DispatchProps & OwnProps;

class Todo extends Component<Props, OwnState> {
  state = {
    text: "",
    urgency: 0
  };

  componentDidMount() {}

  handleTitleChange = (e: any) => {
    this.setState({ text: e.target.value });
  };

  handleAddUrgencyChange = (e: any) => {
    this.setState({ urgency: parseInt(e.target.value) });
  };

  handleSubmit(e: any) {
    e.preventDefault();
    let data = {
      text: this.state.text,
      urgency: this.state.urgency,
      isCompleted: false
    };
    this.props.createTodo({ ...data });
    this.clearForm();
  }

  clearForm() {
    this.setState({ text: "" });
    this.setState({ urgency: 0 });
  }

  render() {
    const props = this.props;
    const isValid = this.state.text.length > 2 && this.state.urgency;

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
                  value={this.state.text}
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
                      name="urgency"
                      checked={this.state.urgency === 1}
                      onChange={e => this.handleAddUrgencyChange(e)}
                    />
                    <label htmlFor="urgency-1">Lowest</label>
                  </li>
                  <li className="urgency__2">
                    <input
                      id="urgency-2"
                      value="2"
                      type="radio"
                      name="urgency"
                      checked={this.state.urgency === 2}
                      onChange={e => this.handleAddUrgencyChange(e)}
                    />
                    <label htmlFor="urgency-2">Low</label>
                  </li>
                  <li className="urgency__3">
                    <input
                      id="urgency-3"
                      value="3"
                      type="radio"
                      name="urgency"
                      checked={this.state.urgency === 3}
                      onChange={e => this.handleAddUrgencyChange(e)}
                    />
                    <label htmlFor="urgency-3">Medium</label>
                  </li>
                  <li className="urgency__4">
                    <input
                      id="urgency-4"
                      value="4"
                      type="radio"
                      name="urgency"
                      checked={this.state.urgency === 4}
                      onChange={e => this.handleAddUrgencyChange(e)}
                    />
                    <label htmlFor="urgency-4">High</label>
                  </li>
                  <li className="urgency__5">
                    <input
                      id="urgency-5"
                      value="5"
                      type="radio"
                      name="urgency"
                      checked={this.state.urgency === 5}
                      onChange={e => this.handleAddUrgencyChange(e)}
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
                    {props.loading ? <div className="ui loader" /> : "Add"}
                  </button>
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
  loading: state.todos.loading
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(TodosActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);
