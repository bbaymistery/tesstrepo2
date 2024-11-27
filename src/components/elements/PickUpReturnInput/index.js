import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { substrText } from "../../../helpers/substr";
import {
  quotationsPickReturn,
  returnPickUpPointsReturn,
  selectPickUpDropOffReducer,
} from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import { SET_ERROR_INSIDE_HEROR_CONTENT } from "../../../store/pickUpDropOffReducer/pickUpDropTypes";
import { returnShowInputPickField } from "../../../store/showFieldReducer/showFieldSelectors";
import {
  SET_SHOW_DROP_FIELD_RETURN,
  SET_SHOW_PICK_FIELD_RETURN,
} from "../../../store/showFieldReducer/showFieldTypes";
import HandleSearchResults from "../HandleSearchResults";
import LoadingInput from "../LoadingInput";
import styles from "../PickUpOneWayInput/styles.module.scss";
import {
  collectPickUpPoints,
  deleteItemFromList,
} from "../../../store/pickUpDropOffReducer/pickUpDropAction";
import { useWindowSize } from "../../../hooks/useWindowSize";
import Image from "next/image";
const PickUpReturnInput = ({ pickInputsUpValueReturn, setPickInputUpsValueReturn, setInternalState, internalState, env }) => {
  const dispatch = useDispatch();

  const selectedPickupReturnPoints = useSelector(returnPickUpPointsReturn);
  const { loadingPickUpReturn, appData } = useSelector(
    selectPickUpDropOffReducer
  );
  const pikUpPoints = useSelector(quotationsPickReturn);
  const showInputFieldPickUpIndex = useSelector(returnShowInputPickField);
  const [pickUpCounts, setPickUpCounts] = useState([0]);
  // const [pickInputsUpValueReturn, setPickInputUpsValueReturn] = useState([
  //   { index: 0, value: "", errorMessage: "", havePoint: false },
  // ]);
  const imageObjects = appData?.pointTypeCategories?.reduce(
    (obj, item) => ({
      ...obj,
      [item.id]: item.image,
    }),
    {}
  );
  const onchangeHandler = (e, indexOfInput, pickOrDropp, journeyType) => {
    //collecting suggestion if input value more than 2 letter
    let value = e.target.value;
    if (value.includes('"') || value.includes(`'`) || value.includes('/') || value.includes('\\')) {
      return
    }
    setPickInputUpsValueReturn((prev) =>
      prev.map((item) =>
        item?.index === indexOfInput ? { ...item, value } : item
      )
    );
    if (e.target.value.length > 2) {
      dispatch(collectPickUpPoints(e.target.value, pickOrDropp, journeyType));
    }
    //if input value less than 3 letter it will clean  previous data
    // if (e.target.value.length === 2) dispatch({ type: RESET_INPUT_LOADINGS });
  };
  const handlePickUpField = (index) => {
    //showInputFieldPickUpIndex  this is a index which comes from reducer
    if (typeof showInputFieldPickUpIndex === "number") {
      dispatch({ type: SET_SHOW_PICK_FIELD_RETURN, payload: null });
      return;
    }
    dispatch({ type: SET_SHOW_DROP_FIELD_RETURN, payload: null });
    dispatch({ type: SET_SHOW_PICK_FIELD_RETURN, payload: index });
    //diyelim ki lhr yazdk results geldi Yazilan inut boxdan cxb basga yere tikliyib gelib yene yazilana geldigimizde asagidaki fonksyon inputun valuesunu siler
    if (pikUpPoints) {
      setPickInputUpsValueReturn((prev) =>
        prev.map((item) =>
          item?.index === index ? { ...item, value: "" } : item
        )
      );
    }
  };
  const addExtraPickPoint = (pickUpItem) => {
    //whenever i add item to redux I change havePoint true
    if (pickInputsUpValueReturn[pickUpItem].havePoint) {
      setPickUpCounts((prev) => [...prev, pickUpItem + 1]);
      setPickInputUpsValueReturn([
        ...pickInputsUpValueReturn,
        {
          index: pickInputsUpValueReturn.length,
          value: "",
          errorMessage: "",
          havePoint: false,
          checkInQuotation: false,
        },
      ]);
    } else {
      //handling errors
      setPickInputUpsValueReturn((prev) =>
        prev.map((item) =>
          item?.index === pickUpItem
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
    let newPcikUpcounts = [...pickUpCounts];
    let deletedPickUpCountIndex = newPcikUpcounts.indexOf(pickUpCounts[index]);
    newPcikUpcounts?.splice(deletedPickUpCountIndex, 1);
    setPickUpCounts(newPcikUpcounts);

    let newInp = [...pickInputsUpValueReturn];
    let deletedInputField = newInp.indexOf(pickInputsUpValueReturn[index]);
    newInp?.splice(deletedInputField, 1);
    setPickInputUpsValueReturn(newInp);

    //check edirik Eger indexi1 bir olanin adresi varsa Cunki ilk eklenen inputfield icerigi bos olur
    dispatch(deleteItemFromList(0, 1, index));
    //BIRINCI SIFIR INDEX  PICK UP MI DROPMU ANLAMINDADI
    //IKINCI SIFIR >JOURNEY TYPE
    //INDEXOFCURRENTiTEM
  };
  let size = useWindowSize()
  let { width } = size
  const closeModal = (params = {}) => {
    if (width < 990) {

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
    console.log(params);

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
    selectedPickupReturnPoints.map((selectedItem, index) => {
      // yani eger burda  secilen itemin indexi ile bizim nput valunun indexi eynidirse Ozaman have pointi true edirik
      setPickInputUpsValueReturn((prev) =>
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
  }, [selectedPickupReturnPoints]);


  //returnde olarken sonra onewaya gecb returne gayidanda inputfieldlerin faln yerleri eyni galsin deye bunu yazdk
  useEffect(() => {
    let a = [];
    let newInputs = [];
    let lengthOfPoint = selectedPickupReturnPoints.length;
    if (lengthOfPoint > 0) {
      for (let i = 0; i < lengthOfPoint; i++) {
        a.push(i);
        newInputs.push({
          index: i,
          errorMessage: "",
          havePoint: true,
          checkInQuotation: false,
        });
      }
      setPickUpCounts(a);
      setPickInputUpsValueReturn(newInputs);
    }
  }, [selectedPickupReturnPoints]);

  return (
    <div className={styles.pickup_points}>
      {/* bos olan  */}
      {pickUpCounts?.map((pickUpItem, index) => {
        return (
          <div key={pickUpItem} className={styles.inp_container}>
            {selectedPickupReturnPoints[index]?.address && (
              <div className={styles.tooltip_container}>
                <div className={styles.tooltip}>
                  {selectedPickupReturnPoints[index]?.address}
                </div>
              </div>
            )}
            <div className={styles.input_div}>
              <p className={styles.input_div_title}>
                <span>
                  {selectedPickupReturnPoints[index]?.address && (
                    <i className="fa-solid fa-check"></i>

                  )}
                  Pick Up Location {pickUpCounts.length > 1 && index + 1}
                </span>
                {!selectedPickupReturnPoints[index]?.address &&
                  pickInputsUpValueReturn[index]?.checkInQuotation ? (
                  <span className="error">required</span>
                ) : (
                  ""
                )}
              </p>
              <div className={styles.input_div_display_box}>
                <div
                  onClick={() => handlePickUpField(index)}
                  className={`${styles.display_box_text}
                   ${pickInputsUpValueReturn[pickUpItem]?.errorMessage.length >
                      0
                      ? "required"
                      : ""
                    }
                   ${!selectedPickupReturnPoints[index]?.address &&
                      pickInputsUpValueReturn[index]?.checkInQuotation
                      ? "required"
                      : ""
                    }
                  `}
                >
                  {imageObjects &&
                    selectedPickupReturnPoints[index]?.address && (
                      <img
                        className={styles.left_icon}
                        src={`${env.apiDomain}${imageObjects[
                          selectedPickupReturnPoints[index]?.pcatId
                        ]
                          }`}
                        alt={selectedPickupReturnPoints[index]?.address}
                      />
                    )}
                  <p>
                    {selectedPickupReturnPoints[index]?.address
                      ? substrText(selectedPickupReturnPoints[index]?.address)
                      : "Airport,Hotel or Full Postcode .."}{" "}
                  </p>
                  {showInputFieldPickUpIndex === index ? (
                    <i
                      className={`fa-solid fa-angle-up ${styles.angleup_icon}`}
                    ></i>
                  ) : (
                    <i
                      className={`fa-solid fa-angle-down  ${styles.angleup_icon}`}
                    ></i>
                  )}
                </div>
                {pickUpItem !== 0 && (
                  <i
                    onClick={(e) => deleteInputField(e, index)}
                    className={`fa-solid fa-trash-can ${styles.trash_icon}`}
                  ></i>
                )}
              </div>
            </div>
            <div className={styles.result_box}>
              {showInputFieldPickUpIndex === index && (
                <div className={`${styles['search-input-container']} ${styles.search_box}`} f={String(internalState[`pickup-search-focus-1`])} id={`content1pickup`}>
                  <div className={styles.popup_header} f={String(internalState[`pickup-search-focus-1`])}>
                    <i className={`fa-solid fa-xmark ${styles.close_icon}`} onClick={(e) => closeModal({ index: 1, destination: "pickup" })}></i>

                    <p>From ?</p>
                  </div>
                  <div className={styles.search_box_input_div}>
                    <input
                      id="input_focused"
                      autoFocus
                      type="text"
                      value={pickInputsUpValueReturn[index].value}
                      name="pickupReturn"
                      onChange={(e) => onchangeHandler(e, index, 0, 1)}
                      onFocus={e => setFocusToInput({ e, destination: "pickup", index: 1 })}
                      f={String(internalState[`pickup-search-focus-1`])} //giving a style if we focused
                    />
                    <i className="fa-solid fa-magnifying-glass"></i>

                    {loadingPickUpReturn && (
                      <div className={styles.loading_div}>
                        <LoadingInput />
                      </div>
                    )}
                  </div>
                  {pickInputsUpValueReturn[index].value.length <= 2 && (
                    <p className={styles.explanation}>
                      Please write Airport ,Hotel or Full Post Code
                    </p>
                  )}

                  {pickInputsUpValueReturn[index].value.length > 2 &&
                    !loadingPickUpReturn && (
                      <HandleSearchResults
                        pickOrDrop={"pickupPoints"}
                        journeyType={1}
                        indexOfInputField={index}
                        env={env}
                      />
                    )}
                </div>
              )}
            </div>
            {index + 1 === pickUpCounts.length && (
              <div
                className={styles.add_extrafly_div}
                onClick={() => addExtraPickPoint(pickUpItem)}
              >
                <i
                  className={`fa-solid fa-plus ${styles.add_extrafly_div_icon}`}
                ></i>
                Add Extra Pick-up Point
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PickUpReturnInput;
