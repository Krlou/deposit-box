import React, { Component } from "react";
import { connect } from "react-redux";

import KeypadButton from "./KeypadButton/KeypadButton";
import * as actionTypes from "../../../store/actions";

import classes from "./NumberKeypad.module.css";

class NumberKeypad extends Component {
  unlockedValidation = (passcode) => {
    let isValid = false;
    const length = passcode.length;
    if (length === 7 && passcode[length - 1] === "L") {
      const digits = passcode.slice(0, length - 1);
      if (!isNaN(digits)) {
        isValid = true;
      }
    }
    if (
      isValid &&
      (this.props.boxPasscode === "" ||
        this.props.boxPasscode === passcode.slice(0, 6))
    ) {
      this.props.onSetBoxPasscode();

      this.props.onLocking();
      setTimeout(() => {
        this.props.onReady();
        this.props.onChangeLockStatus();
      }, 3000);
    } else {
      this.props.onError();
    }
  };

  lockedValidation = (passcode) => {
    if (passcode === this.props.boxPasscode) {
      this.props.onUnlocking();
      setTimeout(() => {
        this.props.onReady();
        this.props.onChangeLockStatus();
      }, 3000);
    } else if (passcode === "000000") {
      this.props.onService();
    } else {
      this.props.onError();
    }
  };

  serviceValidation = (passcode) => {
    this.props.onValidating();

    fetch(
      "https://9w4qucosgf.execute-api.eu-central-1.amazonaws.com/default/CR-JS_team_M02a?code=" +
        passcode
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        if (responseData.sn === this.props.serialNumber) {
          this.props.onReset();
        } else {
          this.props.onError();
        }
      });

