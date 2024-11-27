import React from "react";
import { useSelector } from "react-redux";
import { selectPickUpDropOffReducer } from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import TextInput from "../TextInput";
import styles from "./styles.module.scss";
//bura propslar selected listeden geir
const CheckForTrain = (props) => {
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
      {item.pcatId === 3 && index === 0 && journeyType === 0 && (
        <div>
          {objectDetailStatuses[3]?.trainNumber.pickup === 2 && (
            <div className={styles.details_div}>
              <TextInput
                title="Train Number"
                type="text"
                name="trainNumber"
                value={handleInputValue.trainNumber}
                animationInput={true}
                onChange={(e) => onchangeHandler(e, 0, 0, 3, whichSelectedItem)}
              />
            </div>
          )}
        </div>
      )}

      {/* //!checking for train dropOff  transfer */}
      {item.pcatId === 3 && index === 1 && journeyType === 0 && (
        <div>
          {objectDetailStatuses[3]?.trainNumber.dropoff === 2 && (
            <div className={styles.details_div}>
              <TextInput
                title="Train Number"
                type="text"
                name="trainNumber"
                value={handleInputValue.trainNumber}
                animationInput={true}
                onChange={(e) => onchangeHandler(e, 1, 0, 3, whichSelectedItem)}
              />
            </div>
          )}
        </div>
      )}

      {/* //!checking for train pickups return */}

      {item.pcatId === 3 && index === 0 && journeyType === 1 && (
        <div>
          {objectDetailStatuses[3]?.trainNumber.pickup === 2 && (
            <div className={styles.details_div}>
              <TextInput
                title="Train Number"
                type="text"
                name="trainNumber"
                value={handleInputValue.trainNumber}
                animationInput={true}
                onChange={(e) => onchangeHandler(e, 0, 1, 3, whichSelectedItem)}
              />
            </div>
          )}
        </div>
      )}

      {/* //!checking for cruises dropoff return */}
      {item.pcatId === 3 && index === 1 && journeyType === 1 && (
        <div>
          {objectDetailStatuses[3]?.trainNumber.dropoff === 2 && (
            <div className={styles.details_div}>
              <TextInput
                title="Train Number"
                type="text"
                name="trainNumber"
                value={handleInputValue.trainNumber}
                animationInput={true}
                onChange={(e) => onchangeHandler(e, 1, 1, 3, whichSelectedItem)}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CheckForTrain;
