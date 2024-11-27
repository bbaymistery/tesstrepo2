import React from "react";
import styles from "./styles.module.scss";
const PaymentTopCarSection = () => {
  return (
    <div className={styles.car_section}>
      <div className={styles.car_section_left}>
        <div className={styles.title_div}>
          <p className={styles.title_div_name}>Hundai Crate</p>
          <span className={styles.title_div_type}>Economy</span>
        </div>
        <div className={styles.img_div}>
          <img
            src="https://www.london-heathrow.taxi/web-apps/apl/img/cars/carType-22.png"
            alt="cars"
          />
        </div>
        <ul className={styles.icons}>
          <li className={styles.icon_div}>
            <i className="fa-solid fa-users"></i>
            <span>3</span>
            <span>seats</span>
          </li>
          <li className={styles.icon_div}>
            <i className="fa-solid fa-briefcase"></i>
            <span>2</span>
            <span>bags</span>
          </li>
        </ul>
      </div>
      <div className={styles.car_section_right}>
        <div style={{ display: "none" }} className={styles.title_div}>
          <p className={styles.title_div_name}>Hundai Crate</p>
          <span className={styles.title_div_type}>Economy</span>
        </div>

        <div className={styles.whatis_included}>
          <div className={styles.card_center}>
            <p className={styles.card_center_title}>Included in the price:</p>
            <ul>
              <div className={styles.left}>
                <li>
                  <i className="fa-solid fa-circle-check"></i>
                  Flight Tracking
                </li>
                <li>
                  <i className="fa-solid fa-circle-check"></i>Free Waiting Time
                </li>
              </div>

              <div className={styles.right}>
                <li>
                  <i className="fa-solid fa-circle-check"></i>Free meet and
                  greet
                </li>
                <li>
                  <i className="fa-solid fa-circle-check"></i>No charge for
                  flight delays
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTopCarSection;
