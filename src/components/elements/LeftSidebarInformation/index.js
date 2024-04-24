import React from 'react'
import styles from "./styles.module.scss"
//http://localhost:3500/heathrow-vip-meet-and-assist   (inside here used )
const LeftSidebarInformation = ({ direction, appData, showAllInclusive = true, showExceptional = false }) => {
    return (
        <div className={styles.quotation_panel_istaxideal}>

            <div className={`${styles.left_info} ${styles.tripad_left_info}`} >
                <p className={`${styles.left_info_title} ${direction}`}>{appData?.words["strTripAdvisorReviews"]}</p>
                <ul>
                    <a
                        className={styles.tripad_a}
                        target="_blank"
                        href="https://www.tripadvisor.co.uk/Attraction_Review-g186338-d11966434-Reviews-Airport_Pickups_London-London_England.html"
                        title="Tripadvisor Rating for Airport Pickups London">
                        <img className={styles.tripad_img} border="0" alt="Airport Pickups" src="/images/others/TripAdvisor2.webp" />
                    </a>
                </ul>
            </div>
            <div className={`${styles.left_info} ${styles.left_support}`} >
                <p className={`${styles.left_info_title} ${direction}`}>{appData?.words["appContactUsHotLine"]}</p>

                <ul>
                    <li className={styles.phone}>
                        <img src="/images/others/tel.webp" alt="Airport Pickups Support" />
                        <a href="tel:+442088687744">+44 (0) 208 688 7744</a>

                    </li>
                    <li className={styles.wp}>
                        <img src="/images/others/WhatsAppp.webp" alt="Airport Pickups Support" />
                        <a target="_blank" href="https://wa.me/7387901028">
                        {/* <a target="_blank" href="https://wa.me/447387901028"> */}
                            +44 73 8790 1028
                        </a>
                    </li>
                    <li className={styles.mail}>
                        <span>
                            <img border="0" alt="Airport Pickups" src="/images/others/mail.webp" />
                        </span>
                        <a href="mailto:info@aplcars.com" >info@aplcars.com</a>

                    </li>
                </ul>
            </div>
            {showAllInclusive ?
                <div className={`${styles.left_info} ${styles.services}`} direction={String(direction === "rtl")} >
                    <p className={styles.left_info_title}>{appData?.words["strAllInclusivePrices"]}</p>
                    <ul >
                        <li className={`${direction}`}>
                            <input readOnly={true} className={styles.checkbox} type="checkbox" defaultChecked={true} />
                            <label className={styles.primary_text} >
                            </label>
                            {appData?.words["strCarFeatureFreeMeetAndGreet"]}
                        </li>
                        <li className={`${direction}`}>
                            <input readOnly={true} className={styles.checkbox} type="checkbox" defaultChecked={true} />
                            <label className={styles.primary_text} >
                            </label>
                            {appData?.words["strFlightMonitoring"]}
                        </li>
                        <li className={`${direction}`}>
                            <input readOnly={true} className={styles.checkbox} type="checkbox" defaultChecked={true} />
                            <label className={styles.primary_text} >
                            </label>
                            {appData?.words["strFreeBabyChildSeat"]}
                        </li>
                        <li className={`${direction}`}>
                            <input readOnly={true} className={styles.checkbox} type="checkbox" defaultChecked={true} />
                            <label className={styles.primary_text} >
                            </label>
                            {appData?.words["strAllInclusiveFixedPrices"]}
                        </li>
                        <li className={`${direction}`}>
                            <input readOnly={true} className={styles.checkbox} type="checkbox" defaultChecked={true} />
                            <label className={styles.primary_text} >
                            </label>
                            {appData?.words["strCarFeatureNoCharge4Delay"]}
                        </li>
                        <li className={`${direction}`}>
                            <input readOnly={true} className={styles.checkbox} type="checkbox" defaultChecked={true} />
                            <label className={styles.primary_text} >
                            </label>
                            {appData?.words["strFreeCancellation24h"]}
                        </li>

                    </ul>
                </div>
                :
                <></>
            }

            <div className={`${styles.left_info} ${styles.acceptedcards}`}>
                <p className={`${styles.left_info_title} ${direction}`}> {appData?.words["strAcceptedCards"]}</p>
                <img className={styles.acceptedcards_img} border="0" alt="Airport Pickups" src="/images/others/payments.webp" />
            </div>
            <div className={`${styles.left_info} ${styles.tfl}`}>
                <img className={styles.tfl_img} border="0" alt="Airport Pickups" src="/images/others/tfl2.webp" />
            </div>
            {showExceptional ?
                <div className={`${styles.left_info} ${styles.exceptional}`} >
                    <div className={styles.exceptional_content}>
                        <div className={styles.rate_div}>
                            <p>4.8</p>
                        </div>
                        <div className={styles.description_div}>
                            <div className={styles.description_text}>
                                {appData?.words["strExceptional"]}
                            </div>
                            <div className={styles.description_review_text}>
                                <a href="https://www.reviews.co.uk/company-reviews/store/airport-pickups-london-com" target={"_blank"} title="Airport Pickups London Reviews" className={styles.reviews} rel="noreferrer"   >

                                    759 reviews
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                : <div></div>

            }

        </div>
    )
}

export default LeftSidebarInformation