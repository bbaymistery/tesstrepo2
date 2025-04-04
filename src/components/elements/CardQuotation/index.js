import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";

import CardQuotationLoading from '../Loadings/CardQuotationLoading';
import { quotationImagesObj } from "../../../constants/quotationImages";

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
      router.push(`/transfer-details`)
    } else {
      router.push(`/transfer-details`)
    }
  }
}
const CardQuotation = (params = {}) => {

  let { quotationOptions: datas, selectedQuotation, index, quotationLoading, duration, distance, isTaxiDeal = false,env } = params

  const state = useSelector((state) => state.pickUpDropOffActions)
  let { params: { journeyType, language, quotations }, appData } = state
  const router = useRouter();
  const dispatch = useDispatch();

  //cartypes object for card item as {1:{image:'sds, name:Economy}}
  const carObject = appData?.carsTypes?.reduce((obj, item) => ({ ...obj, [item.id]: item, }), {});

  const setQuotationHandleClick = (params = {}) => {
    let { quotation } = params
    checkJourneyTypeAndAddQuotationToReducer({ journeyType, quotation, index, router, dispatch, language, isTaxiDeal, quotations })
  };

  const handleClickForMobile = (params = {}) => {
    let { quotation } = params
    if (451 > document.documentElement.clientWidth) {
      checkJourneyTypeAndAddQuotationToReducer({ journeyType, quotation, index, router, dispatch, language, isTaxiDeal, quotations })

    }
  };

  const getModalInfo = () => dispatch({ type: "SET_MODAL_INFO", data: { trueOrFalse: true } })



  useEffect(() => {
    const desiredCarIdOrder = [1, 4, 2, 5, 3, 6];
    // Sort the datas array based on the desiredCarIdOrder
    datas.sort((a, b) => {
      const carIdA = a.carId;
      const carIdB = b.carId;
      const indexA = desiredCarIdOrder.indexOf(carIdA);
      const indexB = desiredCarIdOrder.indexOf(carIdB);
      // Compare the indices to determine the sorting order
      return indexA - indexB;
    });

  }, [, datas])

  return (
    <div className={styles.result_container}>

      {/* <HeaderOfResults duration={duration} distance={distance} /> */}
      <div id="main_container" className={styles.quotation_items}>
        {datas?.map((item, i) => {
          return (
            <div className={styles.item} key={i}   >
              <div onClick={(e) => handleClickForMobile({ quotation: item })} className={`${styles.main_body} ${451 > document.documentElement.clientWidth && Number(selectedQuotation?.carId) === Number(carObject[item?.carId].id) ? styles.selectedCard : ""} `}  >
                <div className={styles.item_body_left}>
                  <div className={styles.item_main}>
                    <div className={styles.main_left}>
                      <div className={styles.left_title}>
                        {carObject[item?.carId]?.name}
                        <i className="fa-solid fa-circle-info" onClick={getModalInfo}  ></i>
                      </div>
                      <div className={`${styles.left_subtitle} ${i === 0 ? styles.left_subtitle_1 : ""}`}>
                        {carObject[item?.carId]?.transferType}
                      </div>
                      <ul className={styles.icon_details}>
                        <li className={styles.icon_details_item}>
                          <i className={`fa-solid fa-users ${styles.icon_details_icon}`} ></i>
                          {carObject[item?.carId]?.suitcases}
                        </li>
                        <li className={styles.icon_details_item}>
                          <i className={`fa-solid fa-suitcase ${styles.icon_details_icon}`}     ></i>
                          {carObject[item?.carId]?.pax}
                        </li>

                      </ul>
                    </div>
                    <div className={styles.main_right}>
                      {/*  eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`${env.apiDomain}${quotationImagesObj[item?.carId]?.image}`} alt="car" />

                    </div>
                  </div>
                  <div className={styles.item_bottom}>
                    <div className={`${styles.free_meet} ${styles.first}`}>
                      <p>
                        <span>
                          <i className="fa-solid fa-check"></i>
                        </span>
                        Flight Tracking
                      </p>
                      <p>
                        <span>
                          <i className="fa-solid fa-check"></i>
                        </span>
                        Free Waiting Time
                      </p>

                      <p className={styles.uzunad}>
                        <span>
                          <i className="fa-solid fa-check"></i>
                        </span>
                        Free meet and greet
                      </p>
                      <p className={styles.uzunad}>
                        <span>
                          <i className="fa-solid fa-check"></i>
                        </span>
                        No charge for flight delays
                      </p>
                    </div>

                    <div className={`${styles.free_meet} ${styles.second}`}>
                      <p className={styles.uzunad}>
                        <span>
                          <i className="fa-solid fa-check"></i>
                        </span>
                        Free meet and greet
                      </p>
                      <p className={styles.uzunad}>
                        <span>
                          <i className="fa-solid fa-check"></i>
                        </span>
                        No charge for flight delays
                      </p>
                    </div>

                    <div className={`${styles.free_meet} ${styles.free_meet_price}`}    >
                      <div className={styles.price}>
                        {quotationLoading ? (<CardQuotationLoading className={"loading_inside_quot"} />) : (`£ ${item?.price}`)}
                      </div>
                      <button onClick={() => setQuotationHandleClick({ quotation: item })} className={`${Number(selectedQuotation?.carId) === Number(carObject[item?.carId].id) ? styles.selectedBtn : ""}`}    >  {Number(selectedQuotation?.carId) === Number(carObject[item?.carId].id) ? "Selected" : "Select"}
                      </button>
                      <p className={styles.enjoy_travel}>Enjoy Travel</p>
                    </div>
                  </div>
                </div>

                <p className={styles.outer_icon}>
                  <i className="fa-solid fa-gauge-high"></i>
                </p>
              </div>

            </div>
          )
        })}
      </div>



    </div>
  );
};

export default CardQuotation;
