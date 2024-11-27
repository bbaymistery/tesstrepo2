import React from 'react'
import styles from "./styles.module.scss"
const TopHeaderWhiteLeftButtons = ({ language, appData}) => {
    return (
        <div className={styles.buttons}>
            <div className={styles.whitebtn_div}>
                <a href={language === 'en' ? '/travel-agents' : `/${language}/travel-agents`} title={appData?.words["strTravelAgents"]}>
                    <button  >{appData?.words["strTravelAgents"]}</button>
                </a>
            </div>
            <div className={styles.bluebtn_div}>
                <a href="/manage-booking.html" title={appData?.words["strManageBooking"]} target="_blank">
                    <button>{appData?.words["strManageBooking"]}</button>
                </a>
            </div>
        </div>
    )
}

export default TopHeaderWhiteLeftButtons