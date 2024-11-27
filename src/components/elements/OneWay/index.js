import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateTimeStringFunc } from "../../../helpers/getDate";
import { hourss, minutes } from "../../../constants/showCase";

import {
  onewayDateTimeString,
  onewayDroopOffPointsOneWay,
  onewayPickUpPointsOneWay,
  quotTransferLoading,
  returnDateTimeString,
  selectedJourneyType,
} from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";

import styles from "./styles.module.scss";
import DateInput from "../../elements/DateInput";
import TimePickerHourMinute from "../TimePickerHourMinute";
import PickUpOneWayInput from "../PickUpOneWayInput";
import DropOffOneWayInput from "../DropOffOneWayInput";
import { SET_DATE_TIME } from "../../../store/pickUpDropOffReducer/pickUpDropTypes";
import LoadingInput from "../LoadingInput";
import { useState } from "react";
import Image from "next/image";
//ochnage jouryName comes from hero content
//pcikUpInputsValueOnewayin input value laridir hero componentinnen gelir
const Oneway = ({
  jouryName = "",
  onchangeHandler,
  pickInputsUpValue,
  setPickInputUpsValue,
  dropInputsOffValue,
  setDropInputsOffValue,
  getQuotation, //hero comp
  resetForm,
  internalState,
  setInternalState,
   errorDisabledMessageTransfer,
  env
}) => {
  const dispatch = useDispatch();
  const selectedDateTimeOneway = useSelector(onewayDateTimeString);
  const selectedDateTimeReturn = useSelector(returnDateTimeString);
  const selectQuotTransferLoading = useSelector(quotTransferLoading);
  const selectedPickupOnewayPoints = useSelector(onewayPickUpPointsOneWay);
  const selectedDroppOffOnewayPoints = useSelector(onewayDroopOffPointsOneWay);
  let [dateOneway, setDateOneway] = useState(null)

  //*eger Oneway tarixi Return ile eyni olarsa ve ya boyuk olarsa return tarixinin otomatik olarag 3 4 saat gabaga atlmasi
  useEffect(() => {
    let ThreeHourInMilliSecond = 1000 * 60 * 60 * 24;
    let returnDateInMilliSecond = new Date(selectedDateTimeReturn).getTime();
    let transferDateInMilliSecond = new Date(
      selectedDateTimeOneway
    ).getTime();
    //eger transfer returnnen buyukse ototik oalrag araya uc saat farkinin eklenilmei
    if (transferDateInMilliSecond >= returnDateInMilliSecond) {
      let added3hourMilliSecond =
        transferDateInMilliSecond + ThreeHourInMilliSecond;
      let pickupOrDropOrDate = "date";
      let journeyType = 1;
      let dateValue = new Date(added3hourMilliSecond)
        .toISOString()
        .split("T")[0];

      dispatch({
        type: SET_DATE_TIME,
        payload: { dateValue, pickupOrDropOrDate, journeyType },
      });
    }
  }, [selectedDateTimeOneway, selectedDateTimeReturn]);

  useEffect(() => {
    setDateOneway(dateTimeStringFunc()?.split(" ")[0])
  }, [])
  return (
    <form action="" name="formOneway" className={styles.formOneway}>
      <div className={styles.row}>

        <div className={`${styles.left_points} ${styles.col}`}>
          {/* //!pick up */}
          <PickUpOneWayInput
            pickInputsUpValue={pickInputsUpValue}
            setPickInputUpsValue={setPickInputUpsValue}
            internalState={internalState}
            setInternalState={setInternalState}
            env={env}
          />
          {/* //! drop of */}
          <DropOffOneWayInput
            dropInputsOffValue={dropInputsOffValue}
            setDropInputsOffValue={setDropInputsOffValue}
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
              min={dateOneway}
              onChange={(e) => onchangeHandler(e, "date", 0)}
              //here we sending 2022-0422   part of
              value={selectedDateTimeOneway?.split(" ")[0]}
              lang="en"
              title={`${selectedPickupOnewayPoints[0]?.pcatId === 1
                ? "Flight Landing Date"
                : "Pick Up Date"
                }`}
            />
          </div>

          <div className={styles.time}>
            <p className={styles.time_title}>
              {selectedPickupOnewayPoints[0]?.pcatId === 1 ? "Landing Time" : "Pickup Time"}
            </p>
            <div className={styles.departing_time}>
              <TimePickerHourMinute
                name="hour"
                title={`${selectedPickupOnewayPoints[0]?.pcatId === 1 ? "Landing Hour" : "Pick Up Hour"}`}
                className={styles.hour}
                options={hourss}
                journeyType={0}
              />
              <TimePickerHourMinute
                name="minute"
                title={`${selectedPickupOnewayPoints[0]?.pcatId === 1 ? "Landing Minute" : "Pick Up Minute"}`}
                journeyType={0}
                className={"minute"}
                options={minutes}
              />
            </div>
          </div>
          {jouryName === "Oneway" ? (
            <div className={styles.quot_btn_div}>
              <div className={`btn btn_primary ${styles.quot_btn}`} onClick={(e) => getQuotation(e)}  >
                {selectQuotTransferLoading ? <LoadingInput /> : "Get Quotation"}
              </div>

              {selectedPickupOnewayPoints.length > 0 ||
                selectedDroppOffOnewayPoints.length > 0 ? (
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

export default Oneway;
