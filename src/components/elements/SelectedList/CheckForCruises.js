import React from "react";
import { useSelector } from "react-redux";
import { selectPickUpDropOffReducer } from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import TextInput from "../TextInput";

import styles from "./styles.module.scss";
//bura propslar selected listeden geir
const CheckForCruises = (props) => {
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
    <>
      {/* //!checking for cruises pickups transfer */}
      {item.pcatId === 2 && index === 0 && journeyType === 0 && (
        <div>
          {objectDetailStatuses[2]?.cruiseNumber.pickup === 1 && (
            <div className={styles.details_div}>
              <TextInput
                title="Cruise Name"
                type="text"
                name="cruiseNumber"
                value={handleInputValue.cruiseNumber}
                animationInput={true}
                onChange={(e) => onchangeHandler(e, 0, 0, 2, whichSelectedItem)}
                errorMessage={
                  handleInputValue.errorMessage.length > 0
                    ? handleInputValue.errorMessage
                    : ""
                }
              />
            </div>
          )}
        </div>
      )}
      {/* //!checking for cruisess dropOff  transfer */}
      {item.pcatId === 2 && index === 1 && journeyType === 0 && (
        <div>
          {objectDetailStatuses[2]?.cruiseNumber.dropoff === 2 && (
            <div className={styles.details_div}>
              <TextInput
                title="Cruise Name"
                type="text"
                name="cruiseNumber"
                value={handleInputValue.cruiseNumber}
                animationInput={true}
                onChange={(e) => onchangeHandler(e, 1, 0, 2, whichSelectedItem)}
              />
            </div>
          )}
        </div>
      )}
      {/* //!checking for cruises pickups return */}
      {item.pcatId === 2 && index === 0 && journeyType === 1 && (
        <div>
          {objectDetailStatuses[2]?.cruiseNumber.pickup === 1 && (
            <div className={styles.details_div}>
              <TextInput
                title="Cruise Name"
                type="text"
                name="cruiseNumber"
                value={handleInputValue.cruiseNumber}
                animationInput={true}
                onChange={(e) => onchangeHandler(e, 0, 1, 2, whichSelectedItem)}
                errorMessage={
                  handleInputValue.errorMessage.length > 0
                    ? handleInputValue.errorMessage
                    : ""
                }
              />
            </div>
          )}
        </div>
      )}
      {/* //!checking for cruises dropoff return */}
      {item.pcatId === 2 && index === 1 && journeyType === 1 && (
        <div>
          {objectDetailStatuses[2]?.cruiseNumber.dropoff === 2 && (
            <div className={styles.details_div}>
              <TextInput
                title="Cruise Name"
                type="text"
                name="cruiseNumber"
                value={handleInputValue.cruiseNumber}
                animationInput={true}
                onChange={(e) => onchangeHandler(e, 1, 1, 2, whichSelectedItem)}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CheckForCruises;
