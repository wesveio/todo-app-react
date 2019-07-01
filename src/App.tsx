import React, { Component } from "react";
import { connect } from "react-redux";
import "./assets/styles/index.scss";
import Today from "./components/Today/Today";
import SessionComponent from "./components/Session/Session";

interface StateProps {}

interface DispatchProps {}

interface OwnProps {}

interface OwnState {
  showSidebar: boolean;
}

type Props = StateProps & DispatchProps & OwnProps;

class App extends Component<Props, OwnState> {
  state = {
    showSidebar: false
  };

  toggleSidebar = () => {
    this.setState({ showSidebar: !this.state.showSidebar });
  };

  render() {
    const state = this.state;

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
                <input type="text" name="search" placeholder="Search Todo" />
              </div>
            </form>
          </div>

          <div className="row">
            <Today />
          </div>

          <div className="row">
            <div className="title">TODO</div>
            <div className="todos">
              <div className="todo ui accordion three column padded grid middle aligned">
                <div className="column one wide todo__level urgency__1">
                  <i className="circle icon" />
                </div>
                <div className="column eleven wide todo__name">Todo title</div>
                <div className="column four wide todo__actions">
                  <button className="edit__button">
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
                  <button className="delete__button">
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
                    <input id="1" name="todo" type="checkbox" />
                    <label htmlFor="1" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <button className="button__add">
              <i className="plus icon" />
              Add new Todo
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(App);
