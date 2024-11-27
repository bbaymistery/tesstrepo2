import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dateTimeStringFuncForReturn } from "../../../helpers/getDate";
import {
  onewayDroopOffPointsOneWay,
  onewayPickUpPointsOneWay,
  returnDateTimeString,
  returnDropOffPointsReturn,
  returnPickUpPointsReturn,
  quotBothLoading,
} from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";

import styles from "../OneWay/styles.module.scss";
import DateInput from "../../elements/DateInput";
import PickUpReturnInput from "../PickUpReturnInput";
import DropOffReturnInput from "../DropOffReturnInput";
import LoadingInput from "../LoadingInput";
import { hourss, minutes } from "../../../constants/showCase";
import TimePickerHourMinute from "../TimePickerHourMinute";
import Image from "next/image";
const ReturnJourney = ({
  jouryName = "",
  onchangeHandler,
  pickInputsUpValueReturn,
  setPickInputUpsValueReturn,
  dropInputsOffValueReturn,
  setDropInputsOffValueReturn,
  getQuotation,
  resetForm,
  internalState,
  setInternalState,
  env
}) => {
  //
  const selectedDateTimeReturn = useSelector(returnDateTimeString);
  const selectedPickupReturnPoints = useSelector(returnPickUpPointsReturn);
  const selectedDropOffReturnPoints = useSelector(returnDropOffPointsReturn);
  const selectedPickupOnewayPoints = useSelector(onewayPickUpPointsOneWay);
  const selectedDroppOffOnewayPoints = useSelector(onewayDroopOffPointsOneWay);
  const selectBothQuotLoading = useSelector(quotBothLoading);

  const [dateReturn, setDateReturn] = useState(null)




  useEffect(() => {
    setDateReturn(dateTimeStringFuncForReturn()?.split(" ")[0])
  }, [])

  return (
    <form action="" name="formOneway" className={styles.formOneway}>
      <div className={styles.row}>
        <div className={`${styles.left_points} ${styles.col}`}>
          {/* //!pick up */}
          <PickUpReturnInput
            pickInputsUpValueReturn={pickInputsUpValueReturn}
            setPickInputUpsValueReturn={setPickInputUpsValueReturn}
            internalState={internalState}
            env={env}
            setInternalState={setInternalState}
          />

          {/* //! drop of */}
          <DropOffReturnInput
            dropInputsOffValueReturn={dropInputsOffValueReturn}
            setDropInputsOffValueReturn={setDropInputsOffValueReturn}
            internalState={internalState}
            setInternalState={setInternalState}
            env={env}
          />
        </div>

        {/* sutunun sag terefi hansiki tarix ve saat secimi var  */}
        <div className={`${styles.right_dateTime} ${styles.col}`}>
          <div className={styles.date}>
            <DateInput
              type="date"
              name="DepartureDate"
              min={dateReturn}
              onChange={(e) => onchangeHandler(e, "date", 1)}
              //here we sending 2022-0422   part of
              value={selectedDateTimeReturn?.split(" ")[0]}
              lang="en"
              title={`${selectedPickupReturnPoints[0]?.pcatId === 1
                ? "Flight Landing Date"
                : "Pick Up Date"
                }`}
            />
          </div>

          <div className={styles.time}>
            <p className={styles.time_title}>
              {selectedPickupReturnPoints[0]?.pcatId === 1
                ? "Landing Time"
                : "Pickup Time"}
            </p>
            <div className={styles.departing_time}>
              <TimePickerHourMinute
                name="hour"
                title={`${selectedPickupReturnPoints[0]?.pcatId === 1
                  ? "Landing Hour"
                  : "Pick Up Hour"
                  }`}
                className={styles.hour}
                options={hourss}
                journeyType={1}
              />
              <TimePickerHourMinute
                name="minute"
                title={`${selectedPickupReturnPoints[0]?.pcatId === 1
                  ? "Landing Minute"
                  : "Pick Up Minute"
                  }`}
                journeyType={1}
                className={styles.minute}
                options={minutes}
              />
            </div>
          </div>
          {jouryName === "Return" ? (
            <div className={styles.quot_btn_div}>
              <div
                className={`btn btn_primary ${styles.quot_btn}`}
                onClick={(e) => getQuotation(e)}
              >
                {selectBothQuotLoading ? <LoadingInput /> : "Get Quotation"}
              </div>

              {selectedPickupReturnPoints.length > 0 ||
                selectedPickupOnewayPoints.length > 0 ||
                selectedDroppOffOnewayPoints.length > 0 ||
                selectedDropOffReturnPoints.length > 0 ? (
                <div className={styles.resetForm} onClick={resetForm}>
                  <i className="fa-solid fa-rotate"></i>
                  Reset Form
                </div>
              ) : (
                ""
              )}
            </div>
          ) : null}
        </div>
      </div>
    </form>
  );
};

export default ReturnJourney;
