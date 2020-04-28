import React from "react";
import classes from "./KeypadButton.module.css";

const KeypadButton = (props) => {
  return <button className={classes.keypadButton}>{props.children}</button>;
};

export default KeypadButton;
