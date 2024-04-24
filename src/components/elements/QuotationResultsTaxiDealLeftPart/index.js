import React, { useState } from 'react'
import styles from "./styles.module.scss"
import OutsideClickAlert from '../OutsideClickAlert'
import { useSelector } from 'react-redux'
import Image from 'next/image';
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('../../../pages/quotation-results/Map'));

const QuotationResultsTaxiDealLeftPart = () => {
    const [taxidealMapStatus, setTaxidealMapStatus] = useState(false)
    const state = useSelector(state => state.pickUpDropOffActions)
    let { params } = state
    let { direction, quotations, } = params

    const { appData } = useSelector(state => state.initialReducer)

    return (
        <div className={styles.quotation_panel_istaxideal}>
            {taxidealMapStatus ?
                <div className={`${styles.modal_map} ${styles.modal}  `}>
                    <OutsideClickAlert onOutsideClick={() => setTaxidealMapStatus(false)}>
                        <div className={styles.modal_map_container}>
                            <div onClick={() => setTaxidealMapStatus(false)} className={styles.close_div}>
                                <i className="fa-sharp fa-solid fa-xmark"></i>
                            </div>
                            <Map datas={quotations[0]} isTaxiDeal={true} />
                        </div>
                    </OutsideClickAlert>
                </div>
                : <></>}
            <div className={`${styles.left_info} ${styles.tripad_left_info}`} >
                <p className={`${styles.left_info_title} ${direction}`}>{appData?.words["strTripAdvisorReviews"]}</p>
                <ul >
                    <li >
                        <a className={styles.tripad_a} target="_blank" href="https://www.tripadvisor.co.uk/Attraction_Review-g186338-d11966434-Reviews-Airport_Pickups_London-London_England.html" title="Tripadvisor Rating for Airport Pickups London">
                            <Image width={0}
                                height={0}
                                sizes='10vw'
                                style={{ width: "274px", height: 'auto', objectFit: "cover" }} priority className={styles.tripad_img} border="0" alt="Airport Pickups Trip Advisor" src="/images/others/TripAdvisor2.webp" />
                        </a>
                    </li>
                </ul>
            </div>
            <div className={`${styles.left_info} ${styles.left_support}`} >
                <p className={`${styles.left_info_title} ${direction}`}>{appData?.words["appContactUsHotLine"]}</p>
                <ul>
                    <li className={styles.phone}>
                        <span >
                            <Image width={0}
                                height={0}
                                sizes='10vw'
                                style={{ width: "19px", height: 'auto' }} src="/images/others/tel.webp" alt="Airport Pickups Support Phone " />
                        </span>
                        <a href="tel:+442088687744">+44 (0) 208 688 7744</a>
                    </li>
                    <li className={styles.wp} >
                        <span >
                            <Image width={0}
                                height={0}
                                sizes='10vw'
                                style={{ width: "23px", height: 'auto' }} src="/images/others/WhatsAppp.webp" alt="Airport Pickups Support Whatsapp" />
                        </span>
                        {/* <a target="_blank" href="https://wa.me/447387901028"> */}
                        <a target="_blank" href=" https://wa.me/7387901028">
                            +44 73 8790 1028
                        </a>
                    </li>
                    <li className={styles.mail} >
                        <span >
                            <Image width={0}
                                height={0}
                                sizes='10vw'
                                style={{ width: "19px", height: 'auto' }} border="0" alt="Airport Pickups Email" src="/images/others/mail.webp" />
                        </span>
                        <a href="mailto:info@aplcars.com" >info@aplcars.com</a>
                    </li>
                </ul>
            </div>
            <div className={`${styles.left_info} ${styles.services}`} direction={String(direction === "rtl")} >
                <p className={styles.left_info_title}>{appData?.words["strAllInclusivePrices"]}</p>
                <ul >
                    <li className={`${direction}`}>
                        <input id="freemeet" readOnly={true} className={styles.checkbox} type="checkbox" defaultChecked={true} />
                        <label htmlFor="freemeet" className={styles.primary_text} >
                            .
                        </label>
                        {appData?.words["strCarFeatureFreeMeetAndGreet"]}
                    </li>
                    <li className={`${direction}`}>
                        <input id="FlightMonitoring" readOnly={true} className={styles.checkbox} type="checkbox" defaultChecked={true} />
                        <label htmlFor="FlightMonitoring" className={styles.primary_text} >
                            .
                        </label>
                        {appData?.words["strFlightMonitoring"]}
                    </li>
                    <li className={`${direction}`}>
                        <input id="FreeBaby" readOnly={true} className={styles.checkbox} type="checkbox" defaultChecked={true} />
                        <label htmlFor='FreeBaby' className={styles.primary_text} >
                            .
                        </label>
                        {appData?.words["strFreeBabyChildSeat"]}
                    </li>
                    <li className={`${direction}`}>
                        <input id="AllInclusive" readOnly={true} className={styles.checkbox} type="checkbox" defaultChecked={true} />
                        <label htmlFor='AllInclusive' className={styles.primary_text} >
                            .
                        </label>
                        {appData?.words["strAllInclusiveFixedPrices"]}
                    </li>
                    <li className={`${direction}`}>
                        <input id="NoCharge4Delay" readOnly={true} className={styles.checkbox} type="checkbox" defaultChecked={true} />
                        <label htmlFor='NoCharge4Delay' className={styles.primary_text} >
                            .
                        </label>
                        {appData?.words["strCarFeatureNoCharge4Delay"]}
                    </li>
                    <li className={`${direction}`}>
                        <input id="FreeCancellation24h" readOnly={true} className={styles.checkbox} type="checkbox" defaultChecked={true} />
                        <label htmlFor='FreeCancellation24h' className={styles.primary_text} >
                            .
                        </label>
                        {appData?.words["strFreeCancellation24h"]}
                    </li>

                </ul>
            </div>
            <div className={styles.map_direction}>
                <p >
                    <Image width={0}
                        height={0}
                        sizes='100vw'
                        style={{ width: '100%', height: 'auto', objectFit: "cover" }} border="0" alt="Airport Pickups Map" src="/images/others/mapLondonn.webp" />
                </p>
                <button onClick={() => setTaxidealMapStatus(true)} className='btn btn_hover_reverse_primary'><i className="fa-solid fa-map-location-dot"></i> {appData?.words["strShowOnMap"]}</button>
            </div>

            <div className={`${styles.left_info} ${styles.acceptedcards}`}>
                <p className={`${styles.left_info_title} ${direction}`}> {appData?.words["strAcceptedCards"]}</p>
                <Image width={0}
                    height={0}
                    sizes='10vw'
                    style={{ width: '100%', height: 'auto', objectFit: "cover" }} className={styles.acceptedcards_img} border="0" alt="Airport Pickups Accepted Cards" src="/images/others/payments.webp" />
            </div>
            <div className={`${styles.left_info} ${styles.tfl}`} >
                <Image width={0}
                    height={0}
                    sizes='10vw'
                    style={{ width: '100%', height: 'auto', objectFit: "cover" }} className={styles.tfl_img} border="0" alt="Airport Pickups " src="/images/others/tfl2.webp" />
            </div>

        </div>
    )
}

export default QuotationResultsTaxiDealLeftPart