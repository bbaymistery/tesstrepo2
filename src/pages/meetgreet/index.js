import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./styles.module.scss"
import GlobalLayout from '../../components/layouts/GlobalLayout'
import Steps from '../../components/elements/Steps';
import TextInput from '../../components/elements/TextInput';
import { ifHasUnwantedCharacters } from '../../helpers/ifHasUnwantedCharacters';
import Select from '../../components/elements/Select';
import { hours, minutes } from '../../constants/minutesHours';
import { bookersDetailsError, buttonLabelsNames, emailRegex, flightDetailsError, formatDate, passengerDetailsErrorAdults, passengerDetailsErrorChildren, stepsNames } from '../../helpers/meetgreetPageHelpers';
import { useRouter } from 'next/router';
import store from '../../store/store';
import { createWrapper } from 'next-redux-wrapper';
import MeetGreetBookingDetails from '../../components/elements/MeetGreetBookingDetails';
import MeetGreetPassengerDetails from '../../components/elements/MeetGreetPassengerDetails';

let keywords = "London Airport Meet and Greet, Airport Pickups, Heathrow, Gatwick, Stansted, Luton, City Airport, Corporate Services, Stress-Free Arrivals"
let title = "Airport Pick Ups London Meet and Greet"
let description = "London Airport Meet and Greet Service for stress-free arrivals at Heathrow, Gatwick, Stansted, Luton, and City airports. Corporate services available."

