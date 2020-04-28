import React from "react";

import classes from "./BacklitScreen.module.css";

const BacklitScreen = () => {
  return (
    <div className={classes.backlitScreen}>
      <div className={classes.lockStatus}>Unlocked</div>
      <div className={classes.statusMessage}>Ready</div>
    </div>
  );
};

export default BacklitScreen;
