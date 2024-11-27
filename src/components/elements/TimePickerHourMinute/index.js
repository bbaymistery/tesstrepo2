import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retunHour,
  transferHour,
} from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import { SET_HOUR_AND_MINUTE } from "../../../store/pickUpDropOffReducer/pickUpDropTypes";

import styles from "./elgun.module.scss";
/**
 **/
const TimePickerHourMinute = (props) => {
  let {
    className = "",
    options = [],
    title = "",
    name = "",
    journeyType = "" || boolean || number,
    errorMessage = false,
  } = props;
  //i pass value with ransfer and with return so which one is current passed that one willbe active
  //the same goes to active minute
  const [dropdownActive, setDropdownActive] = useState(false); //it is for hour
  const [dropdownActiveMinute, setDropdownActiveMinute] = useState(false); //it is for hour
  //!burda chet olani secim ekemirik Normal olani secirik
  const selectTransferDateTimeString = useSelector(transferHour);
  const selectReturnDateTimeString = useSelector(retunHour);
  const [opt, setOpt] = useState([]);
  const dispatch = useDispatch();
  //it is for transfers
  const [activeHour, setActiveHour] = useState(
    journeyType === 0
      ? selectTransferDateTimeString?.split(" ")[1]?.split(":")[0]
      : selectReturnDateTimeString?.split(" ")[1]?.split(":")[0]
  );
  const [activeMinute, setActiveMinute] = useState(
    journeyType === 0
      ? selectTransferDateTimeString?.split(" ")[1]?.split(":")[1]
      : selectReturnDateTimeString?.split(" ")[1]?.split(":")[1]
  ); //it is for display value inside ul Active

  //when click to hour time picker
  const selectValue = (e, i) => {
    // setIndexOption(i);
    setActiveHour(e.target.innerText);
    setDropdownActive(false);
    setActiveMinute(e.target.innerText);
  };

  const openDropDown = (e) => {
    if (name === "hour" && dropdownActive) {
      setDropdownActive(false);
      if (dropdownActiveMinute) {
        setDropdownActiveMinute(false);
      }
    } else {
      setDropdownActive(true);
    }

    if (name === "minute" && dropdownActiveMinute) {
      setDropdownActiveMinute(false);
      if (dropdownActive) {
        setDropdownActive(false);
      }
    } else {
      setDropdownActiveMinute(true);
    }
  };
  useEffect(() => {
    if (journeyType === 0 && name === "hour") {
      dispatch({
        type: SET_HOUR_AND_MINUTE,
        payload: {
          valueOfHourOrMinute: activeHour,
          transferOrReturn: "hourTr",
        },
      });
    }

    if (journeyType === 0 && name === "minute") {
      dispatch({
        type: SET_HOUR_AND_MINUTE,
        payload: {
          valueOfHourOrMinute: activeMinute,
          transferOrReturn: "minuteTr",
        },
      });
    }

    if (journeyType === 1 && name === "hour") {
      dispatch({
        type: SET_HOUR_AND_MINUTE,
        payload: {
          valueOfHourOrMinute: activeHour,
          transferOrReturn: "hourReturn",
        },
      });
    }
    if (journeyType === 1 && name === "minute") {
      dispatch({
        type: SET_HOUR_AND_MINUTE,
        payload: {
          valueOfHourOrMinute: activeMinute,
          transferOrReturn: "minuteReturn",
        },
      });
    }

    //bunu deyiseceyik sadece return ucun edeceyik
    setOpt(options);
  }, [activeHour, activeMinute]);

  return (
    //styles.hour  => classname
    <div className={`${className} ${styles.select_box_hour_minute} `}>
      <p className={styles.labelText}>{title}</p>
      <div className={styles.dropholder} onClick={openDropDown}>
        <div
          className={`   ${styles.dropdown}  ${dropdownActive ? styles.DropDownActive : ""}  ${errorMessage ? styles.errrorDropdown : ""}`}    >
          <p className={styles.holder} data-id={name}>
            {name === "hour" ? activeHour : activeMinute}
          </p>
        </div>
        <ul
          className={`${styles.dropdownOption} ${name === "hour"
            ? styles.dropdownOptionHour
            : styles.dropdownOptionMinute
            } `}
          name={name}
        >
          {name === "hour" && opt.length > 0 && dropdownActive
            ? opt.map((item, i) => {
              return (
                <li
                  onClick={(e) => selectValue(e, i)}
                  className={`${styles.li} ${Number(activeHour) === Number(item.value)
                    ? styles.current
                    : ""
                    }`}
                  key={item.id}
                  value={item.value}
                  name={name}
                >
                  {item.value}
                </li>
              );
            })
            : opt.map((item, i) => {
              return (
                <li
                  onClick={(e) => selectValue(e, i)}
                  className={`${styles.li} ${Number(activeMinute) === Number(item.value)
                    ? styles.current
                    : ""
                    }`}
                  key={item.id}
                  value={item.value}
                  name={name}
                >
                  {item.value}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default TimePickerHourMinute;
