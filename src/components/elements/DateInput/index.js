import React from "react";
import styles from "./elgun.module.scss";
import Image from "next/image";

const DateInput = (props) => {
  let {
    value = "",
    onChange = () => { },
    name,
    title = "",
    errorMessage = "",
    className = "",
    min,
    max,
    type = "",
  } = props;

  return (
    <div className={`${styles.form_control} ${className}`}>
      <div className={styles.header}>
        <label htmlFor={name} className={styles.form_label}>
          {title}
        </label>{" "}
        {errorMessage && <TextError errorMessage={errorMessage} />}
      </div>
      <div className={`${styles.input_div} `}>
        <input min={min} max={max} name={name} type={type} id={name} className={`${styles.inputDate} ${errorMessage ? styles.errorDate : ""}`} onChange={onChange} value={value} lang="en" />
      </div>
      <i className="fa-solid fa-calendar-days"></i>
    </div>

  );
};

export default DateInput;
