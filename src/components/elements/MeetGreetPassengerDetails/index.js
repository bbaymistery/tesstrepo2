import React from 'react'
import { useSelector } from 'react-redux'
import styles from "./styles.module.scss"

const MeetGreetPassengerDetails = () => {
    let state = useSelector((state) => state.pickUpDropOffActions)
    let { passengersForm, passengersFormChildren, passengersFormAdults, bookersDetails, flightDetails, buggerLists } = useSelector((state) => state.meetAndGreetActions)


    let { params: { direction, } } = state
    const { appData } = useSelector(state => state.initialReducer)


    return (
        <div className={styles.journey_summary_panel} >
            <div className={styles.content}>
                <div className={styles.journey_card} direction={String(direction === 'rtl')}>
                    {passengersForm.length > 0 ?
                        <h3 className={styles.journey_card_title}>
                            {appData?.words["strFlightDetails"]}
                        </h3> : <></>}

                    <div className={styles.passsenger_details_div}>
                        <div>
                            <h5 className={`${direction}`}>{appData?.words["strAirline"]}</h5>
                            <li className={styles.first_child} direction={String(direction === 'rtl')}><span>{flightDetails.airline}</span></li>
                            <div className={styles.space}> </div>

                        </div>
                        <div>
                            <h5 className={`${direction}`}>{appData?.words["strFlightNumberTitle"]}</h5>
                            <li className={styles.first_child} direction={String(direction === 'rtl')}><span>{flightDetails.flightNumber}</span></li>
                            <div className={styles.space}> </div>
                        </div>
                    </div>
                    <div className={styles.passsenger_details_div}>
                        <div>
                            <h5 className={`${direction}`}>{appData?.words["strFlightClass"]}</h5>
                            <li className={styles.noborder} direction={String(direction === 'rtl')}><span>{flightDetails.flightClass}</span></li>
                            <div className={styles.space}> </div>
                        </div>
                        <div>
                            <h5 className={`${direction}`}>{appData?.words["strNoofSuitcases"]}</h5>
                            <li direction={String(direction === 'rtl')}><span>{flightDetails.noOfLuggageBags}</span></li>
                            <div className={styles.space}> </div>
                        </div>
                    </div>

                </div>
                <div className={styles.journey_card} direction={String(direction === 'rtl')}>
                    <h3 className={styles.journey_card_title}>
                    Reservation Contact Details
                    </h3>
                    <div className={styles.passsenger_details_div}>
                        <div>
                            <h5 className={`${direction}`}>{appData?.words?.["strPassengerName"]}</h5>
                            <li className={styles.first_child} direction={String(direction === 'rtl')}><span>{bookersDetails.firstname}</span></li>
                            <div className={styles.space}> </div>
                        </div>
                        <div>
                            <h5 className={`${direction}`}>{appData?.words["strPassengerLastName"]}</h5>
                            <li className={styles.first_child} direction={String(direction === 'rtl')}><span>{bookersDetails.lastname}</span></li>
                            <div className={styles.space}> </div>
                        </div>
                    </div>
                    <div className={styles.passsenger_details_div}>
                        <div>
                            <h5 className={`${direction}`}>{appData?.words["strPassengerEmail"]}</h5>
                            <li className={styles.noborder} direction={String(direction === 'rtl')}><span>{bookersDetails.email}</span></li>
                            <div className={styles.space}> </div>
                        </div>
                        <div>
                            <h5 className={`${direction}`}>{appData?.words["strPhoneNumber"]}</h5>
                            <li direction={String(direction === 'rtl')}><span>{bookersDetails.mobileNumber}</span></li>
                            <div className={styles.space}> </div>
                        </div>
                    </div>
                </div>

                {passengersFormAdults.length > 0 ? <div className={styles.journey_card} direction={String(direction === 'rtl')}>
                    <h3 className={styles.journey_card_title}>
                      {`${appData?.words["strJourneyPassengerDetails"]} ${appData?.words["strAdults"]}`}
                    </h3>
                    {passengersFormAdults?.map((item, idx) => {
                        return (
                            <div key={idx} className={`${styles.passsenger_details_div} ${styles.pa}`}  >
                                <div>
                                    <h5 className={`${direction}`}>{`${idx + 1}.`} {appData?.words?.["strPassengerName"]}</h5>
                                    <li className={`${styles.first_child}`} direction={String(direction === 'rtl')}><span>{item.firstname}</span></li>
                                    <div className={styles.space}> </div>
                                </div>
                                <div>
                                    <h5 className={`${direction}`}>{appData?.words["strPassengerLastName"]}</h5>
                                    <li className={`${styles.first_child}`} direction={String(direction === 'rtl')}><span>{item.lastname}</span></li>
                                    <div className={styles.space}> </div>
                                </div>
                                <div >
                                    <h5 className={`${direction}`}>{appData?.words?.["strPhoneNumber"]}</h5>
                                    <li className={`${styles.first_child}`} direction={String(direction === 'rtl')}><span>{item.phone}</span></li>
                                    <div className={styles.space}> </div>
                                </div>
                            </div>
                        )
                    })}
                </div> : <></>}
                {passengersFormChildren.length > 0 ? <div className={styles.journey_card} direction={String(direction === 'rtl')}>
                    <h3 className={styles.journey_card_title}>
                        {`${appData?.words["strJourneyPassengerDetails"]} ${appData?.words["strChildren"]}`}
                    </h3>
                    {passengersFormChildren?.map((item, idx) => {
                        return (
                            <div key={idx} className={`${styles.passsenger_details_div} ${styles.pa}`} >
                                <div>
                                    <h5 className={`${direction}`}>{`${idx + 1}.`} {appData?.words?.["strPassengerName"]}</h5>
                                    <li className={`${styles.first_child}`} direction={String(direction === 'rtl')}><span>{item.firstname}</span></li>
                                    <div className={styles.space}> </div>
                                </div>
                                <div>
                                    <h5 className={`${direction}`}>{appData?.words["strPassengerLastName"]}</h5>
                                    <li className={`${styles.first_child}`} direction={String(direction === 'rtl')}><span>{item.lastname}</span></li>
                                    <div className={styles.space}> </div>
                                </div>

                            </div>
                        )
                    })}
                </div> : <></>}

            </div>

        </div>


    )
}

export default MeetGreetPassengerDetails