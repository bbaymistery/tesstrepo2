import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reservationSchemeValidator } from "../../../helpers/reservationSchemeValidator";
import styles from "./styles.module.scss";
const RadioButton = ({ setInternalState, internalState }) => {
  const dispatch = useDispatch()
  const { params: { journeyType, direction }, reservations, } = useSelector((state) => state.pickUpDropOffActions)
  const { appData } = useSelector(state => state.initialReducer)

  const handleInputRadioChange = useCallback((index) => {
    dispatch({ type: 'SWITCH_JOURNEY', data: { journeyType: index } });
    if (internalState.errorHolder.status === 403) {
      let errorHolder = reservationSchemeValidator({ reservations });
      setInternalState({ errorHolder });
    }
  }, [dispatch, internalState.errorHolder, reservations, setInternalState]);


  //when we change journey to return then we should check If we have points or not.
  //In this way we arrange addExtra point to false or to true
  useEffect(() => {
    if (parseInt(journeyType) === 1) {
      if (reservations[1].selectedPickupPoints.length > 0) setInternalState({ [`show-pickup-extra-point-${journeyType}`]: true })
      if (reservations[1].selectedDropoffPoints.length > 0) setInternalState({ [`show-dropoff-extra-point-${journeyType}`]: true })
    }
  }, [journeyType])
  return (
    <span className={`${styles.radio_button_div} ${direction}`}>
      <input type="radio" id="check11" onChange={() => handleInputRadioChange(0)} checked={parseInt(journeyType) === 0 ? true : false} />
      <label htmlFor="check11" onClick={() => handleInputRadioChange(0)} >{appData.words["seOneWayOption"]}</label>
      &nbsp;&nbsp;
      &nbsp;&nbsp;
      <input type="radio" id="check22" onChange={() => handleInputRadioChange(1)} checked={parseInt(journeyType) === 1 ? true : false} />
      <label htmlFor="check22" onClick={() => handleInputRadioChange(1)} >{appData.words["seReturnOption"]}</label>
    </span>
  );
};

export default RadioButton;
