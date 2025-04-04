import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./styles.module.scss"
import { hours, minutes } from '../../constants/minutesHours';
import { bookersDetailsError, buttonLabelsNames, dropdownAirlineLabels, dropdownFlightClass, flightDetailsError, formatDate, passengerDetailsError, stepsNames } from '../../helpers/meetgreetPageHelpers';
import { useRouter } from 'next/router';
import store from '../../store/store';
import { createWrapper } from 'next-redux-wrapper';
// import MeetGreetBookingDetails from '../../components/elements/MeetGreetBookingDetails';
// import MeetGreetPassengerDetails from '../../components/elements/MeetGreetPassengerDetails';
// import Steps from '../../components/elements/Steps';
// import TextInput from '../../components/elements/TextInput';
// import Select from '../../components/elements/Select';

import Layout from "../../components/layouts/Layout"
import { ifHasUnwantedCharacters } from '../../helpers/ifHasUnwantedCharacters';
import MeetGreetSteps from '../../components/elements/MeetGreetSteps';
import TextInput from '../../components/elements/TextInput';
import Select from '../../components/elements/Select';
import MeetGreetBookingDetails from '../../components/elements/MeetGreetBookingDetails';
import MeetGreetPassengerDetails from '../../components/elements/MeetGreetPassengerDetails';



let keywords = "London Airport Meet and Greet, Airport Pickups, Heathrow, Gatwick, Stansted, Luton, City Airport, Corporate Services, Stress-Free Arrivals"
let title = "Airport Pick Ups London Meet and Greet"
let description = "London Airport Meet and Greet Service for stress-free arrivals at Heathrow, Gatwick, Stansted, Luton, and City airports. Corporate services available."


