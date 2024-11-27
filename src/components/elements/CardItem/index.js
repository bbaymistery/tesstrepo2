import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedJourneyType,
  selectPickUpDropOffReducer,
} from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import { SET_QUOTATION } from "../../../store/pickUpDropOffReducer/pickUpDropTypes";
import { SET_MODAL_INFO } from "../../../store/showFieldReducer/showFieldTypes";
import styles from "./styles.module.scss";

const CardItem = (props) => {
  let { env } = props

  //props
  const dispatch = useDispatch();
  const router = useRouter();
  const { datas, selectedQuotation, journeyType, duration } = props;
  const [durationState, setDurationState] = useState(null);
  const { appData } = useSelector(selectPickUpDropOffReducer);
  const selectJourneyType = useSelector(selectedJourneyType);
  const carObject = appData?.carsTypes?.reduce(
    (obj, item) => ({
      ...obj,
      [item.id]: item,
    }),
    {}
  );

  const handleClick = (e, item) => {
    if (e.target.classList.contains("fa-circle-info")) {
      dispatch({ type: SET_MODAL_INFO, payload: true });
      return;
    }
    if (Number(selectJourneyType) === 0) {
      router.push("/transfer-details");
    }
    dispatch({
      type: SET_QUOTATION,
      payload: { quotation: item, journeyType },
    });
  };
  const openModalCar = (e) => {
    dispatch({ type: SET_MODAL_INFO, payload: true });
  };
  return (
    <>
      {datas?.quotationOptions &&
        datas?.quotationOptions?.map((item, i) => {
          return (
            <div
              key={i}
              className={styles.item}
              onClick={(e) => handleClick(e, item)}
            >
              <div
                className={`${styles.booking_item}
                ${Number(selectedQuotation?.carId) ===
                    Number(carObject[item?.carId].id)
                    ? styles.booking_item_active
                    : ""
                  }
              `}
              >
                {/* //*carImage */}
                <div className={`${styles.first_column} ${styles.column}`}>
                  <img
                    src={`${env.apiDomain}${carObject[item?.carId]?.image
                      }`}
                    alt="car1"
                  />
                  <span className={styles.car_title}>
                    {carObject[item?.carId]?.name}
                  </span>
                  <span
                    className={styles.info_modal_desktop}
                    onClick={openModalCar}
                  >
                    <i className="fa-solid fa-circle-info"></i>
                  </span>

                  <div className={`${styles.third_column} ${styles.column}`}>
                    <div className={styles.third_column_first}>
                      <ul className={styles.third_column_first_ul}>
                        <li>
                          <div>
                            <i className="fa fa-male"></i>
                          </div>
                          <span className={styles.third_column_span}>
                            Max <b>{carObject[item?.carId]?.pax}</b> passengers
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className={styles.third_column_second}>
                      <ul className={styles.third_column_second_ul}>
                        <li>
                          <div>
                            <i className="fa fa-briefcase"></i>
                          </div>
                          <span className={styles.third_column_second_span}>
                            Max <b> {carObject[item?.carId]?.suitcases}</b>
                            medium suitcases
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/*//*vehicleIcons */}
                <div className={`${styles.second_column} ${styles.column}`}>
                  <div className={styles.vehicle_icon_list}>
                    <span className={styles.vehicle_icon_item}>
                      <i className="fa-solid fa-handshake-simple"></i>
                      <div className={styles.icon_explain}>
                        Free Meet & Greet
                      </div>
                    </span>
                    <span className={styles.vehicle_icon_item}>
                      <i
                        className={`fa-solid fa-plane ${styles.flight_icon}`}
                      ></i>
                      <div className={styles.icon_explain}>Flight Tracking</div>
                    </span>
                    <span className={styles.vehicle_icon_item}>
                      <i className="fa-solid fa-clock"></i>
                      <div className={styles.icon_explain}>
                        Free Waiting Time
                      </div>
                    </span>
                    <span className={styles.vehicle_icon_item}>
                      <i className="fa-solid fa-clock-rotate-left"></i>
                      <div className={styles.icon_explain}>
                        No charge for flight delays
                      </div>
                    </span>
                  </div>
                </div>

                {/* //*3pass 3suitcase */}
                <div className={`${styles.third_column} ${styles.column}`}>
                  <div className={styles.third_column_first}>
                    <ul className={styles.third_column_first_ul}>
                      <li>
                        <div>
                          <i className="fa fa-male"></i>
                        </div>
                        <span className={styles.third_column_span}>
                          Max <b> {carObject[item?.carId]?.pax}</b> passengers
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className={styles.third_column_second}>
                    <ul className={styles.third_column_second_ul}>
                      <li>
                        <div>
                          <i className="fa fa-briefcase"></i>
                        </div>
                        <span className={styles.third_column_second_span}>
                          Max <b> {carObject[item?.carId]?.suitcases}</b> medium
                          suitcases
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* //* price and select button */}
                <div className={`${styles.fourth_column} ${styles.column}`}>
                  <div className={`${styles.third_column} ${styles.column}`}>
                    <div className={styles.third_column_first}>
                      <ul className={styles.third_column_first_ul}>
                        <li>
                          <div>
                            <i className="fa fa-male"></i>
                          </div>
                          <span className={styles.third_column_span}>
                            Max <b>{carObject[item?.carId]?.pax}</b> passengers
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className={styles.third_column_second}>
                      <ul className={styles.third_column_second_ul}>
                        <li>
                          <div>
                            <i className="fa fa-briefcase"></i>
                          </div>
                          <span className={styles.third_column_second_span}>
                            Max <b> {carObject[item?.carId]?.suitcases}</b>
                            medium suitcases
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className={styles.price_div}>
                    <span className={styles.book_price}>£{item?.price}</span>
                    <span className={styles.per_vehicle}>/per vehicle</span>
                    {/* <p class="booking-item-flight-class"></p> */}
                    <div className={`${styles.select_btn_div} `}>
                      <button
                        className={`btn btn_primary ${styles.button} ${Number(selectedQuotation?.carId) ===
                          Number(carObject[item?.carId].id)
                          ? `btn_success`
                          : ""
                          }   `}
                      >
                        {Number(selectedQuotation?.carId) ===
                          Number(carObject[item?.carId].id)
                          ? "Selected"
                          : "Select"}
                      </button>
                      {/* <span
                        className={`btn btn_primary ${styles.selected_btn}`}
                      >
                        Select
                      </span> */}
                    </div>
                  </div>
                </div>

                {/* this design belong only for mobile version After 450px  */}
                <div className={styles.mobile}>
                  <span
                    className={styles.info_modal_mobile}
                    onClick={openModalCar}
                  >
                    <i className="fa-solid fa-circle-info"></i>
                  </span>
                  <div className={styles.top}>
                    <div className={styles.top_left}>
                      <p className={styles.top_left_car_name}>
                        {carObject[item?.carId]?.transferType}
                      </p>
                      <p className={styles.top_left_car_type}>
                        {carObject[item?.carId]?.name} or
                        <br />
                        <span>Similar</span>
                      </p>

                      <p className={styles.top_left_enjoy_travel}>
                        Enjoy travel
                      </p>
                      <div className={styles.top_left_price_div}>
                        <p className={styles.top_left_price_div_per}>per</p>
                        <p className={styles.top_left_price_div_price}>
                          £{item?.price}
                        </p>
                        <p className={styles.top_left_price_div_per_vehicle}>
                          /vehicle
                        </p>
                      </div>
                    </div>
                    <div className={styles.top_right}>
                      <ul className={styles.top_right_icons_details}>
                        <li className={styles.suitcase_icon}>
                          <i className="fa-solid fa-suitcase "></i>
                          <span> {carObject[item?.carId]?.suitcases} Bags</span>
                        </li>

                        <li>
                          {/* <i class="fa-solid fa-person-seat-reclined"></i> */}
                          <i className="fa-solid fa-users "></i>
                          <span>{carObject[item?.carId]?.pax} Seats</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className={styles.bottom}>
                    <img
                      src={`${env.apiDomain}${carObject[item?.carId]?.image
                        }`}
                      alt="car2"
                    />
                  </div>
                  {/* <i class="fa-solid fa-gauge-high"></i> */}
                </div>
              </div>
              {/* <div className={styles.line}></div> */}
            </div>
          );
        })}
    </>
  );
};

export default CardItem;
