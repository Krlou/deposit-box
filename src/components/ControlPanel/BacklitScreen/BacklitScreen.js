import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./BacklitScreen.module.css";

class BacklitScreen extends Component {
  state = {};

  render() {
    let show = this.props.statusMessage;
    if (this.props.enteringPasscode) show = this.props.passcode;

    return (
      <div
        className={
          this.props.screenIsOff
            ? classes.backlitScreen
            : [classes.backlitScreen, classes.off].join(" ")
        }
      >
        <div className={classes.lockStatus}>{this.props.lockStatus}</div>
        <div className={classes.statusMessage}>{show}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lockStatus: state.lockStatus,
    statusMessage: state.statusMessage,
    screenIsOff: state.screenIsOff,
    passcode: state.passcode,
    enteringPasscode: state.enteringPasscode,
  };
};

export default connect(mapStateToProps)(BacklitScreen);
