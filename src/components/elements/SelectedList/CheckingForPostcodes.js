import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectPickUpDropOffReducer } from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";

import Select from "../Select";
import TextArea from "../TextArea";
import styles from "./styles.module.scss";
const CheckingForPostcodes = (props) => {
  const { appData, postCodeAdresses } = useSelector(selectPickUpDropOffReducer);
  const {
    item,
    index,
    journeyType,
    handleInputValue,
    onchangeHandler,
    whichSelectedItem,
  } = props;
  const [postCodes, setPostCodes] = useState([]);

  const objectDetailStatuses = appData?.pointTypeCategories?.reduce(
    (obj, item) => ({
      ...obj,
      [item.id]: JSON.parse(item.detailsStatus),
    }),
    []
  );

  useEffect(() => {
    let postcodes = postCodeAdresses.filter(
      (codes) => item.postcode === codes.postcode && codes.addresses
    );

    setPostCodes(postcodes[0]?.addresses);
  }, [item, objectDetailStatuses]);

  return (
    /**
     @propsOrderOnchangeHandler value,pickOrDrop,journeyType,,pcatId whichSelectedItem
     */
    <>
      {/* //!checking for flight pickups transfer */}
      {item.pcatId === 5 && index === 0 && journeyType === 0 && (
        <div>
          {objectDetailStatuses[5]?.postCodeDetails?.id.pickup === 1 && (
            <div className={`${styles.details_div}`}>
              <Select
                animationSelect={true}
                placeholder="add a new adress if not listed "
                defaultValue={true}
                title="Postcode Address"
                data={postCodes?.length > 0 ? postCodes : postCodes}
                value={handleInputValue.postCodeDetails.id}
                name="id"
                onChange={(e) => onchangeHandler(e, 0, 0, 5, whichSelectedItem)}
              />
            </div>
          )}
          {handleInputValue.postCodeDetails.id === 0
            ? objectDetailStatuses[5]?.postCodeDetails?.postCodeAddress
                .pickup === 1 && (
                <div className={`${styles.details_div}`}>
                  <TextArea
                    animationTextarea={true}
                    placeholder="add a new adress if not listed "
                    defaultValue={true}
                    title="Adress Description *"
                    name="postCodeAddress"
                    onChange={(e) =>
                      onchangeHandler(e, 0, 0, 5, whichSelectedItem)
                    }
                    value={handleInputValue.postCodeDetails.postCodeAddress}
                    errorMessage={
                      handleInputValue.errorMessage.length > 0
                        ? handleInputValue.errorMessage
                        : ""
                    }
                  />
                </div>
              )
            : null}
        </div>
      )}
      {/* //!checking for flight drop transfer */}
      {item.pcatId === 5 && index === 1 && journeyType === 0 && (
        <div>
          {objectDetailStatuses[5]?.postCodeDetails?.id.dropoff === 1 && (
            <div className={`${styles.details_div}`}>
              <Select
                animationSelect={true}
                placeholder="add a new adress if not listed "
                defaultValue={true}
                title="Postcode Address"
                data={postCodes?.length > 0 ? postCodes : postCodes}
                name="id"
                onChange={(e) => onchangeHandler(e, 1, 0, 5, whichSelectedItem)}
                value={handleInputValue.postCodeDetails.id}
              />
            </div>
          )}
          {handleInputValue.postCodeDetails.id === 0
            ? objectDetailStatuses[5]?.postCodeDetails?.postCodeAddress
                .dropoff === 1 && (
                <div className={`${styles.details_div}`}>
                  <TextArea
                    animationTextarea={true}
                    title="Adress Description *"
                    name="postCodeAddress"
                    onChange={(e) =>
                      onchangeHandler(e, 1, 0, 5, whichSelectedItem)
                    }
                    value={handleInputValue.postCodeDetails.postCodeAddress}
                    errorMessage={
                      handleInputValue.errorMessage.length > 0
                        ? handleInputValue.errorMessage
                        : ""
                    }
                  />
                </div>
              )
            : null}
        </div>
      )}

      {/* //!checking for flight pick  return */}
      {item.pcatId === 5 && index === 0 && journeyType === 1 && (
        <div>
          {objectDetailStatuses[5]?.postCodeDetails?.id.pickup === 1 && (
            <div className={`${styles.details_div}`}>
              <Select
                animationSelect={true}
                placeholder="add a new adress if not listed "
                defaultValue={true}
                title="Postcode Address"
                data={postCodes?.length > 0 ? postCodes : postCodes}
                name="id"
                onChange={(e) => onchangeHandler(e, 0, 1, 5, whichSelectedItem)}
                value={handleInputValue.postCodeDetails.id}
              />
            </div>
          )}
          {handleInputValue.postCodeDetails.id === 0
            ? objectDetailStatuses[5]?.postCodeDetails?.postCodeAddress
                .pickup === 1 && (
                <div className={`${styles.details_div}`}>
                  <TextArea
                    animationTextarea={true}
                    title="Adress Description *"
                    name="postCodeAddress"
                    onChange={(e) =>
                      onchangeHandler(e, 0, 1, 5, whichSelectedItem)
                    }
                    value={handleInputValue.postCodeDetails.postCodeAddress}
                    errorMessage={
                      handleInputValue.errorMessage.length > 0
                        ? handleInputValue.errorMessage
                        : ""
                    }
                  />
                </div>
              )
            : null}
        </div>
      )}

      {/* //!checking for flight drop transfer */}
      {item.pcatId === 5 && index === 1 && journeyType === 1 && (
        <div>
          {objectDetailStatuses[5]?.postCodeDetails?.id.dropoff === 1 && (
            <div className={`${styles.details_div}`}>
              <Select
                animationSelect={true}
                placeholder="add a new adress if not listed "
                defaultValue={true}
                title="Postcode Address"
                data={postCodes?.length > 0 ? postCodes : postCodes}
                name="id"
                onChange={(e) => onchangeHandler(e, 1, 1, 5, whichSelectedItem)}
                value={handleInputValue.postCodeDetails.id}
              />
            </div>
          )}
          {handleInputValue.postCodeDetails.id === 0
            ? objectDetailStatuses[5]?.postCodeDetails?.postCodeAddress
                .dropoff === 1 && (
                <div className={`${styles.details_div}`}>
                  <TextArea
                    animationTextarea={true}
                    title="Adress Description *"
                    name="postCodeAddress"
                    onChange={(e) =>
                      onchangeHandler(e, 1, 1, 5, whichSelectedItem)
                    }
                    value={handleInputValue.postCodeDetails.postCodeAddress}
                    errorMessage={
                      handleInputValue.errorMessage.length > 0
                        ? handleInputValue.errorMessage
                        : ""
                    }
                  />
                </div>
              )
            : null}
        </div>
      )}
    </>
  );
};

export default CheckingForPostcodes;
