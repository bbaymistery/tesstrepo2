import React from "react";
import { useSelector } from "react-redux";
import { waitingMinutes } from "../../../constants/waitingMinutes";
import { selectPickUpDropOffReducer } from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import Select from "../Select";
import TextInput from "../TextInput";
import styles from "./styles.module.scss";
//bura propslar selected listeden geir
const CheckForFlight = (props) => {
  const {
    item,
    index,
    journeyType,
    onchangeHandler,
    handleInputValue,
    whichSelectedItem,
  } = props;
  const { appData } = useSelector(selectPickUpDropOffReducer);

  const objectDetailStatuses = appData?.pointTypeCategories?.reduce(
    (obj, item) => ({
      ...obj,
      [item.id]: JSON.parse(item.detailsStatus),
    }),
    []
  );


  return (
    /**
     @propsOrderOnchangeHandler value,pickOrDrop,journeyType,,pcatId whichSelectedItem
     */
    <div>
      {/* //!checking for flight pickups transfer */}
      {/*//todo => zorunlu Transfer */}
      {item.pcatId === 1 && index === 0 && journeyType === 0 && (
        <div>
          {objectDetailStatuses[1]?.flightDetails.flightNumber.pickup === 1 && (
            <div className={styles.details_div}>
              <TextInput
                name="flightNumber"
                type="text"
                animationInput={true}
                title="Flight No"
                value={handleInputValue?.flightDetails.flightNumber}
                onChange={(e) => onchangeHandler(e, 0, 0, 1, whichSelectedItem)}
                errorMessage={
                  handleInputValue.errorMessage.length > 0
                    ? handleInputValue.errorMessage
                    : ""
                }
              />
            </div>
          )}

          {objectDetailStatuses[1]?.flightDetails?.waitingPickupTime.pickup ===
            1 && (
              <div className={`${styles.details_div}`}>
                <Select
                  animationSelect={true}
                  name="waitingPickupTime"
                  // value={handleInputValue?.flightDetails.waitingPickupTime}
                  data={waitingMinutes}
                  title="When should the driver pick you up?"
                  onChange={(e) => onchangeHandler(e, 0, 0, 1, whichSelectedItem)}
                  showModalInfo={true}
                  defaultValue={`${handleInputValue?.flightDetails.waitingPickupTime ? handleInputValue?.flightDetails?.waitingPickupTime : "--select--"}`}
                  // defaultValue={true}
                  placeholder={"--select--"}
                  value={
                    `
                      ${handleInputValue?.flightDetails.waitingPickupTime
                      ?
                      `${handleInputValue?.flightDetails.waitingPickupTime} minute${handleInputValue?.flightDetails.waitingPickupTime === 0 ? '' : 's'} after flight has landed`.trim()
                      : "--select--"}
                      `
                  }
                  forFlight={true}

                  errorMessage={
                    handleInputValue.waitingError.length > 0 ? "required" : ""
                  }
                />
                <div className={styles.select_description}>
                  after flight has landed
                  <i className="fa-solid fa-circle-question"></i>
                  <div className={styles.flight_hover_text}>
                    <div
                      className={styles.flight_hover_text_content}
                    // style="background: rgb(255, 254, 234); color: black; overflow: hidden; text-align: left; padding: 5px 9px; height: 300px;"
                    >
                      <p>
                        Please allow enough time to clear immigration and baggage
                        reclaim,{" "}
                        <span style={{ color: "#007ACC", fontWeight: "500" }}>
                          {" "}
                          after the requested pickup time, there will be a 30
                          minutes FREE waiting time at the airport
                        </span>
                        . Our driver will be waiting for you in the arrivals hall,
                        with an “Airport Pickups” name board with your name on it.
                        They will then accompany you to the vehicle.
                      </p>{" "}
                      <p>
                        If you realise that you will not be able to meet the
                        driver within the 30 minutes, then if you contact us, we
                        will hold the driver in the terminal for an extra 30 mins
                        at a charge of £5.00. If you are still not out within this
                        time then the driver will be pulled off and the job will
                        be registered as a no show.
                      </p>{" "}
                      <p>
                        For example, if your flight lands at 10:00 am, and you
                        have requested your pickup time to be 60 mins after the
                        flight landing time; our driver will be in the terminal at
                        11 am. The driver will wait till 11:30 am FREE of charge.
                        After this time, if requested, the driver will wait an
                        additional 30 mins chargeable at £5.00.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      )}

      {/* //!checking for flight dropOff  transfer */}
      {item.pcatId === 1 && index === 1 && journeyType === 0 && (
        <div>
          {objectDetailStatuses[1]?.flightDetails.flightNumber.dropoff ===
            2 && (
              <div className={styles.details_div}>
                <TextInput
                  name="flightNumber"
                  type="text"
                  animationInput={true}
                  value={handleInputValue?.flightDetails.flightNumber}
                  title="Flight No"
                  onChange={(e) => onchangeHandler(e, 1, 0, 1, whichSelectedItem)}
                />
              </div>
            )}
        </div>
      )}

      {/* //!checking for flight pickups return */}
      {/*//todo => zorunlu Return */}

      {item.pcatId === 1 && index === 0 && journeyType === 1 && (
        <div>
          {objectDetailStatuses[1]?.flightDetails.flightNumber.pickup === 1 && (
            <div className={`${styles.details_div}`}>
              <TextInput
                name="flightNumber"
                type="text"
                animationInput={true}
                value={handleInputValue?.flightDetails.flightNumber}
                title="Flight No"
                onChange={(e) => onchangeHandler(e, 0, 1, 1, whichSelectedItem)}
                errorMessage={
                  handleInputValue.errorMessage.length > 0
                    ? handleInputValue.errorMessage
                    : ""
                }
              />
            </div>
          )}
          {objectDetailStatuses[1]?.flightDetails?.waitingPickupTime.pickup ===
            1 && (
              <div className={`${styles.details_div}`}>
                <Select
                  animationSelect={true}
                  name="waitingPickupTime"
                  data={waitingMinutes}
                  // value={handleInputValue?.flightDetails.waitingPickupTime}
                  title="When should the driver pick you up?"
                  onChange={(e) => onchangeHandler(e, 0, 1, 1, whichSelectedItem)}
                  // defaultValue="--select--"
                  // placeholder="--select--"
                  defaultValue={`${handleInputValue?.flightDetails.waitingPickupTime ? handleInputValue?.flightDetails?.waitingPickupTime : "--select--"}`}
                  // defaultValue={true}
                  placeholder={"--select--"}
                  value={
                    `
                      ${handleInputValue?.flightDetails.waitingPickupTime
                      ? `${handleInputValue?.flightDetails.waitingPickupTime} minute${handleInputValue?.flightDetails.waitingPickupTime === 0 ? '' : 's'} after flight has landed`
                      : "--select--"}
                      `
                  }
                  forFlight={true}
                  errorMessage={
                    handleInputValue.waitingError.length > 0 ? "required" : ""
                  }
                />
              </div>
            )}
        </div>
      )}
      {/* //!checking for flight dropoff return */}
      {item.pcatId === 1 && index === 1 && journeyType === 1 && (
        <div>
          {objectDetailStatuses[1]?.flightDetails.flightNumber.dropoff ===
            2 && (
              <div className={`${styles.details_div}`}>
                <TextInput
                  name="flightNumber"
                  type="text"
                  animationInput={true}
                  title="Flight No"
                  value={handleInputValue?.flightDetails?.flightNumber}
                  onChange={(e) => onchangeHandler(e, 1, 1, 1, whichSelectedItem)}
                />
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default CheckForFlight;
