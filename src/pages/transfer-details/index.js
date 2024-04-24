let description = "We specialize in airport transfer shuttle service. We can provide you with a chauffeur driven car to and from all major London airports. The airports include Heathrow, Gatwick, Stanstead, Luton and City airport.!"
let title = "Results Airport Transfers London Airport Pickups"
let keywords = " London airport transfers, London airport transfer, heathrow airport transfer, Gatwick airport transfer, stansted airport transfer, luton airport transfer, shuttle service, shuttle services, airport shuttle services, airport transfer shuttle service,  airport taxi service, taxi services, cab services, airport taxi service, London airport, airport transport, luton airport transport, London airport transportation, London shuttle services, Gatwick airport shuttle service, Heathrow airport shuttle service, Luton airport shuttle service, Stansted airport shuttle service, London airport taxi transfer, London airport shuttle, airport transfers London, airport transfers, chauffeur driven car, chauffeur driven cars, airport pick up and drop."
import { splitDateTimeStringIntoDate, splitDateTimeStringIntoHourAndMinute } from '../../helpers/splitHelper'
import SelectedPointsOnTransferDetails from '../../components/elements/SelectedPointsOnTransferDetails'
import TransferJourneySummaryPanel from '../../components/elements/TransferJourneySummaryPanel'
import FlightWaitingTimeContent from '../../components/elements/FlightWaitingTimeContent';
import { reservationSchemeValidator } from '../../helpers/reservationSchemeValidator';
import { ifHasUnwantedCharacters } from '../../helpers/ifHasUnwantedCharacters';
import InfoModal from '../../components/elements/InfoModal/InfoModal'
import GlobalLayout from '../../components/layouts/GlobalLayout'
import TextInput from '../../components/elements/TextInput';
import Textarea from '../../components/elements/Textarea';
import Select from '../../components/elements/Select';
import { useDispatch, useSelector } from 'react-redux'
import styles from "./styles.module.scss"
import { useRouter } from 'next/router'
import CheckBox from './CheckBox'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { currentDate } from '../../helpers/getDates'
import HandleSearchResults from '../../components/elements/HandleSearchResults'
import OutsideClickAlert from '../../components/elements/OutsideClickAlert'
import { hours, minutes } from '../../constants/minutesHours'
import env from '../../resources/env'
import Loading from '../../components/elements/Loading'
import SelectedPointsOnHomePage from '../../components/elements/SelectedPointsOnHomePage'
import store from '../../store/store'
import { createWrapper } from 'next-redux-wrapper'
import { urlWithLangAtribute } from '../../helpers/urlWithLangAtrribute'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import { useUserIp } from '../../hooks/userIp'

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
            let message = "APL   Hero component _collectPoints()  function catch blog "
            window.handelErrorLogs(error, message, { config })
        });
}
const collectPointsAsync = params => new Promise((resolve, reject) => collectPoints(params, log => resolve(log)))
const TransferDetails = (props) => {


    const router = useRouter()
    const dispatch = useDispatch()
    let state = useSelector((state) => state.pickUpDropOffActions)
    let { reservations, params: { passengerDetailsStatus, modalInfo, direction, quotations, sessionToken: reducerSessionToken, language, journeyType } } = state
    
    const { appData } = useSelector(state => state.initialReducer)
    //we use it to render paxs inside select component
    const carObject = appData?.carsTypes?.reduce((obj, item) => ({ ...obj, [item.id]: item, }), {});

    const objectDetailss = appData?.pointTypeCategories?.reduce((obj, item) => ({ ...obj, [item.id]: JSON.parse(item.objectDetails), }), {});
    const imageObjects = appData?.pointTypeCategories?.reduce((obj, item) => ({ ...obj, [item.id]: item.image, }), {});

    //in order having confirmation message
    //go back go forward and when change language we r not gonna have any confirmation
    const { nexturls, previousUrls, currentUrls } = urlWithLangAtribute({ languages: appData.languages, previousUrl: localStorage.getItem("path"), nextUrl: "/payment-details", currentUrl: router.asPath })
    // const confirmationAlert = useConfirm({ previousUrl: previousUrls, nextUrl: nexturls, currentUrls, message: "If you refresh the page, all data will be deleted." })
    //it is gonna be used inside --select when we come from tansfer details
    const [pickupIdForImage, setpickupIdForImage] = useState(null)
    const [dropoffIdFormImage, setdropoffIdFormImage] = useState(null)
    const [errorDropoffSelectBox, setErrorDropoffSelectBox] = useState(false)
    const [errorPickUpSelectBox, setErrorPickUpSelectBox] = useState(false)

    const { ip, country } = useUserIp();


    const handleOnChangeNumberInput = (value, _country, index, name) => {
        dispatch({ type: 'SET_PASSEGER_DETAILS', data: { name, value, index, updateBothJourneyCheckBox: passengerDetailsStatus } })
    };
    // const [errorDropoffSelectbox, seterrorDropoffSelectbox] = useState(false)
    // const [errorPickupSelectBox, seterrorPickupSelectBox] = useState(false)

    // will check if lang exist in url
    // const languageRegex = /^\/[a-z]{2}\//
    // let nexturls = appData.languages.map((lang) => `${lang.value === 'en' ? "" : `/${lang.value}`}/payment-details`)
    // let previousUrls = appData.languages.map((lang) => `${lang.value === 'en' ? "" : `/${lang.value}`}${localStorage.getItem("path")?.replace(languageRegex, '/')}`)
    // const confirmationAlert = useConfirm({ previousUrl: previousUrls, nextUrl: nexturls, message: "If you leave the page, all data will be deleted." })
    let [internalState, setInternalState] = React.useReducer((s, o) => ({ ...s, ...o }), {
        'errorHolder': [],
        'pickup-search-value-0': '',
        'dropoff-search-value-0': '',
        'collecting-pickup-points-0': [],
        'collecting-dropoff-points-0': [],
        //focus
        'pickup-search-focus-0': false,//it is for modal
        'dropoff-search-focus-0': false,//it is for modal

        'pickup-search-loading-0': false,
        'dropoff-search-loading-0': false,

        //quotation loading
        "quotation-loading": false,
    })
    let { errorHolder } = internalState;


    const checkValidation = (e) => {
        let errorHolder = reservationSchemeValidator({ reservations, appData }, { checkTransferDetails: true });
        setInternalState({ errorHolder })
        if (errorHolder.status === 200) router.push(`${language === 'en' ? "/payment-details" : `${language}/payment-details`}`)


        if (reservations[0].selectedPickupPoints.length === 0) {
            setErrorPickUpSelectBox(true)
        } else {
            setErrorPickUpSelectBox(false)

        }
        if (reservations[0].selectedDropoffPoints.length === 0) {
            setErrorDropoffSelectBox(true)
        } else {
            setErrorDropoffSelectBox(false)

        }
    }
    //for passengers information
    const onchangeHandler = (e, index) => {
        let { name, value } = e.target;
        //hinder user  to add some Characters
        if (ifHasUnwantedCharacters(value)) return

        if (['firstname', 'email',].includes(name))
            dispatch({ type: 'SET_PASSEGER_DETAILS', data: { name, value, index, updateBothJourneyCheckBox: passengerDetailsStatus } })

        if (['passengersNumber', "specialRequests"].includes(name))
            dispatch({ type: 'SET_TRANSFER_DETAILS', data: { name, value, index, updateBothJourneyCheckBox: passengerDetailsStatus } })

    }
    const onChangeSetDateTimeHandler = (params = {}) => {
        let { value, hourOrMinute, journeyType } = params
        dispatch({ type: 'SET_JOURNEY_DATETIME', data: { journeyType, hourOrMinute, value } })
    }

    //pop up modal
    const setFocusToInput = (params = {}) => {
        let { e, destination, index } = params

        e.target.style.opacity = 0
        setInternalState({ [`${destination}-search-focus-${index}`]: window.innerWidth > 990 ? false : true })
        setTimeout(() => e.target.style.opacity = 1);
    }

    const handleSelectTaxiDeals = (params = {}) => {
        let { e, destination, index, items } = params
        let emptyValue = { token: "", pid: "", ptype: "", }

        //in case if he select select point
        if (e.target.selectedIndex === 0 && destination === 'pickup') {
            setpickupIdForImage(null)
            dispatch({ type: "ADD_NEW_POINT_AT_PATHNAME", data: { pickupPoints: [], dropoffPoints: reservations[index].selectedDropoffPoints, index } })
            setErrorPickUpSelectBox(true)
            return
        }
        if (e.target.selectedIndex === 0 && destination !== 'pickup') {
            setdropoffIdFormImage(null)
            dispatch({ type: "ADD_NEW_POINT_AT_PATHNAME", data: { pickupPoints: reservations[index].selectedPickupPoints, dropoffPoints: [], index } })
            setErrorDropoffSelectBox(true)
            return
        }

        let value = items[e.target.selectedIndex]
        let point = { ...value, ...objectDetailss[value?.pcatId] }//...point    flightDetails{ flightNumber="",waitingPickupTime=0}


        if (destination === 'pickup') {
            if (point.pcatId === 1) {
                point = { ...point, flightDetails: { ...point.flightDetails, waitingPickupTime: "" } }
            }
            dispatch({ type: "ADD_NEW_POINT_AT_PATHNAME", data: { pickupPoints: [point], dropoffPoints: reservations[index].selectedDropoffPoints, index } })
            setpickupIdForImage(+value.pcatId)
            setErrorPickUpSelectBox(false)

        } else {
            dispatch({ type: "ADD_NEW_POINT_AT_PATHNAME", data: { pickupPoints: reservations[index].selectedPickupPoints, dropoffPoints: [point], index } })
            setdropoffIdFormImage(+value.pcatId)
            setErrorDropoffSelectBox(false)
        }

    }

    const closeModal = (params = {}) => {
        let { index, destination } = params
        let inputField = document.getElementById("input_focused")
        inputField.style.opacity = 1
        setInternalState({ [`${destination}-search-focus-${index}`]: false, [`${destination}-search-value-${index}`]: "", [`collecting-${destination}-points-${index}`]: [] })

    }

    const outsideClick = ({ destination, index }) => {
        //it means if we have seggested points then it will work otherwise it is nt
        if (!Array.isArray(internalState[`collecting-${destination}-points-${index}`]))
            setInternalState({ [`collecting-${destination}-points-${index}`]: [], [`${destination}-search-focus-${index}`]: false })

    }
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
    const handleCountry = (country, countryData) => {

    }
    //if we have one point then we allow to see flight number wainting time on the box
    useEffect(() => {
        if (quotations[0]?.taxiDeal?.pickupPoints?.length <= 1) {
            setpickupIdForImage(quotations[0]?.taxiDeal?.pickupPoints[0]?.pcatId)
        }

        if (quotations[0]?.taxiDeal?.dropoffPoints?.length <= 1) {
            setdropoffIdFormImage(quotations[0]?.taxiDeal?.dropoffPoints[0]?.pcatId)
        }
    }, [])

    return (
        <GlobalLayout keywords={keywords} title={title} description={description} footerbggray={true}>
            <div className={`${styles.tr_details} page`}>
                <div className={`${styles.tr_details_section} page_section`}>
                    <div className={`${styles.tr_details_section_container} page_section_container`}>
                        {quotations[0].taxiDeal ?
                            // isTaxideal true
                            <div className={styles.taxideals_subcontainer}>
                                {/* taxiDeal is gonna exist if when ever we choice go by taxiDeals  */}
                                {quotations[0]?.taxiDeal ?
                                    reservations.map((obj, index) => {
                                        let reservationError = (errorHolder.status === 403 && Array.isArray(errorHolder.reservations)) ? errorHolder.reservations[index] : {};
                                        let { transferDetails, selectedPickupPoints, quotation, selectedDropoffPoints, passengerDetails, } = obj
                                        let { transferDateTimeString, passengersNumber, specialRequests } = transferDetails
                                        let { phone, email, firstname } = passengerDetails
                                        const [splitedHour, splitedMinute] = splitDateTimeStringIntoHourAndMinute(transferDateTimeString) || []
                                        const [splitedDate] = splitDateTimeStringIntoDate(transferDateTimeString) || []

                                        return (
                                            <div className={`${styles.taxideals_subcontainer_content} ${direction}`} key={index}>
                                                <div className={styles.taxideals_subcontainer_content_points_and_passengerdetails}>
                                                    <div className={`${styles.points} ${direction}`} direction={String(direction === 'rtl')}>
                                                        <h2>{appData?.words["seGoingDetails"]}</h2>
                                                        <div className={`${styles.search_menu} ${styles.first_column}`}>
                                                            {/* Pick up location text */}
                                                            {!selectedPickupPoints.length > 0 ? <p className={direction}>{`${appData?.words["strPickupAddress"]}: ${quotations[0].taxiDeal.pickup}`}</p> : <React.Fragment></React.Fragment>}
                                                            {/* Pick Points text */}
                                                            {selectedPickupPoints.length > 0 ? <p className={` ${direction}`} >{appData?.words["strPickupPoints"]}</p> : <React.Fragment></React.Fragment>}
                                                            {/* selectedPoints */}
                                                            {/* //!case 1 => if quotations.points has only one item  =>show selected point*/}
                                                            {quotations[index]?.taxiDeal?.pickupPoints?.length <= 1 &&
                                                                selectedPickupPoints.length === 1 && <SelectedPointsOnHomePage hasOneItem={quotations[index]?.taxiDeal?.pickupPoints?.length === 1} isTaxiDeal={true} index={index} destination="pickup" points={selectedPickupPoints} />}
                                                            {/* //!case 2 => if quotations.points has more than 1  item  =>show select box*/}
                                                            {quotations[index]?.taxiDeal?.pickupPoints.length > 1 ?
                                                                <div style={{ border: (errorPickUpSelectBox) ? "1px solid red" : "" }} className={styles.taxideals_select_div} direction={String(direction === 'rtl')} title={selectedPickupPoints[0]?.address}>
                                                                    {/* //we r getting value by   >  quotations[index]?.taxiDeal?.pickupPoints <this  useing selectedIndex*/}
                                                                    {imageObjects && pickupIdForImage &&
                                                                        <img className={styles.point_image} src={`${env.apiDomain}${imageObjects[pickupIdForImage]}`} alt={selectedPickupPoints[0]?.address} />}
                                                                    <select
                                                                        className={styles.taxideals_select}
                                                                        defaultValue={`${selectedPickupPoints?.[index]?.address ? `${selectedPickupPoints?.[index]?.address}` : `--- ${appData?.words["quSelectButton"]} ---`}`}
                                                                        disabled={internalState[`quotation-loading`]}
                                                                        onChange={(e) => handleSelectTaxiDeals({ e, destination: "pickup", index, items: [language === "en" ? { address: `--- ${appData?.words["quSelectButton"]} ---` } : { translatedAddress: `--- ${appData?.words["quSelectButton"]} ---` }, ...quotations[index]?.taxiDeal?.pickupPoints] })}
                                                                    >
                                                                        {/* //!  */}
                                                                        {[language === "en" ? { address: `--- ${appData?.words["quSelectButton"]} ---` } : { translatedAddress: `--- ${appData?.words["quSelectButton"]} ---` }, ...quotations[index]?.taxiDeal?.pickupPoints].map((point, index) => {
                                                                            return <option key={index} value={point.adress}> {language === "en" ? point.address : point.translatedAddress}</option>
                                                                        }
                                                                        )}
                                                                    </select>
                                                                </div>
                                                                : <></>}
                                                            {/* //it means by default we dont have selected so he should select sth in order to see flight number waiting time  */}
                                                            {/* {pickupIdForImage ? */}
                                                            <SelectedPointsOnTransferDetails isTaxiDeal={true} pointsError={reservationError['selectedPickupPoints']} selectedPoints={selectedPickupPoints} journeyType={index} type='pickup' language={language} />
                                                            {/* : <></>} */}
                                                            <OutsideClickAlert onOutsideClick={(e) => outsideClick({ destination: "pickup", index })}>
                                                                <div className={`${styles.input_div} ${styles['search-input-container']}`} f={String(internalState[`pickup-search-focus-${index}`])} >
                                                                    <div className={`${styles.popup_header} ${direction}`} f={String(internalState[`pickup-search-focus-${index}`])}>
                                                                        <i className={`fa-solid fa-xmark ${styles.close_icon}`} onClick={(e) => closeModal({ index, destination: "pickup" })}></i>
                                                                        <p className={direction}>{appData?.words["strFromWithQuestionMark"]} </p>
                                                                    </div>
                                                                    {selectedPickupPoints.length === 0 && quotations[0]?.taxiDeal?.pickupPoints?.length === 0 ?
                                                                        <input
                                                                            type="text"
                                                                            autoComplete="off"
                                                                            id="input_focused"//this is for scrolling top when ever we focus on mobile
                                                                            placeholder={"Please type the pickup address"}
                                                                            value={internalState[`pickup-search-value-${index}`]}
                                                                            autoFocus={internalState[`pickup-search-focus-${index}`]}
                                                                            f={String(internalState[`pickup-search-focus-${index}`])} //giving a style if we focused
                                                                            onFocus={e => setFocusToInput({ e, destination: "pickup", index })}
                                                                            onChange={(e) => onChangeHanler({ index, destination: 'pickup', value: e.target.value })}
                                                                            className={`${direction} ${reservationError?.selectedPickupPoints?.length > 0 && !internalState[`pickup-search-value-${index}`] && selectedPickupPoints.length === 0 ? styles.error_input : ""}`}
                                                                        /> : <React.Fragment></React.Fragment>}
                                                                    {/* loading icon inside input */}
                                                                    {internalState[`pickup-search-loading-${index}`] ? <div className={styles.loading_div} popupp={String(internalState[`pickup-search-focus-${index}`])} direction={String(direction === "rtl")} >  <Loading />  </div> : <React.Fragment></React.Fragment>}


                                                                    {/* if !internalState[`pickup-search-value-${index}`] then our handleSearchResults will be belong to styles.book.input */}
                                                                    {!Array.isArray(internalState[`collecting-pickup-points-${index}`]) ?
                                                                        //setInternalState>>>after adding item we set input field  to empty and add extradiv to true
                                                                        <HandleSearchResults isTaxiDeal={true} language={language} index={index} destination="pickup" setInternalState={setInternalState} collectingPoints={internalState[`collecting-pickup-points-${index}`]} /> : <React.Fragment></React.Fragment>}

                                                                </div>

                                                            </OutsideClickAlert>

                                                        </div>
                                                        <div className={`${styles.search_menu} ${styles.second_column}`}>
                                                            {/* Pick up location text */}
                                                            {!selectedDropoffPoints.length > 0 ? <p className={direction}>{`${appData?.words["strDropoffAddress"]}: ${quotations[0].taxiDeal.dropoff}`}</p> : <React.Fragment></React.Fragment>}
                                                            {/* Pick Points text */}
                                                            {selectedDropoffPoints.length > 0 ? <p className={`${styles.point_title} ${direction}`} >{appData?.words["strDropoffPoints"]}</p> : <React.Fragment></React.Fragment>}
                                                            {/* selectedPoints */}
                                                            {/* //!case 1 => if quotations.points has only one item  =>show selected point*/}
                                                            {quotations[index]?.taxiDeal?.dropoffPoints?.length <= 1 &&
                                                                selectedDropoffPoints.length === 1 && <SelectedPointsOnHomePage hasOneItem={quotations[index]?.taxiDeal?.dropoffPoints?.length === 1} isTaxiDeal={true} index={index} destination="dropoff" points={selectedDropoffPoints} />}
                                                            {/* //!case 2 => if quotations.points has more than 1  item  =>show select box*/}
                                                            {quotations[index]?.taxiDeal?.dropoffPoints.length > 1 ?
                                                                <div style={{ border: (errorDropoffSelectBox) ? "1px solid red" : "" }} className={styles.taxideals_select_div} direction={String(direction === 'rtl')}>
                                                                    {imageObjects && dropoffIdFormImage &&
                                                                        <img className={styles.point_image} src={`${env.apiDomain}${imageObjects[dropoffIdFormImage]}`} alt={selectedDropoffPoints[0]?.address} />}
                                                                    <select

                                                                        className={styles.taxideals_select}
                                                                        defaultValue={`${selectedDropoffPoints?.[index]?.address ? `${selectedDropoffPoints?.[index]?.address}` : "--- select dropoff point ---`"}`}
                                                                        disabled={internalState[`quotation-loading`]}
                                                                        onChange={(e) => handleSelectTaxiDeals({ e, destination: "dropoff", index, items: [{ address: `--- select dropoff point ---` }, ...quotations[index]?.taxiDeal?.dropoffPoints] })}
                                                                    >
                                                                        {[{ address: `--- select dropoff point ---` }, ...quotations[index]?.taxiDeal?.dropoffPoints].map((point, index) => {
                                                                            return <option key={index} value={point.adress}> {language === "en" ? point.address : point.translatedAddress}</option>
                                                                        }
                                                                        )}
                                                                    </select>
                                                                </div>
                                                                : <></>}
                                                            <SelectedPointsOnTransferDetails isTaxiDeal={true} pointsError={reservationError['selectedDropoffPoints']} selectedPoints={selectedDropoffPoints} journeyType={index} type='dropoff' language={language} />
                                                            <OutsideClickAlert onOutsideClick={(e) => outsideClick({ destination: "dropoff", index })}>
                                                                <div className={`${styles.input_div} ${styles['search-input-container']}`} f={String(internalState[`dropoff-search-focus-${index}`])} >
                                                                    <div className={`${styles.popup_header} ${direction}`} f={String(internalState[`dropoff-search-focus-${index}`])}>
                                                                        <i className={`fa-solid fa-xmark ${styles.close_icon}`} onClick={(e) => closeModal({ index, destination: "dropoff" })}></i>
                                                                        <p className={direction}>{appData?.words["strWhereWithQuestionMark"]} </p>
                                                                    </div>
                                                                    {/* //!case 3 => if quotations.points has not has   item  =>show input field */}
                                                                    {selectedDropoffPoints.length === 0 && quotations[0]?.taxiDeal?.dropoffPoints?.length === 0 ?
                                                                        <input
                                                                            type="text"
                                                                            autoComplete="off"
                                                                            id="input_focused"//this is for scrolling top when ever we focus on mobile
                                                                            placeholder={appData?.words["strPleaseTypeInTheDropOffAddress"]}
                                                                            value={internalState[`dropoff-search-value-${index}`]}
                                                                            autoFocus={internalState[`dropoff-search-focus-${index}`]}
                                                                            f={String(internalState[`dropoff-search-focus-${index}`])} //giving a style if we focused
                                                                            onFocus={e => setFocusToInput({ e, destination: "dropoff", index })}
                                                                            onChange={(e) => onChangeHanler({ index, destination: 'dropoff', value: e.target.value })}
                                                                            className={`${direction} ${reservationError?.selectedDropoffPoints?.length > 0 && !internalState[`dropoff-search-value-${index}`] && selectedDropoffPoints.length === 0 ? styles.error_input : ""}`}
                                                                        /> : <React.Fragment></React.Fragment>}
                                                                    {/* loading icon inside input */}
                                                                    {internalState[`dropoff-search-loading-${index}`] ? <div className={styles.loading_div} popupp={String(internalState[`dropoff-search-focus-${index}`])} direction={String(direction === "rtl")}>  <Loading />  </div> : <React.Fragment></React.Fragment>}




                                                                    {/* results when we get points */}
                                                                    {!Array.isArray(internalState[`collecting-dropoff-points-${index}`]) ?
                                                                        <HandleSearchResults isTaxiDeal={true} language={language} index={index} destination="dropoff" setInternalState={setInternalState} collectingPoints={internalState[`collecting-dropoff-points-${index}`]} /> : <React.Fragment></React.Fragment>}
                                                                </div>
                                                            </OutsideClickAlert>
                                                        </div>
                                                        <div className={styles.date_time_together}>
                                                            <div className={` ${styles.search_menu} ${styles.book_input_date} ${styles.third_column}`}>
                                                                <p className={direction}>{selectedPickupPoints[0]?.pcatId === 1 ? appData?.words["seLandingDate"] : appData?.words["sePickUpDate"]}</p>
                                                                <div className={`${styles.date_div} ${direction === 'rtl' && styles.date_div_rtl}`}>
                                                                    <input
                                                                        type="date"
                                                                        name="pickup-date"
                                                                        className={direction === "rtl" ? styles.rtl : ""}
                                                                        value={splitedDate}
                                                                        min={index === 0 ? currentDate() : reservations[0].transferDetails.transferDateTimeString.split(" ")[0]}
                                                                        onChange={(e) => onChangeSetDateTimeHandler({ value: e.target.value, hourOrMinute: "date", journeyType: index })}
                                                                    />
                                                                </div>
                                                                <i className={`fa-solid fa-calendar-days ${styles.date_picker_icon}`}></i>
                                                            </div>
                                                            <div className={` ${styles.search_menu} ${styles.hours_minutes} ${styles.fourth_column}`}>
                                                                <p className={direction}>{selectedPickupPoints[0]?.pcatId === 1 ? appData?.words["seLandingTime"] : appData?.words["sePickUpTime"]}</p>
                                                                <div className={`${styles.select_time_div} ${direction}`}>
                                                                    {Array.from(new Array(2)).map((arr, i) => {
                                                                        return (
                                                                            <div key={i} className={styles.booking_form_hour_minute_wrapper}>
                                                                                <i className={`fa-sharp fa-solid fa-angle-down ${direction === "rtl" ? styles.left : ""}`}></i>
                                                                                <select
                                                                                    defaultValue={i === 0 ? splitedHour : splitedMinute}
                                                                                    onChange={(e) => onChangeSetDateTimeHandler({ value: e.target.value, hourOrMinute: i === 0 ? "hour" : "minute", journeyType: index })} >
                                                                                    {/* //if index==0 thenhours will show up if not then minutes show up */}
                                                                                    {i === 0
                                                                                        ? hours.map((hour) => (<option key={hour.id} id={hour.id} value={hour.value}> {hour.value} </option>))
                                                                                        : minutes.map((minute) => (<option key={minute.id} id={minute.id} value={minute.value}  > {minute.value} </option>))}
                                                                                </select>
                                                                            </div>)
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* //!passenger details for transfer journey */}
                                                    {/* //!if client choise unchecked for input checkbox then it will show up  */}
                                                    {index === 0 || (!passengerDetailsStatus && index === 1) ?
                                                        <div className={styles.passenger_details_div}>
                                                            {index === 0 ? <h2> {appData?.words['strPassengerDetails']}</h2> : <h2 className={styles.return_pas_details_header}>{appData?.words["strReturnJourneyPassengerDetails"]}</h2>}
                                                            <div className={styles.passenger_details}>
                                                                <div className={styles.input_div}>
                                                                    <TextInput label={appData?.words["strFullName"]} type="text" name="firstname" onChange={e => onchangeHandler(e, index)} value={firstname} errorMessage={reservationError?.passengerDetails?.firstname} />
                                                                </div>
                                                                <div className={styles.input_div}>
                                                                    <TextInput label={appData?.words["strEmail"]} type="text" name="email" onChange={e => onchangeHandler(e, index)} value={email} errorMessage={reservationError?.passengerDetails?.email} />
                                                                </div>
                                                                <div className={styles.input_div}>
                                                                    <Select label={appData?.words["strNoofPassengers"]} name="passengersNumber" onChange={e => onchangeHandler(e, index)} value={passengersNumber} data={carObject[quotation.carId]?.pax} />
                                                                </div>
                                                                <div className={`${styles.input_div} ${direction === "rtl" ? "phone_input_direction" : ""}`}>
                                                                    {/* <TextInput label={appData?.words["appContactUsFormPhone"]} type="number" name="phone" onChange={e => onchangeHandler(e, index)} value={phone} errorMessage={reservationError?.passengerDetails?.phone} /> */}
                                                                    <PhoneInput
                                                                        className={`phone_input ${direction === "rtl" ? "phone_input_direction" : ""}`}
                                                                        value={phone}
                                                                        onChange={(value, selectedCountry) => handleOnChangeNumberInput(value, selectedCountry, index, "phone")}
                                                                        country={country.toLowerCase()}
                                                                        inputProps={{
                                                                            name: 'phone',
                                                                            required: true,

                                                                            style: { border: reservationError?.passengerDetails?.phone ? '1px solid red' : ' 1px solid #ced4da' }
                                                                        }}
                                                                        onCountryChange={handleCountry}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div> : <React.Fragment></React.Fragment>}
                                                    <div className={styles.textarea_div}>
                                                        <Textarea isTaxiDeal={true} label={appData?.words["strSpecialRequestsTitle"]} name="specialRequests" value={specialRequests} onChange={(e) => onchangeHandler(e, index)} />
                                                    </div>
                                                    <div className={` ${direction === 'rtl' ? styles.directionbuttons : styles.buttons}  ${quotations[0]?.taxiDeal ? styles.taxideal_buttons : ""}`} >
                                                        <div className={styles.left}>
                                                            <Link href={`${localStorage?.getItem("path") ? localStorage?.getItem("path") : "/"}`}>
                                                                <button className='btn btn_primary'>{appData?.words["strGoBack"]}</button>
                                                                 </Link>
                                                            <button onClick={(e) => checkValidation(e)} className='btn btn_primary'>{appData?.words["strNext"]}</button>
                                                        </div>
                                                        <div className={styles.right}></div>
                                                    </div>
                                                </div>
                                                {<TransferJourneySummaryPanel isTaxiDeal={true} index={index} splitedHour={splitedHour} splitedMinute={splitedMinute} splitedDate={splitedDate} quotation={quotation} selectedDropoffPoints={selectedDropoffPoints} selectedPickupPoints={selectedPickupPoints} />}
                                            </div>
                                        )
                                    })
                                    : <></>}
                            </div>
                            :
                            // !in case client comes from normal way to transfer details
                            <div className={styles.transferdetails_subcontainer} id="main_container">
                                {reservations.map((obj, index) => {
                                    let reservationError = (errorHolder.status === 403 && Array.isArray(errorHolder.reservations)) ? errorHolder.reservations[index] : {};
                                    let { transferDetails, passengerDetails, quotation, selectedPickupPoints, selectedDropoffPoints } = obj
                                    let { transferDateTimeString, passengersNumber, specialRequests } = transferDetails
                                    let { phone, email, firstname } = passengerDetails
                                    const [splitedHour, splitedMinute] = splitDateTimeStringIntoHourAndMinute(transferDateTimeString) || []
                                    const [splitedDate] = splitDateTimeStringIntoDate(transferDateTimeString) || []
                                    //passenger details errors
                                    return (
                                        <div key={index} >
                                            <div className={`${styles.transferdetails_subcontainer_content} ${direction}`}>
                                                <div className={`${styles.transferdetails_subcontainer_content_points_and_passengerdetails} ${quotations[0]?.taxiDeal ? styles.details_panel_taxideal : ""}`}>
                                                    {/* //!passenger details for transfer journey */}
                                                    {/* //!if client choise unchecked for input checkbox then it will show up  */}
                                                    {index === 0 || (!passengerDetailsStatus && index === 1) ?
                                                        <div className={styles.passenger_details_div}>
                                                            {index === 0 ? <h2> {appData?.words['strPassengerDetails']}</h2> : <h2 className={styles.return_pas_details_header}>{appData?.words["strReturnJourneyPassengerDetails"]}</h2>}
                                                            <div className={styles.passenger_details}>
                                                                <div className={styles.input_div}>
                                                                    <TextInput label={appData?.words["strFullName"]} type="text" name="firstname" onChange={e => onchangeHandler(e, index)} value={firstname} errorMessage={reservationError?.passengerDetails?.firstname} />
                                                                </div>
                                                                <div className={styles.input_div}>
                                                                    <TextInput label={appData?.words["strEmail"]} type="text" name="email" onChange={e => onchangeHandler(e, index)} value={email} errorMessage={reservationError?.passengerDetails?.email} />
                                                                </div>
                                                                <div className={styles.input_div}>
                                                                    <Select label={appData?.words["strNoofPassengers"]} name="passengersNumber" onChange={e => onchangeHandler(e, index)} value={passengersNumber} data={carObject[quotation.carId]?.pax} />
                                                                </div>
                                                                <div className={styles.input_div}>
                                                                    <PhoneInput
                                                                        className={`phone_input ${direction === "rtl" ? "phone_input_direction" : ""}`}
                                                                        value={phone}
                                                                        onChange={(value, selectedCountry) => handleOnChangeNumberInput(value, selectedCountry, index, "phone")}
                                                                        country={country.toLowerCase()}
                                                                        inputProps={{
                                                                            name: 'phone',
                                                                            required: true,
                                                                            style: { border: reservationError?.passengerDetails?.phone ? '1px solid red' : ' 1px solid #ced4da' }
                                                                        }}
                                                                        onCountryChange={handleCountry}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div> : <React.Fragment></React.Fragment>}

                                                    {/* if client come from taxi deal then here will not be visible */}
                                                    {quotations[0]?.taxiDeal ? <></> :
                                                        <div className={styles.selected_points_details}>
                                                            <h2>   {index === 0 ? appData?.words["seGoingDetails"] : appData?.words["seReturnDetails"]}  </h2>
                                                            <div className={styles.selecteditems} >
                                                                <div className={`${styles.points} ${styles.selectedlist_points_left}`} >
                                                                    <h3 className={styles.points_header}>{appData?.words["strSelectedPickUpPoint"]}</h3>
                                                                    {/* //index =0 it is like destination pickup  */}
                                                                    <SelectedPointsOnTransferDetails pointsError={reservationError['selectedPickupPoints']} selectedPoints={selectedPickupPoints} journeyType={index} type='pickup' language={language} />
                                                                </div>
                                                                {/* {  selectedlist_points_left     bunu aldk select komponentde kulandk} */}
                                                                <div className={`${styles.points} ${styles.selectedlist_points_right}`}>
                                                                    <h3 className={styles.points_header}>{appData?.words["strSelectedDropOffPoint"]}</h3>
                                                                    {/* //index =1 it is like destination dropoff */}
                                                                    <SelectedPointsOnTransferDetails pointsError={reservationError['selectedDropoffPoints']} selectedPoints={selectedDropoffPoints} journeyType={index} type='dropoff' language={language} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                    <div className={styles.textarea_div}>
                                                        <Textarea label={appData?.words["strSpecialRequestsTitle"]} name="specialRequests" value={specialRequests} onChange={(e) => onchangeHandler(e, index)} />
                                                    </div>
                                                    {index === 1 ? <CheckBox direction={direction} textSame={appData?.words["strPassengerDetailsCheckBox"]} textNotSame={appData?.words["strThePassengerDetailsAreNotSame"]} /> : <React.Fragment></React.Fragment>}
                                                    {index === 1 || (index === 0 && +journeyType === 0) ?
                                                        <div className={` ${direction === 'rtl' ? styles.directionbuttons : styles.buttons}  ${quotations[0]?.taxiDeal ? styles.taxideal_buttons : ""}`} >
                                                            <div className={styles.left}>
                                                                <Link href={`${localStorage?.getItem("path") ? localStorage?.getItem("path") : "/"}`}><button className='btn btn_primary'>{appData?.words["strGoBack"]}</button> </Link>
                                                                <button onClick={(e) => checkValidation(e)} className='btn btn_primary'>{appData?.words["strNext"]}</button>
                                                            </div>

                                                        </div>
                                                        : <></>}
                                                </div>
                                                {quotations[0].taxiDeal ? <></> : <TransferJourneySummaryPanel journeyType={journeyType} index={index} splitedHour={splitedHour} splitedMinute={splitedMinute} splitedDate={splitedDate} quotation={quotation} selectedDropoffPoints={selectedDropoffPoints} selectedPickupPoints={selectedPickupPoints} />}
                                            </div>
                                            {index === 1 || (index === 0 && +journeyType === 0) ?
                                             <div className={`${direction === 'rtl' ? styles.directionbuttons_for_gap : styles.buttons_for_gap}  ${quotations[0]?.taxiDeal ? styles.taxideal_buttons : ""}`} >
                                                <div className={styles.left}>

                                                </div>
                                                <div className={styles.right}>
                                                    <div className={`${styles.content} ${styles.summarycontent} `}>
                                                        <div className={`${styles.left_info} ${styles.acceptedcards}`} style={{ marginTop: "0rem" }} title="Accepted Cards for Airport Pickups London">
                                                            <img className={styles.acceptedcards_img} border="0" alt="Accepted Cards for Airport Pickups London " src="/images/others/accepted-cards.png" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> : <></>}
                                        </div>
                                    )
                                })}
                            </div>
                        }
                        {modalInfo ? <InfoModal content={<FlightWaitingTimeContent />} /> : <React.Fragment></React.Fragment>}
                        {/* //passenger  details */}
                        {/* go back and next button */}
                        {/* {quotations[0].taxiDeal ? <></> :
                            <div className={` ${direction === 'rtl' ? styles.directionbuttons : styles.buttons}  ${quotations[0]?.taxiDeal ? styles.taxideal_buttons : ""}`} >
                                <div className={styles.left}>
                                    <Link href={`${localStorage?.getItem("path") ? localStorage?.getItem("path") : "/"}`}><button className='btn btn_primary'>{appData?.words["strGoBack"]}</button> </Link>
                                    <button onClick={(e) => checkValidation(e)} className='btn btn_primary'>{appData?.words["strNext"]}</button>
                                </div>
                                <div className={styles.right}></div>
                            </div>} */}

                    </div>
                </div>
            </div>
        </GlobalLayout>

    )
}

export default TransferDetails
const makestore = () => store;
const wrapper = createWrapper(makestore);

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, ...etc }) => {
    const initialLanguages = store.getState().initialReducer?.appData?.languages
    const langs = initialLanguages.map((lang) => lang.value)

    for (let i = 0; i < langs.length; i++) {
        const lang = langs[i]
        const langUrl = lang === 'en' ? '/transfer-details' : `/${lang}/transfer-details`
        if (req.url === langUrl) {
            return {
                redirect: {
                    destination: lang === 'en' ? "/" : `/${lang}`,
                    permanent: false
                }
            }
        }
    }
    // const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    // const geo = geoip.lookup(ip);

    return {
        props: {
            data: ""
        }
    }


});