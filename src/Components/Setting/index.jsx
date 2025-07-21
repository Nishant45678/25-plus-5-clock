import { Component } from "react";
import "./index.css";
export default class Setting extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { handleSetting, breakLength, sessionLength, isRunning } = this.props;
    return (
      <div className="setting" onClick={handleSetting}>
        <div id="break-wrapper">
          <span id="break-label">Break</span>
          <div>
            <button
              disabled={isRunning}
              className="setting-icon"
              data-mode="break"
              data-delta="-1"
              id="break-decrement"
            >
              -
            </button>
            <span id="break-length">{breakLength}</span>
            <button
              disabled={isRunning}
              className="setting-icon"
              data-mode="break"
              data-delta="+1"
              id="break-increment"
            >
              +
            </button>
          </div>
        </div>
        <div id="session-wrapper">
          <span id="session-label">Session</span>
          <div>
            <button
              disabled={isRunning}
              className="setting-icon"
              data-mode="session"
              data-delta="-1"
              id="session-decrement"
            >
              -
            </button>
            <span id="session-length">{sessionLength}</span>
            <button
              disabled={isRunning}
              className="setting-icon"
              data-mode="session"
              data-delta="+1"
              id="session-increment"
            >
              +
            </button>
          </div>
        </div>
      </div>
    );
  }
}
