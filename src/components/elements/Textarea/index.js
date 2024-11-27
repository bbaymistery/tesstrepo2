import React from "react";
import styles from "./styles.module.scss";
/**
 * @TextInput { //? value:string, onChange:function,onFocus:function,onBlur:function, name, title:string, icon:string, className:string,placeholder:string,errorMessage:string}
 **/
const TextArea = (props) => {
  let {
    value = "",
    onChange = (e) => { },
    name,
    icon,
    placeholder,
    errorMessage = "",
    title = "",
    noErrorMessage,
    animationTextarea = false,
    contactUs = false,
  } = props;

  return (
    <>
      {!animationTextarea ? (
        <div className={`${styles.form_control} `}>
          {!noErrorMessage && (
            <div className={`${styles.form_control_header} `}>
              <label htmlFor={name} className={styles.form_control_header_label}>{title}</label>
              <p className={styles.form_control_header_error_message}>
                {errorMessage && errorMessage}
              </p>
            </div>
          )}
          <div className={styles.textarea_div}>
            <i className={`${styles.textarea_icon} fa-solid fa-${icon}`}></i>
            <textarea
              placeholder={placeholder}
              onChange={onChange}
              name={name}
              id={name}
              className={`${styles.textarea} ${errorMessage && styles.error_textarea_border
                }`}
              value={value}
            ></textarea>
          </div>
        </div>
      ) : (
        <div
          className={`
        form_group_textarea
        ${styles.form_group_textarea}
        `}
        >
          {/* <i className={`animation_text_area_icon fa-solid fa-${icon}`}></i> */}
          <textarea
            style={{ resize: "none" }}
            className={`textarea_animation  ${errorMessage && "border_required"
              }`}
            name={name}
            autoComplete="off"
            onChange={onChange}
            value={value}
          />
          <span className="highlight"></span>
          <span className="bar_textarea"></span>
          <label
            className={`textarea_animation_label
            ${contactUs ? styles.contactUs_label : ""}`}
            htmlFor={name}
          >
            {title}
          </label>
          <span className={"textarea_error_message"}>
            {errorMessage && errorMessage}
          </span>
        </div>
      )}
    </>
  );
};

export default TextArea;
