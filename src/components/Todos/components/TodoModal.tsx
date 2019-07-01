import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../../store";
import { bindActionCreators, Dispatch } from "redux";
import * as TodosActions from "../../../store/todos/actions";
import * as ModalActions from "../../../store/modal/actions";

interface StateProps {
  loading: boolean;
  error: boolean;
  modal: any;
}

interface DispatchProps {
  alterTodo: (data: any) => any;
  createTodo: (data: any) => any;
  modalHide: () => any;
}

interface OwnProps {
  todo?: any;
}

interface OwnState {
  text: string;
  urgency: number;
}

type Props = StateProps & DispatchProps & OwnProps;

class TodoModal extends Component<Props, OwnState> {
  state = {
    text: "",
    urgency: 0
  };

  shouldComponentUpdate(nextProps: any, nextState: any) {
    const prevProps = this.props;

    if (!prevProps.modal.isEdit && nextProps.modal.isEdit) {
      this.setState({
        text: nextProps.modal.selectedTodo.text,
        urgency: nextProps.modal.selectedTodo.urgency
      });
    }
    return true;
  }

  handleTitleChange = (e: any) => {
    this.setState({ text: e.target.value });
  };

  handleUrgencyChange = (e: any) => {
    this.setState({ urgency: parseInt(e.target.value) });
  };

  handleSubmit(e: any) {
    e.preventDefault();
    if (this.props.modal.isEdit) {
      let data = {
        ...this.props.modal.selectedTodo,
        text: this.state.text,
        urgency: this.state.urgency
      };
      this.props.alterTodo({ ...data });
    } else {
      let data = {
        text: this.state.text,
        urgency: this.state.urgency,
        isCompleted: false
      };
      this.props.createTodo({ ...data });
    }
  }

  clearForm(e: any) {
    this.setState({
      text: "",
      urgency: 0
    });
  }

  render() {
    const props = this.props;
    const { modal } = props;
    const state = this.state;

    const isValid = state.text && state.text.length > 2 && state.urgency;

    return (
      <Fragment>
        <div
          className={"add-todo__modal " + (modal.showModal ? "show" : "hide")}
        >
          <div className="ui active dimmer">
            <div className="add-todo__wrapper">
              <form className="add-todo__form" id="modal_todo">
                <input
                  onChange={e => this.handleTitleChange(e)}
                  value={state.text || props.modal.selectedTodo.text || ""}
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
                      name={"urgency"}
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
                      name={"urgency"}
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
                      name={"urgency"}
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
                      name={"urgency"}
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
                      name={"urgency"}
                      checked={state.urgency === 5}
                      onChange={e => this.handleUrgencyChange(e)}
                    />
                    <label htmlFor="urgency-5">Highest</label>
                  </li>
                </ul>
                <div className="add-todo__actions">
                  <button
                    className="cancel__buton"
                    onClick={e => {
                      e.preventDefault();
                      props.modalHide();
                      this.clearForm(e);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className={
                      "add-todo__button " + (!isValid ? "disabled" : "")
                    }
                    disabled={!isValid}
                    onClick={e => {
                      this.handleSubmit(e);
                    }}
                  >
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
  error: state.todos.error,
  modal: state.modal
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ ...TodosActions, ...ModalActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoModal);
