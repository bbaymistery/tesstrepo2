import React from 'react'
import { useSelector } from 'react-redux'
import styles from "./styles.module.scss"

const MeetGreetBookingDetails = () => {
    let state = useSelector((state) => state.pickUpDropOffActions)
    let { selectedService, terminalName, meetgreetDate, seatLists } = useSelector((state) => state.meetAndGreetActions)
    let { params: { direction } } = state
    const { appData } = useSelector(state => state.initialReducer)


    return (
        <div className={styles.info} direction={String(direction === 'rtl')}>
            <h3>{appData?.words["strServiceDetails"]}</h3>
            <div className={styles.sections}>
                <div className={`${styles.section} ${styles.first_column}  `}>
                    <div className={`${styles.description} `}>
                        <div className={styles.text_1}>{appData?.words["strSelectedService"]}</div>
                        <div className={styles.text_2} style={{ textTransform: 'capitalize' }}>
                            <span>
                                {selectedService}
                            </span>
                            <br />
                            <span>
                                {terminalName}
                            </span>
                        </div>
                    </div>


                </div>
                <div className={`${styles.section} ${styles.second_column}`}>
                    <div className={styles.description}>
                        <p className={styles.text_1}>{appData?.words["strDate"]}</p>
                        <p className={styles.text_2}>
                            {<span>
                                {direction === 'rtl'
                                    ? `${meetgreetDate.split(" ")[0].replace(/(\d+)\-(\d+)-(\d+)/, "$1-$2-$3")}`
                                    : `${meetgreetDate.split(" ")[0].replace(/(\d+)\-(\d+)-(\d+)/, "$3-$2-$1")}`}
                            </span>}
                        </p>

                    </div>

                </div>
                <div className={`${styles.section} ${styles.third_column}`}>
                    <div className={styles.description}>
                        <p className={styles.text_1}>
                            {appData?.words[seatLists[0].strName]}
                            <span>
                                {appData?.words[seatLists[0].strDesc]}
                            </span>
                        </p>
                        <p className={styles.text_2}> {seatLists[0].minNum}</p>
                    </div>
                </div>
                <div className={`${styles.section} ${styles.fourth_column}`}>
                    <div className={styles.description}>
                        <p className={styles.text_1}>
                            {appData?.words[seatLists[1].strName]}
                            <span>
                                {appData?.words[seatLists[1].strDesc]}
                            </span>
                        </p>
                        <p className={styles.text_2}> {seatLists[1].minNum}</p>
                    </div>
                </div>
                <div className={`${styles.section} ${styles.fifth_column}`}>
                    <div className={styles.description}>
                        <p className={styles.text_1}>
                            {appData?.words[seatLists[2].strName]}
                            <span>
                                {appData?.words[seatLists[2].strDesc]}
                            </span>
                        </p>
                        <p className={styles.text_2}> {seatLists[2].minNum}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MeetGreetBookingDetails