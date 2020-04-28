import React from "react";
import classes from "./KeypadButton.module.css";

const KeypadButton = (props) => {
  return (
    <div className={classes.keypadButton}>
      {props.children}
      <div className={classes.symbol}>{props.symbol}</div>
    </div>
  );
};

export default KeypadButton;