    fetch(
      "https://9w4qucosgf.execute-api.eu-central-1.amazonaws.com/default/CR-JS_team_M02a?code=" +
        "456987*L0123"
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        if (responseData.sn === this.props.serialNumber) {
          this.props.onReset();
        } else {
          this.props.onError();
        }
      });
  };

  validate = () => {
    let passcode = this.props.passcode;
    switch (this.props.lockStatus) {
      case "Unlocked":
        this.unlockedValidation(passcode);
        break;
      case "Locked":
        if (this.props.statusMessage === "Service")
          this.serviceValidation(passcode);
        else this.lockedValidation(passcode);
        break;
      default:
        throw new Error("Something went wrong! Check lockStatus value...");
    }
  };

  //callback func for screenOffTimer's setInterval
  handleScreenOff = () => {
    clearInterval(this.props.timerScreenOff);
    this.props.onClearScreenOffTimer();

    this.props.onUpdateScreen();
  };

  //callback func for checkPasscodeTimer's setInterval
  handleCheckPasscode = () => {
    clearInterval(this.props.timerCheckPasscode);
    this.props.onClearCheckPasscodeTimer();

    if (this.props.enteringPasscode) this.props.onEnteringPasscode(); //added

    this.validate();
  };

  //onclick event handler
  handleKeypadButtonClicked = (event, symbol) => {
    event.preventDefault();

    if (this.props.screenIsOff) {
      this.props.onUpdateScreen();
      this.props.onEnteringPasscode(); //added
    }

    if (this.props.statusMessage === "Service" && !this.props.enteringPasscode)
      this.props.onEnteringPasscode();

    clearInterval(this.props.timerScreenOff);
    clearInterval(this.props.timerCheckPasscode);
    this.props.onSetScreenOffTimer(this.handleScreenOff);
    this.props.onSetCheckPasscodeTimer(this.handleCheckPasscode);

    let passcode = this.props.passcode;
    let updatedPasscode = passcode + symbol;
    this.props.onUpdatePasscode(updatedPasscode);
  };

  render() {
    return (
      <div className={classes.numberKeypad}>
        <KeypadButton
          clicked={(event) => this.handleKeypadButtonClicked(event, "7")}
        >
          7
        </KeypadButton>
        <KeypadButton
          symbol="&uarr;"
          clicked={(event) => this.handleKeypadButtonClicked(event, "8")}
        >
          8
        </KeypadButton>
        <KeypadButton
          clicked={(event) => this.handleKeypadButtonClicked(event, "9")}
        >
          9
        </KeypadButton>
        <KeypadButton
          symbol="&larr;"
          clicked={(event) => this.handleKeypadButtonClicked(event, "4")}
        >
          4
        </KeypadButton>
        <KeypadButton
          clicked={(event) => this.handleKeypadButtonClicked(event, "5")}
        >
          5
        </KeypadButton>
        <KeypadButton
          symbol="&rarr;"
          clicked={(event) => this.handleKeypadButtonClicked(event, "6")}
        >
          6
        </KeypadButton>
        <KeypadButton
          clicked={(event) => this.handleKeypadButtonClicked(event, "1")}
        >
          1
        </KeypadButton>
        <KeypadButton
          symbol="&darr;"
          clicked={(event) => this.handleKeypadButtonClicked(event, "2")}
        >
          2
        </KeypadButton>
        <KeypadButton
          clicked={(event) => this.handleKeypadButtonClicked(event, "3")}
        >
          3
        </KeypadButton>
        <KeypadButton
          symbol="B"
          clicked={(event) => this.handleKeypadButtonClicked(event, "*")}
        >
          *
        </KeypadButton>
        <KeypadButton
          clicked={(event) => this.handleKeypadButtonClicked(event, "0")}
        >
          0
        </KeypadButton>
        <KeypadButton
          symbol="A"
          clicked={(event) => this.handleKeypadButtonClicked(event, "L")}
        >
          L
        </KeypadButton>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    timerScreenOff: state.timerScreenOff,
    timerCheckPasscode: state.timerCheckPasscode,
    passcode: state.passcode,
    screenIsOff: state.screenIsOff,
    statusMessage: state.statusMessage,
    lockStatus: state.lockStatus,
    boxPasscode: state.boxPasscode,
    enteringPasscode: state.enteringPasscode,
    serialNumber: state.serialNumber,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onReset: () => dispatch({ type: actionTypes.RESET }),
    onValidating: () => dispatch({ type: actionTypes.VALIDATING }),
    onService: () => dispatch({ type: actionTypes.SERVICE }),
    onChangeLockStatus: () =>
      dispatch({ type: actionTypes.CHANGE_LOCK_STATUS }),
    onReady: () => dispatch({ type: actionTypes.READY }),
    onLocking: () => dispatch({ type: actionTypes.SET_LOCKING }),
    onUnlocking: () => dispatch({ type: actionTypes.SET_UNLOCKING }),
    onError: () => dispatch({ type: actionTypes.ERROR }),
    onSetBoxPasscode: () => dispatch({ type: actionTypes.SET_BOX_PASSCODE }),
    onUpdateScreen: () => dispatch({ type: actionTypes.UPDATE_SCREEN }),
    onUpdatePasscode: (value) =>
      dispatch({ type: actionTypes.UPDATE_PASSCODE, value: value }),
    onSetScreenOffTimer: (callbackFunc) =>
      dispatch({
        type: actionTypes.SET_SCREEN_OFF_TIMER,
        callbackFunc: callbackFunc,
      }),
    onSetCheckPasscodeTimer: (callbackFunc) =>
      dispatch({
        type: actionTypes.SET_CHECK_PASSCODE_TIMER,
        callbackFunc: callbackFunc,
      }),
    onClearScreenOffTimer: () =>
      dispatch({ type: actionTypes.CLEAR_SCREEN_OFF_TIMER }),
    onClearCheckPasscodeTimer: () =>
      dispatch({ type: actionTypes.CLEAR_CHECK_PASSCODE_TIMER }),
    onEnteringPasscode: () => dispatch({ type: actionTypes.ENTERING_PASSCODE }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NumberKeypad);
