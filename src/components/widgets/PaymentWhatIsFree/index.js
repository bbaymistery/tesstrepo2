import React from "react";
import styles from "./styles.module.scss";
const PaymentWhatIsFree = (props) => {
  const { twoColumns, oneColumn, noTitle = false } = props;
  return (
    <div className={styles.whatis_included}>
      {oneColumn && (
        <div className={styles.card_center}>
          {noTitle ? "" : <h3>We give you the following for free</h3>}
          <ul>
            <li>
              <i className="fa-solid fa-circle-check"></i>
              Flight Tracking
            </li>
            <li>
              <i className="fa-solid fa-circle-check"></i>Free Waiting Time
            </li>
            <li>
              <i className="fa-solid fa-circle-check"></i>Free meet and greet
            </li>
            <li>
              <i className="fa-solid fa-circle-check"></i>No charge for flight
              delays
            </li>
          </ul>
        </div>
      )}
      {twoColumns && (
        <div className={styles.card_center2}>
          {noTitle ? "" : <h3>We give you the following for free</h3>}
          <ul className={styles.twoColumn}>
            <div className={styles.first_column}>
              <li>
                <i className="fa-solid fa-circle-check"></i>
                Flight Tracking
              </li>
              <li>
                <i className="fa-solid fa-circle-check"></i>Free Waiting Time
              </li>
            </div>

            <div className={styles.second_column}>
              <li>
                <i className="fa-solid fa-circle-check"></i>Free meet and greet
              </li>
              <li>
                <i className="fa-solid fa-circle-check"></i>No charge for flight
                delays
              </li>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PaymentWhatIsFree;
