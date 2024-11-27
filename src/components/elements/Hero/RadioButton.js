import React from "react";
import styles from "./styles.module.scss";
const RadioButton = ({ jouryName, hadnleInputRadioChange }) => {
  return (
    <span className={styles.radio_button_div}>
      <input type="radio" id={`radio_${jouryName}_Oneway`} name="tripType" value="Oneway" onChange={hadnleInputRadioChange} checked={jouryName === "Oneway"} />
      <label htmlFor={`radio_${jouryName}_Oneway`}>One way</label>
      &nbsp;&nbsp;
      <input type="radio" id={`radio_${jouryName}_Return`} name="tripType" value="Return" onChange={hadnleInputRadioChange} checked={jouryName === "Return"} />
      <label htmlFor={`radio_${jouryName}_Return`}>Return</label>
    </span>
  );
};

export default RadioButton;
