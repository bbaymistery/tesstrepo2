import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { substrText } from "../../../helpers/substr";
import { useWindowSize } from "../../../hooks/useWindowSize";
import {
  collectPickUpPoints,
  deleteItemFromList,
} from "../../../store/pickUpDropOffReducer/pickUpDropAction";
import {
  onewayDroopOffPointsOneWay,
  quotationsDroppOffOneWay,
  selectPickUpDropOffReducer,
} from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import { SET_ERROR_INSIDE_HEROR_CONTENT } from "../../../store/pickUpDropOffReducer/pickUpDropTypes";
import { onewayShowInputDropField } from "../../../store/showFieldReducer/showFieldSelectors";
import {
  SET_SHOW_DROP_FIELD_ONEWAY,
  SET_SHOW_PICK_FIELD_ONEWAY,
} from "../../../store/showFieldReducer/showFieldTypes";
import LoadingInput from "../LoadingInput";

import styles from "../PickUpOneWayInput/styles.module.scss";
import dynamic from "next/dynamic";
import Image from "next/image";
const HandleSearchResults = dynamic(() => import("../HandleSearchResults"))

//hero ccomp => oneway comp = >dropInputsOffValue, setDropInputsOffValue
const DropOffOneWayInput = ({ dropInputsOffValue, setDropInputsOffValue, setInternalState, internalState ,env}) => {
  const dispatch = useDispatch();
  const { loadingDropOffOneWay, appData } = useSelector(
    selectPickUpDropOffReducer
  );
  const selectedDroppOffOnewayPoints = useSelector(onewayDroopOffPointsOneWay);
  const selectedDropPoints = useSelector(quotationsDroppOffOneWay);
  //show fields
  const showDroppFieldPickUpIndex = useSelector(onewayShowInputDropField);
  const [dropPoints, setDropPoints] = useState([0]);
  const imageObjects = appData?.pointTypeCategories?.reduce(
    (obj, item) => ({
      ...obj,
      [item.id]: item.image,
    }),
    {}
  );
  const handleDropOfField = (index) => {
    if (typeof showDroppFieldPickUpIndex === "number") {
      dispatch({ type: SET_SHOW_DROP_FIELD_ONEWAY, payload: null });
      return;
    }
    dispatch({ type: SET_SHOW_DROP_FIELD_ONEWAY, payload: index });
    dispatch({ type: SET_SHOW_PICK_FIELD_ONEWAY, payload: false });

    if (selectedDropPoints) {
      setDropInputsOffValue((prev) =>
        prev.map((item) =>
          item?.index === index ? { ...item, value: "" } : item
        )
      );
    }
  };
  const onchangeHandler = (e, indexOfInput, pickOrDropp, journeyType) => {
    //collecting suggestion if input value more than 2 letter
    let value = e.target.value;
    if (value.includes('"') || value.includes(`'`) || value.includes('/') || value.includes('\\')) {
      return
    }
    setDropInputsOffValue((prev) =>
      prev.map((item) =>
        item?.index === indexOfInput ? { ...item, value } : item
      )
    );
    if (e.target.value.length > 2) {
      dispatch(collectPickUpPoints(e.target.value, pickOrDropp, journeyType));
    }

  };
  const addExtraPickPoint = (dropItem) => {
    //whenever i add item to redux I change havePoint true
    if (dropInputsOffValue[dropItem].havePoint) {
      setDropPoints((prev) => [...prev, dropItem + 1]);
      setDropInputsOffValue([
        ...dropInputsOffValue,
        {
          index: dropInputsOffValue.length,
          value: "",
          errorMessage: "",
          havePoint: false,
          checkInQuotation: false,
        },
      ]);
    } else {
      //handling errors
      setDropInputsOffValue((prev) =>
        prev.map((item) =>
          item?.index === dropItem
            ? { ...item, errorMessage: "required" }
            : item
        )
      );
      dispatch({ type: SET_ERROR_INSIDE_HEROR_CONTENT, payload: true });
      setTimeout(() => {
        dispatch({ type: SET_ERROR_INSIDE_HEROR_CONTENT, payload: false });
      }, 3500);
    }
  };

  const deleteInputField = (e, index) => {
    // setPickUpCounts((prev) => prev.filter((it) => it !== index));
    let newPcikUpcounts = [...dropPoints];
    let deletedPointCountIndex = newPcikUpcounts.indexOf(dropPoints[index]);
    newPcikUpcounts?.splice(deletedPointCountIndex, 1);
    setDropPoints(newPcikUpcounts);

    let newInp = [...dropInputsOffValue];
    let deletedInputField = newInp.indexOf(dropInputsOffValue[index]);
    newInp?.splice(deletedInputField, 1);
    setDropInputsOffValue(newInp);

    //check edirik Eger indexi1 bir olanin adresi varsa Cunki ilk eklenen inputfield icerigi bos olur
    dispatch(deleteItemFromList(1, 0, index));
    //BIRINCI SIFIR INDEX  PICK UP MI DROPMU ANLAMINDADI
    //IKINCI SIFIR >JOURNEY TYPE
    //INDEXOFCURRENTiTEM
  };
  let size = useWindowSize()
  let { width } = size
  const closeModal = (params = {}) => {
    if (width < 990) {
      document.body.style.overflow = "unset";
      let { index, destination } = params
      let inputField = document.getElementById("input_focused")
      inputField.style.opacity = 1
      setInternalState({ [`${destination}-search-focus-${index}`]: false })
      let navbarElement = document.querySelector("#navbar_container")
      navbarElement.style.display = "flex"
    }

  }
 
  const setFocusToInput = (params = {}) => {
    //burda direk inputun ozune focu etmedigimiz ucun churchildekinnen fergli olur
    let { e, destination, index } = params
    if (width < 990) {
      e.target.style.opacity = 0
      let navbarElement = document.querySelector("#navbar_container")
      navbarElement.style.display = "none"
      const container = document?.querySelector(`#content${index}${destination}`);
      console.log({ container });
      setTimeout(() => { e.target.style.opacity = 1 }, 150);
      setTimeout(() => { window.scroll({ top: container?.offsetTop, left: 0, behavior: "smooth", }); }, 100);
    }
    setInternalState({ [`${destination}-search-focus-${index}`]: window.innerWidth > 990 ? false : true })
  }
  useEffect(() => {
    selectedDroppOffOnewayPoints.map((selectedItem, index) => {
      // yani eger burda  secilen itemin indexi ile bizim nput valunun indexi eynidirse Ozaman have pointi true edirik
      setDropInputsOffValue((prev) =>
        prev.map((item) =>
          item?.index === index
            ? {
              ...item,
              havePoint: true,
              errorMessage: "",
              checkInQuotation: false,
            }
            : item
        )
      );
    });
  }, [selectedDroppOffOnewayPoints]);

  useEffect(() => {
    if (selectedDroppOffOnewayPoints.length > 0) {
      let indexes = selectedDroppOffOnewayPoints.map((a, i) => { return i })
      setDropPoints(indexes)

      let dropOffInputsValue = []
      for (let i = 0; i < indexes.length; i++) {
        dropOffInputsValue.push({ index: i, value: '', errorMessage: '', havePoint: true, checkInQuotation: false })
      }
      setDropInputsOffValue(dropOffInputsValue)
    } else {
      setDropPoints([0])
    }

  }, [selectedDroppOffOnewayPoints])
  return (
    <div className={styles.pickup_points}>
      {dropPoints.map((dropItem, index) => {
        return (
          <div key={index} className={styles.inp_container}>
            {selectedDroppOffOnewayPoints[index]?.address && (
              <div className={styles.tooltip_container}>
                <div className={styles.tooltip}>
                  {selectedDroppOffOnewayPoints[index]?.address}
                </div>
              </div>
            )}
            <div className={styles.input_div}>
              <p className={styles.input_div_title}>
                <span>
                  {selectedDroppOffOnewayPoints[index]?.address && (
                    <i className="fa-solid fa-check"></i>
                  )}
                  Drop Off Location {dropPoints.length > 1 && index + 1}
                </span>
                {!selectedDroppOffOnewayPoints[index]?.address &&
                  dropInputsOffValue[index].checkInQuotation ? (
                  <span className="error">required</span>
                ) : (
                  ""
                )}
              </p>
              <div className={styles.input_div_display_box}>
                <div
                  className={`${styles.display_box_text}
                  ${dropInputsOffValue[dropItem]?.errorMessage.length > 0
                      ? "required"
                      : ""
                    }

                  ${!selectedDroppOffOnewayPoints[index]?.address &&
                      dropInputsOffValue[index].checkInQuotation
                      ? "required"
                      : ""
                    }
                  `}
                  onClick={() => handleDropOfField(index)}
                >
                  {/* selectedDroppOffOnewayPoints */}
                  {imageObjects &&
                    selectedDroppOffOnewayPoints[index]?.address && (
                      <img
                        className={styles.left_icon}
                        style={{ width: "1px" }}
                        src={`${env.apiDomain}${imageObjects[selectedDroppOffOnewayPoints[index]?.pcatId]}`}
                        alt={selectedDroppOffOnewayPoints[index]?.address}
                      />
                    )}
                  <p>
                    {selectedDroppOffOnewayPoints[index]?.address
                      ? substrText(selectedDroppOffOnewayPoints[index]?.address)
                      : "Airport,Hotel or Full Postcode .."}{" "}
                  </p>

                  {showDroppFieldPickUpIndex === index ? (
                    <i
                      className={`fa-solid fa-angle-up ${styles.angleup_icon}`}
                    ></i>
                  ) : (
                    <i
                      className={`fa-solid fa-angle-down  ${styles.angleup_icon}`}
                    ></i>
                  )}
                </div>
                {dropItem !== 0 && (
                  <i
                    onClick={(e) => deleteInputField(e, index)}
                    className={`fa-solid fa-trash-can ${styles.trash_icon}`}
                  ></i>
                )}
              </div>
            </div>
            <div className={styles.result_box}>
              {showDroppFieldPickUpIndex === index && (
                <div className={`${styles['search-input-container']} ${styles.search_box}`} f={String(internalState[`dropoff-search-focus-${index}`])} id={`content${index}dropoff`}>
                  <div className={styles.popup_header} f={String(internalState[`dropoff-search-focus-${index}`])}>
                    <i className={`fa-solid fa-xmark ${styles.close_icon}`} onClick={(e) => closeModal({ index, destination: "dropoff" })}></i>
                    <p>Where ?</p>
                  </div>
                  <div className={styles.search_box_input_div}>
                    <input
                      id="input_focused"
                      autoFocus
                      type="text"
                      value={dropInputsOffValue[index].value}
                      onFocus={e => setFocusToInput({ e, destination: "dropoff", index })}
                      name="dropoOffOneway"
                      onChange={(e) => onchangeHandler(e, index, 1, 0)}
                      f={String(internalState[`dropoff-search-focus-${index}`])} //giving a style if we focused
                    />
                    <i className="fa-solid fa-magnifying-glass"></i>
                    {loadingDropOffOneWay && (
                      <div className={styles.loading_div}>
                        <LoadingInput />
                      </div>
                    )}
                  </div>
                  {dropInputsOffValue[index].value.length <= 2 && (
                    <p className={styles.explanation}>
                      Please write Airport ,Hotel or Full Post Code
                    </p>
                  )}

                  {dropInputsOffValue[index].value.length > 2 &&
                    !loadingDropOffOneWay && (
                      <HandleSearchResults
                        pickOrDrop={"dropoffPoints"}
                        journeyType={0}
                        indexOfInputField={index}
                        env={env}

                      />
                    )}
                </div>
              )}
            </div>
            {index + 1 === dropPoints.length && (
              <div className={styles.add_extrafly_div} onClick={() => addExtraPickPoint(dropItem)}   >
                <i
                  className={`fa-solid fa-plus ${styles.add_extrafly_div_icon}`}
                ></i>
                Add Extra Dropoff Point
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DropOffOneWayInput;
