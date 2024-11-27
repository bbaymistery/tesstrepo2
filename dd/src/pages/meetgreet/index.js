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
const INITIAL_FLIGHT_CLASS_OPTIONS = [
    { id: "-- Select Flight Class --", value: "-- Select Flight Class --" },
    { id: "Economy", value: "Economy" },
    { id: "Business", value: "Business" },
    { id: "First", value: "First" }
]
const MeetGreet = (props) => {
    let { bggray = false } = props
    const router = useRouter()
    const dispatch = useDispatch()

    const { appData } = useSelector(state => state.initialReducer)

    const state = useSelector(state => state.pickUpDropOffActions)
    let { params: { direction, language } } = state

    const meetAndGreetState = useSelector(state => state.meetAndGreetActions)
    let { seatLists, passengersFormChildren, passengersFormAdults, totalPrice, meetgreetDate, meetgreetActiveBtn, terminalName, buggerLists, seatListPrice, flightDetails, bookersDetails, selectedService } = meetAndGreetState
    let { airline, flightNumber, flightClass, noOfLuggageBags, flightTime } = flightDetails
    let { firstname, lastname, email, mobileNumber } = bookersDetails



    const [activeStep, setActiveStep] = useState(0)
    const [errorHolderForAdults, seterrorHolderForAdults] = useState([])//activeStep0
    const [errorHolderForChildren, setErrorHolderForChildren] = useState([])
    const [errorHolderFlightDetails, setErrorHolderFlightDetails] = useState([]);//activeStep1
    const [errorHolderBookerDetails, setErrorHolderBookersDetails] = useState([]);//activeStep1
    const [flightClassDropdownLabels, setFlightClassDropdownLabels] = useState(INITIAL_FLIGHT_CLASS_OPTIONS)

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
    console.log({ passengersFormAdults });

    const generatePassengerDetails = (passengersFormAdults) => {
        return passengersFormAdults
            .map((item, idx) => `
            <div style="margin-bottom: 10px;">
              <div style="display: flex; justify-content: space-between;">
                <p style="font-weight: bold; color: #051036; font-size: 14px; margin: 0;font-family: system-ui">${idx + 1}. Passenger Name</p>
                <p style="color: #333; font-size: 14px;margin:4px 0px">${item.firstname}</p>
              </div>
              
              <div style="display: flex; justify-content: space-between;padding-left: 15px;">
                <p style="font-weight: bold; color: #051036; font-size: 14px; margin: 0;font-family: system-ui">Passenger Last Name</p>
                <p style="color: #333; font-size: 14px;margin:4px 0px">${item.lastname}</p>
              </div>
              
              <div style="display: flex; justify-content: space-between;padding-left: 15px;">
                <p style="font-weight: bold; color: #051036; font-size: 14px; margin: 0;font-family: system-ui">Phone Number </p>
                <p style="color: #333; font-size: 14px;margin:4px 0px">${item.phone}</p>
              </div>
            </div>
          `)
            .join('');
    };

    const generateChildPassengerDetails = (children) => {
        return children
            .map((item, idx) => `
            <div style="margin-bottom: 10px;">
              <div style="display: flex; justify-content: space-between;">
                <p style="font-weight: bold; color: #051036; font-size: 14px;margin: 0;font-family: system-ui">${idx + 1}. Passenger Name</p>
                <p style="color: #333; font-size: 14px;margin:4px 0px">${item.firstname}</p>
              </div>
              
              <div style="display: flex; justify-content: space-between; padding-bottom: 10px;padding-left: 15px; ">
                <p style="font-weight: bold; color: #051036; font-size: 14px;margin: 0;font-family: system-ui">Passenger Last Name</p>
                <p style="color: #333; font-size: 14px;margin:4px 0px">${item.lastname}</p>
              </div>
            </div>
          `)
            .join('');
    };

    // Use the function to generate the HTML for all adults
    const adultsHTML = generatePassengerDetails(passengersFormAdults);
    const childrenHTML = generateChildPassengerDetails(passengersFormChildren)
    const generateOrderSummary = (orderDetails) => {
        return `
          <div style="text-align: center; font-weight: bold; font-size: 19px; margin-bottom: 10px;">
            Order Summary
          </div>
      
          <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <p style=" margin:4px 0px; color:#13357B; font-weight: bold;">Adults ${orderDetails.adults}</p>
          </div>
      
          <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <p style=" margin: 4px 0px; color:#13357B; font-weight: bold;">Children ${orderDetails.children} <span style="color:#555;font-weight: normal;"> (£${seatListPrice})</span></p>
       
          </div>
      
          <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <p style=" margin: 4px 0px; color:#13357B; font-weight: bold;">Infants ${orderDetails.infants}</p>
          </div>
         <div style=" margin-top: 10px; border-top: 1px solid #ddd; padding-top: 10px;"> </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <p style="margin: 4px 0px; color:#13357B; font-weight: bold;">Porter</p>
            <p style="margin: 4px 0px; color:#13357B;">£${orderDetails.porterPrice}</p>
          </div>
         <div style=" margin-top: 10px; border-top: 1px solid #ddd; padding-top: 10px;"> </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <p style="margin: 4px 0px; color:#13357B; font-weight: bold;">Buggy</p>
            <p style="margin: 4px 0px; color:#13357B;">£${orderDetails.buggyPrice}</p>
          </div>
         <div style=" margin-top: 10px; border-top: 1px solid #ddd; padding-top: 10px;"> </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <p style="margin: 4px 0px; color:#13357B; font-weight: bold;">Additional Assistant</p>
            <p style="margin: 4px 0px; color:#13357B;">£${orderDetails.additionalAssistantPrice}</p>
          </div>
      
          <div style="display: flex; justify-content: space-between; font-weight: bold; margin-top: 10px; border-top: 1px solid #ddd; padding-top: 10px;">
            <p style="margin: 4px 0px; color:#13357B;">Total Price</p>
            <p style="margin: 4px 0px; color:#13357B;">£${orderDetails.totalPrice}</p>
          </div>
        `;
    };

    // Sample data for order details
    const orderDetails = {
        adults: seatLists[0].minNum,
        children: seatLists[1].minNum,
        infants: seatLists[2].minNum,
        porterPrice: buggerLists[0].minNum * buggerLists[0].price,
        buggyPrice: buggerLists[1].minNum * buggerLists[1].price,
        additionalAssistantPrice: buggerLists[2].minNum * buggerLists[2].price,
        totalPrice,
        seatListPrice
    };

    // Generate the Order Summary HTML
    const orderSummaryHTML = generateOrderSummary(orderDetails);
    const htmlTemplate = `
     <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif;">
      <div style="max-width:750px; margin: 0 auto; padding: 20px;  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;">
    <div style="background-color: #f8f8f8; padding: 10px; text-align: center;">
        <h2 style="margin: 0;">Booking Confirmation</h2>
        <p>Heathrow Meet And Assist</p>
        <p>Airport Pickups London</p>
    </div>
    <!-- Content Grid -->
    <div style="display: flex;justify-content: space-between;padding: 10px 10px;border: 1px solid #ddd;margin: 10px 0px;border-radius: 10px;">
      <!-- Service Details Column -->
      <div style="width: 48%;">
        <h3 style="font-weight: bold; font-size: 19px; color: #051036; margin-bottom: 15px;">Service Details</h3>
        <p style="margin: 5px 0;font-family: system-ui"><strong style="font-weight:500 ;">Selected Service:</strong> {{selectedService}}</p>
        <p style="margin: 5px 0;font-family: system-ui"><strong style="font-weight:500 ;">Airport:</strong>{{terminalName}}</p>
        <p style="margin: 5px 0;font-family: system-ui"><strong style="font-weight:500 ;">Additional Assistant:</strong></p>
        <ul style="list-style-type: disc; margin: 5px 0 10px 20px; padding: 0; color: #0073e6;">
          <li>Buggy {{buggy}}</li>
          <li>Porter {{porter}}</li>
          <li>Heathrow Meet And Assist {{additionalAssistant}}</li>
        </ul>
        <p style="margin: 5px 0;font-family: system-ui"><strong style="font-weight:500 ;">Pickup Date And Time:</strong>{{pickupTime}}</p>
      </div>
      <!-- Travelers Column -->
      <div style="width: 48%;">
        <h3 style="font-weight: bold; font-size: 19px; color: #051036; margin-bottom: 15px;">Travelers</h3>
        <p style="margin: 5px 0;font-family: system-ui"><strong style="font-weight:500 ;">Adults Above 12 Years Old:</strong> 2</p>
        <p style="margin: 5px 0;font-family: system-ui"><strong style="font-weight:500 ;">Children From 2 To 12 Years Old:</strong> 3</p>
        <p style="margin: 5px 0;font-family: system-ui"><strong style="font-weight:500 ;">Infants Below 2 Years Old:</strong> 1</p>
      </div>
    </div>
    <!-- Content Grid Finished-->


    <!-- Flight Details Section -->
    <div style="padding: 10px 10px;border: 1px solid #ddd;margin: 10px 0px;border-radius: 10px;">

      <div style="text-align: center; font-weight: bold;  margin-bottom: 10px; margin-top: 10px;font-size:19px">
        Flight Details
      </div>
      
      <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
        <p  style="font-weight: bold; color: #051036; margin: 0; font-size: 14px; font-family: system-ui">Airline</p>
        <p style="color: #333;margin:4px 0px">{{airline}}</p>
      </div>

     
      <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
        <p  style="font-weight: bold; color: #051036; margin: 0; font-size: 14px;font-family: system-ui">Flight No</p>
        <p style="color: #333;margin:4px 0px">{{flightNumber}}</p>
      </div>

      <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
        <p  style="font-weight: bold; color: #051036; margin: 0; font-size: 14px;font-family: system-ui">Flight Class</p>
        <p style="color: #333;margin:4px 0px">{{flightClass}}</p>
      </div>
      

      <div style="display: flex; justify-content: space-between; margin-bottom: 2px; border-bottom: 1px solid #ddd;padding-bottom: 10px;">
        <p  style="font-weight: bold; color: #051036; margin: 0; font-size: 14px;font-family: system-ui">No of Suitcases</p>
        <p style="color: #333;margin:4px 0px">{{noOfSuitcases}}</p>
      </div>
     

      <!--  Reservation Contact Details -->
      <div style="text-align: center; font-weight: bold; font-size: 19px; margin-bottom: 10px;margin-top: 10px;">
       Reservation Contact Details
      </div>

      <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
        <p style="font-weight: bold; color: #051036; font-size: 14px; margin: 0;font-family: system-ui">Passenger Name</p>
        <p style="color: #333; font-size: 14px;margin:4px 0px";">{{firstname}}</p>
      </div>

      <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
        <p style="font-weight: bold; color: #051036; font-size: 14px; margin: 0;font-family: system-ui">Passenger Last Name</p>
        <p style="color: #333; font-size: 14px;margin:4px 0px;">{{lastname}}</p>
      </div>

      <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
        <p style="font-weight: bold; color: #051036; font-size: 14px; margin: 0;font-family: system-ui">Passenger Email</p>
        <p style="color: #333; font-size: 14px; margin:4px 0px;">{{email}}</p>
      </div>

      <div style="display: flex; justify-content: space-between; margin-bottom: 5px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
        <p style="font-weight: bold; color: #051036; font-size: 14px; margin: 0;font-family: system-ui">Phone Number</p>
        <p style="color: #333; font-size: 14px;margin:4px 0px;">{{mobileNumber}}</p>
      </div>

       <!--  Adults -->
      <div style="text-align: center; font-weight: bold; font-size: 19px; margin-bottom: 10px;margin-top: 10px;">
       Adults
      </div>
     ${adultsHTML}
      <!--  Children  -->
      <div style="text-align: center; font-weight: bold; font-size: 19px; margin-bottom: 10px;margin-top: 10px;">
       Children
      </div>
      ${childrenHTML}
    <div style="display: flex; justify-content: space-between; margin-bottom: 5px; border-bottom: 1px solid #ddd; padding-bottom: 10px;"></div>

       ${orderSummaryHTML}
      </div>
      </div>
    </body>
    </html>
  `;



    const handleConfirmClick = async () => {
        //here i want use htmltemplate and see the output how it looks 
        // Open a new window and write the HTML content
        //The date will be changed > 
        const filledTemplate = htmlTemplate
            .replace('{{selectedService}}', selectedService)
            .replace('{{date}}', meetgreetDate.split(" ")[0].replace(/(\d+)\-(\d+)-(\d+)/, "$3-$2-$1"))
            .replace('{{adults}}', seatLists[0].minNum)
            .replace('{{children}}', seatLists[1].minNum)
            .replace('{{infants}}', seatLists[2].minNum)
            .replace('{{terminalName}}', terminalName)
            .replace('{{airline}}', airline)
            .replace('{{pickupTime}}', `${meetgreetDate.split(" ")[0].replace(/(\d+)\-(\d+)-(\d+)/, "$3-$2-$1")} ${flightDetails.flightTime}`)
            .replace('{{flightNumber}}', flightNumber)
            .replace('{{flightClass}}', flightClass)
            .replace('{{buggy}}', buggerLists[1].minNum)
            .replace('{{porter}}', buggerLists[0].minNum)
            .replace('{{additionalAssistant}}', buggerLists[2].minNum)
            .replace('{{noOfSuitcases}}', noOfLuggageBags)
            .replace('{{firstname}}', firstname)
            .replace('{{lastname}}', lastname)
            .replace('{{email}}', email)
            .replace('{{mobileNumber}}', mobileNumber);

        const newWindow = window.open('', '_blank');
        newWindow.document.write(filledTemplate);
        newWindow.document.close();
    };



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
                                            <p className={styles.passengers_title} style={{ textTransform: "capitalize" }}> {appData?.words["strJourneyPassengerDetails"]} </p>
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
                                                        {/* <div className={styles.input_div}>
                                                            <TextInput
                                                                label={appData?.words["appContactUsEmailAddress"]} type="text" name="email" onChange={e => onchangePassengerHandler(e, idx, "adults")} value={guest.email}
                                                                errorMessage={(errors?.errorMessage && !emailRegex?.test(email)) ? errors.errorMessage : ""} />
                                                        </div> */}
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
                                            <p className={styles.bookers_title}> {appData?.words["strYourBookingDetails"]} </p>
                                            <div className={styles.bookers_details_div}>
                                                {/* <p>{appData?.words["strYourBookingDetails"]}</p> */}
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
                                                    <span>{appData?.words["strPorter"]} {buggerLists[0].minNum} </span>
                                                    <span>£{buggerLists[0].minNum * buggerLists[0].price}</span>
                                                </p>
                                                : <></>}
                                            {buggerLists[1].minNum * buggerLists[1].price > 0 ?
                                                <p>
                                                    <span>{appData?.words["strBuggy"]} {buggerLists[1].minNum} </span>
                                                    <span>£{buggerLists[1].minNum * buggerLists[1].price}</span>
                                                </p>
                                                : <></>}
                                            {buggerLists[2].minNum * buggerLists[2].price > 0 ?
                                                <p>
                                                    <span>{appData?.words["strAdditionalAssistant"]} {buggerLists[2].minNum} </span>
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
                                                    <button onClick={handleConfirmClick}>Click To Confirm</button>
                                                </div>
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