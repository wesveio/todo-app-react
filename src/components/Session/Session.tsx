import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { iSession } from "../../store/session/types";
import { ApplicationState } from "../../store";
import * as SessionActions from "../../store/session/actions";

interface StateProps {
  session: iSession;
  loading: boolean;
}

interface DispatchProps {
  initSession: (payload?: number) => void;
  alterSession: (payload: number) => void;
  deleteSession: () => void;
}

interface OwnProps {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

interface OwnState {
  errorRate: number;
}

type Props = StateProps & DispatchProps & OwnProps;

class SessionComponent extends Component<Props, OwnState> {
  state = {
    errorRate: -1
  };

  shouldComponentUpdate(nextProps: any, nextState: any) {
    const prevProps = this.props;

    if (prevProps.session.errorRate !== nextProps.session.errorRate) {
      this.setState({
        errorRate: nextProps.session.errorRate
      });
    }
    return true;
  }

  componentDidMount() {
    this.props.initSession();
  }

  componentDidUpdate() {}

  newSession() {
    this.props.initSession(this.state.errorRate);
  }

  handleChangeErrorRate(e: any) {
    let val = parseInt(e.target.value);
    if (val < 0) {
      this.setState({ errorRate: 0 });
    } else if (val > 100) {
      this.setState({ errorRate: 100 });
    } else {
      this.setState({ errorRate: val });
    }
  }

  alterErrorRate(e: any) {
    e.preventDefault();
    this.props.alterSession(this.state.errorRate);
  }

  deleteSession() {
    this.props.deleteSession();
  }

  render() {
    const props = this.props;
    return (
      <div className={"sidebar " + (props.showSidebar ? "active" : "")}>
        <div className="sidebar__close" onClick={() => props.toggleSidebar()}>
          <i className="window close outline icon" />
        </div>
        <ul>
          <li>
            <button
              className="btn__sidebar btn__session-new"
              onClick={() => this.newSession()}
            >
              <i className="sync alternate icon" /> Start New Session
            </button>
          </li>
          <li>
            <button
              className="btn__sidebar btn__session-delete"
              onClick={() => this.deleteSession()}
            >
              <i className="trash alternate outline icon" /> Delete Session
            </button>
          </li>
          <li>
            <form
              className="form__errorRate"
              onSubmit={e => this.alterErrorRate(e)}
            >
              <p>Change error rate:</p>
              <input
                type="number"
                min="0"
                max="100"
                name="errorRate"
                value={
                  this.state.errorRate >= 0 && this.state.errorRate <= 100
                    ? this.state.errorRate
                    : this.props.session.errorRate
                }
                onChange={e => this.handleChangeErrorRate(e)}
              />
              {props.session.sessionId ? (
                <button type="submit">
                  {props.loading ? (
                    <div className="ui active small loader inverted" />
                  ) : (
                    "Change"
                  )}
                </button>
              ) : null}
            </form>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  session: state.session.data,
  loading: state.session.loading
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(SessionActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionComponent);
