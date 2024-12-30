import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";

const DateInput = (props) => {
  let { value = "", onChange = () => { }, title = "", errorMessage = "", min, max, headingStyle = {}, showIcon = true, form_control_input_div_style = {} } = props;

  let state = useSelector((state) => state.pickUpDropOffActions)
  let { params: { direction } } = state

  return (
    <div className={`${styles.form_control}`}>
      <div className={`${styles.form_control_header} ${direction}`}>
        {title ? <p style={headingStyle} className={styles.form_control_header_title}>{title}</p> : <></>}
        {errorMessage ? <p className={'error_message'}>{errorMessage}</p> : <></>}
      </div>
      <div className={`${styles.form_control_input_div} ${direction === 'rtl' && styles.form_control_input_div_rtl}`} style={form_control_input_div_style}>
        <input type="date" name="pickup-date" className={direction === "rtl" ? styles.rtl : ""} value={value} min={min} max={max} onChange={onChange} />
      </div>
      {showIcon ? <i className={`fa-solid fa-calendar-days ${styles.date_picker_icon}`}></i> : <></>}
    </div>
  );
};

export default DateInput;
