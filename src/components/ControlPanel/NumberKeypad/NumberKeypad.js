import React from "react";

import KeypadButton from "./KeypadButton/KeypadButton";

import classes from "./NumberKeypad.module.css";

const NumberKeypad = () => {
  return (
    <div className={classes.numberKeypad}>
      <KeypadButton>7</KeypadButton>
      <KeypadButton>8</KeypadButton>
      <KeypadButton>9</KeypadButton>
      <KeypadButton>4</KeypadButton>
      <KeypadButton>5</KeypadButton>
      <KeypadButton>6</KeypadButton>
      <KeypadButton>1</KeypadButton>
      <KeypadButton>2</KeypadButton>
      <KeypadButton>3</KeypadButton>
      <KeypadButton>*</KeypadButton>
      <KeypadButton>0</KeypadButton>
      <KeypadButton>L</KeypadButton>
    </div>
  );
};

export default NumberKeypad;
