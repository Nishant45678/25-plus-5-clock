import { Component, createRef } from "react";
import "./index.css";
import Setting from "../Setting";
import Timer from "../Timer";

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      timeLeft: 25 * 60,
      isRunning: false,
      mode: "Session",
    };
    this.timer = null;
    this.audioRef = createRef(null);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = () => {
    if (this.state.timeLeft > 0) {
      this.setState((pre) => ({ timeLeft: pre.timeLeft - 1 }));
    } else {
      const audio = this.audioRef.current;
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
      clearInterval(this.timer);
      setTimeout(() => {
        const isSession = this.state.mode === "Session";
        const newMode = isSession ? "Break" : "Session";
        const newTime = isSession
          ? this.state.breakLength * 60
          : this.state.sessionLength * 60;

        clearInterval(this.timer);
        this.setState(
          {
            timeLeft: newTime,
            mode: newMode,
          },
          () => {
            clearInterval(this.timer);
            this.timer = setInterval(this.tick, 1e3);
          }
        );
      }, 1e3);
    }
  };

  handleControls = (e) => {
    const closetsBtn = e.target.closest("button");
    if (!closetsBtn) return;
    const { category } = closetsBtn.dataset;
    if (!category) return;

    switch (category) {
      case "playPause":
        if (this.state.isRunning) {
          clearInterval(this.timer);
          this.timer = null;
          this.setState({
            isRunning: false,
          });
        } else {
          if (this.timer) return;
          this.setState(
            {
              isRunning: true,
            },
            () => {
              this.timer = setInterval(this.tick, 1e3);
            }
          );
        }

        break;
      case "reset": {
        clearInterval(this.timer);
        this.timer = null;
        const audio = this.audioRef.current;
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
        this.setState({
          sessionLength: 25,
          breakLength: 5,
          timeLeft: 25 * 60,
          isRunning: false,
          mode: "Session",
        });
        break;
      }
      default:
        break;
    }
  };

  handleSetting = (e) => {
    const { delta, mode } = e.target.dataset;
    if (!delta || this.state.isRunning) return;
    this.setState((pre) => {
      const key = mode === "break" ? "breakLength" : "sessionLength";
      const newVal = Math.min(60, Math.max(1, pre[key] + +delta));
      const newState = { [key]: newVal };
      if (mode === "session") {
        newState.timeLeft = newVal * 60;
      }
      return newState;
    });
  };

  formatTime = (time) => {
    const m = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  render() {
    const { breakLength, sessionLength, isRunning, timeLeft, mode } =
      this.state;
    return (
      <div className="container">
        <div className="heading">25 + 5 clock</div>
        <Setting
          handleSetting={this.handleSetting}
          breakLength={breakLength}
          sessionLength={sessionLength}
          isRunning={isRunning}
        />

        <Timer
          timeLeft={timeLeft}
          isRunning={isRunning}
          handleControls={this.handleControls}
          audioRef={this.audioRef}
          mode={mode}
        />
      </div>
    );
  }
}
