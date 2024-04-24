import React, { useEffect, useState, } from 'react'
import styles from "./styles.module.scss"
import GlobalLayout from '../../components/layouts/GlobalLayout'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { splitDateTimeStringIntoDate, splitDateTimeStringIntoHourAndMinute } from '../../helpers/splitHelper'
import { currentDate } from '../../helpers/getDates'
import HandleSearchResults from '../../components/elements/HandleSearchResults'
import SelectedPointsOnHomePage from '../../components/elements/SelectedPointsOnHomePage'
import { ifHasUnwantedCharacters } from '../../helpers/ifHasUnwantedCharacters'
import env from '../../resources/env'
import { hours, minutes } from '../../constants/minutesHours'
import OutsideClickAlert from '../../components/elements/OutsideClickAlert'
import Loading from '../../components/elements/Loading'
import WaveLoading from '../../components/elements/LoadingWave'
import { reservationSchemeValidator } from '../../helpers/reservationSchemeValidator'
import CardQuotationItem from '../../components/elements/CardQuotationItem'
import Map from "./Map.js";
import store from '../../store/store'
import { createWrapper } from 'next-redux-wrapper'
let description = "We specialize in airport transfer shuttle service. We can provide you with a chauffeur driven car to and from all major London airports. The airports include Heathrow, Gatwick, Stanstead, Luton and City airport.!"
let title = "Results Airport Transfers London Airport Pickups"
let keywords = " London airport transfers, London airport transfer, heathrow airport transfer, Gatwick airport transfer, stansted airport transfer, luton airport transfer, shuttle service, shuttle services, airport shuttle services, airport transfer shuttle service,  airport taxi service, taxi services, cab services, airport taxi service, London airport, airport transport, luton airport transport, London airport transportation, London shuttle services, Gatwick airport shuttle service, Heathrow airport shuttle service, Luton airport shuttle service, Stansted airport shuttle service, London airport taxi transfer, London airport shuttle, airport transfers London, airport transfers, chauffeur driven car, chauffeur driven cars, airport pick up and drop."

