import React from 'react'
import { useSelector } from 'react-redux'
import styles from "./styles.module.scss"

const MeetGreetBookingDetails = () => {
    let { selectedService, terminalName, meetgreetDate, seatLists } = useSelector((state) => state.meetAndGreetActions)
    return (
        <div className={styles.info} >
            <h3>Service Details</h3>
            <div className={styles.sections}>
                <div className={`${styles.section} ${styles.first_column}  `}>
                    <div className={`${styles.description} `}>
                        <div className={styles.text_1}>Selected Service</div>
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
                        <p className={styles.text_1}>Date</p>
                        <p className={styles.text_2}>
                            <span>
                                {meetgreetDate.split(" ")[0].replace(/(\d+)\-(\d+)-(\d+)/, "$3-$2-$1")}
                            </span>
                        </p>
                    </div>
                </div>

                <div className={`${styles.section} ${styles.third_column}`}>
                    <div className={styles.description}>
                        <p className={styles.text_1}>
                            {seatLists[0].name}
                            <span>
                                {seatLists[0].desc}
                            </span>
                        </p>
                        <p className={styles.text_2}> {seatLists[0].minNum}</p>
                    </div>
                </div>


                <div className={`${styles.section} ${styles.fourth_column}`}>
                    <div className={styles.description}>
                        <p className={styles.text_1}>
                            {seatLists[1].name}
                            <span>
                                {seatLists[1].desc}
                            </span>
                        </p>
                        <p className={styles.text_2}> {seatLists[1].minNum}</p>
                    </div>
                </div>
                <div className={`${styles.section} ${styles.fifth_column}`}>
                    <div className={styles.description}>
                        <p className={styles.text_1}>
                            {seatLists[2].name}
                            <span>
                                {seatLists[2].desc}
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