const MeetGreet = (props) => {
    let { bggray = false } = props
    const router = useRouter()
    const dispatch = useDispatch()

    const { appData } = useSelector(state => state.initialReducer)

    const state = useSelector(state => state.pickUpDropOffActions)
    let { params: { direction, language } } = state

    const meetAndGreetState = useSelector(state => state.meetAndGreetActions)
    let { seatLists, passengersFormChildren, passengersFormAdults, totalPrice, meetgreetDate, meetgreetActiveBtn, terminalName, buggerLists, seatListPrice, flightDetails, bookersDetails } = meetAndGreetState
    let { airline, flightNumber, flightClass, noOfLuggageBags } = flightDetails
    let { firstname, lastname, email, mobileNumber } = bookersDetails



    const [activeStep, setActiveStep] = useState(0)
    const [errorHolderForAdults, seterrorHolderForAdults] = useState([])//activeStep0
    const [errorHolderForChildren, setErrorHolderForChildren] = useState([])
    const [errorHolderFlightDetails, setErrorHolderFlightDetails] = useState([]);//activeStep1
    const [errorHolderBookerDetails, setErrorHolderBookersDetails] = useState([]);//activeStep1

    const [flightClassDropdownLabels, setFlightClassDropdownLabels] = useState([
        { id: "-- Select Flight  Class --", value: "-- Select Flight  Class --", },
        { id: "Economy", value: "Economy", },
        { id: "Business", value: "Business", },
        { id: "First", value: "First", },
    ])

    const [iframeStripe, setIframeStripe] = useState("");
    const [dataTokenForWebSocket, setDataTokenForWebSocket] = useState("");
    const [statusToken, setStatusToken] = useState("");
    const [popUpWindow, setPopUpWindow] = useState("")//for paypal

    const [cashPaymentModal, setCashPaymentModal] = useState(false)

    //for passengers information
    const onchangePassengerHandler = (e, index, childOrAdult) => {
        const { name, value } = e.target;
        if (ifHasUnwantedCharacters(value)) return
        dispatch({ type: "SET_PASSENGERS_FROM", data: { name, value, index, childOrAdult } })
    };
    const onchangeNumberLuggageHandler = (e) => {

        const { name, value } = e.target;
        // Handle the case of a negative number (you can show an error message or take appropriate action)
        if (name === "noOfLuggageBags") if (parseFloat(value) < 0) return;

        if (ifHasUnwantedCharacters(value)) return
        dispatch({ type: "SET_FLIGHT_NUMBER_OR_LUGGAGE", data: { name, value, } })
    }
    const gotoNextPage = () => {
        let errors = [{}];
        let errorsForChildren = [{}]
        //we combine all tgether and making cheking

        if (activeStep === 0) {
            errors = passengerDetailsErrorAdults(passengersFormAdults, appData);
            errorsForChildren = passengerDetailsErrorChildren(passengersFormChildren, appData)
            seterrorHolderForAdults(errors);
            setErrorHolderForChildren(errorsForChildren)
        } else if (activeStep === 1) {
            errors = Object.values(flightDetailsError(meetAndGreetState.flightDetails, appData));//this is array
            setErrorHolderFlightDetails(flightDetailsError(meetAndGreetState.flightDetails, appData));//this is obj
        } else if (activeStep === 2) {
            errors = Object.values(bookersDetailsError(meetAndGreetState.bookersDetails, appData));//this is array
            setErrorHolderBookersDetails(bookersDetailsError(meetAndGreetState.bookersDetails, appData));//this is obj
        }

        // Check if there are any errors, if yes, return and prevent moving to the next step
        // const errorKeys = Object.keys(errors);
        let allErrors = [...errors, ...errorsForChildren]

        // Check for any errors with statusCode 400
        if (allErrors.some(error => error.statusCode === 400)) return;
        // for (const key of errorKeys) {
        //     if (errors[key].statusCode === 400) return;
        // }

        // If no errors, move to the next step
        if (activeStep < 3) {
            setActiveStep((activeStep) => activeStep + 1);
        }
    };

    const gotoPreviousPage = () => {
        if (activeStep === 0) {
            router.back();
        } else {

            setActiveStep((activeStep) => activeStep - 1)
        }

    }

    const handleDecrementBugger = (idx, incordec) => dispatch({ type: 'SET_BUGGER_PORTER', data: { idx, incordec } })
    const handleIncrementBugger = (idx, incordec) => dispatch({ type: 'SET_BUGGER_PORTER', data: { idx, incordec } })
    const onchangeAirlineHandler = e => dispatch({ type: "SET_AIRLINE", data: { newAirline: e.target.value } })
    const onchangeFlightClassHandler = e => dispatch({ type: "SET_FLIGHT_CLASS", data: { newFlightClass: e.target.value } })
    const onChangeSetDateTimeHandler = (params = {}) => dispatch({ type: 'SET_FLIGHT_TIME', data: { ...params } })
    const onchangeBookerDetailsHandler = (params = {}) => dispatch({ type: 'SET_BOOKER_DETAILS', data: { ...params } })

    //*payment methods
    const cashMethod = (params = {}) => {
        // let { token, paymentType } = params
        // // if it is cash payment you have set payment type first of all then send archive
        // // fetchArchieveToken({ token: "", paymentType: "", stage: "CLICK_OVER_CASH_BUTTON" })
        // dispatch({ type: "SET_PAYMENT_TYPE_AND_TOKEN", data: { token, paymentType } })
        // setIframeStripe("")//CLOSE OFRAME INSIDE OF Page (in case of if it was opened )
        // setStatusToken("");//it will trigger interval and will make request
        // router.push("/reservations-document")
    };
    const stripeMethod = (params = {}) => {
        // let { id, quotations, passengerEmail, url } = params
        // if (!iframeStripe) {
        //     // if it is card payment you have set payment type first of all then send archive then
        //     // fetchArchieveToken({ token: "", paymentType: 7, stage: "CLICK_OVER_CARD_BUTTON" })
        //     const method = "POST"
        //     const body = JSON.stringify({
        //         quotations,
        //         type: id,
        //         language: "en",
        //         passengerEmail,
        //         "session-id": sessionToken,
        //         mode: "sandbox",
        //     })
        //     const headers = { "Content-Type": "application/json" }
        //     const config = { method, headers, body, };
        //     try {
        //         fetch(url, config)
        //             .then((res) => res.json())
        //             .then((data) => {

        //                 setDataTokenForWebSocket(data); //we use inside interval in order to detect it is which payment
        //                 setStatusToken(data?.webSocketToken); //it will trigger interval and will make request
        //                 setIframeStripe(data?.href);
        //                 openPopUpWindow({ statusOfWindowCloseOrOpen: "close", url: "" })
        //                 setPopUpWindow("")

        //             })
        //             .catch((error) => {

        //                 window.handelErrorLogs(error, 'APL PaymentMethods Component - stripeMethod function fetching catch blog  ', { config, url })
        //             });
        //     } catch (error) {
        //         window.handelErrorLogs(error, ' APL PaymentMethods Component - stripeMethod function try catch blog ', { id, quotations, passengerEmail, url })
        //     }
        // }
    };
    //this function includes all the methods of payments
    const startPayment = (id) => {


        // try {
        //     //general settings FOR PAYMENTS
        //     const paymentPagePath = JSON.parse(paymentTypes.filter((payment) => payment.id === id)[0].pagePath).path;


        //     const url = `${env.apiDomain}${paymentPagePath}`;
        //     let quotations = parseInt(journeyType) === 0 ? [reservations[0].quotation] : [reservations[0].quotation, reservations[1].quotation];
        //     let passengerEmail = reservations[0].passengerDetails.email;
        //     let passengerPhoneNumber = reservations[0].passengerDetails.phone;

        //     //Payment methods
        //     if (id === 1) cashMethod({ token: "", paymentType: id })
        //     if (id === 5) paypalMethod({ id, quotations, passengerEmail, url });
        //     if (id === 7) stripeMethod({ id, quotations, passengerEmail, url });
        // } catch (error) {
        //     window.handelErrorLogs(error, 'APL PaymentMethods Component -startPayment function trys catch blog', { id })

        // }
    }
    //this function triggering modal status of cash payment
    const popupmodalTrigger = (par) => {
        setCashPaymentModal(true)
        setIframeStripe("")
    }

    useEffect(() => {
        // Check if the new label is not undefined or null
        const newSelectLabel = appData?.words["strSelectFlightClass"];
        const newEconomyLabel = appData?.words["carTransferEconomy"];
        const newFirstLabel = appData?.words["strFirst"];
        const newBusinessLabel = appData?.words["carTransferBusiness"];

        const updatedLabels = [
            { id: "-- Select Flight Class --", value: `-- ${newSelectLabel} -- ` },
            { id: "Economy", value: newEconomyLabel },
            { id: "Business", value: newBusinessLabel },
            { id: "First", value: newFirstLabel },
        ];

        setFlightClassDropdownLabels(updatedLabels);

    }, [language, appData])

    return (
        <GlobalLayout keywords={keywords} title={title} description={description}>
            <div className={`${styles.meetgreet} ${direction} page`} bggray={String(bggray === "true")}>
                <div className={`${styles.meetgreet_section} page_section`}>
                    <div className={`${styles.meetgreet_section_container} page_section_container`}>
                        <div className={styles.form_to_fill} >
                            <div className={styles.form_to_fill_content}>
                                <div className={styles.left}>
                                    <Steps steps={stepsNames} activeStep={activeStep} />
                                    {/* //!step 0   Initial step */}
                                    {activeStep === 0 ?
                                        <div className={styles.passengers}>
                                            <p className={styles.passengers_title}> {appData?.words["strPassengers"]} </p>
                                            {passengersFormAdults.map((guest, idx) => {
                                                let errors = errorHolderForAdults[idx]
                                                return <div key={idx} className={styles.passengers_details_div}>
                                                    <p style={{ textTransform: "capitalize" }}>{appData?.words["strAdults"]} {idx + 1}</p>
                                                    <div className={styles.passengers_details}>
                                                        <div className={styles.input_div}>
                                                            <TextInput
                                                                label={appData?.words["strFirstName"]} type="text" name="firstname" onChange={e => onchangePassengerHandler(e, idx, "adults")} value={guest.firstname}
                                                                errorMessage={(errors?.errorMessage && guest.firstname.length === 0) ? errors.errorMessage : ""} />
                                                        </div>
                                                        <div className={styles.input_div}>
                                                            <TextInput
                                                                label={appData?.words["strLastName"]} type="text" name="lastname" onChange={e => onchangePassengerHandler(e, idx, "adults")}
                                                                value={guest.lastname}
                                                                errorMessage={(errors?.errorMessage && guest.lastname.length === 0) ? errors.errorMessage : ""} />
                                                        </div>
                                                    </div>
                                                    <div className={styles.passengers_details}>
                                                        <div className={styles.input_div}>
                                                            <TextInput
                                                                label={appData?.words["appContactUsEmailAddress"]} type="text" name="email" onChange={e => onchangePassengerHandler(e, idx, "adults")} value={guest.email}
                                                                errorMessage={(errors?.errorMessage && !emailRegex?.test(email)) ? errors.errorMessage : ""} />
                                                        </div>
                                                        <div className={styles.input_div}>
                                                            <TextInput
                                                                label={appData?.words["strPhoneNumber"]} type="text" name="phone" onChange={e => onchangePassengerHandler(e, idx, "adults")} value={guest.phone}
                                                                errorMessage={(errors?.errorMessage && guest.phone.length === 0) ? errors.errorMessage : ""} />

                                                        </div>
                                                    </div>
                                                </div>
                                            })}


                                            {passengersFormChildren.map((guest, idx) => {
                                                let errors = errorHolderForChildren[idx]
                                                return <div key={idx} className={styles.passengers_details_div}>
                                                    <p style={{ textTransform: "capitalize" }}>{appData?.words["strChildren"]} {idx + 1}</p>
                                                    <div className={styles.passengers_details}>
                                                        <div className={styles.input_div}>
                                                            <TextInput
                                                                label={appData?.words["strFirstName"]} type="text" name="firstname" onChange={e => onchangePassengerHandler(e, idx, "children")} value={guest.firstname}
                                                                errorMessage={(errors?.errorMessage && guest.firstname.length === 0) ? errors.errorMessage : ""} />
                                                        </div>
                                                        <div className={styles.input_div}>
                                                            <TextInput
                                                                label={appData?.words["strLastName"]} type="text" name="lastname" onChange={e => onchangePassengerHandler(e, idx, "children")} value={guest.lastname}
                                                                errorMessage={(errors?.errorMessage && guest.lastname.length === 0) ? errors.errorMessage : ""} />
                                                        </div>
                                                    </div>
                                                </div>
                                            })}

                                        </div>
                                        : <></>}

                                    {/* //!step 1   Second step */}
                                    {activeStep === 1 ?
                                        <div className={styles.flight_details}>
                                            <p className={styles.flight_details_title}>{appData?.words["strFlightDetails"]}</p>
                                            <p className={styles.format_date}>
                                                {buttonLabelsNames[meetgreetActiveBtn] === "Arrival" && ` ${appData?.words["strArrival"]} ${formatDate(meetgreetDate, language)}`}
                                                {buttonLabelsNames[meetgreetActiveBtn] === "Departure" && ` ${appData?.words["strDeparture"]} ${formatDate(meetgreetDate, language)}`}
                                                {buttonLabelsNames[meetgreetActiveBtn] === "Connecting" && ` ${appData?.words["strConnecting"]} ${formatDate(meetgreetDate, language)}`}

                                            </p>
                                            <div className={styles.flight_details_inputs_div}>
                                                <div className={styles.dropdown_div}>
                                                    {/* <Select errorMessage={errorHolderFlightDetails?.airline?.errorMessage} label={appData?.words["strAirline"]} name="Airline" postCodeSelectOption={true} onChange={onchangeAirlineHandler} value={airline} data={dropdownAirlineLabels} /> */}
                                                    <TextInput
                                                        label={appData?.words["strAirline"]} type="text"
                                                        name="Airline" onChange={e => onchangeAirlineHandler(e)} value={airline}
                                                        errorMessage={(errorHolderFlightDetails?.airline?.errorMessage && airline.length === 0) ? errorHolderFlightDetails?.airline?.errorMessage : ""} />

                                                </div>
                                                <div className={styles.input_div}>
                                                    <TextInput
                                                        label={appData?.words["strFlightNumberTitle"]} type="text" name="flightNumber"
                                                        onChange={e => onchangeNumberLuggageHandler(e)} value={flightNumber}
                                                        errorMessage={(errorHolderFlightDetails.flightNumber?.errorMessage && flightNumber.length === 0) ? errorHolderFlightDetails.flightNumber?.errorMessage : ""} />

                                                </div>
                                                <div className={styles.input_div}>
                                                    <Select
                                                        label={appData?.words["strFlightClass"]} name="Flight Class"
                                                        postCodeSelectOption={true} onChange={onchangeFlightClassHandler}
                                                        value={flightClass} data={flightClassDropdownLabels}
                                                        errorMessage={(errorHolderFlightDetails.flightClass?.errorMessage && flightClass.includes("--")) ? errorHolderFlightDetails.flightClass?.errorMessage : ""} />

                                                </div>

                                                <div className={` ${styles.search_menu} ${styles.hours_minutes} `}>
                                                    <p className={direction}>{appData?.words["seLandingTime"]}</p>
                                                    <div className={`${styles.select_time_div} ${direction}`}>
                                                        {Array.from(new Array(2)).map((_arr, i) => {
                                                            return (
                                                                <div key={i} className={styles.booking_form_hour_minute_wrapper}>
                                                                    <select onChange={(e) => onChangeSetDateTimeHandler({ value: e.target.value, index: i })}  >
                                                                        {i === 0
                                                                            ? hours.map((hour) => (<option key={hour.id} id={hour.id} value={hour.value}> {hour.value} </option>))
                                                                            : minutes.map((minute) => (<option key={minute.id} id={minute.id} value={minute.value}  > {minute.value} </option>))}
                                                                    </select>
                                                                </div>)
                                                        })}
                                                    </div>
                                                </div>
                                                <div className={styles.input_div}>
                                                    <TextInput
                                                        label={appData?.words["strNoofSuitcases"]} type="number" name="noOfLuggageBags"
                                                        onChange={e => onchangeNumberLuggageHandler(e)} value={noOfLuggageBags}
                                                        errorMessage={(errorHolderFlightDetails.noOfLuggageBags?.errorMessage && noOfLuggageBags.length === 0) ? errorHolderFlightDetails.noOfLuggageBags?.errorMessage : ""} />

                                                </div>
                                            </div>
                                            <div className={styles.flight_extras_div}>
                                                <p className={styles.flight_extras_div_title}> {appData?.words["strAddExtraServices"]} </p>
                                                <div className={styles.bugger_selection_div}>
                                                    {buggerLists.map((item, index) => {
                                                        return <div key={index} className={styles.bugger_selection_div_column}>
                                                            <p className={styles.name}> {appData?.words[item.strName]}</p>
                                                            <p className={styles.desc}>  {item.desc}</p>
                                                            <div className={styles.bugger_selection_div_column_numbers_div} direction={String(direction === 'rtl')}>
                                                                <p className={`${styles.left_arrow} ${item.minNum === 0 ? styles.disabled : ""}`} onClick={() => handleDecrementBugger(index, "dec")}>
                                                                    <i className="fa-solid fa-chevron-left"></i>
                                                                </p>
                                                                <p className={styles.number}>  {item.minNum}  </p>
                                                                <p className={`${styles.right_arrow} `} onClick={() => handleIncrementBugger(index, "inc")}>
                                                                    <i className="fa-solid fa-chevron-right"></i>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    })}
                                                </div>
                                            </div>

                                        </div>
                                        : <></>}

                                    {/* //!step 2   Third step */}
                                    {activeStep === 2 ?
                                        <div className={styles.bookers}>
                                            <p className={styles.bookers_title}> Payment </p>
                                            <div className={styles.bookers_details_div}>
                                                <p>{appData?.words["strYourBookingDetails"]}</p>
                                                <div className={styles.bookers_details}>
                                                    <div className={styles.input_div}>
                                                        <TextInput
                                                            label={appData?.words["strFirstName"]} type="text" name="firstname"
                                                            onChange={(e) => onchangeBookerDetailsHandler({ value: e.target.value, name: e.target.name })} value={firstname}
                                                            errorMessage={(errorHolderBookerDetails?.firstname?.errorMessage && firstname.length === 0) ? errorHolderBookerDetails?.firstname?.errorMessage : ""} />

                                                    </div>
                                                    <div className={styles.input_div}>
                                                        <TextInput
                                                            label={appData?.words["strLastName"]} type="text" name="lastname"
                                                            onChange={(e) => onchangeBookerDetailsHandler({ value: e.target.value, name: e.target.name })} value={lastname}
                                                            // errorMessage={errorHolderBookerDetails?.lastname?.errorMessage}  />
                                                            errorMessage={(errorHolderBookerDetails?.lastname?.errorMessage && lastname.length === 0) ? errorHolderBookerDetails?.lastname?.errorMessage : ""} />

                                                    </div>
                                                    <div className={styles.input_div}>
                                                        <TextInput
                                                            label={appData.words["appContactUsEmailAddress"]} type="text" name="email"
                                                            onChange={(e) => onchangeBookerDetailsHandler({ value: e.target.value, name: e.target.name })} value={email}
                                                            errorMessage={(errorHolderBookerDetails?.email?.errorMessage && !emailRegex?.test(email)) ? errorHolderBookerDetails?.email?.errorMessage : ""} />

                                                    </div>
                                                    <div className={styles.input_div}>
                                                        <TextInput
                                                            label={appData?.words["strPhoneNumber"]} type="text" name="mobileNumber"
                                                            onChange={(e) => onchangeBookerDetailsHandler({ value: e.target.value, name: e.target.name })} value={mobileNumber}
                                                            errorMessage={(errorHolderBookerDetails?.mobileNumber?.errorMessage && mobileNumber.length === 0) ? errorHolderBookerDetails?.mobileNumber?.errorMessage : ""} />

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        : <></>}
                                    {activeStep === 3 ?
                                        <div className={styles.bookers}>
                                            <div className={styles.bookers_details_div}>
                                                <MeetGreetBookingDetails />
                                                <MeetGreetPassengerDetails appData={appData} />
                                            </div>
                                        </div>
                                        : <></>}
                                    {/* //here is confirmation part   */}
                                    <div className={`${styles.back_next_buttons}`} >
                                        {<button className='btn' onClick={gotoPreviousPage}>{appData?.words["strBack"]}</button>}
                                        {activeStep !== 3 ? <button className='btn' onClick={gotoNextPage}>{appData?.words["strNext"]}</button> : <></>}
                                    </div>

                                </div>

                                <div className={styles.right}>
                                    <div className={styles.right_content}>
                                        <p>{appData?.words["strOrderSummary"]}</p>
                                        <div className={styles.border}> </div>
                                        {buttonLabelsNames[meetgreetActiveBtn] === "Arrival" && <li className={styles.arrival}> <span>{appData?.words["strArrival"]} : </span> {appData?.words["strMeetandGreetIncluded"]}</li>}
                                        {buttonLabelsNames[meetgreetActiveBtn] === "Departure" && <li className={styles.arrival}> <span>{appData?.words["strDeparture"]} : </span>{appData?.words["strMeetandGreetIncluded"]}</li>}
                                        {buttonLabelsNames[meetgreetActiveBtn] === "Connecting" && <li className={styles.arrival}>   <span>{appData?.words["strConnecting"]} : </span> {appData?.words["strMeetandGreetIncluded"]}</li>}

                                        <li className={styles.terminal}>{terminalName}</li>
                                        <li className={styles.date}>{formatDate(meetgreetDate, language)}</li>
                                        <li className={styles.adults}>  {appData?.words["strAdults"]}  {seatLists[0].minNum},  {appData?.words["strChildren"]} {seatLists[1].minNum},  {appData?.words["strInfants"]} {seatLists[2].minNum}</li>
                                        <div className={styles.border}> </div>
                                        <div className={styles.total}>
                                            <p style={{ alignItems: 'center' }}>
                                                <span style={{ textAlign: "justify", }}>
                                                    {seatLists[0].minNum > 0 ? ` ${appData?.words["strAdults"]} ${seatLists[0].minNum} ` : <></>}
                                                    <br />
                                                    {seatLists[1].minNum > 0 ? ` ${appData?.words["strChildren"]} ${seatLists[1].minNum} ` : <></>}
                                                    <br />
                                                    {seatLists[2].minNum > 0 ? ` ${appData?.words["strInfants"]} ${seatLists[2].minNum}` : <></>}

                                                </span>
                                                <span>£{seatListPrice}</span>
                                            </p>

                                            {buggerLists[0].minNum * buggerLists[0].price > 0 ?
                                                <p>
                                                    <span>{appData?.words["strPorter"]} </span>
                                                    <span>£{buggerLists[0].minNum * buggerLists[0].price}</span>
                                                </p>
                                                : <></>}

                                            {buggerLists[1].minNum * buggerLists[1].price > 0 ?
                                                <p>
                                                    <span>{appData?.words["strBuggy"]} </span>
                                                    <span>£{buggerLists[1].minNum * buggerLists[1].price}</span>
                                                </p>
                                                : <></>}
                                            {buggerLists[2].minNum * buggerLists[2].price > 0 ?
                                                <p>
                                                    <span>{appData?.words["strAdditionalAssistant"]} </span>
                                                    <span>£{buggerLists[2].minNum * buggerLists[2].price}</span>
                                                </p>
                                                : <></>}



                                            <p className={styles.total_price}><span>{appData?.words["strTotalPrice"]}</span><span>£{totalPrice}</span>    </p>
                                        </div>
                                    </div>
                                    {activeStep === 3 ?


                                        <div className={`${styles.payment_details}`}>
                                            <div className={styles.header} direction={String(direction === 'rtl')}>
                                                <div className={styles.header_top}>
                                                    <h2 className={`${styles.header_top_title} ${direction}`} > {appData?.words["strHowWouldYouLikeToPay"]}</h2>
                                                    <div className={styles.border}> </div>
                                                </div>
                                            </div>

                                            <div className={styles.payment_list}>
                                                {iframeStripe?.length > 0 ? <iframe src={iframeStripe} className={styles.iframe} allow="payment" ></iframe> : <React.Fragment></React.Fragment>}

                                                <div className={`${styles.items_buttons}`}>
                                                    <div onClick={popupmodalTrigger} title={appData?.words["strToDriverCashTitle"]} className={` ${styles.item} ${styles.item_1}`}   >
                                                        <p>{appData?.words["strToDriverCashTitle"]}</p>
                                                        <img src="/images/others/pp.jpg" alt="" />
                                                    </div>

                                                    <div onClick={() => startPayment(7)} title={appData?.words["strPaybycard"]} className={`${styles.item} ${styles.item_4}`}   >
                                                        <p>{appData?.words["strPaybycard"]} </p>
                                                        <img src="/images/others/vsMaster.jpg" alt="" />
                                                    </div>
                                                </div>

                                                {cashPaymentModal ?
                                                    <div className={`${styles.content_modal} ${styles.appear}`}>
                                                        <div className={`${styles.confirmation_box} `}>
                                                            <div className={styles.header}>
                                                                <p>{appData?.words["strConfirmation"]}</p>
                                                                <i onClick={() => setCashPaymentModal(false)} className="fa-solid fa-xmark"></i>
                                                            </div>
                                                            <div className={styles.body}>
                                                                <p>{appData?.words["strYouHaveChosenToPayByCash"]} .</p>
                                                            </div>
                                                            <div className={styles.footer}>
                                                                <button onClick={() => startPayment(1)} className="btn btn_primary"> {appData?.words["strBookNow"]}</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    : <></>}
                                            </div>
                                        </div>
                                        : <></>}
                                    <div className={`${styles.back_next_buttons}`} >
                                        <button className='btn' onClick={gotoPreviousPage}>{appData?.words["strBack"]}</button>
                                        {activeStep !== 3 ? <button className='btn' onClick={gotoNextPage}>{appData?.words["strNext"]}</button> : <></>}
                                    </div>
                                </div>

                            </div>
                        </div>




                    </div>
                </div>
            </div>
        </GlobalLayout>
    )
}

export default MeetGreet
const makestore = () => store;
const wrapper = createWrapper(makestore);

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, ...etc }) => {

    const initialLanguages = store.getState().initialReducer?.appData?.languages
    const langs = initialLanguages.map((lang) => lang.value)

    for (let i = 0; i < langs.length; i++) {
        const lang = langs[i]
        const langUrl = lang === 'en' ? '/meetgreet' : `/${lang}/meetgreet`
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