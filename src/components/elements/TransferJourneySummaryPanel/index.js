import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import { quotationImagesObj } from '../../../constants/quotationImages'
import styles from "./styles.module.scss"
const TransferJourneySummaryPanel = (props) => {
    let { index, quotation, selectedPickupPoints, selectedDropoffPoints, splitedDate, splitedHour, splitedMinute, isTaxiDeal = false,env } = props

    let state = useSelector((state) => state.pickUpDropOffActions)
    let { params: { quotations, }, appData } = state


    //cartypes object for card item as {1:{image:'sds, name:Economy}}
    const carObject = appData?.carsTypes?.reduce((obj, item) => ({ ...obj, [item.id]: item, }), {});


    return (
        <div className={styles.journey_summary_panel}>
            <div className={styles.content}>
                <h3>{index === 0 ? "Booking Details" : "Return Journey Booking Details"}</h3>
                <div className={`${styles.journey_card}`}>
                    <div className={`${styles.img_div} ${quotation.carId === 6 || quotation.carId === 5 ? styles.cardIdSix : ""} ${quotation.carId === 4 ? styles.carIdFour : ""}`} style={{ backgroundImage: `url(${env.apiDomain}${quotationImagesObj[quotation?.carId]?.image})` }}>
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
                            <h5>FROM:       {/* <h5>Pickup point:</h5> */}
                            </h5>
                            {selectedPickupPoints.map((pickup, i) => { return <li key={i}><span>{isTaxiDeal ? "" : `${i + 1}. `}  {pickup.address}</span></li> })}
                            <div className={styles.space}> </div>
                            <h5>TO:</h5>
                            {selectedDropoffPoints.map((dropoff, i) => { return <li key={i + 15}><span>{isTaxiDeal ? "" : `${i + 1}. `} {dropoff.address}</span></li> })}
                            <h5>ON:</h5>
                            <li>
                                <span>
                                    {`${splitedDate.split(" ")[0].replace(/(\d+)\-(\d+)-(\d+)/, "$3-$2-$1")}`}

                                    &nbsp;
                                    {`${splitedHour}:${splitedMinute}`}
                                </span>
                            </li>

                        </div>
                    </div>
                </div>
                <div className={styles.total_journey}>
                    <div className={styles.text_1}>Total Length of journey </div>
                    <div className={styles.duration}>
                        <span>Distance</span>
                        <span>{quotations[index].distance}</span>
                    </div>
                    <div className={styles.duration}>
                        <span>journey duration</span>
                        <span>{quotations[index].durationInTrafficValue > 0 ? quotations[index].durationInTraffic : quotations[index].duration}</span>
                    </div>
                </div>

                <div style={{ border: 'none' }} className={styles.total_journey}>
                    <div className={styles.text_1}>Your Vehicle Details</div>
                    <div className={styles.duration}>
                        <span>{carObject[quotation.carId]?.transferType}</span>
                    </div>
                    <div className={styles.duration}>
                        <span>Max</span>
                        <span>{carObject[quotation.carId]?.suitcases} Suitcases</span>
                    </div>
                    <div className={styles.duration}>
                        <span>Max</span>
                        <span>{carObject[quotation.carId]?.pax} Passengers</span>
                    </div>
                    {/* <Link href="/quotation"> Change Car Type </Link> */}
                </div>
                <div className={styles.price_div}>
                    <div className={styles.text_1}>price </div>
                    <div className={styles.price}>£ {quotation.price}  </div>
                </div>
            </div>




        </div>
    )
}

export default TransferJourneySummaryPanel
