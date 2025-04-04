import React from 'react'
import { useSelector } from 'react-redux'
import styles from "./styles.module.scss"

const MeetGreetPassengerDetails = () => {
    let { passengersForm, bookersDetails, flightDetails, buggy, porter, additionalGreeter } = useSelector((state) => state.meetAndGreetActions)

    return (
        <div className={styles.journey_summary_panel} >
            <div className={styles.content}>
                <div className={styles.journey_card} >
                    {passengersForm.length > 0 ?
                        <h3 className={styles.journey_card_title}>
                            Flight Details
                        </h3> : <></>}

                    <div className={styles.passsenger_details_div}>
                        <div>
                            <h5  >AIRLINE</h5>
                            <li className={styles.first_child} ><span>{"flightDetails.airline"}</span></li>
                            <div className={styles.space}> </div>

                        </div>

                        <div>
                            <h5  >BUGGY</h5>
                            <li className={styles.first_child} ><span>{buggy}</span></li>
                            <div className={styles.space}> </div>

                        </div>
                    </div>
                    <div className={styles.passsenger_details_div}>
                        <div>
                            <h5  >FLIGHT TIME</h5>
                            <li className={styles.first_child} ><span>{flightDetails.flightTime}</span></li>
                            <div className={styles.space}> </div>

                        </div>
                        <div>
                            <h5  >PORTER</h5>
                            <li className={styles.first_child} ><span>{porter}</span></li>
                            <div className={styles.space}> </div>

                        </div>
                    </div>
                    <div className={styles.passsenger_details_div}>
                        <div>
                            <h5  >FLIGHT NUMBER</h5>
                            <li className={styles.first_child} ><span>{flightDetails.flightNumber}</span></li>
                            <div className={styles.space}> </div>
                        </div>
                        <div>
                            <h5  >ADDITIONAL GREETER </h5>
                            <li className={styles.first_child} ><span>{additionalGreeter}</span></li>
                            <div className={styles.space}> </div>

                        </div>

                    </div>
                    <div className={styles.passsenger_details_div}>
                        <div>
                            <h5  >FLIGHT CLASS</h5>
                            <li ><span>{flightDetails.flightClass}</span></li>
                            <div className={styles.space}> </div>

                        </div>
                        <div>
                            <h5  >NO OF LUGGAGE BAGS</h5>
                            <li ><span>{flightDetails.noOfLuggageBags}</span></li>
                            <div className={styles.space}> </div>

                        </div>
                    </div>

                </div>
                <div className={styles.journey_card} >
                    <h3 className={styles.journey_card_title}>
                        Bookers Details
                    </h3>
                    <div className={styles.passsenger_details_div}>
                        <div>
                            <h5  >PASSENGER NAME</h5>
                            <li className={styles.first_child} ><span>{bookersDetails.firstname}</span></li>
                            <div className={styles.space}> </div>

                        </div>
                        <div>
                            <h5  >PASSENGER LASTNAME</h5>
                            <li className={styles.first_child} ><span>{bookersDetails.lastname}</span></li>
                            <div className={styles.space}> </div>

                        </div>
                    </div>
                    <div className={styles.passsenger_details_div}>
                        <div>
                            <h5  >EMAIL</h5>
                            <li ><span>{bookersDetails.email}</span></li>
                            <div className={styles.space}> </div>

                        </div>
                        <div>
                            <h5  >PHONE NUMBER</h5>
                            <li ><span>{bookersDetails.mobileNumber}</span></li>
                            <div className={styles.space}> </div>

                        </div>
                    </div>

                </div>
                {passengersForm.length > 0 ? <div className={styles.journey_card} >
                    <h3 className={styles.journey_card_title}>
                        Passengers
                    </h3>
                    {passengersForm?.map((item, idx) => {
                        return (
                            <div key={idx} className={styles.passsenger_details_div}>
                                <div>
                                    <h5  >{`${idx + 1}.`} PASSENGER NAME</h5>
                                    <li className={`${styles.first_child}`} ><span>{item.firstname}</span></li>
                                    <div className={styles.space}> </div>
                                </div>
                                <div>
                                    <h5  >PASSENGER LASTNAME</h5>
                                    <li className={`${styles.first_child}`} ><span>{item.lastname}</span></li>
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