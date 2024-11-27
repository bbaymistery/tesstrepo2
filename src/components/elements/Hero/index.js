import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Oneway from "../OneWay";
import { useSelector, useDispatch } from "react-redux";
import {
  onewayShowInputDropField,
  onewayShowInputPickField,
  returnShowInputDropField,
  returnShowInputPickField,
} from "../../../store/showFieldReducer/showFieldSelectors";
import {
  RESET_FIELDS,
  SET_SHOW_DROP_FIELD_ONEWAY,
  SET_SHOW_DROP_FIELD_RETURN,
  SET_SHOW_PICK_FIELD_ONEWAY,
  SET_SHOW_PICK_FIELD_RETURN,
} from "../../../store/showFieldReducer/showFieldTypes";

import RadioButton from "./RadioButton";
import { selectedJourneyType, selectHeroContentError } from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import { gettingQuotations } from "../../../store/pickUpDropOffReducer/pickUpDropAction";
import {
  RESET_FORM,
  SET_DATE_TIME,
  SWITCH_JOURNEY,
} from "../../../store/pickUpDropOffReducer/pickUpDropTypes";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import HeroSlider from "../HeroSlider";
import { useWindowSize } from "../../../hooks/useWindowSize";

const ReturnDynamic = dynamic(() => import("../Return"))
const HeroCarIcon = dynamic(() => import("../HeroCarIcon/HeroCarIcon"))
//when ever i will want to use this content with spesific classnames i will send props
const Hero = (props) => {
  let { isBgImageActive, isHeroContentActive, env } = props
  const router = useRouter();
  const dispatch = useDispatch();
  const [jouryName, setJouryName] = useState("Oneway");
  //divin uzerine tikladigimizda input fieldin aclb baglanmasi ucun bunu istifade edirik
  const showInputFieldPickUpIndex = useSelector(onewayShowInputPickField);
  const showInputFieldDroppOff = useSelector(onewayShowInputDropField);
  const showInputFieldPickUpReturn = useSelector(returnShowInputPickField);
  const showInputFieldDroppOffReturn = useSelector(returnShowInputDropField);
  const HeroContentError = useSelector(selectHeroContentError);
  const selectJourneyType = useSelector(selectedJourneyType)
  //this is oneway input pickups
  const [pickInputsUpValue, setPickInputUpsValue] = useState([
    {
      index: 0,
      value: "",
      errorMessage: "",
      havePoint: false,
      checkInQuotation: false,
    },
  ]);
  const [dropInputsOffValue, setDropInputsOffValue] = useState([
    {
      index: 0,
      value: "",
      errorMessage: "",
      havePoint: false,
      checkInQuotation: false,
    },
  ]);

  //these are for return journey
  const [pickInputsUpValueReturn, setPickInputUpsValueReturn] = useState([
    {
      index: 0,
      value: "",
      errorMessage: "",
      havePoint: false,
      checkInQuotation: false,
    },
  ]);

  const [dropInputsOffValueReturn, setDropInputsOffValueReturn] = useState([
    {
      index: 0,
      value: "",
      errorMessage: "",
      havePoint: false,
      checkInQuotation: false,
    },
  ]);

  let [internalState, setInternalState] = React.useReducer((s, o) => ({ ...s, ...o }), {
    'pickup-search-focus-0': false,//it is for modal
    'dropoff-search-focus-0': false,//it is for modal
    'pickup-search-focus-1': false,//it is for modal
    'dropoff-search-focus-1': false,//it is for modal
  })

  const [errorDisabledMessageTransfer, seterrorDisabledMessageTransfer] = useState("")
  const [errorDisabledMessageReturn, seterrorDisabledMessageReturn] = useState("")
  let size = useWindowSize()
  let { width } = size
  const closeOpenedFieldOutside = (e) => {

    if (typeof showInputFieldDroppOff === "number") {
      dispatch({ type: SET_SHOW_DROP_FIELD_ONEWAY, payload: null });
      let navbarElement = document.querySelector("#navbar_container")
      navbarElement.style.display = "flex"
      return;
    }
    if (typeof showInputFieldPickUpIndex === "number") {
      dispatch({ type: SET_SHOW_PICK_FIELD_ONEWAY, payload: null });
      let navbarElement = document.querySelector("#navbar_container")
      navbarElement.style.display = "flex"
      return;
    }
    if (typeof showInputFieldDroppOffReturn === "number") {
      dispatch({ type: SET_SHOW_DROP_FIELD_RETURN, payload: null });
      let navbarElement = document.querySelector("#navbar_container")
      navbarElement.style.display = "flex"
      return;
    }
    if (typeof showInputFieldPickUpReturn === "number") {
      dispatch({ type: SET_SHOW_PICK_FIELD_RETURN, payload: null });
      let navbarElement = document.querySelector("#navbar_container")
      navbarElement.style.display = "flex"
      return;
    }


  };

  const hadnleInputRadioChange = (e) => {
    setJouryName(e.target.value);
  };
  const onchangeHandler = (e, pickupOrDropOrDate, journeyType) => {
    let dateValue = e.target.value;
    dispatch({
      type: SET_DATE_TIME,
      payload: { dateValue, pickupOrDropOrDate, journeyType },
    });
  };
  const resetForm = () => {
    dispatch({ type: RESET_FORM });
    dispatch({ type: RESET_FIELDS });
    setJouryName("Oneway");
  };
  const mobileAndTabletCheck = function () {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };
  const getQuotation = () => {
    //do not forget make it false after getting quotations
    if (jouryName === "Oneway") {
      let pickups = [...pickInputsUpValue];
      pickups = pickups.map((item) => {
        if (!item?.havePoint) {
          return (item = { ...item, checkInQuotation: true });
        } else {
          return item;
        }
      });

      let drops = [...dropInputsOffValue];
      drops = drops.map((item) => {
        if (!item?.havePoint) {
          return (item = { ...item, checkInQuotation: true });
        } else {
          return item;
        }
      });

      setPickInputUpsValue(pickups);
      setDropInputsOffValue(drops);

      //checking together if inside hasnt got any true Then we can get all quotations
      let checkValueOfInput = [...drops, ...pickups].every((item) => {
        return item.checkInQuotation === false;
      });

      if (checkValueOfInput) {
        dispatch(
          gettingQuotations(router, 0, { updateInsideQuotation: false, }, seterrorDisabledMessageTransfer, seterrorDisabledMessageReturn)
        );
      }
    } else {
      //*handling with one way inputs
      let pickups = [...pickInputsUpValue];
      pickups = pickups.map((item) => {
        if (!item?.havePoint) {
          return (item = { ...item, checkInQuotation: true });
        } else {
          return item;
        }
      });
      let drops = [...dropInputsOffValue];
      drops = drops.map((item) => {
        if (!item?.havePoint) {
          return (item = { ...item, checkInQuotation: true });
        } else {
          return item;
        }
      });
      setPickInputUpsValue(pickups);
      setDropInputsOffValue(drops);
      //*handling with return  way inputs
      let pickupsReturn = [...pickInputsUpValueReturn];
      pickupsReturn = pickupsReturn.map((item) => {
        if (!item?.havePoint) {
          return (item = { ...item, checkInQuotation: true });
        } else {
          return item;
        }
      });
      let dropsReturn = [...dropInputsOffValueReturn];
      dropsReturn = dropsReturn.map((item) => {
        if (!item?.havePoint) {
          return (item = { ...item, checkInQuotation: true });
        } else {
          return item;
        }
      });

      setPickInputUpsValueReturn(pickupsReturn);
      setDropInputsOffValueReturn(dropsReturn);

      let checkValueOfInput = [...drops, ...pickups, ...pickupsReturn, ...dropsReturn,].every((item) => { return item.checkInQuotation === false; });

      if (checkValueOfInput) {
        dispatch(gettingQuotations(router, 1, { updateInsideQuotation: false, }, seterrorDisabledMessageTransfer, seterrorDisabledMessageReturn));
      }
    }
  };
  useEffect(() => {

    let isApple = mobileAndTabletCheck();
    if (isApple) {
      const box = document.querySelector("#heroBox");
      box.style.backgroundAttachment = "initial";
    }
    if (+selectJourneyType === 1) {
      dispatch({ type: "RESET_JOURNEY_TO_INITIAL", payload: 0, });
    }
  }, []);

  useEffect(() => {
    if (jouryName === 'Return') {
      dispatch({ type: SWITCH_JOURNEY, payload: `${jouryName === "Oneway" ? 0 : 1}`, });
    } else {
      dispatch({ type: "RESET_JOURNEY_TO_INITIAL", payload: 0, });
    }
  }, [jouryName]);




  return (
    <div className={styles.hero_wrapper} onClick={closeOpenedFieldOutside}>
      <div className={`${styles.hero_box}`} id="heroBox">
        <div className={styles.containerr}>
          <div className={styles.content}>

            {width < 1200 ? <></> : <HeroSlider />}
            {width < 768 ? <></> : <HeroCarIcon />}

            <div className={styles.tab_content}>
              <h2 className={styles.tab_pane_title}>
                Airport Transfer Quotations
              </h2>
              <RadioButton hadnleInputRadioChange={hadnleInputRadioChange} jouryName={jouryName} />
              <div className={styles.tab_pane}>
                {jouryName === "Return" && (
                  <h4 className={styles.trdetails_title}>Transfer Details</h4>
                )}
                <Oneway
                  jouryName={jouryName}
                  onchangeHandler={onchangeHandler}
                  pickInputsUpValue={pickInputsUpValue}
                  setPickInputUpsValue={setPickInputUpsValue}
                  dropInputsOffValue={dropInputsOffValue}
                  setDropInputsOffValue={setDropInputsOffValue}
                  getQuotation={getQuotation}
                  resetForm={resetForm}
                  internalState={internalState}
                  env={env}
                  setInternalState={setInternalState}
                />
                {errorDisabledMessageTransfer ? <p className={styles.errorBookedMessage}>{errorDisabledMessageTransfer}</p> : <></>}

                {jouryName === "Return" ? (
                  <h4 className={styles.returndetails_title}>Return Details</h4>
                ) : <></>}
                {jouryName === "Return" ? (
                  <ReturnDynamic
                    jouryName={jouryName}
                    onchangeHandler={onchangeHandler}
                    pickInputsUpValueReturn={pickInputsUpValueReturn}
                    setPickInputUpsValueReturn={setPickInputUpsValueReturn}
                    dropInputsOffValueReturn={dropInputsOffValueReturn}
                    setDropInputsOffValueReturn={setDropInputsOffValueReturn}
                    getQuotation={getQuotation}
                    resetForm={resetForm}
                    internalState={internalState}
                    setInternalState={setInternalState}
                    env={env}
                  />
                ) : <></>}
                {errorDisabledMessageReturn ? <p className={styles.errorBookedMessage}>{errorDisabledMessageReturn}</p> : <></>}
                <div className={`${styles.error_div} alert alert_danger`} style={{ display: `${HeroContentError ? "block" : "none"}`, }}   >
                  <strong>Error! </strong>
                  <span>
                    Please fill the empty locations first to add new location
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
