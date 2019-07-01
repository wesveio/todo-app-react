import React, { Component } from "react";
import "./assets/styles/index.scss";
import Today from "./components/Today/Today";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="ui container">
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
        </div>
      </div>
    );
  }
}

export default App;
