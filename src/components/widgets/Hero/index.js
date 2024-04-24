import { splitDateTimeStringIntoDate, splitDateTimeStringIntoHourAndMinute } from '../../../helpers/splitHelper';
import { reservationSchemeValidator } from '../../../helpers/reservationSchemeValidator';
import { ifHasUnwantedCharacters } from '../../../helpers/ifHasUnwantedCharacters';
import { hours, minutes } from '../../../constants/minutesHours';
import OutsideClickAlert from '../../elements/OutsideClickAlert';
import { currentDate } from '../../../helpers/getDates';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./styles.module.scss"
import env from '../../../resources/env'
import RadioButton from './RadioButton'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, } from 'react'
import Image from 'next/image';
import { useWindowSize } from '../../../hooks/useWindowSize';
import dynamic from 'next/dynamic'
import { titleStringOfHastaxiDeals } from '../../../helpers/titleStringOfHasTaxiDeals';
const SelectedPointsOnHomePage = dynamic(() => import('../../elements/SelectedPointsOnHomePage'))
const HandleSearchResults = dynamic(() => import('../../elements/HandleSearchResults'))
const WaveLoading = dynamic(() => import('../../elements/LoadingWave'))
const Loading = dynamic(() => import('../../elements/Loading'))
const Features = dynamic(() => import('../Features'))

