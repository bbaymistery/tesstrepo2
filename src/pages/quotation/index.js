import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/layouts/Layout';
import InfoModal from '../../components/elements/InfoModal'
import { getWindowDimensions } from '../../helpers/windowDimension';
import styles from "./styles.module.scss"
import { useRouter } from 'next/router';
import Steps from '../../components/elements/Steps/index'
import { useDispatch, useSelector } from 'react-redux';
import CardQuotation from '../../components/elements/CardQuotation'
import GetQuotationLaoding from '../../components/elements/Loadings/GetQuotationLoading';
import HandleSearchResults from '../../components/elements/HandleSearchResults'
import { reservationSchemeValidator } from '../../helpers/reservationSchemeValidator';
import { splitDateTimeStringIntoDate, splitDateTimeStringIntoHourAndMinute } from '../../helpers/splitHelper';
import SelectedPointsOnHomePage from '../../components/elements/SelectedPointsOnHomePage';
import OutsideClickAlert from '../../components/elements/OutsideClickAlert';
import LoadingInlineInput from '../../components/elements/Loadings/LoadingInlineInput';
import Map from './Map';
import { currentDate } from '../../helpers/getDates';
import { hours, minutes } from '../../constants/minutesHours';
import { ifHasUnwantedCharacters } from '../../helpers/ifHasUnwantedCharacters';
const collectPoints = (params = {}, callback = () => { }) => {

    let { value = '', reducerSessionToken = "", language = "", env } = params;
    const url = `${env.apiDomain}/api/v1/suggestions`;
    const method = "POST"
    const headers = { "Content-Type": "application/json" }
    const body = JSON.stringify({ value, "session-token": reducerSessionToken, language })
    const config = { method, headers, body }

    fetch(url, config)
        .then((res) => res.json())
        .then((res) => { callback(res) })
        .catch((error) => {
            let message = "AGENCY_ Quotation Result component _collectPoints()  function catch blog "
            window.handelErrorLogs(error, message, { config })
        });
}
const collectPointsAsync = params => new Promise((resolve, reject) => collectPoints(params, log => resolve(log)))
//when we click getQuotations there we check fields .If fields not empty then it will be triggering
const readyToCollectQuotations = (params = {}) => {

    (async () => {
        let { dispatch, setInternalState, router, journeyType, reservations, env } = params

        setInternalState({ ["quotation-loading"]: true })
        let log = await collectQuotationsAsync({ reservations, journeyType, env })

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

            if (log?.error?.global?.[0] || log?.error?.transferDateTimeString) {
                setInternalState({ ["error-booking-message-0"]: log?.error?.global?.[0] || log?.error?.transferDateTimeString })
            }
        }
        setInternalState({ ["quotation-loading"]: false })
    })()
}
//getting quotations
const collectQuotations = (params = {}, callback = () => { }) => {

    let { reservations, journeyType, env } = params

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
                let message = "AGENCY_  Quotation Result component _collectQuotations()  function catch blog  parseInt(journeyType) === 0"
                window.handelErrorLogs(error, message, { configTransfer })
            });
    } else {
        Promise.all([fetch(url, configTransfer), fetch(url, configReturn)])
            .then(function (responses) { return Promise.all(responses.map(function (response) { return response.json() })) })
            .then(function (data) {
                callback(data, "data");
            })
            .catch(function (error) {
                let message = "AGENCY_ Quotation Result  _collectQuotations()  function catch blog  else part of>> parseInt(journeyType) === 0"
                window.handelErrorLogs(error, message, { configReturn })
            });
    }
}
const collectQuotationsAsync = params => new Promise((resolve, reject) => collectQuotations(params, log => resolve(log)))
const pushToQuotationsResultPage = (params = {}) => {
    let { dispatch, router, log, journeyType } = params
    dispatch({ type: "GET_QUOTATION", data: { results: log, journeyType } })
}
const Quotation = (props) => {
    let { data, env } = props
    const shouldTriggerQuotationRef = useRef(false);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const router = useRouter()
    const dispatch = useDispatch()
    const state = useSelector(state => state.pickUpDropOffActions)
    let { reservations, params } = state
    let { sessionToken: reducerSessionToken, journeyType, direction, language, quotations, appData, modalInfo, } = params
    const objectDetailss = appData?.pointTypeCategories?.reduce((obj, item) => ({ ...obj, [item.id]: JSON.parse(item.objectDetails), }), {});

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

                let log = await collectPointsAsync({ value, reducerSessionToken, language, env })
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
            alert("Please select which quotation do you want  for your journey?");
            return
        }

        if (!returnQuotation.token) {
            alert("Please select which quotation do you want  for your return  journey?");
            return
        }
        if (!transferQuotation.token) {
            alert("Please select which quotation do you want  for your journey?");
            return
        }

        // router.replace("/transfer-details");
        router.push("/transfer-details")


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
        if (errorHolder.status === 200) readyToCollectQuotations({ dispatch, setInternalState, router, journeyType, reservations, env })
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




    //when we go quotation page then go back In that case we should check
    //if we have points or not.According for that we will show add extrapoint or not
    // ✅ INITIAL MOUNT EFFECT
    useEffect(() => {
        const { selectedDropoffPoints, selectedPickupPoints } = reservations[0] || {};
        if (selectedDropoffPoints?.length > 0 && selectedPickupPoints?.length > 0) {
            setInternalState({ [`show-pickup-extra-point-0`]: true });
            setInternalState({ [`show-dropoff-extra-point-0`]: true });
        }

        if (journeyType === 1) {
            const { selectedDropoffPoints, selectedPickupPoints } = reservations[1] || {};
            if (selectedDropoffPoints?.length > 0 && selectedPickupPoints?.length > 0) {
                setInternalState({ [`show-pickup-extra-point-1`]: true });
                setInternalState({ [`show-dropoff-extra-point-1`]: true });
            }
        }

        // Scroll for mobile
        const container = document?.querySelector("#main_container");
        if (990 > document?.documentElement?.clientWidth && container) {
            window.scroll({
                top: container.getBoundingClientRect().top - 82,
                left: 0,
                behavior: "smooth",
            });
        }

        // Save current path
        localStorage.setItem("path", router.asPath);

        // ✅ allow getQuotations() on next change
        setTimeout(() => {
            shouldTriggerQuotationRef.current = true;
        }, 0);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);




    // ✅ GET QUOTATIONS EFFECT
    useEffect(() => {
        if (shouldTriggerQuotationRef.current && (reservations?.[0]?.transferDetails?.transferDateTimeString || reservations?.[1]?.transferDetails?.transferDateTimeString)) {
            getQuotations();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reservations?.[0]?.transferDetails?.transferDateTimeString, reservations?.[1]?.transferDetails?.transferDateTimeString]);



    return (
        <Layout loggedIn={data} pageUrl={router.pathname}>
            <div className={`page ${styles.page} ${windowDimensions.width < 990 ? "ml_0" : "0"}`}>
                <div className={`page_section ${styles.page_section} `}  >
                    <div className={`page_section_container ${styles.page_section_container} `} >
                        {modalInfo && (
                            <InfoModal content="This is meant to give an approximation of car size and category .Actual mane and model may vary" />
                        )}

                        <div className={"steps_div"}>
                            <Steps twoIspending={true} oneIsDone={true} />
                        </div>
                        {
                            reservations.map((obj, index) => {
                                let reservationError = (internalState.errorHolder.status === 403 && Array.isArray(internalState.errorHolder.reservations)) ? internalState.errorHolder.reservations?.[index] : {};

                                let { transferDetails, selectedPickupPoints, selectedDropoffPoints } = obj
                                let { transferDateTimeString } = transferDetails

                                const [splitedHour, splitedMinute] = splitDateTimeStringIntoHourAndMinute(transferDateTimeString) || []
                                const [splitedDate] = splitDateTimeStringIntoDate(transferDateTimeString) || []

                                return (
                                    <div key={index} className={`${index === 0 ? "mb_1" : ""}`}>
                                        {index === 0 ? <h2 className={`${styles.title}`}>Journey Details</h2> : <React.Fragment></React.Fragment>}
                                        {index === 1 ? <h2 className={`${styles.title}`}>Return Journey Details</h2> : <React.Fragment></React.Fragment>}
                                        <div className={`${styles.main_container} ${index === 1 ? "mb_2" : ""}`}>
                                            <div className={`${styles.quotation_panel} `}>
                                                <div className={styles.form_div} >
                                                    <div className={`${styles.search_menu} ${styles.pickup_div} ${reservationError?.selectedPickupPoints?.length > 0 && !internalState[`pickup-search-value-${index}`] && selectedPickupPoints.length === 0 ? styles.error_input : ""}`}>

                                                        {/* Pick up location text */}
                                                        {!selectedPickupPoints.length > 0 ? <h4>Pick-Up Location</h4> : <React.Fragment></React.Fragment>}
                                                        {/* Pick Points text */}
                                                        {selectedPickupPoints.length > 0 ? <h4>Pickup Points</h4> : <React.Fragment></React.Fragment>}
                                                        {/* selectedPoints */}
                                                        {selectedPickupPoints.length > 0 && <SelectedPointsOnHomePage env={env} index={index} destination="pickup" points={selectedPickupPoints} getQuotations={getQuotations} />}
                                                        {/* add extra pooint div */}
                                                        {internalState[`show-pickup-extra-point-${index}`] && selectedPickupPoints.length > 0 &&
                                                            <div className={`${styles.add_point_div}`} onClick={() => handleAddNewInput({ index, destination: "pickup" })}  >
                                                                <i className={`fa-solid fa-plus ${styles.add_point_icon}`}  ></i>
                                                                <p className={styles.add_point_text}>  Add Extra Point  </p>
                                                            </div>}
                                                        <OutsideClickAlert onOutsideClick={(e) => outsideClick({ destination: "pickup", index })}>
                                                            <div className={`${styles.input_div} `}  >
                                                                {selectedPickupPoints.length === 0 || (!internalState[`show-pickup-extra-point-${index}`] && selectedPickupPoints.length > 0) ?
                                                                    <input
                                                                        type="text"
                                                                        autoComplete="off"
                                                                        id="input_focused"//this is for scrolling top when ever we focus on mobile
                                                                        placeholder={"Airport Transfer Quotation"}
                                                                        value={internalState[`pickup-search-value-${index}`]}
                                                                        onChange={(e) => onChangeHanler({ index, destination: 'pickup', value: e.target.value })}
                                                                        className={`${direction} `}
                                                                    /> : <React.Fragment></React.Fragment>}
                                                                {/* loading icon inside input */}
                                                                {internalState[`pickup-search-loading-${index}`] ? <div className={styles.loading_div} direction={String(direction === "rtl")} >  <LoadingInlineInput />  </div> : <React.Fragment></React.Fragment>}
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
                                                                    <HandleSearchResults env={env} getQuotations={getQuotations} language={language} index={index} destination="pickup" setInternalState={setInternalState} collectingPoints={internalState[`collecting-pickup-points-${index}`]} /> : <React.Fragment></React.Fragment>}

                                                            </div>

                                                        </OutsideClickAlert>
                                                    </div>
                                                    <div className={`${styles.search_menu} ${styles.dropoff_div}  ${reservationError?.selectedDropoffPoints?.length > 0 && !internalState[`dropoff-search-value-${index}`] && selectedDropoffPoints.length === 0 ? styles.error_input : ""}`} >
                                                        {/* Pick up location text */}
                                                        {!selectedDropoffPoints.length > 0 ? <h4 className={direction}>Drop-off Location</h4> : <React.Fragment></React.Fragment>}
                                                        {/* Pick Points text */}
                                                        {selectedDropoffPoints.length > 0 ? <h4 className={` ${direction}`} >Drop Off Points</h4> : <React.Fragment></React.Fragment>}
                                                        {/* selectedPoints */}
                                                        {selectedDropoffPoints.length > 0 && <SelectedPointsOnHomePage env={env} index={index} destination="dropoff" points={selectedDropoffPoints} getQuotations={getQuotations} />}

                                                        {/* add extra pooint div */}
                                                        {internalState[`show-dropoff-extra-point-${index}`] && selectedDropoffPoints.length > 0 &&
                                                            <div className={`${styles.add_point_div} ${direction === "rtl" && styles.addrtl}`} onClick={() => handleAddNewInput({ index, destination: "dropoff" })}  >
                                                                <i className={`fa-solid fa-plus ${styles.add_point_icon} `}  ></i>
                                                                <p className={styles.add_point_text}> Add Extra point </p>
                                                            </div>}

                                                        <OutsideClickAlert onOutsideClick={(e) => outsideClick({ destination: "dropoff", index })}>
                                                            <div className={`${styles.input_div} `}  >

                                                                {selectedDropoffPoints.length === 0 || (!internalState[`show-dropoff-extra-point-${index}`] && selectedDropoffPoints.length > 0) ?
                                                                    <input
                                                                        type="text"
                                                                        autoComplete="off"
                                                                        id="input_focused"//this is for scrolling top when ever we focus on mobile
                                                                        placeholder={"Airport Transfer Quotation"}
                                                                        value={internalState[`dropoff-search-value-${index}`]}
                                                                        onChange={(e) => onChangeHanler({ index, destination: 'dropoff', value: e.target.value })}
                                                                        className={`${direction} `}
                                                                    /> : <React.Fragment></React.Fragment>}
                                                                {/* loading icon inside input */}
                                                                {internalState[`dropoff-search-loading-${index}`] ? <div className={styles.loading_div} direction={String(direction === "rtl")}>  <LoadingInlineInput />  </div> : <React.Fragment></React.Fragment>}

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
                                                                    <HandleSearchResults env={env} getQuotations={getQuotations} index={index} destination="dropoff" setInternalState={setInternalState} collectingPoints={internalState[`collecting-dropoff-points-${index}`]} /> : <React.Fragment></React.Fragment>}
                                                            </div>
                                                        </OutsideClickAlert>
                                                    </div>
                                                    <div className={` ${styles.search_menu} ${styles.book_input_date} `}>
                                                        <h4>{selectedPickupPoints[0]?.pcatId === 1 ? "Flight Landing Date" : "Pick-up date"}</h4>
                                                        <div className={`${styles.date_div} `}>
                                                            <input
                                                                type="date"
                                                                name="pickup-date"
                                                                value={splitedDate}
                                                                min={index === 0 ? currentDate() : reservations[0].transferDetails.transferDateTimeString.split(" ")[0]}
                                                                onChange={(e) => onChangeSetDateTimeHandler({ value: e.target.value, hourOrMinute: "date", journeyType: index })}
                                                            />
                                                        </div>
                                                        <i className={`fa-solid fa-calendar-days ${styles.date_picker_icon} `}></i>
                                                    </div>

                                                    <div className={`${styles.select_time_div} `}>
                                                        {Array.from(new Array(2)).map((arr, i) => {
                                                            return (<div key={i} className={styles.booking_form_hour_minute_wrapper}>
                                                                <label htmlFor="time-select">
                                                                    {i === 0 ? `${selectedPickupPoints[0]?.pcatId === 1 ? "Landing" : "Pick Up"} Hour` : `${selectedPickupPoints[0]?.pcatId === 1 ? "Landing" : "Pick Up"} Minute`}
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
                                                    {internalState[`error-booking-message-${index}`] ? <div className={styles.errorBookedMessage}><p>{internalState[`error-booking-message-${index}`]}</p>  </div> : <></>}
                                                    <button disabled={internalState[`quotation-loading`]} className={`btn btn_primary mt_1 ${styles.button}`} onClick={() => getQuotations()} >
                                                        <span>{internalState[`quotation-loading`] ? <GetQuotationLaoding /> : "Update Quotation"}</span>
                                                    </button>
                                                </div>
                                                <div className={styles.map_direction} >
                                                    {selectedDropoffPoints.length > 0 && selectedPickupPoints.length > 0 ?
                                                        <Map env={env} datas={quotations[index]} selectedPickPoints={selectedPickupPoints} selectedDroppOfPoints={selectedDropoffPoints} />
                                                        : ""}
                                                </div>
                                            </div>
                                            {/* //*Card item of results */}

                                            {!internalState[`error-booking-message-${index}`] && selectedPickupPoints.length > 0 && selectedDropoffPoints.length > 0 &&

                                                <CardQuotation
                                                    index={index}
                                                    env={env}
                                                    distance={quotations[index].distance}
                                                    duration={quotations[index].duration}
                                                    quotationOptions={quotations[index].quotationOptions}
                                                    quotationLoading={internalState[`quotation-loading`]}
                                                    selectedQuotation={reservations[index]?.quotation}
                                                />
                                            }


                                        </div>


                                        {index === 1 &&
                                            <div className={`${styles.items_buttons}`}>
                                                <div onClick={() => router.back()}> <button>Back</button></div>

                                                <div onClick={gotoTransferDetailsClick}><button>Next</button>
                                                </div>

                                            </div>}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default Quotation;

export async function getServerSideProps({ req, res }) {
    let verify = req.cookies["user-id"];

    if (req.url === "/quotation") {
        return {
            redirect: {
                destination: `/new-booking`,
                permanent: false,
            },
        };
    }
    return {
        props: {
            data: verify,
        },
    };
}