const MeetGreet = ({ data }) => {

    const router = useRouter()
    const dispatch = useDispatch()

    const meetAndGreetState = useSelector(state => state.meetAndGreetActions)
    let { seatLists, passengersForm, totalPrice, meetgreetDate, meetgreetActiveBtn, terminalName, buggerLists, vat, buggerListTotalPrice, flightDetails, bookersDetails } = meetAndGreetState
    let { airline, flightNumber, flightClass, noOfLuggageBags } = flightDetails
    let { firstname, lastname, email, mobileNumber } = bookersDetails



    const [activeStep, setActiveStep] = useState(0)
    const [errorHolderPassengerDetails, setErrorHolderPassengerDetails] = useState([])//activeStep0
    const [errorHolderFlightDetails, setErrorHolderFlightDetails] = useState([]);//activeStep1
    const [errorHolderBookerDetails, setErrorHolderBookersDetails] = useState([]);//activeStep1



    //for passengers information
    const onchangePassengerHandler = (e, index) => {
        const { name, value } = e.target;
        if (ifHasUnwantedCharacters(value)) return
        dispatch({ type: "SET_PASSENGERS_FROM", data: { name, value, index } })
    };
    const onchangeNumberLuggageHandler = (e) => {

        const { name, value } = e.target;
        // Handle the case of a negative number (you can show an error message or take appropriate action)
        if (name === "noOfLuggageBags") if (parseFloat(value) < 0) return;

        if (ifHasUnwantedCharacters(value)) return
        dispatch({ type: "SET_FLIGHT_NUMBER_OR_LUGGAGE", data: { name, value, } })
    }
    const gotoNextPage = () => {
        let errors = {};

        if (activeStep === 0) {
            errors = passengerDetailsError(passengersForm);
            setErrorHolderPassengerDetails(errors);

        } else if (activeStep === 1) {
            errors = flightDetailsError(meetAndGreetState.flightDetails);
            setErrorHolderFlightDetails(errors);
        }
        else if (activeStep === 2) {
            errors = bookersDetailsError(meetAndGreetState.bookersDetails);
            setErrorHolderBookersDetails(errors);
        }

        // Check if there are any errors, if yes, return and prevent moving to the next step
        const errorKeys = Object.keys(errors);

        for (const key of errorKeys) {
            if (errors[key].statusCode === 400) return;
        }

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


    return (
        <Layout keywords={keywords} title={title} description={description} loggedIn={data}>
            <div className={`${styles.meetgreet} page`} >
                <div className={`${styles.meetgreet_section} page_section`}>
                    <div className={`${styles.meetgreet_section_container} page_section_container`}>
                        <div className={styles.form_to_fill} >
                            <div className={styles.form_to_fill_content}>
                                <div className={styles.left}>
                                    <MeetGreetSteps steps={stepsNames} activeStep={activeStep} />
                                    {activeStep === 0 ?
                                        <div className={styles.passengers}>
                                            <p className={styles.passengers_title}> Passengers </p>
                                            {passengersForm.map((guest, idx) => {
                                                let errors = errorHolderPassengerDetails[idx]
                                                return <div key={idx} className={styles.passengers_details_div}>
                                                    <p>Passenger {idx + 1}</p>
                                                    <div className={styles.passengers_details}>
                                                        <div className={styles.input_div}>
                                                            <TextInput label={"Firstname"} type="text" name="firstname" onChange={e => onchangePassengerHandler(e, idx)} value={guest.firstname} errorMessage={errors?.errorMessage} />
                                                        </div>
                                                        <div className={styles.input_div}>
                                                            <TextInput label="Lastname" type="text" name="lastname" onChange={e => onchangePassengerHandler(e, idx)} value={guest.lastname} errorMessage={errors?.errorMessage} />
                                                        </div>
                                                    </div>
                                                </div>
                                            })}
                                        </div>
                                        : <></>}
                                    {/* //!step 1   Second step */}
                                    {activeStep === 1 ?
                                        <div className={styles.flight_details}>
                                            <p className={styles.flight_details_title}> Flight Details</p>
                                            <p className={styles.format_date}> {`${buttonLabelsNames[meetgreetActiveBtn]} Flight ${formatDate(meetgreetDate)}`} </p>
                                            <div className={styles.flight_details_inputs_div}>
                                                <div className={styles.dropdown_div}>
                                                    <Select errorMessage={errorHolderFlightDetails?.airline?.errorMessage} label="Airline" name="Airline" postCodeSelectOption={true} onChange={onchangeAirlineHandler} value={airline} data={dropdownAirlineLabels} />
                                                </div>
                                                <div className={styles.input_div}>
                                                    <TextInput errorMessage={errorHolderFlightDetails.flightNumber?.errorMessage} label={"Flight Nummber"} type="text" name="flightNumber" onChange={e => onchangeNumberLuggageHandler(e)} value={flightNumber} />
                                                </div>
                                                <div className={styles.input_div}>
                                                    <Select errorMessage={errorHolderFlightDetails.flightClass?.errorMessage} label="Flight Class" name="Flight Class" postCodeSelectOption={true} onChange={onchangeFlightClassHandler} value={flightClass} data={dropdownFlightClass} />
                                                </div>

                                                <div className={` ${styles.search_menu} ${styles.hours_minutes} `}>
                                                    <p >{"Flight Time"}</p>
                                                    <div className={`${styles.select_time_div} `}>
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
                                                    <TextInput errorMessage={errorHolderFlightDetails.noOfLuggageBags?.errorMessage} label={"No of Luggage Bags"} type="number" name="noOfLuggageBags" onChange={e => onchangeNumberLuggageHandler(e)} value={noOfLuggageBags} />
                                                </div>
                                            </div>
                                            <div className={styles.flight_extras_div}>

                                                <p className={styles.flight_extras_div_title}> Flight Extras </p>

                                                <div className={styles.bugger_selection_div}>
                                                    {buggerLists.map((item, index) => {
                                                        return <div key={index} className={styles.bugger_selection_div_column}>
                                                            <p className={styles.name}> {item.name}</p>
                                                            <p className={styles.desc}>  {item.desc}</p>
                                                            <div className={styles.bugger_selection_div_column_numbers_div} >
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
                                                <p>{`Booker's Details`}</p>
                                                <div className={styles.bookers_details}>
                                                    <div className={styles.input_div}>
                                                        <TextInput errorMessage={errorHolderBookerDetails?.firstname?.errorMessage} label="First Name" type="text" name="firstname" onChange={(e) => onchangeBookerDetailsHandler({ value: e.target.value, name: e.target.name })} value={firstname} />
                                                    </div>
                                                    <div className={styles.input_div}>
                                                        <TextInput errorMessage={errorHolderBookerDetails?.lastname?.errorMessage} label="Last Name" type="text" name="lastname" onChange={(e) => onchangeBookerDetailsHandler({ value: e.target.value, name: e.target.name })} value={lastname} />
                                                    </div>
                                                    <div className={styles.input_div}>
                                                        <TextInput errorMessage={errorHolderBookerDetails?.email?.errorMessage} label="E-Mail Address" type="text" name="email" onChange={(e) => onchangeBookerDetailsHandler({ value: e.target.value, name: e.target.name })} value={email} />
                                                    </div>
                                                    <div className={styles.input_div}>
                                                        <TextInput errorMessage={errorHolderBookerDetails?.mobileNumber?.errorMessage} label="Mobile Number" type="text" name="mobileNumber" onChange={(e) => onchangeBookerDetailsHandler({ value: e.target.value, name: e.target.name })} value={mobileNumber} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        : <></>}
                                    {activeStep === 3 ?
                                        <div className={styles.bookers}>
                                            <div className={styles.bookers_details_div}>
                                                <MeetGreetBookingDetails />
                                                <MeetGreetPassengerDetails />
                                            </div>
                                        </div>
                                        : <></>}

                                    <div className={`${styles.back_next_buttons}`} >
                                        {<button className='btn' onClick={gotoPreviousPage}>{`Back`}</button>}
                                        <button className='btn' onClick={gotoNextPage}>{`Next`}  </button>
                                    </div>
                                </div>
                                <div className={styles.right}>
                                    <div className={styles.right_content}>
                                        <p>Order Summary</p>
                                        <div className={styles.border}> </div>
                                        <li className={styles.arrival}> <span>{buttonLabelsNames[meetgreetActiveBtn]} : </span> Meet & Greet   </li>
                                        <li className={styles.terminal}>{terminalName}  </li>
                                        <li className={styles.date}> {formatDate(meetgreetDate)}  </li>
                                        <li className={styles.adults}>  {seatLists[0].minNum} Adults, {seatLists[1].minNum} Children, {seatLists[2].minNum} Infants   </li>
                                        <div className={styles.border}> </div>
                                        <div className={styles.total}>
                                            <p> <span>Total exc. VAT </span> <span>£{totalPrice - vat}</span> </p>
                                            {buggerListTotalPrice > 0 ? <p> <span>Extra(s) </span> <span>£{buggerListTotalPrice}</span> </p> : <></>}  <p>
                                                <span>VAT</span> <span>£{vat}</span>
                                            </p>
                                            <p className={styles.total_price}><span>Total</span><span>£{totalPrice}</span>    </p>
                                        </div>
                                    </div>
                                    <div className={`${styles.back_next_buttons}`} >
                                        <button className='btn' onClick={gotoPreviousPage}>Back</button>
                                        <button className='btn' onClick={gotoNextPage}>Next</button>
                                    </div>
                                </div>

                            </div>
                        </div>




                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default MeetGreet
const makestore = () => store;
const wrapper = createWrapper(makestore);


export async function getServerSideProps({ req, res }) {
    let verify = req.cookies["user-id"];

    if (req.url === "/meetgreet" ) {
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