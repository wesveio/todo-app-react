import React, { Component, Fragment } from "react";
import Moment from "react-moment";

export default class Today extends Component {
  render() {
    const date: any = new Date();
    return (
      <Fragment>
        <div className="today">
          <Moment format="MMMM, DD">{date}</Moment>
        </div>
      </Fragment>
    );
  }
}
