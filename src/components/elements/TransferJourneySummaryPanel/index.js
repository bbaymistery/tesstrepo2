import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import { quotationImagesObjWebp } from '../../../constants/quotationImages'
import styles from "./styles.module.scss"
const TransferJourneySummaryPanel = (props) => {
    let { index, quotation, selectedPickupPoints, selectedDropoffPoints, splitedDate, splitedHour, splitedMinute, isTaxiDeal = false, journeyType } = props

    let state = useSelector((state) => state.pickUpDropOffActions)
    let { params: { quotations, direction } } = state

    const { appData } = useSelector(state => state.initialReducer)
    //cartypes object for card item as {1:{image:'sds, name:Economy}}
    const carObject = appData?.carsTypes?.reduce((obj, item) => ({ ...obj, [item.id]: item, }), {});
    //https://www.tripadvisor.co.uk/Attraction_Review-g186338-d11966434-Reviews-Airport_Pickups_London-London_England.html

    return (
        <div className={`${styles.journey_summary_panel} ${isTaxiDeal ? styles.journey_summary_panel_taxi_deal : ""}`}>
            {isTaxiDeal ?
                <div className={styles.content}>
                    <h3>{appData?.words["strYourBookingDetails"]}</h3>
                    <div className={`${styles.journey_card} ${direction === 'rtl' && styles.rtljourney_card}`}>
                        <div
                            className={`${styles.img_div}
                         ${quotation.carId === 6 || quotation.carId === 5 ? styles.cardIdSix : ""}
                          ${quotation.carId === 4 ? styles.carIdFour : ""}
                           ${quotation.carId === 2 ? styles.carIdTwo : ""}`}
                            style={{ backgroundImage: `url(${quotationImagesObjWebp[quotation?.carId]?.image})` }}>

                        </div>
                        <div className={styles.details_div}>
                            <div id="from to" className={styles.fromto}>
                                {/* <h5>Pickup point:</h5> */}
                                <div className={styles.stars}>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star-half-stroke"></i>
                                </div>
                                {selectedPickupPoints.map((pickup, i) => { return <li key={i}><span>{isTaxiDeal ? "" : `${i + 1}. `}  {pickup.address}</span></li> })}
                                <div className={styles.space}> </div>
                                {/* <h5>Dropoff point:</h5> */}
                                {selectedDropoffPoints.map((dropoff, i) => { return <li key={i + 15}><span>{isTaxiDeal ? "" : `${i + 1}. `} {dropoff.address}</span></li> })}


                                <a href={"https://g.co/kgs/Rg7vb8"} target="_blank" className={styles.review}>
                                    <div className={styles.review_left}>4.8 </div>
                                    <div className={styles.review_center} >Exceptional </div>
                                    <div className={styles.review_right}><span>495</span> {appData?.words["strReviews"]}  </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={styles.date_time}>
                        <div className={styles.box}>
                            <p className={direction}>{selectedPickupPoints[0]?.pcatId === 1 ? appData?.words["seLandingDate"] : appData?.words["sePickUpDate"]}</p>
                            <p>
                                {direction === 'rtl'
                                    ? `${splitedDate.split(" ")[0].replace(/(\d+)\-(\d+)-(\d+)/, "$1-$2-$3")}`
                                    : `${splitedDate.split(" ")[0].replace(/(\d+)\-(\d+)-(\d+)/, "$3-$2-$1")}`}
                            </p>
                        </div>
                        <div className={styles.box}>
                            <p className={direction}>{selectedPickupPoints[0]?.pcatId === 1 ? appData?.words["seLandingTime"] : appData?.words["sePickUpTime"]}</p>
                            <p> {`${splitedHour} : ${splitedMinute}`}</p>
                        </div>
                    </div>
                    <div className={styles.total_journey}>
                        <div className={styles.text_1}>{appData?.words["strTotalLengthofJourney"]} </div>
                        <div className={styles.duration}>
                            <span>{appData?.words["strDistance"]}</span>
                            <span>{quotations[index].distance}</span>
                        </div>
                        <div className={styles.duration}>
                            <span>{appData?.words["strJourneyDurationTitle"]}</span>
                            <span>{quotations[index].duration}</span>
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
                    </div>
                </div>
                :
                <div className={styles.content}>
                    <h3>{index === 0 ? appData?.words["strYourBookingDetails"] : appData?.words["strReturnJourneyDetails"]}</h3>
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
                                    {appData?.words["strFrom2"]}:
                                </h5>
                                {selectedPickupPoints.map((pickup, i) => { return <li key={i}><span>{isTaxiDeal ? "" : `${i + 1}. `}  {pickup.address}</span></li> })}
                                <div className={styles.space}> </div>
                                <h5>{appData?.words["strTo"]}:</h5>
                                {selectedDropoffPoints.map((dropoff, i) => { return <li key={i + 15}><span>{isTaxiDeal ? "" : `${i + 1}. `} {dropoff.address}</span></li> })}
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
                        <div className={styles.text_1}>{appData?.words["strTotalLengthofJourney"]} </div>
                        <div className={styles.duration}>
                            <span>{appData?.words["strDistance"]}</span>
                            <span>{quotations[index].distance}</span>
                        </div>
                        <div className={styles.duration}>
                            <span>{appData?.words["strJourneyDurationTitle"]}</span>
                            <span>{quotations[index].duration}</span>
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
                        {quotations[0].taxiDeal ? <></> : <Link href="/quotation-results" style={{ textTransform: "capitalize" }}> {appData?.words["strChangeCar"]} </Link>}
                    </div>
                    <div className={styles.price_div}>
                        <div className={styles.text_1}>{appData?.words["strPriceTitle"]} </div>
                        <div className={styles.price}>£ {quotation.price}  </div>
                    </div>
                </div>
            }
            {isTaxiDeal ?
                <div className={`${styles.content} ${styles.summarycontent}`} style={{ marginTop: "2rem" }}>
                    <div className={`${styles.total_journey}`}>
                        <div className={styles.duration}>
                            <span>{carObject[quotation.carId]?.name} {appData?.words["strVehicleTypeTitle"]}</span>
                            <span>£ {quotation.price}</span>
                        </div>
                        <div className={styles.duration}>
                            <span>{appData?.words["strTaxesAndFees"]}</span>
                            <span>	{appData?.words["strIncluded"]}</span>
                        </div>
                        <div className={styles.duration}>
                            <span>{appData?.words["strMeetandGreetIncluded"]}	</span>
                            <span>	{appData?.words["strIncluded"]}</span>
                        </div>
                    </div>
                    <div className={styles.price_div}>
                        <div className={styles.text_1}>{appData?.words["strPriceTitle"]} </div>
                        <div className={styles.price}>£ {quotation.price}</div>
                    </div>
                </div>
                : <></>}

            {/* || index === 1 || (index === 0&&+journeyType===0) */}
            {isTaxiDeal ?
                <div className={`${styles.content} ${styles.summarycontent} `} style={{ marginTop: "2rem" }}>
                    <div className={`${styles.left_info} ${styles.acceptedcards}`} style={{ marginTop: '0rem' }} title="Accepted Cards for Airport Pickups London">
                        <img className={styles.acceptedcards_img} border="0" alt="Accepted Cards for Airport Pickups London " src="/images/others/accepted-cards.png" />
                    </div>
                </div>
                : <></>}

        </div>
    )
}

export default TransferJourneySummaryPanel
