import React from "react";
import { useSelector } from "react-redux";
import { selectPickUpDropOffReducer } from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import TextInput from "../TextInput";
import styles from "./styles.module.scss";
//bura propslar selected listeden geir
const CheckPlaceOfInterest = (props) => {
  const {
    item,
    index,
    journeyType,
    handleInputValue,
    onchangeHandler,
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
      {item.pcatId === 7 && index === 0 && journeyType === 0 && (
        <div>
          {objectDetailStatuses[7]?.["address-description"].pickup === 2 && (
            <div className={styles.details_div}>
              <TextInput
                title="Places of Interest"
                type="text"
                name="address-description"
                onChange={(e) => onchangeHandler(e, 0, 0, 7, whichSelectedItem)}
                value={handleInputValue["address-description"]}
                animationInput={true}
              />
            </div>
          )}
        </div>
      )}

      {/* //!checking for train dropOff  transfer */}
      {item.pcatId === 7 && index === 1 && journeyType === 0 && (
        <div>
          {objectDetailStatuses[7]?.["address-description"].dropoff === 2 && (
            <div className={styles.details_div}>
              <TextInput
                title="Places of Interest"
                type="text"
                onChange={(e) => onchangeHandler(e, 1, 0, 7, whichSelectedItem)}
                name="address-description"
                value={handleInputValue["address-description"]}
                animationInput={true}
              />
            </div>
          )}
        </div>
      )}

      {/* //!checking for train pickups return */}

      {item.pcatId === 7 && index === 0 && journeyType === 1 && (
        <div>
          {objectDetailStatuses[7]?.["address-description"].pickup === 2 && (
            <div className={styles.details_div}>
              <TextInput
                title="Places of Interest"
                type="text"
                name="address-description"
                value={handleInputValue["address-description"]}
                animationInput={true}
                onChange={(e) => onchangeHandler(e, 0, 1, 7, whichSelectedItem)}
              />
            </div>
          )}
        </div>
      )}

      {/* //!checking for cruises dropoff return */}
      {item.pcatId === 7 && index === 1 && journeyType === 1 && (
        <div>
          {objectDetailStatuses[7]?.["address-description"].dropoff === 2 && (
            <div className={styles.details_div}>
              <TextInput
                title="Train Number"
                type="text"
                name="trainNumber"
                value={handleInputValue["address-description"]}
                animationInput={true}
                onChange={(e) => onchangeHandler(e, 1, 1, 7, whichSelectedItem)}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CheckPlaceOfInterest;
