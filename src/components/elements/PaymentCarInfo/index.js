import React from 'react'
import { useSelector } from 'react-redux'
import styles from "./styles.module.scss"
import { quotationImagesObjWebp } from '../../../constants/quotationImages'

const CarInfo = (props) => {
    let { index, quotation, splitedDate, splitedHour, splitedMinute, selectedTour = {}, tourDetailsStatus = false, } = props
    let state = useSelector((state) => state.pickUpDropOffActions)
    let { params: { direction } } = state
    const { appData } = useSelector(state => state.initialReducer)
    //cartypes object for card item as {1:{image:'sds, name:Economy}}
    const carObject = appData?.carsTypes?.reduce((obj, item) => ({ ...obj, [item.id]: item, }), {});


    return (
        <div className={styles.car_info} direction={String(direction === 'rtl')}>
            <h3>{tourDetailsStatus ? appData.words[selectedTour.translate] : index === 0 ? appData?.words["strYourBookingDetails"] : appData?.words["strReturnJourneyDetails"]}</h3>
            <div className={styles.sections}>
                <div className={`${styles.section} ${styles.first_column}`}>
                    <div className={styles.img_div}>
                        <img src={`${quotationImagesObjWebp[quotation?.carId]?.image}`} alt="" />
                    </div>
                    <div className={styles.description}>
                        <div className={styles.text_1}>{appData?.words["strYouSelected"]}</div>
                        <div className={styles.text_2} style={{ textTransform: 'capitalize' }}>
                            {carObject[quotation.carId]?.name}
                        </div>
                    </div>


                </div>
                <div className={`${styles.section} ${styles.second_column}`}>
                    <div className={styles.description}>
                        <p className={styles.text_1}>{appData?.words["strcVehicleCapacity"]}</p>
                        <p className={styles.text_2}>
                            <span>
                                {appData?.words["strCarFeatureMaxPassengers"].replace("{{}}", carObject[quotation.carId]?.pax)}

                            </span>
                            <br />
                            <span>
                                {appData?.words["strCarFeatureMaxPassengers"].replace("{{}}", carObject[quotation.carId]?.suitcases)}
                            </span>
                        </p>
                    </div>
                </div>
                <div className={`${styles.section} ${styles.fourth_column}`}>
                    <div className={styles.description}>
                        <p className={styles.text_1}>{appData?.words["strOn"]}</p>
                        <p className={styles.text_2}>
                            {<span>
                                {direction === 'rtl'
                                    ? `${splitedDate.split(" ")[0].replace(/(\d+)\-(\d+)-(\d+)/, "$1-$2-$3")}`
                                    : `${splitedDate.split(" ")[0].replace(/(\d+)\-(\d+)-(\d+)/, "$3-$2-$1")}`}
                            </span>}
                        </p>

                    </div>

                </div>
                <div className={`${styles.section} ${styles.third_column}`}>
                    <div className={styles.description}>
                        <p className={styles.text_1}>{appData?.words["strTime"]}</p>
                        <p className={styles.text_2}> {`${splitedHour}:${splitedMinute}`}</p>
                    </div>
                </div>


                <div className={`${styles.section} ${styles.fifth_column}`}>
                    <div className={styles.description}>
                        <p className={styles.text_1}>{appData?.words["strPriceTitle"]}</p>
                        <p className={styles.text_2}>
                            £ {quotation.price}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarInfo