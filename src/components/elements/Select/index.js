import React from "react";
import { useDispatch } from "react-redux";
import { SET_WAITING_MODAL_INFO } from "../../../store/showFieldReducer/showFieldTypes";
import styles from "./styles.module.scss";
/**
 * @TextInput { //? value:string , onChange:function,onFocus:function,onBlur:function,name:string,title:string,icon:string,  placeholder:string,errorMessage:string,isLoading:boolean,default:boolean,readOnly:boolean,}
 **/
const Select = (props) => {
  let {
    value,
    onChange = (e) => { },
    name = "",
    title = "",
    icon,
    placeholder = "",
    errorMessage = "",
    data,
    readOnly = false,
    defaultValue,
    noErrorMessage,
    animationSelect = false,
    showModalInfo = false,
    forFlight = false
  } = props;
  const dispatch = useDispatch();
  const handleModal = (e) => {
    dispatch({ type: SET_WAITING_MODAL_INFO, payload: true });
  };


  return (
    <>
      {!animationSelect ? (
        <div className={`${styles.form_control}`}>
          {!noErrorMessage && (
            <div className={`${styles.form_control_header} `}>
              <p className={styles.form_control_header_label}>{title}</p>
              <p className={styles.form_control_header_error_message}>
                {errorMessage && errorMessage}
              </p>
            </div>
          )}
          <div className={styles.select_div}>
            <i
              className={`${styles.select_div_left_icon} fa-solid fa-${icon}`}
            ></i>
            {
              <i
                className={`${styles.select_div_right_icon} fa-solid fa-angle-down`}
              ></i>
            }
            <select
              name={name}
              onChange={onChange}
              className={`${styles.select} ${errorMessage ? styles.error_select_border : ""
                }
          `}
              defaultValue={value}
              disabled={readOnly}
            >
              {defaultValue && (
                <option value="" id={0}>
                  {placeholder}
                </option>
              )}
              {Number(data)
                ? Array(data)
                  .fill()
                  .map((x, i) => {
                    return (
                      <option key={i + 100000} value={i + 1}>
                        {`${i + 1}`}
                      </option>
                    );
                  })
                : data?.map((d, i) => {
                  return (
                    <option key={i + 1000} value={d.value} id={d?.id && d?.id}>
                      {d.value}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      ) : (
        <div className="select">

          <select
            className={`select-text ${errorMessage ? "error-border-select" : ""}`}
            name={name} onChange={onChange}
            //  defaultValue={value?.trim() ? value?.trim() : ""}
            defaultValue={forFlight ? value?.trim() : value}
          >
            {defaultValue && (
              <option value="" id={0}>
                {placeholder}
              </option>
            )}
            {Number(data)
              ? Array(data)
                .fill()
                .map((x, i) => {
                  return (
                    <option key={i + 100} value={i + 1}>
                      {`${i + 1}`}
                    </option>
                  );
                })
              : data?.map((d, i) => {
                // selected={Number(defaultValue) === Number(d.value.split(" ")[0])}
                //selected={forFlight ? Number(defaultValue) === Number(d?.value?.split(" ")[0]) :value === +d?.id}
                return (
                  <option key={i} value={d.value} id={d?.id && d?.id} selected={forFlight ? Number(defaultValue) === Number(d?.value?.split(" ")[0]) : value === +d?.id}>
                    {d.value}
                  </option>
                );
              })}
          </select>
          <span className="select-highlight"></span>
          <span className="select-bar"></span>
          <label className="select-label">
            {title}
            {showModalInfo && (
              <i
                className={`fa-solid fa-circle-info waiting-icon`}
                onClick={handleModal}
              ></i>
            )}
          </label>
          {errorMessage ? <span className="error-waiting-pickup-time">{errorMessage}</span> : ""}
        </div>
      )}
    </>
  );
};

export default Select;
