import React from "react";
import { useSelector } from "react-redux";
import { selectPickUpDropOffReducer } from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import TextInput from "../TextInput";
import styles from "./styles.module.scss";
//bura propslar selected listeden geir
const CheckForCitites = (props) => {
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
      {item.pcatId === 8 && index === 0 && journeyType === 0 && (
        <div>
          {objectDetailStatuses[8]?.["address-description"].pickup === 2 && (
            <div className={styles.details_div}>
              <TextInput
                title="Cities"
                type="text"
                name="address-description"
                value={handleInputValue["address-description"]}
                animationInput={true}
                onChange={(e) => onchangeHandler(e, 0, 0, 8, whichSelectedItem)}
              />
            </div>
          )}
        </div>
      )}
      {/* //!checking for cruisess dropOff  transfer */}
      {item.pcatId === 8 && index === 1 && journeyType === 0 && (
        <div>
          {objectDetailStatuses[8]?.["address-description"].dropoff === 2 && (
            <div className={styles.details_div}>
              <TextInput
                title="Cities"
                type="text"
                name="address-description"
                value={handleInputValue["address-description"]}
                animationInput={true}
                onChange={(e) => onchangeHandler(e, 1, 0, 8, whichSelectedItem)}
              />
            </div>
          )}
        </div>
      )}
      {/* //!checking for cruises pickups return */}
      {item.pcatId === 8 && index === 0 && journeyType === 1 && (
        <div>
          {objectDetailStatuses[8]?.["address-description"].pickup === 2 && (
            <div className={styles.details_div}>
              <TextInput
                title="Cities"
                type="text"
                name="address-description"
                value={handleInputValue["address-description"]}
                animationInput={true}
                onChange={(e) => onchangeHandler(e, 0, 1, 8, whichSelectedItem)}
              />
            </div>
          )}
        </div>
      )}
      {/* //!checking for cruises dropoff return */}
      {item.pcatId === 8 && index === 1 && journeyType === 1 && (
        <div>
          {objectDetailStatuses[8]?.["address-description"].dropoff === 2 && (
            <div className={styles.details_div}>
              <TextInput
                title="Cities"
                type="text"
                name="address-description"
                value={handleInputValue["address-description"]}
                animationInput={true}
                onChange={(e) => onchangeHandler(e, 1, 1, 8, whichSelectedItem)}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CheckForCitites;
