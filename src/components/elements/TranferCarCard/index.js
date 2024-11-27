import React from "react";
import styles from "./styles.module.scss";
const TransferCarCard = (props) => {
  const { carObject, quotation, flexBasis, paymentPage,env } = props;

  return (
    <div
      className={`
      ${styles.small_car_content}
      ${flexBasis ? styles.flex_basis : ""}
      ${paymentPage ? styles.paymentPage : ""}
      `}
    >
      {carObject && (
        <div className={styles.mobile}>
          <div className={styles.top}>
            <div className={styles.top_left}>
              <p className={styles.top_left_car_name}>
                {carObject[quotation?.carId]?.transferType}
              </p>
              <p className={styles.top_left_car_type}>
                {carObject[quotation?.carId]?.name}
              </p>

              <div className={styles.top_left_price_div}>
                <p className={styles.top_left_price_div_per}>per</p>
                <p className={styles.top_left_price_div_price}>
                  £{quotation?.price}
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
                  <span>
                    {carObject[quotation?.carId]?.suitcases}
                    <span>{` Bags`}</span>
                  </span>
                </li>
                <li>
                  <i className="fa-solid fa-users "></i>
                  <span>
                    {carObject[quotation?.carId]?.pax}
                    <span>{` Seats`}</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.bottom}>
            <img
              src={`${env.apiDomain}${carObject[quotation?.carId]?.image
                }`}
              alt="car"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TransferCarCard;
