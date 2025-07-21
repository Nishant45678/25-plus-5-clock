import { Component } from "react";
import "./index.css";
export default class Timer extends Component {
  constructor(props) {
    super(props);
  }

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
    const { timeLeft, isRunning, handleControls, audioRef, mode } = this.props;
    return (
      <div className="timer-wrapper">
        <div id="timer-label">{mode}</div>
        <div className="timer" id="time-left">
          {this.formatTime(timeLeft)}
        </div>
        <div className="controls" onClick={handleControls}>
          <button
            className="control-icon"
            data-category="playPause"
            id="start_stop"
          >
            <img
              src={
                !isRunning ? "play-solid.svg" : "stop-solid.svg"
              }
              alt={!isRunning ? "play" : "pause"}
            />
          </button>
          <button className="control-icon" data-category="reset" id="reset">
            <img src="rotate-left-solid.svg" alt="reset" />
          </button>
        </div>
        <audio
        id="beep"
          ref={audioRef}
          preload="auto"
          src="https://cdn.pixabay.com/audio/2025/04/18/audio_146fddaa9f.mp3"
        ></audio>
      </div>
    );
  }
}
