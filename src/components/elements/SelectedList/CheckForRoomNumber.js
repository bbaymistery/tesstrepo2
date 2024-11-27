import React from "react";
import { useSelector } from "react-redux";
import { selectPickUpDropOffReducer } from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import TextInput from "../TextInput";
import styles from "./styles.module.scss";
//bura propslar selected listeden geir
const CheckForRoomNumber = (props) => {
  const {
    inTransferComp,
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
      {/* {item.pcatId === 4 && index === 0 && journeyType === 0 && (
        <div>
          {objectDetailStatuses[4]?.roomNumber.pickup === 1 && (
            <div className={styles.details_div}>
              <TextInput
                title="Adress Description"
                type="text"
                name="roomNumber"
                value={handleInputValue.roomNumber}
                animationInput={true}
                onChange={(e) => onchangeHandler(e, 0, 0, 4, whichSelectedItem)}
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

      {item.pcatId === 4 && index === 0 && journeyType === 1 && (
        <div>
          {objectDetailStatuses[4]?.roomNumber.pickup === 1 && (
            <div className={styles.details_div}>
              <TextInput
                title="Adress Description"
                type="text"
                name="roomNumber"
                value={handleInputValue.roomNumber}
                errorMessage={
                  handleInputValue.errorMessage.length > 0
                    ? handleInputValue.errorMessage
                    : ""
                }
                animationInput={true}
                onChange={(e) => onchangeHandler(e, 0, 1, 4, whichSelectedItem)}
              />
            </div>
          )}
        </div>
      )} */}
    </>
  );
};

export default CheckForRoomNumber;
