import { useRouter } from 'next/router';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { quotationImagesObj } from '../../../constants/quotationImages';
import styles from "./styles.module.scss";
import Image from 'next/image';
const checkJourneyTypeAndAddQuotationToReducer = (params = {}) => {
  //by this index  we r gonna assure in which journey we should add quotation
  //by journey type we r gonn assure should we directly pass to next page or not
  let { journeyType, quotation, index, router, dispatch, language, isTaxiDeal, quotations } = params

  //if it is both way journey then do not push directly to other page
  if (parseInt(journeyType) === 1) {
    dispatch({ type: "SET_QUOTATION", data: { quotation, journeyType: index } })
  } else {
    dispatch({ type: "SET_QUOTATION", data: { quotation, journeyType: index } })
    //if is taxi deal tru it means we should remove selected point from redux (because someofthem can be with  --select--)
    if (isTaxiDeal) {
      if (quotations[0]?.taxiDeal?.pickupPoints.length > 1) {

        dispatch({ type: "RESELECT_POINTS_FROM_STORE", data: { type: "pickup" } })
      }
      if (quotations[0]?.taxiDeal?.dropoffPoints.length > 1) {
        dispatch({ type: "RESELECT_POINTS_FROM_STORE", data: { type: "dropoff" } })
      }
      // router.push(`${language === 'en' ? "/transfer-details" : `${language}/transfer-details`}`)
    } else {
      // router.push(`${language === 'en' ? "/transfer-details" : `${language}/transfer-details`}`)

    }
  }
}
const TourCardQuotation = (params = {}) => {

  //by this index  we r gonna assure in which journey we should add quotation
  let { quotationOptions: datas, selectedQuotation, index, quotationLoading = false,env } = params

  const router = useRouter();
  const dispatch = useDispatch();
  const state = useSelector(state => state.pickUpDropOffActions)
  let { reservations, appData } = state
  //cartypes object for card item as {1:{image:'sds, name:Economy}}
  const carObject = appData?.carsTypes?.reduce((obj, item) => ({ ...obj, [item.id]: item, }), {});

  const setQuotationHandleClick = (params = {}) => {
    // let { quotation } = params
    // checkJourneyTypeAndAddQuotationToReducer({ journeyType, quotation, index, router, dispatch, language, isTaxiDeal, quotations })
    // dispatch(setQuotation(item, journeyType));
    //
  };

  const handleClickForMobile = ({ e, quotation }) => {
    //  if (451 > document.documentElement.clientWidth)
    // checkJourneyTypeAndAddQuotationToReducer({ journeyType, quotation, index, router, dispatch, language, isTaxiDeal, quotations })
  };
  // Define the function to return the result based on the condition
  const getClassNameResult = (selectedQuotation, item) => {
    if (Number(selectedQuotation?.carId) === Number(quotationImagesObj[item?.carId]?.id)) {
      return `${styles.card_item} ${styles.selectedCard}`;
    } else {
      return styles.card_item;
    }
  };

  return (
    <div className={`${styles.result_container} ${styles.taxideal_result_container}`}>
      <div id="main_container">
        {datas?.map((item, index) => {
          return (
            <div key={index} className={getClassNameResult(selectedQuotation, item)} onClick={(e) => handleClickForMobile({ e, quotation: item })}>
              {item ?
                <div data={quotationImagesObj[item?.carId]?.id} className={styles.column_first} style={{ backgroundImage: `url(${env.apiDomain}${quotationImagesObj[item?.carId]?.image})` }}> </div>
                : <></>}
              <div className={styles.column_second}>
                <div className={styles.column_second_flex_column}>
                  <div className={styles.name_and_postcode_div}>
                    <div className={styles.postcode}> {carObject?.[item?.carId]?.transferType}</div>
                    <h3 className={styles.name}>{carObject?.[item?.carId]?.name}</h3>
                  </div>
                  <div className={styles.car_features}>
                    <div className={styles.feature_column}> <i className="fa-solid fa-user"></i> <span>{carObject?.[item?.carId]?.pax}</span>  </div>
                    <div className={styles.feature_column}> <i className="fa-solid fa-suitcase"></i><span>{carObject?.[item?.carId]?.suitcases}</span></div>
                    <div className={`${styles.feature_column} ${styles.meet_greet_icon}`}>
                      <Image src={'/images/icons/blackMeetAndGreet.svg'} width="18" height="20" alt="" />
                      <span style={{ paddingLeft: "5px", fontWeight: '500' }}>Meet & Greet</span></div >
                  </div >
                  <div className={styles.apl_features}>
                    <p className={`${styles.apl_feature} ${styles.show_more_than360}`}> <i className={`fa-solid fa-check `}></i> <span> Free Meet And Greet  </span></p>
                    <p className={`${styles.apl_feature} ${styles.show_more_than360}`}>  <i className={`fa-solid fa-check `}></i><span> No Charge For Flight Delays</span></p>
                    <p className={`${styles.apl_feature} ${styles.show_more_than360}`}> <i className={`fa-solid fa-check `}></i><span> Free Waiting Time</span> </p>
                    <p className={`${styles.apl_feature} ${styles.show_more_than360}`}> <i className={`fa-solid fa-check `}></i><span> Free Cancellation (24h)</span> </p>
                    <p className={`${styles.apl_feature} ${styles.show_more_than360}`}><i className={`fa-solid fa-check `}></i><span>Flight Tracking</span></p>
                    <p className={`${styles.apl_feature} ${styles.show_more_than360}`}> <i className={`fa-solid fa-check `}></i><span>Comfortable Cars</span> </p>

                    <p className={`${styles.apl_feature} ${styles.show_less_than360}`}><i className={`fa-solid fa-check `}></i><span>Flight Tracking</span></p>
                    <p className={`${styles.apl_feature} ${styles.show_less_than360}`}><i className={`fa-solid fa-check`}></i><span>{"Comfortable Cars"}</span></p>
                    <p className={`${styles.apl_feature} ${styles.show_less_than360}`}> <i className={`fa-solid fa-check `}></i><span> Free Waiting Time</span> </p>
                    <p className={`${styles.apl_feature} ${styles.show_less_than360}`}> <i className={`fa-solid fa-check `}></i> <span> Free Meet And Greet  </span></p>
                    <p className={`${styles.apl_feature} ${styles.show_less_than360}`}><i className={`fa-solid fa-check`}></i><span>{"Free Cancellation (24h)"}</span></p>
                    <p className={`${styles.apl_feature} ${styles.show_less_than360}`}>  <i className={`fa-solid fa-check `}></i><span> No Charge For Flight Delays</span></p>

                  </div>
                </div >
              </div >

              {item ?
                < div className={` ${styles.column_third}`}>
                  <div className={styles.price}>{quotationLoading ? "..." : `£${item?.price.split(".")[0]}`}</div>
                  <div className={styles.total}>Total Price</div>
                  <button onClick={() => setQuotationHandleClick({ quotation: item })} className={`btn btn_primary ${Number(selectedQuotation?.carId) === Number(carObject?.[item?.carId]?.id) ? styles.selectedBtn : <React.Fragment></React.Fragment>}`}   >
                    {quotationLoading ? "<WaveLoading />" : Number(selectedQuotation?.carId) === Number(carObject?.[item?.carId]?.id) ? `Selected` : `Select`}
                  </button>
                </div>
                : <></>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TourCardQuotation
/*

*/