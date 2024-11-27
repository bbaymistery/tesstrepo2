import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "../Select";
import TextInput from "../TextInput";
import { selectPickUpDropOffReducer } from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";

import styles from "./styles.module.scss";
import { UPDATE_PASSNEGER_DETAILS } from "../../../store/pickUpDropOffReducer/pickUpDropTypes";
const PassengerDetails = (props) => {
  const {
    handleInputs,
    setHandleInputs,
    quot,
    passNumber,
    title,
    journeyType,
    animation = false,
  } = props;
  const dispatch = useDispatch();
  const { appData } = useSelector(selectPickUpDropOffReducer);

  //bunu sadece imgni getirmek ucun yazdg Secilen cardn img si
  const carObject = appData?.carsTypes?.reduce(
    (obj, item) => ({
      ...obj,
      [item.id]: item,
    }),
    {}
  );

  const onchangeHandler = (e) => {
    let name = e.target.name;
    let value =
      e.target.name === "passengersNumber"
        ? Number(e.target.value)
        : e.target.value;
    if (
      e.target.value.includes('"')
      || e.target.value.includes(`'`)
      || e.target.value.includes('/')
      || e.target.value.includes('\\')
    ) {
      return
    }
    //eliminate the text required after occuring the required text
    if (handleInputs.firstnameError.length > 0 && name === "firstname") {
      setHandleInputs((values) => ({
        ...values,
        firstnameError: "",
      }));
    }
    if (handleInputs.emailError.length > 0 && name === "email") {
      setHandleInputs((values) => ({
        ...values,
        emailError: "",
      }));
    }
    if (handleInputs.phoneError.length > 0 && name === "phone") {
      setHandleInputs((values) => ({
        ...values,
        phoneError: "",
      }));
    }
    setHandleInputs((values) => ({
      ...values,
      [e.target.name]:
        name === "passengersNumber" ? Number(e.target.value) : e.target.value,
    }));

    dispatch({
      type: UPDATE_PASSNEGER_DETAILS,
      payload: { value, nameOfInput: e.target.name, journeyType },
    });
  };

  const onFocus = (e) => {
    if (e.target.name === "firstname") {
      setHandleInputs((values) => ({
        ...values,
        firstNameFocused: true,
      }));
    }
    if (e.target.name === "phone") {
      setHandleInputs((values) => ({
        ...values,
        phoneFocused: true,
      }));
    }
    if (e.target.name === "email") {
      setHandleInputs((values) => ({
        ...values,
        emailFocused: true,
      }));
    }
  };

  const onBlur = (e) => {
    if (e.target.name === "firstname" && e.target.value.length === 0) {
      setHandleInputs((values) => ({
        ...values,
        firstname: "",
        firstNameFocused: false,
      }));
    }
    if (e.target.name === "email" && e.target.value.length === 0) {
      setHandleInputs((values) => ({
        ...values,
        email: "",
        emailFocused: false,
      }));
    }
    if (e.target.name === "phone" && e.target.value.length === 0) {
      setHandleInputs((values) => ({
        ...values,
        phone: "",
        phoneFocused: false,
      }));
    }
  };
  const clickClearFieldIcon = (e) => {
    let atttRibuteName =
      e.target.parentElement.children[1].getAttribute("name");
    if (handleInputs.firstname.length >= 0 && atttRibuteName === "firstname") {
      setHandleInputs((values) => ({
        ...values,
        firstname: "",
        firstNameFocused: false,
        firstnameError: "",
      }));
    }
    if (handleInputs.phone.length >= 0 && atttRibuteName === "phone") {
      setHandleInputs((values) => ({
        ...values,
        phone: "",
        phoneFocused: false,
        phoneError: "",
      }));
    }
    if (handleInputs.email.length >= 0 && atttRibuteName === "email") {
      setHandleInputs((values) => ({
        ...values,
        email: "",
        emailFocused: false,
        emailError: "",
      }));
    }
  };
  return (
    <div className={`${styles.pass_detail_div} ${animation && "zoom_out"}`}>
      <div className={styles.passenger_details_title}>{title}</div>
      <div className={styles.passenger_details}>
        <div className={styles.inp_boxes}>
          <div className={`${styles.inp_box}`}>
            <TextInput
              title="Full Name"
              icon="user"
              placeholder="Full Name * "
              type="text"
              name="firstname"
              onChange={onchangeHandler}
              value={handleInputs.firstname}
              focused={handleInputs.firstNameFocused}
              onFocus={onFocus}
              onBlur={onBlur}
              clickClearFieldIcon={clickClearFieldIcon}
              errorMessage={
                handleInputs.firstnameError?.length > 0 &&
                handleInputs.firstnameError
              }
            />
          </div>
          <div className={`${styles.inp_box}`}>
            <TextInput
              title="Email"
              icon="at"
              placeholder="Email * "
              type="text"
              name="email"
              onChange={onchangeHandler}
              value={handleInputs.email}
              focused={handleInputs.emailFocused}
              onFocus={onFocus}
              onBlur={onBlur}
              clickClearFieldIcon={clickClearFieldIcon}
              errorMessage={
                handleInputs.emailError?.length > 0 && handleInputs.emailError
              }
            />
          </div>
        </div>
        <div className={styles.inp_boxes}>
          {carObject && (
            <div className={`${styles.inp_box}`}>
              {
                <Select
                  title="Number of passengers"
                  icon="users"
                  placeholder="Select Pax"
                  data={quot ? carObject[quot?.carId]?.pax : ""}
                  onChange={onchangeHandler}
                  value={passNumber}
                  name="passengersNumber"
                />
              }
            </div>
          )}
          <div className={`${styles.inp_box}`}>
            <TextInput
              title="Phone Number"
              icon="phone"
              placeholder="Phone Number * "
              type="number"
              name="phone"
              onChange={onchangeHandler}
              value={handleInputs.phone}
              focused={handleInputs.phoneFocused}
              onFocus={onFocus}
              onBlur={onBlur}
              clickClearFieldIcon={clickClearFieldIcon}
              errorMessage={
                handleInputs.phoneError?.length > 0 && handleInputs.phoneError
              }
            />
            <p className={styles.subtitle}>
              * with international dialling code
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerDetails;
