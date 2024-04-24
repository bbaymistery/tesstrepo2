import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import { quotationImagesObjWebp } from '../../../constants/quotationImages'
import styles from "./styles.module.scss"
import { useRouter } from 'next/router'
const TourJourneySummaryPanel = (props) => {
    let { quotation, pickupPointAddress = "", splitedDate, splitedHour, splitedMinute, selectedTour } = props

    let state = useSelector((state) => state.pickUpDropOffActions)
    let { params: { direction } } = state
    const router = useRouter();
    const { appData } = useSelector(state => state.initialReducer)
    //cartypes object for card item as {1:{image:'sds, name:Economy}}
    const carObject = appData?.carsTypes?.reduce((obj, item) => ({ ...obj, [item.id]: item, }), {});
    const goBack = (e) => {
        e.preventDefault();
        router.back();
    };
    return (
        <div className={`${styles.journey_summary_panel}`}>
            <div className={styles.content}>
                <h3>{appData?.words["strYourBookingDetails"]}</h3>
                <div className={`${styles.journey_card} ${direction === 'rtl' && styles.rtljourney_card}`}>
                    <div d={quotation.carId}
                        className={`${styles.img_div}
                          ${quotation.carId === 6 || quotation.carId === 5 ? styles.cardIdSix : ""} 
                          ${quotation.carId === 3 || quotation.carId === 3 ? styles.cardIdThree : ""} 
                          ${quotation.carId === 4 ? styles.carIdFour : ""}
                           ${quotation.carId === 2 ? styles.carIdTwo : ""}`}
                        style={{ backgroundImage: `url(${quotationImagesObjWebp[quotation?.carId]?.image})` }}>
                        <div className={styles.stars}>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star-half-stroke"></i>
                        </div>
                    </div>
                    <div className={styles.details_div}>
                        <div id="from to" className={styles.fromto}>
                            <h5>
                                {/* {appData?.words["strFrom2"]}: */}
                                {appData?.words["strPickupAddress"]}:
                            </h5>
                            {/* {selectedPickupPoints.map((pickup, i) => { return <li key={i}><span>{isTaxiDeal ? "" : `${i + 1}. `}  {pickup.address}</span></li> })} */}
                            <li >
                                <span style={{ fontSize: "17px" }}>
                                    {pickupPointAddress}
                                </span>
                            </li>
                            <div className={styles.space}> </div>
                            {/* <h5>{appData?.words["strTo"]}:</h5> */}
                            {/* {selectedDropoffPoints.map((dropoff, i) => { return <li key={i + 15}><span>{isTaxiDeal ? "" : `${i + 1}. `} {dropoff.address}</span></li> })} */}
                            <h5>{appData?.words["strOn"]}:</h5>
                            <li>
                                <span>
                                    {direction === 'rtl'
                                        ? `${splitedDate.split(" ")[0].replace(/(\d+)\-(\d+)-(\d+)/, "$1-$2-$3")}`
                                        : `${splitedDate.split(" ")[0].replace(/(\d+)\-(\d+)-(\d+)/, "$3-$2-$1")}`}

                                    &nbsp;
                                    {`${splitedHour}:${splitedMinute}`}
                                </span>
                            </li>
                            <a href={"https://g.co/kgs/Rg7vb8"} target="_blank" className={styles.review}>
                                <div className={styles.review_left}>4.8 </div>
                                <div className={styles.review_center} >
                                    {appData?.words["strExceptional"]}
                                </div>
                                <div className={styles.review_right}><span>495</span> {appData?.words["strReviews"]}  </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className={styles.total_journey}>
                    <div className={styles.duration}>
                        <span>{selectedTour.title}</span>
                        <span>{selectedTour.duration.split(" ")[0]} {appData?.words["strHours"]}</span>
                    </div>
                </div>

                <div style={{ border: 'none' }} className={styles.total_journey}>
                    <div className={styles.text_1}>{appData?.words["strYourVehicleDetails"]}</div>
                    <div className={styles.duration}>
                        <span>{carObject[quotation.carId]?.transferType}</span>
                    </div>
                    <div className={styles.duration}>
                        <span>{appData?.words["strMax"]}</span>
                        <span>
                            {appData.words["strCarFeatureMaxSuitcases"].replace("{{}}", carObject[quotation.carId]?.suitcases)}
                        </span>
                    </div>
                    <div className={styles.duration}>
                        <span>{appData?.words["strMax"]}</span>
                        <span>
                            {appData.words["strCarFeatureMaxPassengers"].replace("{{}}", carObject[quotation.carId]?.pax)}
                        </span>
                    </div>
                    <a href="#" onClick={goBack} style={{ textTransform: "capitalize" }}>
                        {appData?.words["strChangeCar"]}
                    </a>
                </div>
                <div className={styles.price_div}>
                    <div className={styles.text_1}>{appData?.words["strPriceTitle"]} </div>
                    <div className={styles.price}>£ {quotation.price}</div>
                </div>
            </div>
        </div>
    )
}

export default TourJourneySummaryPanel
