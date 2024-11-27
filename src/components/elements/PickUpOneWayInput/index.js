import React, { useEffect, useState } from "react";
import LoadingInput from "../LoadingInput";
import { useDispatch, useSelector } from "react-redux";
import { onewayPickUpPointsOneWay, quotationsPickOneWay, selectPickUpDropOffReducer, } from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import { onewayShowInputPickField } from "../../../store/showFieldReducer/showFieldSelectors";
import styles from "./styles.module.scss";
import { SET_SHOW_DROP_FIELD_ONEWAY, SET_SHOW_PICK_FIELD_ONEWAY, } from "../../../store/showFieldReducer/showFieldTypes";
import { collectPickUpPoints, deleteItemFromList, } from "../../../store/pickUpDropOffReducer/pickUpDropAction";
import { SET_ERROR_INSIDE_HEROR_CONTENT } from "../../../store/pickUpDropOffReducer/pickUpDropTypes";
import { substrText } from "../../../helpers/substr";
import { useWindowSize } from "../../../hooks/useWindowSize";
import HandleSearchResults from "../HandleSearchResults";

const PickUpOneWayInput = ({ pickInputsUpValue, setPickInputUpsValue, setInternalState, internalState, env }) => {
  const dispatch = useDispatch();
  const { loadingPickUpOneWay, appData } = useSelector(selectPickUpDropOffReducer);
  const selectedPickupOnewayPoints = useSelector(onewayPickUpPointsOneWay);
  const pikUpPoints = useSelector(quotationsPickOneWay);
  const showInputFieldPickUpIndex = useSelector(onewayShowInputPickField);
  const [pickUpCounts, setPickUpCounts] = useState([0]);
  const imageObjects = appData?.pointTypeCategories?.reduce((obj, item) => ({ ...obj, [item.id]: item.image, }), {});

  const handlePickUpField = (index) => {
    if (typeof showInputFieldPickUpIndex === "number") {
      dispatch({ type: SET_SHOW_PICK_FIELD_ONEWAY, payload: null });
      return;
    }
    dispatch({ type: SET_SHOW_DROP_FIELD_ONEWAY, payload: null });
    dispatch({ type: SET_SHOW_PICK_FIELD_ONEWAY, payload: index });

    //diyelim ki lhr yazdk results geldi Yazilan inut boxdan cxb basga yere tikliyib gelib yene yazilana geldigimizde asagidaki fonksyon inputun valuesunu siler
    if (pikUpPoints) {
      setPickInputUpsValue((prev) => prev.map((item) => item?.index === index ? { ...item, value: "" } : item));
    }
  };
  const onchangeHandler = (e, indexOfInput, pickOrDropp, journeyType) => {
    //collecting suggestion if input value more than 2 letter
    let value = e.target.value;
    if (value.includes('"') || value.includes(`'`) || value.includes('/') || value.includes('\\')) {
      return
    }
    setPickInputUpsValue((prev) => prev.map((item) => item?.index === indexOfInput ? { ...item, value } : item));
    if (e.target.value.length > 2) {
      dispatch(collectPickUpPoints(e.target.value, pickOrDropp, journeyType));
    }

  };
  const addExtraPickPoint = (pickUpItem) => {
    // console.log(pickUpItem);
    //whenever i add item to redux I change havePoint true
    if (pickInputsUpValue[pickUpItem].havePoint) {
      setPickUpCounts((prev) => [...prev, pickUpItem + 1]);
      setPickInputUpsValue([
        ...pickInputsUpValue,
        {
          index: pickInputsUpValue.length,
          value: "",
          errorMessage: "",
          havePoint: false,
          checkInQuotation: false,
        },
      ]);
    } else {
      //handling errors
      setPickInputUpsValue((prev) =>
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

    let newInp = [...pickInputsUpValue];
    let deletedInputField = newInp.indexOf(pickInputsUpValue[index]);
    newInp?.splice(deletedInputField, 1);
    setPickInputUpsValue(newInp);

    //check edirik Eger indexi1 bir olanin adresi varsa Cunki ilk eklenen inputfield icerigi bos olur
    dispatch(deleteItemFromList(0, 0, index));
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
    selectedPickupOnewayPoints.map((selectedItem, index) => {
      // yani eger burda  secilen itemin indexi ile bizim nput valunun indexi eynidirse Ozaman have pointi true edirik
      setPickInputUpsValue((prev) =>
        prev.map((item) =>
          item?.index === index ? { ...item, havePoint: true, errorMessage: "", checkInQuotation: false, } : item
        )
      );
    });
  }, [selectedPickupOnewayPoints]);
  // bunu yaziriqki quotationa gedib geri gayidanda statedeki verilerin sayisi geder pick up points olsun
  useEffect(() => {
    if (selectedPickupOnewayPoints.length > 0) {
      let indexes = selectedPickupOnewayPoints.map((a, i) => { return i })
      setPickUpCounts(indexes)

      let newPickUpsValues = []
      for (let i = 0; i < indexes.length; i++) {
        newPickUpsValues.push({ index: i, value: '', errorMessage: '', havePoint: true, checkInQuotation: false })
      }
      setPickInputUpsValue(newPickUpsValues)
    } else {
      setPickUpCounts([0])
    }

  }, [selectedPickupOnewayPoints])


  return (
    <div className={styles.pickup_points}>
      {/* bos olan  */}
      {pickUpCounts.map((pickUpItem, index) => {

        return (
          <div key={pickUpItem + 1} className={styles.inp_container}>
            {selectedPickupOnewayPoints[index]?.address && (<div className={styles.tooltip_container}>   <div className={styles.tooltip}> {selectedPickupOnewayPoints[index]?.address}  </div> </div>)}
            <div className={styles.input_div}>
              <p className={styles.input_div_title}>
                <span>
                  {selectedPickupOnewayPoints[index]?.address && (<i className="fa-solid fa-check"></i>)}
                  Pick Up Location {pickUpCounts.length > 1 && index + 1}
                </span>
                {!selectedPickupOnewayPoints[index]?.address && pickInputsUpValue[index]?.checkInQuotation ? (<span className="error">required</span>) : ("")}
              </p>
              <div className={styles.input_div_display_box}>
                {/* // checking error in case of if points exist or not || if div has text or not
                // yani buna tikladigimda seeaRCH BOX ACILIR */}
                <div onClick={() => handlePickUpField(index)} className={`${styles.display_box_text}   ${pickInputsUpValue[pickUpItem]?.errorMessage.length > 0 ? "required" : ""}  ${!selectedPickupOnewayPoints[index]?.address && pickInputsUpValue[index].checkInQuotation ? "required" : ""}  `}   >
                  {imageObjects &&
                    selectedPickupOnewayPoints[index]?.address && (
                      <img className={styles.left_icon} src={`${env.apiDomain}${imageObjects[selectedPickupOnewayPoints[index]?.pcatId]}`} alt={selectedPickupOnewayPoints[index]?.address} />
                    )}
                  <p>
                    {selectedPickupOnewayPoints[index]?.address ? substrText(selectedPickupOnewayPoints[index]?.address) : "Airport,Hotel or Full Postcode .."}{" "}
                  </p>
                  {/* angle up down icon */}
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

                {/* trahs icon */}
                {pickUpItem !== 0 && (
                  <i
                    onClick={(e) => deleteInputField(e, index)}
                    className={`fa-solid fa-trash-can ${styles.trash_icon}`}
                  ></i>
                )}
              </div>
            </div>

            <div className={`${styles.result_box} `} >
              {showInputFieldPickUpIndex === index && (
                <div className={`${styles['search-input-container']} ${styles.search_box}`} f={String(internalState[`pickup-search-focus-${index}`])} id={`content${index}pickup`}>
                  <div className={styles.popup_header} f={String(internalState[`pickup-search-focus-${index}`])}>
                    <i className={`fa-solid fa-xmark ${styles.close_icon}`} onClick={(e) => closeModal({ index, destination: "pickup" })}></i>
                    <p>From ?</p>
                  </div>

                  <div className={styles.search_box_input_div}>
                    <input
                      id="input_focused"
                      autoFocus
                      type="text"
                      value={pickInputsUpValue[index].value}
                      name="pickupOneway"
                      onChange={(e) => onchangeHandler(e, index, 0, 0)}
                      onFocus={e => setFocusToInput({ e, destination: "pickup", index })}
                      f={String(internalState[`pickup-search-focus-${index}`])} //giving a style if we focused
                    />
                    <i className="fa-solid fa-magnifying-glass"></i>
                    {loadingPickUpOneWay && (<div className={styles.loading_div}> <LoadingInput /></div>)}
                  </div>
                  {pickInputsUpValue[index].value.length <= 2 && (<p className={styles.explanation}>  Please write Airport ,Hotel or Full Post Code  </p>)}

                  {pickInputsUpValue[index].value.length > 2 && !loadingPickUpOneWay && (<HandleSearchResults env={env} pickOrDrop={"pickupPoints"} journeyType={0} indexOfInputField={index} />)}
                </div>
              )}
            </div>

            {index + 1 === pickUpCounts.length && (
              <div className={styles.add_extrafly_div} onClick={() => addExtraPickPoint(pickUpItem)}    >
                <i className={`fa-solid fa-plus ${styles.add_extrafly_div_icon}`}   ></i>
                Add Extra Pick-up Point
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PickUpOneWayInput;
