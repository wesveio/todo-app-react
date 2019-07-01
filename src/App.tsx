import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { ApplicationState } from "./store";
import "./assets/styles/index.scss";
import Today from "./components/Today/Today";
import SessionComponent from "./components/Session/Session";
import Todos from "./components/Todos/Todos";
import TodoModal from "./components/Todos/components/TodoModal";
import * as ModalActions from "./store/modal/actions";

interface StateProps {
  loading: boolean;
  errorSession: boolean;
  errorTodos: boolean;
  modal: any;
}

interface DispatchProps {
  modalShow: () => void;
  modalHide: () => void;
  modalTodo: (payload: any) => void;
}

interface OwnProps {}

interface OwnState {
  showSidebar: boolean;
  search: {
    value: any;
  };
}

type Props = StateProps & DispatchProps & OwnProps;

class App extends Component<Props, OwnState> {
  state = {
    showSidebar: false,
    search: {
      value: ""
    }
  };

  toggleSidebar = () => {
    this.setState({ showSidebar: !this.state.showSidebar });
  };

  handleAddTodo = (e: any) => {
    e.preventDefault();
    const props = this.props;
    props.modal.showModal ? props.modalHide() : props.modalShow();
  };

  handleSearchChange = (e: any) => {
    this.setState({
      search: {
        ...this.state.search,
        value: e.target.value
      }
    });
  };

  render() {
    const props = this.props;
    const state = this.state;
    let { loading } = props;

    return (
      <div className={"App " + (state.showSidebar ? "blur" : "")}>
        <SessionComponent
          showSidebar={state.showSidebar}
          toggleSidebar={this.toggleSidebar}
        />
        <div className="ui container">
          <div className="menu" onClick={() => this.toggleSidebar()}>
            <i className="bars icon" />
          </div>
          {loading ? (
            <div className="ui active dimmer">
              <div className="ui loader" />
            </div>
          ) : (
            <Fragment>
              <div className="row">
                <div className="logo">
                  {
                    <img
                      src={require("./assets/logo-todo.png")}
                      alt="Things to do in BRNO"
                    />
                  }
                </div>
              </div>

              <div className="row">
                <form className="search__form">
                  <div className="field">
                    <input
                      type="text"
                      name="search"
                      placeholder="Search Todo"
                      onChange={e => this.handleSearchChange(e)}
                    />
                  </div>
                </form>
              </div>

              <div className="row">
                <Today />
              </div>

              <div className="row">
                <div className="title">TODO</div>
                <Todos search={this.state.search.value} />
              </div>

              <div className="row">
                {!props.errorSession ? (
                  <button
                    className="button__add"
                    onClick={event => {
                      this.handleAddTodo(event);
                    }}
                  >
                    <i className="plus icon" />
                    Add new Todo
                  </button>
                ) : null}
              </div>
            </Fragment>
          )}
        </div>
        <TodoModal />
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  loading: state.session.loading,
  errorSession: state.session.error,
  errorTodos: state.todos.error,
  modal: state.modal
});
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ModalActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
