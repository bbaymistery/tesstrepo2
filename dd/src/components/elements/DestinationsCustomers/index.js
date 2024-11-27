import React from 'react'
import styles from "./styles.module.scss"
import { useSelector } from 'react-redux'
const DestinationsCustomers = () => {
    const { appData } = useSelector(state => state.initialReducer)
    return (
        <div className={styles.destinations}>
            <div className={styles.destinations_content}>
                <div className={styles.column}>
                    <div className={styles.numbers}>5,200 </div>
                    <div className={styles.text}>{appData?.words["strDestinations"]}</div>
                </div>

                <div className={styles.column}>
                    <div className={styles.numbers}>757</div>
                    <div className={styles.text}>{appData?.words["strTotalVehicles"]}</div>
                </div>

                <div className={styles.column}>
                    <div className={styles.numbers}>1.6 M</div>
                    <div className={styles.text}>{appData?.words["strHappyCustomer"]}</div>
                </div>

                <a rel="noreferrer"
                    href="https://www.tripadvisor.co.uk/Attraction_Review-g186338-d11966434-Reviews-Airport_Pickups_London-London_England.html"
                    target="_blank" title="Airport Pickups London Reviews"
                    className={styles.column}>
                    <div className={styles.numbers}>
                        4.8
                    </div>
                    <div className={styles.text}>{appData?.words["strServiceRatings"]}</div>
                </a>

            </div>
        </div>
    )
}

export default DestinationsCustomers