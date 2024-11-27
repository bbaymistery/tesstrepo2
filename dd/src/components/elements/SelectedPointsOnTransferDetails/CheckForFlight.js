import React from "react";
import { useSelector } from "react-redux";
import { ifHasUnwantedCharacters } from "../../../helpers/ifHasUnwantedCharacters";
import Select from "../Select";
import TextInput from "../TextInput";
import styles from "./styles.module.scss";
//bura propslar selected listeden geir
const CheckForFlight = (props) => {
  //index it is a destination if 0 it means pick up
  let { point, onChange = () => { }, objectDetailStatuses, type, error = {}, isTaxiDeal=false } = props
  const { appData } = useSelector(state => state.initialReducer)
  const onchangeHandler = (e, params = {}) => {
    let { value, name } = e.target
    if (ifHasUnwantedCharacters(value)) return

    //150 minutes after flight has landed     = >150
    let splitedNumberOfWaitingTime = ""
    if (name === "waitingPickupTime") {
      splitedNumberOfWaitingTime = e?.target?.options[e?.target?.selectedIndex].innerText?.trim().split(" ")[0]

      if (parseInt(splitedNumberOfWaitingTime) >= 0) {
        splitedNumberOfWaitingTime = parseInt(splitedNumberOfWaitingTime)
      } else {
        splitedNumberOfWaitingTime = ""
      }

    }

    let newFlightDetails = { ...point.flightDetails, [name]: name === 'waitingPickupTime' ? splitedNumberOfWaitingTime : value }
    onChange(newFlightDetails)
  };

  const waitingMinutes = [0, 15, 30, 45, 50, 60, 70, 80, 90, 100, 120, 150]
    .map((min, i) => ({ id: min.toString(), value: `${min} minute${min === 0 ? '' : 's'} ${appData?.words["seBookingNote"]}` }))
  return (
    <>
      {/* //!checking for flight pickups transfer */}
      {point.pcatId === 1 ?
        (<div className={styles.insideInputs}>
          <div className={`${styles.insideInputs_input} ${isTaxiDeal?styles.inside_inputs_istaxideal:""}`}>
            <TextInput label={appData?.words["strFlightNumberTitle"]} type="text" name="flightNumber" value={point.flightDetails.flightNumber} errorMessage={error?.flightDetails?.flightNumber} onChange={(e) => onchangeHandler(e)} />
            {objectDetailStatuses[1]?.flightDetails?.waitingPickupTime[type] === 1 &&
              <Select
                label={appData?.words["seWaitingTime"]}
                data={[{ id: "", value: `--${appData?.words["quSelectButton"]}--` }, ...waitingMinutes?.length > 0 ? waitingMinutes : []]}
                name="waitingPickupTime"
                onChange={(e) => onchangeHandler(e)}
                errorMessage={error?.flightDetails?.waitingPickupTime}
                value={point.flightDetails.waitingPickupTime}
                flightSelectOption={true}
                flightInfoIcon={true}
                isTaxiDeal={isTaxiDeal}
              />}
          </div>
        </div>)
        : <React.Fragment></React.Fragment>}
    </>
  );
};

export default CheckForFlight;
