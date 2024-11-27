import React from "react";
import styles from "./elgun.module.scss";

function TextInput(props) {
  let {
    value = "",
    onChange = (e) => { },
    onFocus = (e) => { },
    onBlur = (e) => { },
    clickClearFieldIcon = (e) => { },
    name = "",
    title = "",
    icon = "",
    placeholder = "",
    type = "",
    errorMessage = "",
    noErrorMessage = "",
    readOnly = false,
    focused = false, //inputa focus olanda close iconun gorsenmesi
    animationInput = false,
    contactUs = false,
  } = props;

  return (
    <>
      {!animationInput ? (
        <div className={`${styles.form_control}`}>
          {!noErrorMessage && (
            <div className={`${styles.form_control_header} `}>
              <label htmlFor={name} className={styles.form_control_header_label}>{title}</label>
              <p className={styles.form_control_header_error_message}>
                {errorMessage && errorMessage}
              </p>
            </div>
          )}
          <div className={`${styles.input_div} `}>
            <i
              className={`${styles.input_icon} fa-solid fa-${icon} ${focused ? styles.input_icon_animation : ""
                }`}
            ></i>
            <input
              autoComplete="off"
              placeholder={focused ? "" : placeholder}
              name={name}
              className={`${styles.input} ${errorMessage ? styles.error_input_border : ""
                }`}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              type={type}
              value={value}
              readOnly={readOnly}
              id={name}
            />
            {focused && (
              <i
                onClick={clickClearFieldIcon}
                className={`fa-solid fa-circle-xmark ${styles.input_close_icon}`}
              ></i>
            )}
          </div>
        </div>
      ) : (
        <div className={`${styles.form_group} form_group `}>
          <input
            value={value}
            type={type}
            className={`input_animation ${errorMessage && "border_required"}`}
            name={name}
            onChange={onChange}
            autoComplete="off"
          />
          <span className="highlight"></span>
          <span className="bar_input"></span>
          <label
            className={`
            input_animation_label
            ${contactUs ? styles.contact_us_label : ""}`}
            htmlFor={name}
          >
            {title}
          </label>
          <span className={"animation_input_error_message"}>
            {errorMessage && errorMessage}
          </span>
        </div>
      )}
    </>
  );
}
// example
export default TextInput;
