import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCHheckedInput } from "../../store/pickUpDropOffReducer/pickUpDropSelectors";
import { CHECKED_INPUT_FOR_RETURN } from "../../store/pickUpDropOffReducer/pickUpDropTypes";
import styles from "./styles.module.scss";
const CheckBox = () => {
  const dispatch = useDispatch();
  const checkedInput = useSelector(selectCHheckedInput);

  const handleChangeCheckInput = (e) => {
    dispatch({
      type: CHECKED_INPUT_FOR_RETURN,
      payload: e.currentTarget.previousSibling.checked,
    });
  };
  return (
    <div className={styles.form_checkbox}>
      <input
        className={styles.checkbox}
        type="checkbox"
        id="checkbox2"
        defaultChecked={checkedInput}
      />
      <label htmlFor="checkbox2" onClick={handleChangeCheckInput}>
        the passenger details
        {checkedInput ? (
          " are a same"
        ) : (
          <span className={styles.textMiddle}>are not same{"  "}</span>
        )}{" "}
        for both journey
      </label>
    </div>
  );
};

export default CheckBox;
// <div className={styles.checkBtn}>
//   <input
//     onChange={handleChangeCheckInput}
//     type="checkbox"
//     className={styles.checkBtn__input}
//     id="check3"
//     name="check3"
//     defaultChecked={checkedInput}
//   />
//   <label
//     htmlFor="check3"
//     className={`
//     ${styles.checkBtn_label}
//     ${checkedInput ? styles.pChecked : styles.checkedText}
//   `}
//   >
// the passenger details
// {checkedInput ? (
//   " are a same"
// ) : (
//   <span className={styles.textMiddle}>
//     are not same{"  "}
//   </span>
// )}{" "}
// for both journey
//   </label>
// </div>
