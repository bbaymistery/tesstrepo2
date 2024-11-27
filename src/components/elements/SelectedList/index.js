import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectHandlingInputs,
  selectPickUpDropOffReducer,
} from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import styles from "./styles.module.scss";
import CheckForCruises from "./CheckForCruises";
import CheckForFlight from "./CheckForFlight";
import CheckForTrain from "./CheckForTrain";
import CheckForRoomNumber from "./CheckForRoomNumber";
import CheckingForPostcodes from "./CheckingForPostcodes";
import CheckPlaceOfInterest from "./CheckPlaceOfInterest";
import CheckForCitites from "./CheckForCitites";
import CheckForUniversity from "./CheckForUniversity";
import CheckForOther from "./CheckForOther";
import { UPDATE_SELECTED_ITEMS_INPUTS } from "../../../store/pickUpDropOffReducer/pickUpDropTypes";

//hnaldeinputs comes from transfer journey detils
const SelectedList = (props) => {
  const { titleFromTo, selectedItems, index, journeyType, handleInputs,env } =
    props;
  const { appData } = useSelector(selectPickUpDropOffReducer);
  const dispatch = useDispatch();
  const imageObjects = appData?.pointTypeCategories?.reduce(
    (obj, item) => ({
      ...obj,
      [item.id]: item.image,
    }),
    {}
  );


  const onchangeHandler = (
    e,
    pickOrDrop,
    journeyType,
    pcatId,
    whichSelectedItem
  ) => {
    /**
     @propsOrder value,pickOrDrop,journeyType,name,,pcatId whichSelectedItem
     */
    if (
      e.target.value.includes('"')
      || e.target.value.includes(`'`)
      || e.target.value.includes('/')
      || e.target.value.includes('\\')
    ) {
      return
    }
    if (pcatId === 1 || pcatId === 5) {

      if (pcatId === 1) {
        dispatch({
          type: UPDATE_SELECTED_ITEMS_INPUTS,
          payload: {
            value:
              e.target.name === "waitingPickupTime"
                ? Number(e.target.value.split(" ")[0])
                : e.target.value,
            pickOrDrop,
            journeyType,
            nameOfInput: e.target.name,
            whichSelectedItem,
            categoryOfTheType: pcatId,
            selectedIndex: e.target.selectedIndex//bunu sadece waitingde kullanirix
          },
        });
      }
      if (pcatId === 5) {
        dispatch({
          type: UPDATE_SELECTED_ITEMS_INPUTS,
          payload: {
            value:
              e?.target?.name === "id"
                ? Number(
                  e?.target?.options[e?.target?.selectedIndex].getAttribute(
                    "id"
                  )
                )
                : 0,
            pickOrDrop,
            journeyType,
            nameOfInput:
              e?.target?.name === "postCodeAddress"
                ? e?.target.value
                : e?.target?.options[e?.target?.selectedIndex]?.value,
            whichSelectedItem,
            categoryOfTheType: pcatId,
          },
        });
      }
    } else {
      dispatch({
        type: UPDATE_SELECTED_ITEMS_INPUTS,
        payload: {
          value: e.target.value,
          pickOrDrop,
          journeyType,
          nameOfInput: e.target.name,
          whichSelectedItem,
          categoryOfTheType: pcatId,
        },
      });
    }
  };

  return (
    <div className={` ${styles.selected_list}`}>
      {selectedItems?.map((item, i) => {
        return (
          <div key={i} className={styles.list_container}>
            <div className={styles.list}>
              <div className={styles.list_title_div}>
                <p className={styles.list_title_div_icons}>
                  <span className={styles.list_title_div_icons_icon}>
                    {imageObjects && (
                      <img
                        className={styles.list_image}
                        src={`${env.apiDomain}${imageObjects[item?.pcatId]
                          }`}
                        alt={item.address}
                      />
                    )}
                  </span>
                  <span className={styles.list_title_div_icons_text}>
                    {titleFromTo}
                  </span>
                </p>
                <p className={styles.list_title_div_title}>{item.address}</p>
              </div>
              {/* //!checking for flight pickups */}
              <CheckForFlight
                item={item}
                journeyType={journeyType}
                index={index}
                onchangeHandler={onchangeHandler}
                handleInputValue={handleInputs[i]}
                whichSelectedItem={i}
              />

              {/* //! checkingForCruises  */}
              <CheckForCruises
                item={item}
                journeyType={journeyType}
                index={index}
                onchangeHandler={onchangeHandler}
                handleInputValue={handleInputs[i]}
                whichSelectedItem={i}
              />
              {/* CHECK FOR TRAIN */}
              <CheckForTrain
                item={item}
                journeyType={journeyType}
                index={index}
                onchangeHandler={onchangeHandler}
                handleInputValue={handleInputs[i]}
                whichSelectedItem={i}
              />
              {/* check for room */}
              {/* <CheckForRoomNumber
                item={item}
                journeyType={journeyType}
                index={index}
                onchangeHandler={onchangeHandler}
                handleInputValue={handleInputs[i]}
                whichSelectedItem={i}
              /> */}

              {/*//! checking for postcodes  */}
              <CheckingForPostcodes
                item={item}
                journeyType={journeyType}
                index={index}
                onchangeHandler={onchangeHandler}
                handleInputValue={handleInputs[i]}
                whichSelectedItem={i}
              />

              {/*chck for place of interest  */}
              <CheckPlaceOfInterest
                item={item}
                journeyType={journeyType}
                index={index}
                onchangeHandler={onchangeHandler}
                handleInputValue={handleInputs[i]}
                whichSelectedItem={i}
              />

              {/* //check for citites   */}

              <CheckForCitites
                item={item}
                journeyType={journeyType}
                index={index}
                onchangeHandler={onchangeHandler}
                handleInputValue={handleInputs[i]}
                whichSelectedItem={i}
              />

              {/* universitirs */}

              <CheckForUniversity
                item={item}
                journeyType={journeyType}
                index={index}
                onchangeHandler={onchangeHandler}
                handleInputValue={handleInputs[i]}
                whichSelectedItem={i}
              />
              {/* CHECK FOR  other locations */}
              <CheckForOther
                item={item}
                journeyType={journeyType}
                index={index}
                onchangeHandler={onchangeHandler}
                handleInputValue={handleInputs[i]}
                whichSelectedItem={i}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SelectedList;
