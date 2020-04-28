import React from "react";

import KeypadButton from "./KeypadButton/KeypadButton";

import classes from "./NumberKeypad.module.css";

const NumberKeypad = () => {
  return (
    <div className={classes.numberKeypad}>
      <KeypadButton>7</KeypadButton>
      <KeypadButton symbol="&uarr;">8</KeypadButton>
      <KeypadButton>9</KeypadButton>
      <KeypadButton symbol="&larr;">4</KeypadButton>
      <KeypadButton>5</KeypadButton>
      <KeypadButton symbol="&rarr;">6</KeypadButton>
      <KeypadButton>1</KeypadButton>
      <KeypadButton symbol="&darr;">2</KeypadButton>
      <KeypadButton>3</KeypadButton>
      <KeypadButton symbol="B">*</KeypadButton>
      <KeypadButton>0</KeypadButton>
      <KeypadButton symbol="A">L</KeypadButton>
    </div>
  );
};

export default NumberKeypad;