const collectPoints = (params = {}, callback = () => { }) => {

  let { value = '', reducerSessionToken = "", language = "" } = params;
  const url = `${env.apiDomain}/api/v1/suggestions`;
  const method = "POST"
  const headers = { "Content-Type": "application/json" }
  const body = JSON.stringify({ value, "session-token": reducerSessionToken, language })
  const config = { method, headers, body }

  fetch(url, config)
    .then((res) => res.json())
    .then((res) => { callback(res) })
    .catch((error) => {
      let message = "APL Quotation component _collectPoints()  function catch blog "
      window.handelErrorLogs(error, message, { config })
    });
}
const collectPointsAsync = params => new Promise((resolve, reject) => collectPoints(params, log => resolve(log)))
//when we click getQuotations there we check fields .If fields not empty then it will be triggering
const readyToCollectQuotations = (params = {}) => {

  (async () => {
    let { dispatch, setInternalState, router, journeyType, reservations } = params

    setInternalState({ ["quotation-loading"]: true })
    let log = await collectQuotationsAsync({ reservations, journeyType })

    //if our journey both way
    if (parseInt(journeyType) === 1) {
      let { status: status1 } = log[0]
      let { status: status2 } = log[1]
      if (status1 !== 200 && log[0]?.error?.global?.[0]) {
        setInternalState({ ["error-booking-message-0"]: log[0]?.error?.global[0] })
      }
      if (status2 !== 200 && log[1]?.error?.global?.[0]) {
        setInternalState({ ["error-booking-message-1"]: log[1]?.error?.global[0] })
      }
      if (status1 === 200 && status2 === 200) {
        pushToQuotationsResultPage({ dispatch, router, log, journeyType })
        setInternalState({ ["error-booking-message-1"]: "" })
        setInternalState({ ["error-booking-message-0"]: "" })

      }
    } else {

      let { status } = log

      if (status === 200) {
        pushToQuotationsResultPage({ dispatch, router, log, journeyType })
        setInternalState({ ["error-booking-message-0"]: "" })
      }
      if (log?.error?.global?.[0]) {
        setInternalState({ ["error-booking-message-0"]: log?.error?.global[0] })
      }
    }
    setInternalState({ ["quotation-loading"]: false })
  })()
}
//getting quotations
const collectQuotations = (params = {}, callback = () => { }) => {

  let { reservations, journeyType } = params

  //transfer
  let trSelectedPickPoints = reservations[0]?.selectedPickupPoints;
  let trSelectedDroppPoints = reservations[0]?.selectedDropoffPoints;
  let transferDAteTimeString = reservations[0]?.transferDetails?.transferDateTimeString;
  //return
  let returnPickPoints = reservations[1]?.selectedPickupPoints;
  let returnDroppPoints = reservations[1]?.selectedDropoffPoints;
  let returnDAteTimeString = reservations[1]?.transferDetails?.transferDateTimeString;

  const url = `${env.apiDomain}/api/v1/quotation`;
  const method = "POST"
  const headers = { "Content-Type": "application/json" }

  const configTransfer = {
    method,
    headers,
    body: JSON.stringify({
      selectedPickupPoints: trSelectedPickPoints,
      selectedDropoffPoints: trSelectedDroppPoints,
      transferDateTimeString: transferDAteTimeString,
    }),
  };


  const configReturn = {
    method,
    headers,
    body: JSON.stringify({
      selectedPickupPoints: returnPickPoints,
      selectedDropoffPoints: returnDroppPoints,
      transferDateTimeString: returnDAteTimeString,
    }),
  };

  //check if tru then get oneway guotations
  if (parseInt(journeyType) === 0) {
    fetch(url, configTransfer)
      .then((res) => res.json())
      .then((data) => {
        callback(data, "data");

      })
      .catch((error) => {
        let message = "APL  Quotation Result component _collectQuotations()  function catch blog  parseInt(journeyType) === 0"
        window.handelErrorLogs(error, message, { configTransfer })
      });
  } else {
    Promise.all([fetch(url, configTransfer), fetch(url, configReturn)])
      .then(function (responses) { return Promise.all(responses.map(function (response) { return response.json() })) })
      .then(function (data) {
        callback(data, "data");
      })
      .catch(function (error) {
        let message = "APL Quotation Result  _collectQuotations()  function catch blog  else part of>> parseInt(journeyType) === 0"
        window.handelErrorLogs(error, message, { configReturn })
      });
  }
}
const collectQuotationsAsync = params => new Promise((resolve, reject) => collectQuotations(params, log => resolve(log)))
const pushToQuotationsResultPage = (params = {}) => {
  let { dispatch, router, log, journeyType } = params
  dispatch({ type: "GET_QUOTATION", data: { results: log, journeyType } })
}
const QuotationResults = (props) => {
  let { isTaxiDeal = false, } = props
  const router = useRouter()
  const dispatch = useDispatch()


  const state = useSelector(state => state.pickUpDropOffActions)
  let { reservations, params } = state
  let { sessionToken: reducerSessionToken, journeyType, direction, language, quotations, } = params

  const { appData } = useSelector(state => state.initialReducer)
  const objectDetailss = appData?.pointTypeCategories?.reduce((obj, item) => ({ ...obj, [item.id]: JSON.parse(item.objectDetails), }), {});

  //in order having confirmation message
  //go back go forward and when change language we r not gonna have any confirmation
  // const { nexturls, previousUrls, currentUrls } = urlWithLangAtribute({ languages: appData.languages, previousUrl: 'tohome', nextUrl: "/transfer-details", currentUrl: router.asPath })
  // const confirmationAlert = useConfirm({ previousUrl: previousUrls, nextUrl: nexturls, currentUrls, message: "If you refresh the page, all data will be deleted." })


  let [internalState, setInternalState] = React.useReducer((s, o) => ({ ...s, ...o }), {
    'pickup-search-value-0': '',
    'dropoff-search-value-0': '',
    'pickup-search-value-1': '',
    'dropoff-search-value-1': '',
    'collecting-pickup-points-0': [],
    'collecting-dropoff-points-0': [],
    'collecting-pickup-points-1': [],
    'collecting-dropoff-points-1': [],
    'pickup-search-loading-0': false,
    'dropoff-search-loading-0': false,
    'pickup-search-loading-1': false,
    'dropoff-search-loading-1': false,
    'show-pickup-extra-point-0': false,
    'show-dropoff-extra-point-0': false,
    'show-pickup-extra-point-1': false,
    'show-dropoff-extra-point-1': false,

    //quotation loading
    "quotation-loading": false,
    'errorHolder': [],
    "error-booking-message-0": "",
    "error-booking-message-1": "",

  })
  const onChangeHanler = (params = {}) => {
    let { index, value, destination } = params
    let { passengerDetails: { token: passengerDetailsToken } } = reservations[0]

    //hinder user  to add some Characters
    if (ifHasUnwantedCharacters(value)) return

    setInternalState({ [`${destination}-search-value-${index}`]: value })

    if (value.length > 2) {
      (async () => {
        //set input loading to true
        setInternalState({ [`${destination}-search-loading-${index}`]: true })

        let log = await collectPointsAsync({ value, reducerSessionToken, language })
        let { status, result, "session-token": sessionToken = "", token } = log

        if (status == 200) {
          setInternalState({ [`${destination}-search-loading-${index}`]: false })

          //if we dont have passengerDetailsToken then save token on reservation objects;s passenger details
          if (!passengerDetailsToken) dispatch({ type: 'SET_TOKEN_TO_PASSENGERDETAILS', data: { token } })

          //check if session doesnt exist then  set session token to the reducer
          if (!reducerSessionToken) dispatch({ type: 'SET_SESSION_TOKEN', data: { sessionToken } });

          setInternalState({ [`collecting-${destination}-points-${index}`]: result })
        } else {
          setInternalState({ [`collecting-${destination}-points-${index}`]: {} })
          setInternalState({ [`${destination}-search-loading-${index}`]: false })
        }
      })()
    } else {
      //reset collecting points
      setInternalState({ [`collecting-${destination}-points-${index}`]: [] })
    }
  }
  //it is valid when our journey is both way
  const gotoTransferDetailsClick = () => {
    let { quotation: transferQuotation } = reservations[0]
    let { quotation: returnQuotation } = reservations[1]
    //if quotation token doesnt exist ,it means he /she can go to next page

    if (!returnQuotation.token && !transferQuotation.token) {
      alert(appData?.words["strPleaseSelectaCarTypeFor"]);
      return
    }

    if (!returnQuotation.token) {
      alert(appData?.words["strPleaseSelectYourCarTypeForYour"]);
      return
    }
    if (!transferQuotation.token) {
      alert(appData?.words["strPleaseSelectaCarTypeFor"]);
      return
    }

    // router.replace("/transfer-details");
    router.push(`${language === 'en' ? "/transfer-details" : `${language}/transfer-details`}`)


  };
  const onChangeSetDateTimeHandler = (params = {}) => {
    let { value, hourOrMinute, journeyType } = params
    dispatch({ type: 'SET_JOURNEY_DATETIME', data: { journeyType, hourOrMinute, value } })
    // getQuotations()
  }
  const handleAddNewInput = (params = {}) => {
    let { index, destination } = params
    setInternalState({ [`show-${destination}-extra-point-${index}`]: false })
  }
  const getQuotations = (params = {}) => {
    let errorHolder = reservationSchemeValidator({ reservations });
    setInternalState({ errorHolder })
    if (errorHolder.status === 200) readyToCollectQuotations({ dispatch, setInternalState, router, journeyType, reservations })
  }
  //deleting input field
  const deleteField = (params = {}) => {
    let { destination, index } = params
    setInternalState({
      [`${destination}-search-value-${index}`]: "",
      [`${destination}-points-error-${index}`]: "",
      [`collecting-${destination}-points-${index}`]: [],
      [`show-${destination}-extra-point-${index}`]: true,
    })
  }
  const outsideClick = ({ destination, index }) => {
    //it means if we have seggested points then it will work otherwise it is nt
    if (!Array.isArray(internalState[`collecting-${destination}-points-${index}`]))
      setInternalState({ [`collecting-${destination}-points-${index}`]: [], })

  }
  const [showMapOneWay, setShowMapOneWay] = useState(false)
  const [showMapReturn, setShowMapReturn] = useState(false)
  //when we go quotation page then go back In that case we should check
  //if we have points or not.According for that we will show add extrapoint or not
  useEffect(() => {
    let { selectedDropoffPoints, selectedPickupPoints } = reservations[0]
    if (selectedDropoffPoints?.length > 0 && selectedPickupPoints?.length > 0) {
      setInternalState({ [`show-pickup-extra-point-0`]: true })
      setInternalState({ [`show-dropoff-extra-point-0`]: true })
    }

    if (journeyType === 1) {
      let { selectedDropoffPoints, selectedPickupPoints } = reservations[1]
      if (selectedDropoffPoints?.length > 0 && selectedPickupPoints?.length > 0) {
        setInternalState({ [`show-pickup-extra-point-1`]: true })
        setInternalState({ [`show-dropoff-extra-point-1`]: true })
      }
    }

    //for mobile scrolling
    const container = document?.querySelector("#main_container");
    if (990 > document?.documentElement?.clientWidth) {
      window.scroll({
        top: container?.getBoundingClientRect()?.top - 82,
        left: 0,
        behavior: "smooth",
      });
    }

    localStorage.setItem("path", router.asPath);

  }, [])

  useEffect(() => {
    if (
      reservations?.[0]?.transferDetails?.transferDateTimeString ||
      reservations?.[1]?.transferDetails?.transferDateTimeString
    ) {
      getQuotations();
    }
  }, [reservations?.[0]?.transferDetails?.transferDateTimeString, reservations?.[1]?.transferDetails?.transferDateTimeString]);



  return (
    <GlobalLayout keywords={keywords} title={title} description={description} footerbggray={true} >
      <div className={`${styles.quotation} page`}>
        <div className={`${styles.quotation_section} page_section`}>
          <div className={`${styles.quotation_section_container} page_section_container`}>
            {
              reservations.map((obj, index) => {
                let reservationError = (internalState.errorHolder.status === 403 && Array.isArray(internalState.errorHolder.reservations)) ? internalState.errorHolder.reservations?.[index] : {};

                let { transferDetails, selectedPickupPoints, selectedDropoffPoints } = obj
                let { transferDateTimeString } = transferDetails

                const [splitedHour, splitedMinute] = splitDateTimeStringIntoHourAndMinute(transferDateTimeString) || []
                const [splitedDate] = splitDateTimeStringIntoDate(transferDateTimeString) || []

                return (
                  <div key={index} style={{ marginBottom: `${index === 0 ? "1rem" : "0"}` }}>
                    {+journeyType === 0 && index === 0 ? <h2 className={`${styles.title} ${direction}`}>{appData?.words["seGoingDetails"]}</h2> : <React.Fragment></React.Fragment>}
                    {/* {index === 1 ? <h2 className={`${styles.title} ${direction}`}>{appData?.words["seReturnDetails"]}</h2> : <React.Fragment></React.Fragment>} */}
                    <div className={`${styles.main_container} ${direction} `}>
                      <div className={`${styles.quotation_panel}`} style={{ height: +journeyType === 0 ? "800px" : "" }}>
                        <div className={styles.form_div} action="">
                          <div className={`${styles.search_menu} ${styles.pickup_div} ${reservationError?.selectedPickupPoints?.length > 0 && !internalState[`pickup-search-value-${index}`] && selectedPickupPoints.length === 0 ? styles.error_input : ""}`}>

                            {/* Pick up location text */}
                            {!selectedPickupPoints.length > 0 ? <h4 className={direction}>{appData?.words["sePickUpLocation"]}</h4> : <React.Fragment></React.Fragment>}
                            {/* Pick Points text */}
                            {selectedPickupPoints.length > 0 ? <h4 className={` ${direction}`} >{appData?.words["strPickupPoints"]}</h4> : <React.Fragment></React.Fragment>}
                            {/* selectedPoints */}
                            {selectedPickupPoints.length > 0 && <SelectedPointsOnHomePage index={index} destination="pickup" points={selectedPickupPoints} getQuotations={getQuotations} language={language} />}
                            {/* add extra pooint div */}
                            {internalState[`show-pickup-extra-point-${index}`] && selectedPickupPoints.length > 0 &&
                              <div className={`${styles.add_point_div} ${direction === "rtl" && styles.addrtl}`} onClick={() => handleAddNewInput({ index, destination: "pickup" })}  >
                                <i className={`fa-solid fa-plus ${styles.add_point_icon} `}  ></i>
                                <p className={styles.add_point_text}>  {appData?.words["strAddExtraPoint"]}  </p>
                              </div>}
                            <OutsideClickAlert onOutsideClick={(e) => outsideClick({ destination: "pickup", index })}>
                              <div className={`${styles.input_div} `}  >
                                {selectedPickupPoints.length === 0 || (!internalState[`show-pickup-extra-point-${index}`] && selectedPickupPoints.length > 0) ?
                                  <input
                                    type="text"
                                    autoComplete="off"
                                    id="input_focused"//this is for scrolling top when ever we focus on mobile
                                    placeholder={appData?.words["searchEngineTitle"]}
                                    value={internalState[`pickup-search-value-${index}`]}
                                    onChange={(e) => onChangeHanler({ index, destination: 'pickup', value: e.target.value })}
                                    className={`${direction} `}
                                  /> : <React.Fragment></React.Fragment>}
                                {/* loading icon inside input */}
                                {internalState[`pickup-search-loading-${index}`] ? <div className={styles.loading_div} direction={String(direction === "rtl")} >  <Loading />  </div> : <React.Fragment></React.Fragment>}
                                {/* error icon inside input */}
                                {reservationError?.selectedPickupPoints?.length > 0 && !internalState[`pickup-search-value-${index}`] && selectedPickupPoints.length === 0 ?
                                  <div className={`${styles.error_icon}`} direction={String(direction === "rtl")}>
                                    <i title={reservationError?.selectedPickupPoints} className="fa-solid fa-circle-exclamation"></i>
                                  </div> : <React.Fragment></React.Fragment>}
                                {/* //delete field icon inside input  */}
                                {(!internalState[`show-pickup-extra-point-${index}`] && selectedPickupPoints.length > 0 && !internalState[`pickup-search-loading-${index}`]) ?
                                  <i onClick={(e) => deleteField({ destination: "pickup", index })} direction={String(direction === "rtl")} className={`fa-solid fa-delete-left ${styles.input_delete_field_icon}`}></i>
                                  : <React.Fragment></React.Fragment>}


                                {/* if !internalState[`pickup-search-value-${index}`] then our handleSearchResults will be belong to styles.book.input */}
                                {!Array.isArray(internalState[`collecting-pickup-points-${index}`]) ?
                                  //setInternalState>>>after adding item we set input field  to empty and add extradiv to true
                                  <HandleSearchResults getQuotations={getQuotations} language={language} index={index} destination="pickup" setInternalState={setInternalState} collectingPoints={internalState[`collecting-pickup-points-${index}`]} /> : <React.Fragment></React.Fragment>}

                              </div>

                            </OutsideClickAlert>
                          </div>
                          <div className={`${styles.search_menu} ${styles.dropoff_div}  ${reservationError?.selectedDropoffPoints?.length > 0 && !internalState[`dropoff-search-value-${index}`] && selectedDropoffPoints.length === 0 ? styles.error_input : ""}`} >
                            {/* Pick up location text */}
                            {!selectedDropoffPoints.length > 0 ? <h4 className={direction}>{appData?.words["seDropOffLocation"]}</h4> : <React.Fragment></React.Fragment>}
                            {/* Pick Points text */}
                            {selectedDropoffPoints.length > 0 ? <h4 className={` ${direction}`} >{appData?.words["strDropoffPoints"]}</h4> : <React.Fragment></React.Fragment>}
                            {/* selectedPoints */}
                            {selectedDropoffPoints.length > 0 && <SelectedPointsOnHomePage index={index} destination="dropoff" points={selectedDropoffPoints} getQuotations={getQuotations} language={language} />}

                            {/* add extra pooint div */}
                            {internalState[`show-dropoff-extra-point-${index}`] && selectedDropoffPoints.length > 0 &&
                              <div className={`${styles.add_point_div} ${direction === "rtl" && styles.addrtl}`} onClick={() => handleAddNewInput({ index, destination: "dropoff" })}  >
                                <i className={`fa-solid fa-plus ${styles.add_point_icon} `}  ></i>
                                <p className={styles.add_point_text}>  {appData?.words["strAddExtraPoint"]}  </p>
                              </div>}

                            <OutsideClickAlert onOutsideClick={(e) => outsideClick({ destination: "dropoff", index })}>
                              <div className={`${styles.input_div} `}  >

                                {selectedDropoffPoints.length === 0 || (!internalState[`show-dropoff-extra-point-${index}`] && selectedDropoffPoints.length > 0) ?
                                  <input
                                    type="text"
                                    autoComplete="off"
                                    id="input_focused"//this is for scrolling top when ever we focus on mobile
                                    placeholder={appData?.words["searchEngineTitle"]}
                                    value={internalState[`dropoff-search-value-${index}`]}
                                    onChange={(e) => onChangeHanler({ index, destination: 'dropoff', value: e.target.value })}
                                    className={`${direction} `}
                                  /> : <React.Fragment></React.Fragment>}
                                {/* loading icon inside input */}
                                {internalState[`dropoff-search-loading-${index}`] ? <div className={styles.loading_div} direction={String(direction === "rtl")}>  <Loading />  </div> : <React.Fragment></React.Fragment>}

                                {/* error icon inside input */}
                                {reservationError?.selectedDropoffPoints?.length > 0 && !internalState[`dropoff-search-value-${index}`] && selectedDropoffPoints.length === 0 ?
                                  <div className={`${styles.error_icon}`} direction={String(direction === "rtl")}>
                                    <i title={reservationError?.selectedDropoffPoints} className="fa-solid fa-circle-exclamation"></i>
                                  </div> : <React.Fragment></React.Fragment>}

                                {/* //delete field icon inside input  */}
                                {(!internalState[`show-dropoff-extra-point-${index}`] && selectedDropoffPoints.length > 0 && !internalState[`dropoff-search-loading-${index}`]) ?
                                  <i onClick={(e) => deleteField({ destination: "dropoff", index })} direction={String(direction === "rtl")} className={`fa-solid fa-delete-left ${styles.input_delete_field_icon}`}></i>
                                  : <React.Fragment></React.Fragment>}
                                {/* results when we get points */}
                                {!Array.isArray(internalState[`collecting-dropoff-points-${index}`]) ?
                                  <HandleSearchResults getQuotations={getQuotations} language={language} index={index} destination="dropoff" setInternalState={setInternalState} collectingPoints={internalState[`collecting-dropoff-points-${index}`]} /> : <React.Fragment></React.Fragment>}
                              </div>
                            </OutsideClickAlert>
                          </div>
                          <div className={` ${styles.search_menu} ${styles.book_input_date} `}>
                            <h4 className={direction}>{selectedPickupPoints[0]?.pcatId === 1 ? appData?.words["seLandingDate"] : appData?.words["sePickUpDate"]}</h4>
                            <div className={`${styles.date_div} ${direction}`}>
                              <input
                                type="date"
                                name="pickup-date"
                                className={direction === "rtl" ? styles.rtl : ""}
                                value={splitedDate}
                                min={index === 0 ? currentDate() : reservations[0].transferDetails.transferDateTimeString.split(" ")[0]}
                                onChange={(e) => onChangeSetDateTimeHandler({ value: e.target.value, hourOrMinute: "date", journeyType: index })}
                              />
                            </div>
                            <i className={`fa-solid fa-calendar-days ${styles.date_picker_icon} ${direction === "rtl" && styles.date_picker_icon_left}`}></i>
                          </div>

                          <div className={`${styles.select_time_div} `}>
                            {Array.from(new Array(2)).map((arr, i) => {
                              return (<div key={i} className={styles.booking_form_hour_minute_wrapper}>
                                <label htmlFor="time-select">
                                  {i === 0
                                    ? `${selectedPickupPoints[0]?.pcatId === 1 ? appData?.words["strLandingHour"] : appData?.words["strPickUpHour"]}`
                                    : `${selectedPickupPoints[0]?.pcatId === 1 ? appData?.words["strLandingMinute"] : appData?.words["strPickUpMinute"]} `
                                  }
                                </label>
                                <select
                                  id="time-select"
                                  defaultValue={i === 0 ? splitedHour : splitedMinute}
                                  onChange={(e) => onChangeSetDateTimeHandler({ value: e.target.value, hourOrMinute: i === 0 ? "hour" : "minute", journeyType: index })} >
                                  {/* //if index==0 thenhours will show up if not then minutes show up */}
                                  {i === 0 ?
                                    hours.map((hour) => (<option key={hour.id} id={hour.id} value={hour.value}> {hour.value} </option>))
                                    :
                                    minutes.map((minute) => (<option key={minute.id} id={minute.id} value={minute.value} >{minute.value} </option>))}
                                </select>
                              </div>)
                            })}
                          </div>
                          {internalState[`error-booking-message-${index}`] ?
                            <div className={styles.errorBookedMessage}>
                              <p>{internalState[`error-booking-message-${index}`]}</p>
                            </div>
                            : <></>}
                          <button disabled={internalState[`quotation-loading`]} className={`btn btn_primary  ${styles.button}`} onClick={() => getQuotations()} style={{ marginTop: '1rem' }}>
                            <span>{internalState[`quotation-loading`] ? <WaveLoading /> : `${appData?.words["seUpdateQuotation"]}`}</span>
                          </button>
                        </div>
                        {(selectedDropoffPoints.length > 0 && index === 1) && (showMapReturn) ?
                          <div className={styles.map_direction} >
                            <Map datas={quotations[index]} selectedPickPoints={selectedPickupPoints} selectedDroppOfPoints={selectedDropoffPoints} />
                          </div>
                          : <></>}
                        {(selectedPickupPoints.length > 0 && index === 0) && (showMapOneWay) ?
                          <div className={styles.map_direction} >
                            <Map datas={quotations[index]} selectedPickPoints={selectedPickupPoints} selectedDroppOfPoints={selectedDropoffPoints} />
                          </div>
                          : <></>}
                        {(selectedDropoffPoints.length > 0 && selectedPickupPoints.length > 0) && (+journeyType === 0) ?
                          <div className={styles.map_direction} >
                            <Map datas={quotations[index]} selectedPickPoints={selectedPickupPoints} selectedDroppOfPoints={selectedDropoffPoints} />
                          </div>
                          : <></>}
                      </div>
                      {/* //*Card item of results */}

                      <div  >
                        {!internalState[`error-booking-message-${index}`] && selectedPickupPoints.length > 0 && selectedDropoffPoints.length > 0 &&
                          <CardQuotationItem
                            index={index}
                            isTaxiDeal={isTaxiDeal}
                            distance={quotations[index].distance}
                            duration={quotations[index].duration}
                            selectedQuotation={reservations[index]?.quotation}
                            quotationOptions={quotations[index].quotationOptions}
                            quotationLoading={internalState[`quotation-loading`]}
                            gotoTransferDetailsClick={gotoTransferDetailsClick}
                            journeyType={journeyType}
                            setShowMapOneWay={setShowMapOneWay}
                            setShowMapReturn={setShowMapReturn}
                            showMapOneWay={showMapOneWay}
                            showMapReturn={showMapReturn}
                          />
                        }
                        {/* {index === 1 &&
                            <div className={`${styles.items_buttons}`}>
                              <div> <div onClick={() => router.back()}> <button>{appData?.words["strGoBack"]}</button></div></div>
                              <div> <div onClick={gotoTransferDetailsClick}><button>{appData?.words["strContinue"]}</button></div></div>
                            </div>} */}
                      </div>
                    </div>
                  </div>
                )
              })
            }

          </div>
        </div>
      </div>
    </GlobalLayout>
  )
}

export default QuotationResults



const makestore = () => store;
const wrapper = createWrapper(makestore);

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, ...etc }) => {

  const initialLanguages = store.getState().initialReducer?.appData?.languages
  const langs = initialLanguages.map((lang) => lang.value)

  for (let i = 0; i < langs.length; i++) {
    const lang = langs[i]
    const langUrl = lang === 'en' ? '/quotation-results' : `/${lang}/quotation-results`
    if (req.url === langUrl) {
      return {
        redirect: {
          destination: lang === 'en' ? "/" : `/${lang}`,
          permanent: false
        }
      }
    }
  }


  return {
    props: {
      data: ''
    }
  }
});
