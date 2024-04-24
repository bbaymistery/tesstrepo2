import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";
const CheckBox = ({ textSame, textNotSame, direction }) => {
  const dispatch = useDispatch()
  let state = useSelector((state) => state.pickUpDropOffActions)
  let { params: { passengerDetailsStatus } } = state

  const onchangeHandler = (e) => dispatch({ type: "SET_SAME_PASSENGER_DETAILS_STATUS", data: { status: !e.currentTarget.previousSibling.checked } })


  return (
    <div className={styles.form_checkbox} direction={String(direction === 'rtl')}>
      <input className={styles.checkbox} type="checkbox" id="checkbox-2" defaultChecked={passengerDetailsStatus} />
      <label htmlFor="checkbox-2" className={`${!passengerDetailsStatus ? styles.primary_text : styles.red_text}`} onClick={(e) => onchangeHandler(e)}>

        {passengerDetailsStatus ? `${textSame}` : <>{textNotSame}</>}
      </label>
    </div>
  );
};

export default CheckBox;
