import React from 'react'
import { useSelector } from 'react-redux'
import styles from "./styles.module.scss"

const MeetGreetBookingDetails = () => {
    let state = useSelector((state) => state.pickUpDropOffActions)
    let { selectedService, terminalName, meetgreetDate, seatLists, flightDetails,buggerLists, } = useSelector((state) => state.meetAndGreetActions)
    let { params: { direction } } = state
    const { appData } = useSelector(state => state.initialReducer)


    return (
        <div className={styles.info} direction={String(direction === 'rtl')}>
            {/* <h3>{appData?.words["strServiceDetails"]}</h3> */}
            <div className={styles.sections}>
                <div className={styles.section}>
                    <h2>{appData?.words["strServiceDetails"]}</h2>
                    <p>
                        <strong>{appData?.words["strSelectedService"]}</strong>:
                        <span>{selectedService} </span>
                    </p>
                    <p>
                        <strong>{appData?.words["strAirportTitle"]}</strong>:
                        <span>{terminalName} </span>
                    </p>
                    <p style={{ margin: "0px" }}>
                        <strong>{appData?.words["strAdditionalAssistant"]}</strong>:
                    </p>
                    <ul>
                        <li>{appData?.words["strBuggy"]} { buggerLists[1].minNum}</li>
                        <li>{appData?.words["strPorter"]} { buggerLists[0].minNum}</li>
                        <li>{appData?.words["strAirportAssistant"]} { buggerLists[2].minNum}</li>
                    </ul>
                    <p>
                        <strong>{appData?.words["strPickupDateAndTime"]}</strong>:
                        {`${meetgreetDate.split(" ")[0].replace(/(\d+)\-(\d+)-(\d+)/, "$3-$2-$1")} ${flightDetails.flightTime}`}
                    </p>
                </div>


                <div className={styles.section}>
                    <h2>{"Travelers"}</h2>
                    <p>
                        <strong>{`${appData?.words[seatLists[0].strName]} ${appData?.words[seatLists[0].strDesc]}`}  </strong>:
                        <span>{seatLists[0].minNum}</span>
                    </p>
                    <p>
                        <strong>{`${appData?.words[seatLists[1].strName]} ${appData?.words[seatLists[1].strDesc]}`}  </strong>:
                        <span>{seatLists[1].minNum}</span>
                    </p>
                    <p>
                        <strong>{`${appData?.words[seatLists[2].strName]} ${appData?.words[seatLists[2].strDesc]}`}  </strong>:
                        <span>{seatLists[2].minNum}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MeetGreetBookingDetails