const pushToQuotationsResultPage = (params = {}) => {
    let { dispatch, router, log, journeyType, language } = params
    dispatch({ type: "GET_QUOTATION", data: { results: log, journeyType } })
    router.push(`${language === 'en' ? "/quotation-results" : `${language}/quotation-results`}`)
    // router.push("/quotation-results")
}
const Hero = (props) => {
    let { islinknamecomponent = false, bggray = true } = props
    const router = useRouter()
    const dispatch = useDispatch()
    const state = useSelector(state => state.pickUpDropOffActions)
    let { reservations, params } = state
    let { sessionToken: reducerSessionToken, journeyType, direction, language, hasTaxiDeals } = params

    const { appData } = useSelector(state => state.initialReducer)
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

        //focus
        'pickup-search-focus-0': false,//it is for modal
        'dropoff-search-focus-0': false,//it is for modal
        'pickup-search-focus-1': false,//it is for modal
        'dropoff-search-focus-1': false,//it is for modal

        "quotation-loading": false,
        'errorHolder': [],
        "error-booking-message-0": "",
        "error-booking-message-1": ""

    })

    const collectPoints = useCallback((params = {}, callback = () => { }) => {

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
                let message = "APL   Hero component _collectPoints()  function catch blog "
                window.handelErrorLogs(error, message, { config })
            });
    }, [params]);
    const collectPointsAsync = params => new Promise((resolve, reject) => collectPoints(params, log => resolve(log)))

    //getting quotations
    const collectQuotations = useCallback((params = {}, callback = () => { }) => {

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
                    let message = "APL  Hero component _collectQuotations()  function catch blog  parseInt(journeyType) === 0"
                    window.handelErrorLogs(error, message, { configTransfer })
                });
        } else {
            Promise.all([fetch(url, configTransfer), fetch(url, configReturn)])
                .then(function (responses) { return Promise.all(responses.map(function (response) { return response.json() })) })
                .then(function (data) {
                    callback(data, "data");
                })
                .catch(function (error) {
                    let message = "APL  Hero component _collectQuotations()  function catch blog  else part of>> parseInt(journeyType) === 0"
                    window.handelErrorLogs(error, message, { configReturn })
                });
        }
    }, [reservations, journeyType]);

    const collectQuotationsAsync = useCallback(params => new Promise((resolve, reject) => collectQuotations(params, log => resolve(log))), [collectQuotations]);

    const onChangeHanler = useCallback((params = {}) => {
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
    }, [reservations, dispatch, setInternalState, ifHasUnwantedCharacters, collectPointsAsync, reducerSessionToken, language]);


    const onChangeSetDateTimeHandler = useCallback((params = {}) => {
        let { value, hourOrMinute, journeyType } = params
        dispatch({ type: 'SET_JOURNEY_DATETIME', data: { journeyType, hourOrMinute, value } })
    }, [params, dispatch]);
    //when we click getQuotations there we check fields .If fields not empty then it will be triggering
    const readyToCollectQuotations = useCallback(async (params = {}) => {
        (async () => {
            let { dispatch, setInternalState, router, journeyType, reservations, language, } = params

            setInternalState({ ["quotation-loading"]: true })
            let log = await collectQuotationsAsync({ reservations, journeyType })


            //if our journey both way
            if (parseInt(journeyType) === 1) {
                let { status: status1 } = log[0]
                let { status: status2 } = log[1]
                if (status1 !== 200 && log[0]?.error?.global[0]) {
                    setInternalState({ ["error-booking-message-0"]: log[0]?.error?.global[0] })
                    setTimeout(() => {
                        setInternalState({ [`error-booking-message-0`]: "" })
                    }, 2500);
                }
                if (status2 !== 200 && log[1]?.error?.global[0]) {
                    setInternalState({ ["error-booking-message-1"]: log[1]?.error?.global[0] })
                    setTimeout(() => {
                        setInternalState({ [`error-booking-message-1`]: "" })
                    }, 2500);
                }
                if (status1 === 200 && status2 === 200) {
                    pushToQuotationsResultPage({ dispatch, router, log, journeyType, language })
                    setInternalState({ ["error-booking-message-0"]: "" })
                    setInternalState({ ["error-booking-message-1"]: "" })
                }

            } else {
                let { status } = log
                if (status === 200) {
                    pushToQuotationsResultPage({ dispatch, router, log, journeyType, language })
                } else {
                    setInternalState({ ["error-booking-message-0"]: log?.error?.global[0] })
                    setTimeout(() => {
                        setInternalState({ [`error-booking-message-0`]: "" })
                    }, 2500);
                }
            }
            setInternalState({ ["quotation-loading"]: false })
        })()
    }, [collectQuotationsAsync, pushToQuotationsResultPage, setInternalState, params]);


    const getQuotations = useCallback((e) => {
        let errorHolder = reservationSchemeValidator({ reservations, appData });
        setInternalState({ errorHolder });
        if (errorHolder.status === 200) {
            readyToCollectQuotations({ dispatch, setInternalState, router, journeyType, reservations, language });
        }
    }, [reservations, appData, setInternalState, readyToCollectQuotations, dispatch, router, journeyType, language]);

    const setFocusToInput = (params = {}) => {
        let { e, destination, index } = params

        e.target.style.opacity = 0
        setInternalState({ [`${destination}-search-focus-${index}`]: window.innerWidth > 990 ? false : true })
        const container = document?.querySelector(`#content${index}${destination}`);

        e.target.style.opacity = 1
        setTimeout(() => {
            window.scroll({
                top: container,
                left: 0,
                behavior: "smooth",
            });
        }, 100);
    }
    const handleAddNewInput = (params = {}) => {
        let { index, destination } = params
        setInternalState({ [`show-${destination}-extra-point-${index}`]: false, [`${destination}-search-focus-${index}`]: true })
    }
    //deleting input field
    const deleteField = (params = {}) => {
        let { destination, index } = params
        setInternalState({
            [`${destination}-search-value-${index}`]: "",
            [`${destination}-search-focus-${index}`]: false,
            [`collecting-${destination}-points-${index}`]: [],
            [`show-${destination}-extra-point-${index}`]: true,
        })
    }

    const outsideClick = ({ destination, index }) => {
        //it means if we have seggested points then it will work otherwise it is nt
        if (!Array.isArray(internalState[`collecting-${destination}-points-${index}`]))
            setInternalState({ [`collecting-${destination}-points-${index}`]: [], [`${destination}-search-focus-${index}`]: false })
    }

    const closeModal = (params = {}) => {
        let { index, destination } = params
        let inputField = document.getElementById(`${destination}_input_focused_${index}`)
        inputField.style.opacity = 1
        setInternalState({ [`${destination}-search-focus-${index}`]: false, [`${destination}-search-value-${index}`]: "", [`collecting-${destination}-points-${index}`]: [] })
    }
    //when we go quotation page then go back In that case we should check
    //if we have points or not.
    //According to this we will show add extrapoint or not
    useEffect(() => {
        let { selectedDropoffPoints, selectedPickupPoints } = reservations[0]
        if (selectedDropoffPoints?.length > 0 && selectedPickupPoints?.length > 0) {
            setInternalState({ [`show-pickup-extra-point-0`]: true, [`show-dropoff-extra-point-0`]: true })
        }
        // bu rendere sebeb olur
        dispatch({ type: "CHECHK_FLIGHT_WAITING_TIME", data: { journeyType } })
    }, [])
    let size = useWindowSize();
    let { width } = size

    return (
        <div className={`${styles.hero} ${direction} page`} islinknamecomponent={String(islinknamecomponent)}>
            {/* {typeof window !== 'undefined' ?  */}
            <div className={`${styles.hero_section} page_section`}>
                <div className={`${styles.hero_section_container} page_section_container`}>
                    <div className={styles.points_content}>
                        <div className={styles.main_search}>
                            <div className={`${!islinknamecomponent ? styles.title_div_islinnkname : styles.title_div}`}>
                                <h1 style={{ textTransform: "capitalize" }} className={`${styles.title} ${direction} `}>
                                    {islinknamecomponent ? <span>{appData?.words[`${titleStringOfHastaxiDeals(hasTaxiDeals)}`]}</span> : <span>{appData?.words["searchEngineTitle"]}</span>}
                                </h1>
                            </div>
                            <br />
                            <RadioButton setInternalState={setInternalState} internalState={internalState} />
                            <br />
                            {reservations.map((obj, index) => {
                                let reservationError = (internalState.errorHolder.status === 403 && Array.isArray(internalState.errorHolder.reservations)) ? internalState.errorHolder.reservations?.[index] : {};
                                let { transferDetails, selectedPickupPoints, selectedDropoffPoints } = obj
                                let { transferDateTimeString } = transferDetails
                                const [splitedHour, splitedMinute] = splitDateTimeStringIntoHourAndMinute(transferDateTimeString) || []
                                const [splitedDate] = splitDateTimeStringIntoDate(transferDateTimeString) || []
                                return (
                                    <div key={index}>
                                        {reservations.length > 1 && index == 0 ? <div className={`${styles.tr_journey_title} ${direction}`}>{appData?.words["seGoingDetails"]}</div> : <React.Fragment></React.Fragment>}
                                        {index == 1 ? <div className={`${styles.return_journey_title} ${direction}`}>{appData?.words["seReturnDetails"]}</div> : <React.Fragment></React.Fragment>}
                                        <div className={`${styles.points} ${direction}`} direction={String(direction === "rtl")}>
                                            <div className={`${styles.search_menu} ${styles.first_column}`}>
                                                {/* Pick up location text */}
                                                {!selectedPickupPoints.length > 0 ? <p className={direction}>{appData?.words["sePickUpLocation"]}</p> : <React.Fragment></React.Fragment>}
                                                {/* Pick Points text */}
                                                {selectedPickupPoints.length > 0 ? <p className={`${styles.point_title} ${direction}`} >{appData?.words["strPickupPoints"]}</p> : <React.Fragment></React.Fragment>}
                                                {/* selectedPoints */}
                                                {selectedPickupPoints.length > 0 ? <SelectedPointsOnHomePage index={index} destination="pickup" points={selectedPickupPoints} language={language} /> : <React.Fragment></React.Fragment>}
                                                {/* add extra pooint div */}
                                                {internalState[`show-pickup-extra-point-${index}`] && selectedPickupPoints.length > 0 ?
                                                    <div className={`${styles.add_point_div} ${direction}`} onClick={() => handleAddNewInput({ index, destination: "pickup" })}  >
                                                        <i className={`fa-solid fa-plus ${styles.add_point_icon}`}  ></i>
                                                        <p className={styles.add_point_text}>{appData?.words["strAddExtraPoint"]}</p>
                                                    </div> : <React.Fragment></React.Fragment>}
                                                <OutsideClickAlert onOutsideClick={(e) => outsideClick({ destination: "pickup", index })}>
                                                    <div id={`content${index}pickup`} d={`content${index}`} className={`${styles.input_div} ${styles['search-input-container']}`} f={String(internalState[`pickup-search-focus-${index}`])} >
                                                        <div className={`${styles.popup_header} ${direction}`} f={String(internalState[`pickup-search-focus-${index}`])}>
                                                            <i className={`fa-solid fa-xmark ${styles.close_icon}`} onClick={(e) => closeModal({ index, destination: "pickup" })}></i>
                                                            <p className={direction}>{appData?.words["strFromWithQuestionMark"]} </p>
                                                        </div>
                                                        {selectedPickupPoints.length === 0 || (!internalState[`show-pickup-extra-point-${index}`] && selectedPickupPoints.length > 0) ?
                                                            <input
                                                                type="text"
                                                                autoComplete="off"
                                                                id={`pickup_input_focused_${index}`}//this is for scrolling top when ever we focus on mobile
                                                                placeholder={appData?.words["seLocationPlaceholder"]}
                                                                value={internalState[`pickup-search-value-${index}`]}
                                                                autoFocus={internalState[`pickup-search-focus-${index}`]}
                                                                f={String(internalState[`pickup-search-focus-${index}`])} //giving a style if we focused
                                                                onFocus={e => setFocusToInput({ e, destination: "pickup", index })}
                                                                onChange={(e) => onChangeHanler({ index, destination: 'pickup', value: e.target.value })}
                                                                className={`${direction} ${reservationError?.selectedPickupPoints?.length > 0 && !internalState[`pickup-search-value-${index}`] && selectedPickupPoints.length === 0 ? styles.error_input : ""}`}
                                                            /> : <React.Fragment></React.Fragment>}
                                                        {/* loading icon inside input */}
                                                        {internalState[`pickup-search-loading-${index}`] ?
                                                            <div className={styles.loading_div} direction={String(direction === "rtl")} popupp={String(internalState[`pickup-search-focus-${index}`])}      >
                                                                <Loading />
                                                            </div> : <React.Fragment></React.Fragment>}
                                                        {/* error icon inside input */}
                                                        {reservationError?.selectedPickupPoints?.length > 0 && !internalState[`pickup-search-value-${index}`] && selectedPickupPoints.length === 0 ?
                                                            <div className={`${styles.error_icon}`} popupp={String(internalState[`pickup-search-focus-${index}`])} direction={String(direction === "rtl")}>
                                                                <i title={reservationError?.selectedPickupPoints} className="fa-solid fa-circle-exclamation"></i>
                                                            </div> : <React.Fragment></React.Fragment>}
                                                        {/* //delete field icon inside input  */}
                                                        {(!internalState[`show-pickup-extra-point-${index}`] && selectedPickupPoints.length > 0 && !internalState[`pickup-search-loading-${index}`]) ?
                                                            <i onClick={(e) => deleteField({ destination: "pickup", index })} popupp={String(internalState[`pickup-search-focus-${index}`])} direction={String(direction === "rtl")} className={`fa-solid fa-delete-left ${styles.input_delete_field_icon}`}></i>
                                                            : <React.Fragment></React.Fragment>}
                                                        {/* if !internalState[`pickup-search-value-${index}`] then our handleSearchResults will be belong to styles.book.input */}
                                                        {!Array.isArray(internalState[`collecting-pickup-points-${index}`]) ?
                                                            //setInternalState>>>after adding item we set input field  to empty and add extradiv to true
                                                            <HandleSearchResults language={language} index={index} destination="pickup" setInternalState={setInternalState} collectingPoints={internalState[`collecting-pickup-points-${index}`]} /> : <React.Fragment></React.Fragment>}

                                                    </div>

                                                </OutsideClickAlert>

                                            </div>
                                            <div className={`${styles.search_menu} ${styles.second_column}`}>
                                                {/* Pick up location text */}
                                                {!selectedDropoffPoints.length > 0 ? <p className={direction}>{appData?.words["seDropOffLocation"]}</p> : <React.Fragment></React.Fragment>}
                                                {/* Pick Points text */}
                                                {selectedDropoffPoints.length > 0 ? <p className={`${styles.point_title} ${direction}`} >{appData?.words["strDropoffPoints"]}</p> : <React.Fragment></React.Fragment>}
                                                {/* selectedPoints */}
                                                {selectedDropoffPoints.length > 0 ? <SelectedPointsOnHomePage index={index} destination="dropoff" points={selectedDropoffPoints} language={language} /> : <React.Fragment></React.Fragment>}
                                                {/* add extra pooint div */}
                                                {internalState[`show-dropoff-extra-point-${index}`] && selectedDropoffPoints.length > 0 ?
                                                    <div className={styles.add_point_div} onClick={() => handleAddNewInput({ index, destination: "dropoff" })}  >
                                                        <i className={`fa-solid fa-plus ${styles.add_point_icon}`}  ></i>
                                                        <p className={styles.add_point_text}>{appData?.words["strAddExtraPoint"]}</p>
                                                    </div> : <React.Fragment></React.Fragment>}
                                                <OutsideClickAlert onOutsideClick={(e) => outsideClick({ destination: "dropoff", index })}>
                                                    <div id={`content${index}dropoff`} d={`content${index}`} className={`${styles.input_div} ${styles['search-input-container']}`} f={String(internalState[`dropoff-search-focus-${index}`])} >
                                                        <div className={`${styles.popup_header} ${direction}`} f={String(internalState[`dropoff-search-focus-${index}`])}>
                                                            <i className={`fa-solid fa-xmark ${styles.close_icon}`} onClick={(e) => closeModal({ index, destination: "dropoff" })}></i>
                                                            <p className={direction}>{appData?.words["strWhereWithQuestionMark"]} </p>
                                                        </div>
                                                        {selectedDropoffPoints.length === 0 || (!internalState[`show-dropoff-extra-point-${index}`] && selectedDropoffPoints.length > 0) ?
                                                            <input
                                                                type="text"
                                                                autoComplete="off"
                                                                id={`dropoff_input_focused_${index}`}//this is for scrolling top when ever we focus on mobile
                                                                placeholder={appData?.words["seLocationPlaceholder"]}
                                                                value={internalState[`dropoff-search-value-${index}`]}
                                                                autoFocus={internalState[`dropoff-search-focus-${index}`]}
                                                                f={String(internalState[`dropoff-search-focus-${index}`])} //giving a style if we focused
                                                                onFocus={e => setFocusToInput({ e, destination: "dropoff", index })}
                                                                onChange={(e) => onChangeHanler({ index, destination: 'dropoff', value: e.target.value })}
                                                                className={`${direction} ${reservationError?.selectedDropoffPoints?.length > 0 && !internalState[`dropoff-search-value-${index}`] && selectedDropoffPoints.length === 0 ? styles.error_input : ""}`}
                                                            /> : <React.Fragment></React.Fragment>}
                                                        {/* loading icon inside input */}
                                                        {internalState[`dropoff-search-loading-${index}`] ? <div className={styles.loading_div} popupp={String(internalState[`dropoff-search-focus-${index}`])} direction={String(direction === "rtl")}>  <Loading />  </div> : <React.Fragment></React.Fragment>}

                                                        {/* error icon inside input */}
                                                        {reservationError?.selectedDropoffPoints?.length > 0 && !internalState[`dropoff-search-value-${index}`] && selectedDropoffPoints.length === 0 ?
                                                            <div className={`${styles.error_icon}`} popupp={String(internalState[`dropoff-search-focus-${index}`])} direction={String(direction === "rtl")}>
                                                                <i title={reservationError?.selectedDropoffPoints} className="fa-solid fa-circle-exclamation"></i>
                                                            </div> : <React.Fragment></React.Fragment>}

                                                        {/* //delete field icon inside input  */}
                                                        {(!internalState[`show-dropoff-extra-point-${index}`] && selectedDropoffPoints.length > 0 && !internalState[`dropoff-search-loading-${index}`]) ?
                                                            <i onClick={(e) => deleteField({ destination: "dropoff", index })} popupp={String(internalState[`dropoff-search-focus-${index}`])} direction={String(direction === "rtl")} className={`fa-solid fa-delete-left ${styles.input_delete_field_icon}`}></i>
                                                            : <React.Fragment></React.Fragment>}
                                                        {/* results when we get points */}
                                                        {!Array.isArray(internalState[`collecting-dropoff-points-${index}`]) ?
                                                            <HandleSearchResults language={language} index={index} destination="dropoff" setInternalState={setInternalState} collectingPoints={internalState[`collecting-dropoff-points-${index}`]} /> : <React.Fragment></React.Fragment>}
                                                    </div>
                                                </OutsideClickAlert>
                                            </div>
                                            <div className={`${styles.search_menu} ${styles.book_input_date} ${styles.third_column}`}>
                                                <p className={direction}>{selectedPickupPoints[0]?.pcatId === 1 ? appData?.words["seLandingDate"] : appData?.words["sePickUpDate"]}</p>
                                                <div className={`${styles.date_div} ${direction === 'rtl' && styles.date_div_rtl}`}>
                                                    <input
                                                        aria-label="date"
                                                        type="date"
                                                        name="pickup-date"
                                                        className={direction === "rtl" ? styles.rtl : ""}
                                                        value={splitedDate}
                                                        min={index === 0 ? currentDate() : reservations[0].transferDetails.transferDateTimeString.split(" ")[0]}
                                                        onChange={(e) => onChangeSetDateTimeHandler({ value: e.target.value, hourOrMinute: "date", journeyType: index })}
                                                    />
                                                </div>
                                                <i className={`fa-solid fa-calendar-days ${styles.date_picker_icon} ${islinknamecomponent ? styles.date_picker_icon_on_linkame : ""}`}></i>
                                            </div>
                                            <div className={` ${styles.search_menu} ${styles.hours_minutes} ${styles.fourth_column}`}>
                                                <p className={direction}>{selectedPickupPoints[0]?.pcatId === 1 ? appData?.words["seLandingTime"] : appData?.words["sePickUpTime"]}</p>
                                                <div className={`${styles.select_time_div} ${direction}`}>
                                                    {Array.from(new Array(2)).map((arr, i) => {
                                                        return (
                                                            <div key={i} className={styles.booking_form_hour_minute_wrapper}>
                                                                <label htmlFor={i}></label>
                                                                <i className={`fa-sharp fa-solid fa-angle-down ${direction === "rtl" ? styles.left : ""}`}></i>
                                                                <select
                                                                    aria-label={i}
                                                                    defaultValue={i === 0 ? splitedHour : splitedMinute}
                                                                    onChange={(e) => onChangeSetDateTimeHandler({ value: e.target.value, hourOrMinute: i === 0 ? "hour" : "minute", journeyType: index })} >
                                                                    {/* //if index==0 thenhours will show up if not then minutes show up */}
                                                                    {i === 0
                                                                        ? hours.map((hour) => (<option key={hour.id} id={hour.id + 50} value={hour.value}> {hour.value} </option>))
                                                                        : minutes.map((minute) => (<option key={minute.id} id={minute.id} value={minute.value}  > {minute.value} </option>))}
                                                                </select>
                                                            </div>)
                                                    })}
                                                </div>
                                            </div>

                                            {/* when jtype is 1  button not gonna be visible on transfer details point */}
                                            {index === 1 && reservations.length > 1 || index === 0 && reservations.length === 1 ?
                                                <div className={`${styles.btn_div} ${styles.fifth_column}`}  >
                                                    {internalState[`quotation-loading`] ?
                                                        <div className={`btn btn_primary  disabled_button ${styles.waveloadingdiv}`} style={{ marginTop: '0px' }}>
                                                            <WaveLoading />
                                                        </div>
                                                        :
                                                        <button onClick={(e) => getQuotations(e)} className={`btn btn_primary`}>

                                                            <i className="fa-solid fa-magnifying-glass"></i>
                                                            <span>{appData?.words["seGetQuotation"]}</span>
                                                        </button>}
                                                </div>
                                                : <React.Fragment></React.Fragment>}

                                            {/* //empty div when it is both journey   */}
                                            {reservations.length > 1 && index === 0 ?
                                                <div className={`${styles.btn_div} ${styles.fifth_column} ${styles.hide_mobile} `}  >
                                                    {internalState[`quotation-loading`] ?
                                                        <div className={`btn btn_primary  disabled_button ${styles.waveloadingdiv}`}>
                                                        </div>
                                                        :
                                                        <button className={`btn btn_primary`} onClick={(e) => getQuotations(e)}>
                                                        </button>}
                                                </div>
                                                : <React.Fragment></React.Fragment>}
                                        </div>
                                        {
                                            internalState[`error-booking-message-${index}`] ?
                                                <div className={styles.errorBookedMessage}>
                                                    <p>{internalState[`error-booking-message-${index}`]}</p>
                                                </div>
                                                : <></>
                                        }
                                    </div>

                                )
                            })}


                        </div>


                    </div>
                </div>
            </div>

            {islinknamecomponent && width > 768 ? <Features bggray={true} /> : <></>}

            <div className={`${styles.advertisiment_images_section} ${!islinknamecomponent ? styles.advertisiment_images_section_islinkname : ""} page_section`}>
                <div className={`${styles.advertisiment_images_section_container} page_section_container`}>
                    <div className={styles.advertisiment_images}>
                        <a rel="noreferrer" href="https://www.tripadvisor.co.uk/Attraction_Review-g186338-d11966434-Reviews-Airport_Pickups_London-London_England.html" target={"_blank"} >
                            <div className={`${styles.review_trip_advisor} ${width < 768 ? "" : "bottom_to_top_animation2"}`} style={{ animationDelay: '.5s', animationDuration: '1s' }}>
                                <Image fill priority style={{ objectFit: 'contain' }} sizes="(max-width: 768px) 100vw" src="/images/others/advisorTrip.webp" alt="Airport Pickups London Tripadvisor" />
                            </div>
                        </a>

                        <a rel="noreferrer" href="https://www.trustpilot.com/review/airport-pickups-london.com" target={"_blank"} >
                            <div className={`${styles.review_trip_advisor} ${width < 768 ? "" : "bottom_to_top_animation2"}`} style={{ animationDelay: '0.75s', animationDuration: '1s' }}>
                                <Image fill priority style={{ objectFit: 'contain' }} sizes="(max-width: 768px) 100vw" src="/images/others/Excellent.webp" alt=" Airport Pickups London Trustpilot " />
                            </div>
                        </a>

                        <a rel="noreferrer" href="https://www.reviews.co.uk/company-reviews/store/airport-pickups-london-com" target={"_blank"} >
                            <div className={`${styles.review_trip_advisor} ${width < 768 ? "" : "bottom_to_top_animation2"}`} style={{ animationDelay: '1s', animationDuration: '1s' }}>
                                <Image fill priority style={{ objectFit: 'contain' }} sizes="(max-width: 768px) 100vw" src="/images/others/Reviews.webp" alt="Airport Pickups London Review" />
                            </div>
                        </a>
                    </div>
                </div>
            </div>


        </div >
    )
}

export default Hero
