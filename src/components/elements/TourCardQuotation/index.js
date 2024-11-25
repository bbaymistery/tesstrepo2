import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { quotationImagesObjWebp } from '../../../constants/quotationImages';//imagelerin sekilleri gorundeye kullanirix
import styles from "./styles.module.scss";
import Image from 'next/image';
import { hours, minutes } from '../../../constants/minutesHours';
import { currentDate } from '../../../helpers/getDates';
import WaveLoading from '../LoadingWave';
import { splitDateTimeStringIntoDate, splitDateTimeStringIntoHourAndMinute } from '../../../helpers/splitHelper';

const TourCardQuotation = (params = {}) => {

  let {
    quotationOptions: datas,
    selectedQuotation,
    quotationLoading = false,
    direction,
    language,
    transferDateTime,
    duration,
    images,
    shortDescription,
    pageTitle
  } = params

  const dispatch = useDispatch();
  const { appData } = useSelector(state => state.initialReducer)
  //cartypes object for card item as {1:{image:'sds, name:Economy}}
  const carObject = appData?.carsTypes?.reduce((obj, item) => ({ ...obj, [item.id]: item, }), {});
  const router = useRouter()
  const refHeight = useRef();
  const [heightEl, setHeightEl] = useState();
  const [activeAccordion, setActiveAccordion] = useState(null)//BY DEFAULT ALL OF TEM WILL BE CLOSED
  const [splitedDate, setSplitedDate] = useState(currentDate())
  const setQuotationHandleClick = (params = {}) => {

    let { quotation } = params
    let selectedTour = {
      quotationOptions: datas,
      images,
      desc: shortDescription,
      duration,
      price: quotation.price,
      urlImage: quotationImagesObjWebp[quotation?.carId]?.image,
      title: pageTitle
    }

    dispatch({ type: "SET_TOUR_QUOTATION", data: { selectedTour } })
    dispatch({ type: "SET_QUOTATION", data: { quotation, journeyType: 0 } })

    router.push(`${language === 'en' ? "/tour_customer_details" : `/${language}/tour_customer_details`}`)
  };


  // Define the function to return the result based on the condition
  const getClassNameResult = (selectedQuotation, item) => {
    if (Number(selectedQuotation?.carId) === Number(quotationImagesObjWebp[item?.carId]?.id)) {
      return `${styles.card_item} ${styles.selectedCard}`;
    } else {
      return styles.card_item;
    }
  };


  const toogleAccordion = (indexOfAccrdion) => {
    if (indexOfAccrdion === activeAccordion) return setActiveAccordion(null);
    setActiveAccordion(indexOfAccrdion)
  }

  const onChangeSetDateTimeHandler = (params = {}) => {
    let { value, hourOrMinute, } = params
    // dispatch({ type: 'SET_TOUR_DATETIME', data: { hourOrMinute, value } })
    dispatch({ type: 'SET_JOURNEY_DATETIME', data: { journeyType: 0, hourOrMinute, value } })

  }
  useEffect(() => {
    setHeightEl(`${refHeight?.current?.scrollHeight}px`);
  }, [activeAccordion]);

  useEffect(() => {
    const [splitedDate] = splitDateTimeStringIntoDate(transferDateTime) || []
    setSplitedDate(splitedDate)
  }, [transferDateTime,])


  return (
    <div className={`${styles.result_container} ${styles.taxideal_result_container}`}>
      <div id="main_container">
        {datas?.map((item, index) => {

          return (
            <div key={index + 1000} className={`${activeAccordion === item.carId ? styles.selectedAccordionCard : ""}`}>
              <div className={`${getClassNameResult(selectedQuotation, item)} `} >
                {item ?
                  <div data={quotationImagesObjWebp[item?.carId]?.id} className={styles.column_first}>
                    <Image src={quotationImagesObjWebp[item?.carId]?.image} alt="Car Image" width={300} height={120} style={{ objectFit: "contain", }} priority />
                    {/* <img className={styles.image} src={quotationImagesObjWebp[item?.carId]?.image} alt="Car Image"  style={{ objectFit: "contain", }} priority /> */}

                  </div> : <></>}
                <div className={styles.column_second}>
                  <div className={styles.column_second_flex_column}>
                    <div className={styles.car_features}>
                      <div className={styles.feature_column}>
                        <span>
                          <i className={`fa-solid fa-gauge-high ${styles.speed_icon}`}></i>
                        </span>
                      </div>
                      <div className={styles.feature_column}>
                        <span>
                          <span></span>
                          {carObject?.[item?.carId]?.transferType}
                        </span>
                      </div>
                      <div className={styles.feature_column}>
                        <span>
                          <span></span>
                          {carObject?.[item?.carId]?.name}
                        </span>
                      </div>
                    </div >
                    <div className={styles.car_features}>
                      <div className={styles.feature_column}>
                        <span className={styles.car_span}>
                          {appData?.words["strcVehicleCapacity"]}
                        </span>
                      </div>
                      <div className={styles.feature_column}>
                        <span>
                          {appData?.words["strPassengers"]}
                          <span>{carObject?.[item?.carId]?.pax}</span>
                        </span>
                      </div>
                      <div className={styles.feature_column}>
                        <span>
                          {appData?.words["carsSuitcases"]}
                          <span>{carObject?.[item?.carId]?.suitcases}</span>
                        </span>
                      </div>
                    </div >
                  </div >
                </div >

                {item ?
                  <div className={`${styles.column_third}`}>
                    <div className={styles.price}>{quotationLoading ? "..." : `£${item?.price.split(".")[0]}`}</div>
                    <div className={styles.total}>{appData?.words["strTotalPrice"]}</div>
                    <button onClick={() => toogleAccordion(item.carId)} className={`btn btn_primary ${Number(selectedQuotation?.carId) === Number(carObject?.[item?.carId]?.id) ? styles.selectedBtn : <React.Fragment></React.Fragment>}`}   >
                      {quotationLoading ? <WaveLoading /> : Number(selectedQuotation?.carId) === Number(carObject?.[item?.carId]?.id) ? `${appData?.words["quSelectedButton"]}` : `${appData?.words["quSelectButton"]}`}
                    </button>
                  </div>
                  : <></>}

              </div>
              {/* acilan aacccordion */}
              <div ref={refHeight} style={{ height: activeAccordion === item.carId ? `${heightEl}` : "0px" }} className={activeAccordion === item.carId ? `${styles.card_item_accrdion_part} ${styles.animated}` : `${styles.card_item_accrdion_part}`}  >
                <div className={styles.top}>
                  <p>
                    <span>{appData.words["strPickupFrom"]} :</span>
                    <span className={styles.desc}>
                      {appData.words["strPickupAddressWillBeRequested"]}
                    </span>
                  </p>
                  <p>
                    <span>{appData.words["strTourDuration"]} :</span>
                    <span className={styles.desc}>
                      {appData.words["strApproximatelyStartingFrom"].replace("{{}}", duration)}
                    </span>
                  </p>
                </div>
                <div className={styles.bottom}>
                  <div className={styles.date_time}>
                    <div className={styles.date}>
                      <div className={`${styles.book_input_date}`}>
                        <p className={direction}> Tour Date</p>
                        <div className={`${styles.date_div} ${direction === 'rtl' && styles.date_div_rtl}`}>
                          <input
                            aria-label="date"
                            type="date"
                            name="pickup-date"
                            className={direction === "rtl" ? styles.rtl : ""}
                            value={splitedDate}
                            min={currentDate()}
                            onChange={(e) => onChangeSetDateTimeHandler({ value: e.target.value, hourOrMinute: "date", })}
                          />
                        </div>
                        <i className={`fa-solid fa-calendar-days ${styles.date_picker_icon}`}></i>
                      </div>
                    </div>
                    <div className={styles.time}>
                      <div className={` ${styles.hours_minutes} `}>
                        <p className={direction}>{appData?.words["sePickUpTime"]}</p>
                        <div className={`${styles.select_time_div} ${direction}`}>
                          {Array.from(new Array(2)).map((_, i) => {
                            return (
                              <div key={i} className={styles.booking_form_hour_minute_wrapper}>
                                <label htmlFor={i}></label>
                                <i className={`fa-sharp fa-solid fa-angle-down ${direction === "rtl" ? styles.left : ""}`}></i>
                                <select
                                  aria-label={i}
                                  defaultValue={i === 0 ? transferDateTime?.split(" ")[1]?.split(":")[0] : transferDateTime?.split(" ")[1]?.split(":")[1]}
                                  onChange={(e) => onChangeSetDateTimeHandler({ value: e.target.value, hourOrMinute: i === 0 ? "hour" : "minute", })}
                                >
                                  {/* //if index==0 thenhours will show up if not then minutes show up */}
                                  {i === 0
                                    ? hours.map((hour) => (<option key={hour.id} id={hour.id + 50} value={hour.value}> {hour.value} </option>))
                                    : minutes.map((minute) => (<option key={minute.id} id={minute.id} value={minute.value}  > {minute.value} </option>))}
                                </select>
                              </div>)
                          })}
                        </div>
                      </div>
                    </div>

                  </div>


                </div>
                <div className={styles.btn_div} onClick={() => setQuotationHandleClick({ quotation: item })}>
                  <button className="btn btn_darkPrimary">{appData?.words["strBookNow"]}</button>
                </div>
              </div>
            </div>
          )
        })}

      </div>
    </div>
  )
}

export default TourCardQuotation
