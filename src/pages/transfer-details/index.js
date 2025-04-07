import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import InfoModal from '../../components/elements/InfoModal';
import Layout from '../../components/layouts/Layout';
import styles from "./styles.module.scss"
import Steps from '../../components/elements/Steps';
import CheckBox from './CheckBox';
import FlightWaitingTimeContent from '../../components/elements/FlightWaitingTimeContent';
import { splitDateTimeStringIntoDate, splitDateTimeStringIntoHourAndMinute } from '../../helpers/splitHelper';
import Link from 'next/link';
import { reservationSchemeValidator } from '../../helpers/reservationSchemeValidator';
import { ifHasUnwantedCharacters } from '../../helpers/ifHasUnwantedCharacters';
import TextInput from '../../components/elements/TextInput';
import Textarea from '../../components/elements/Textarea';
import Select from '../../components/elements/Select';
import TransferJourneySummaryPanel from '../../components/elements/TransferJourneySummaryPanel'
import SelectedPointsOnTransferDetails from '../../components/elements/SelectedPointsOnTransferDetails'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useConfirm } from '../../hooks/useConfirm';
const TransferDetails = (props) => {
let { data ,env}=props
    const router = useRouter()
    const dispatch = useDispatch()
    let state = useSelector((state) => state.pickUpDropOffActions)
    let { reservations, appData, params: { passengerDetailsStatus, modalInfo, direction, journeyType } } = state
    //we use it to render paxs inside select component
    const carObject = appData?.carsTypes?.reduce((obj, item) => ({ ...obj, [item.id]: item, }), {});
    const [country, setCountry] = useState("gb")

    const confirmationAlert = useConfirm({ previousUrl: "/quotation", nextUrl: "/payment", message: "If you leave the page, all data will be deleted." })

    const handleOnChangeNumberInput = (value, _country, index, name) => {
        dispatch({ type: 'SET_PASSEGER_DETAILS', data: { name, value, index, updateBothJourneyCheckBox: passengerDetailsStatus } })
    };


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
        if (errorHolder.status === 200) router.push("/payment")
    }
    //for passengers information
    const onchangeHandler = (e, index) => {
        let { name, value } = e.target;

        //hinder user  to add some Characters
        if (ifHasUnwantedCharacters(value)) return

        if (['firstname', 'email',].includes(name))
            dispatch({ type: 'SET_PASSEGER_DETAILS', data: { name, value, index, updateBothJourneyCheckBox: passengerDetailsStatus } })

        if (['passengersNumber', "specialRequests", "accountReferanceNumber"].includes(name)) {
            dispatch({ type: 'SET_TRANSFER_DETAILS', data: { name, value, index, updateBothJourneyCheckBox: passengerDetailsStatus } })
        }

    }





    return (
        <Layout loggedIn={data} pageUrl={router.pathname}>
            <div className={`${styles.tr_details} page`}>
                <div className={`${styles.tr_details_section} page_section`}>
                    <div className={`${styles.tr_details_section_container} page_section_container`}>
                        <div className={"steps_div"}>
                            <Steps threeIspending={true} oneIsDone={true} twoIsDone={true} />
                        </div>

                        <div className={styles.transferdetails_subcontainer} id="main_container">
                            {reservations.map((obj, index) => {
                                let reservationError = (errorHolder.status === 403 && Array.isArray(errorHolder.reservations)) ? errorHolder.reservations[index] : {};
                                let { transferDetails, passengerDetails, quotation, selectedPickupPoints, selectedDropoffPoints, paymentDetails } = obj
                                let { transferDateTimeString, passengersNumber, specialRequests } = transferDetails
                                let { accountReferanceNumber } = paymentDetails

                                let { phone, email, firstname } = passengerDetails
                                const [splitedHour, splitedMinute] = splitDateTimeStringIntoHourAndMinute(transferDateTimeString) || []
                                const [splitedDate] = splitDateTimeStringIntoDate(transferDateTimeString) || []
                                //passenger details errors

                                return (
                                    <div key={index} >
                                        <div className={`${styles.transferdetails_subcontainer_content} `}>
                                            <div className={`${styles.transferdetails_subcontainer_content_points_and_passengerdetails}`}>
                                                {/* //!passenger details for transfer journey */}
                                                {/* //!if client choise unchecked for input checkbox then it will show up  */}
                                                {index === 0 || (!passengerDetailsStatus && index === 1) ?
                                                    <div className={styles.passenger_details_div}>
                                                        {index === 0 ? <h2>passenger details</h2> : <h2 className={styles.return_pas_details_header}>passenger details for return journey</h2>}
                                                        <div className={styles.passenger_details}>
                                                            <div className={styles.input_div}>
                                                                <TextInput label={"full name"} type="text" name="firstname" onChange={e => onchangeHandler(e, index)} value={firstname} errorMessage={reservationError?.passengerDetails?.firstname} />
                                                            </div>
                                                            <div className={styles.input_div} >
                                                                <PhoneInput
                                                                    className={`phone_input`}
                                                                    country={country.toLowerCase()}
                                                                    value={phone}
                                                                    onChange={(value, selectedCountry) => handleOnChangeNumberInput(value, selectedCountry, index, "phone")}
                                                                    inputProps={{
                                                                        name: 'phone',
                                                                        required: true,
                                                                        style: { border: reservationError?.passengerDetails?.phone ? '1px solid red' : ' 1px solid #ced4da' }
                                                                    }}
                                                                />
                                                            </div>

                                                            <div className={styles.input_div}>
                                                                <Select label="Number of passengers" name="passengersNumber" onChange={e => onchangeHandler(e, index)} value={passengersNumber} data={carObject[quotation.carId]?.pax} />
                                                            </div>
                                                            <div className={styles.input_div}>
                                                                <TextInput label="Email" type="text" name="email" onChange={e => onchangeHandler(e, index)} value={email} errorMessage={reservationError?.passengerDetails?.email} />
                                                                <p style={{ paddingLeft: "0px" }}>Please Note: Prices are not displayed in this email.</p>
                                                            </div>
                                                        </div>
                                                    </div> : <React.Fragment></React.Fragment>}

                                                {/* if client come from taxi deal then here will not be visible */}

                                                <div className={styles.selected_points_details}>
                                                    <h2>   {index === 0 ? "Journey details" : "Return journey details"}  </h2>
                                                    <div className={styles.selecteditems} >
                                                        <div className={`${styles.points} ${styles.selectedlist_points_left}`} >
                                                            <h3 className={styles.points_header}>Selected Pick Up points</h3>
                                                            {/* //index =0 it is like destination pickup  */}
                                                            <SelectedPointsOnTransferDetails env={env} pointsError={reservationError['selectedPickupPoints']} selectedPoints={selectedPickupPoints} journeyType={index} type='pickup' />
                                                        </div>
                                                        {/* {  selectedlist_points_left     bunu aldk select komponentde kulandk} */}
                                                        <div className={`${styles.points} ${styles.selectedlist_points_right}`}>
                                                            <h3 className={styles.points_header}>Selected Drop Off points</h3>
                                                            {/* //index =1 it is like destination dropoff */}
                                                            <SelectedPointsOnTransferDetails env={env} pointsError={reservationError['selectedDropoffPoints']} selectedPoints={selectedDropoffPoints} journeyType={index} type='dropoff' />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={styles.textarea_div}>
                                                    <TextInput label={"Your Reference Number (If applicable)"} type="text" name="accountReferanceNumber" onChange={e => onchangeHandler(e, index)} value={accountReferanceNumber} />

                                                    <Textarea label={"special requests"} name="specialRequests" value={specialRequests} onChange={(e) => onchangeHandler(e, index)} />

                                                </div>
                                                {index === 1 ? <CheckBox direction={direction} textSame={"the passenger details is a same for both journey"} textNotSame="" /> : <React.Fragment></React.Fragment>}
                                                {index === 1 || (index === 0 && +journeyType === 0) ?
                                                    <div className={styles.buttons} >
                                                        <div className={styles.left}>
                                                            <Link href={"/quotation"}>
                                                                <button className='btn btn_primary'>Back</button>
                                                            </Link>
                                                            <button onClick={(e) => checkValidation(e)} className='btn btn_primary'>Next</button>
                                                        </div>

                                                    </div>
                                                    : <></>}
                                            </div>
                                            <TransferJourneySummaryPanel env={env} journeyType={journeyType} index={index} splitedHour={splitedHour} splitedMinute={splitedMinute} splitedDate={splitedDate} quotation={quotation} selectedDropoffPoints={selectedDropoffPoints} selectedPickupPoints={selectedPickupPoints} />

                                        </div>
                                        {/* {index === 1 || (index === 0 && +journeyType === 0) ? <div className={styles.buttons_for_gap} >
                                            <div className={styles.left}>
                                            </div>
                                            <div className={styles.right}>
                                                <div className={`${styles.content} `}>
                                                    <div className={` ${styles.acceptedcards} mt_0`} title="Accepted Cards for Airport Pickups London">
                                                        <img className={styles.acceptedcards_img} border="0" alt="Accepted Cards for Airport Pickups London " src="/images/accepted-cards10Final.png" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div> :<></>} */}

                                    </div>
                                )
                            })}
                        </div>

                        {modalInfo ? <InfoModal content={<FlightWaitingTimeContent />} /> : <React.Fragment></React.Fragment>}

                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default TransferDetails;
export async function getServerSideProps({ req, res }) {

    let verify = req.cookies["user-id"];
    if (req.url === "/transfer-details") {
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
