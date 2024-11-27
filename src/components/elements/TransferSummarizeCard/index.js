import React from "react";
import styles from "./styles.module.scss";
const TransferSummarizeCard = (props) => {
  const { showPrice, date, pickPoints, dropPoints, journeyType, totalPrice } =
    props;

  return (
    <div className={styles.booking_summary}>
      <ul
        className={`${styles.booking_summary_list} ${journeyType === 0 ? "pb_0" : ""
          }`}
      >
        <li className={`${styles.booking_summary_list_item}`}>

          <div >
            <div id="from to" className={styles.fromto}    >
              <h5>FROM:</h5>
              {pickPoints.map((pickup, i) => { return <li key={pickup.address}>{pickup.address}</li> })}
              <div className={styles.space}> </div>
              <h5>TO:</h5>
              {dropPoints.map((dropoff, i) => { return <li key={dropoff.addres}>{dropoff.address}</li> })}
              <div className={styles.space}> </div>
              <h5>ON:</h5>
              <li>
                {`${date
                  .split(" ")[0]
                  .replace(/(\d+)\-(\d+)-(\d+)/, "$3-$2-$1")} / ${date?.split(" ")[1]
                  }`}
              </li>
            </div>
          </div>
        </li>
      </ul>
      {showPrice && journeyType === 1 ? (
        <ul className={` ${styles.booking_summary_list_two}`}>
          <li className={styles.booking_summary_list_item}>
            <h5>
              TOTAL JOURNEY PRICE: <span>£{totalPrice}</span>
            </h5>
          </li>
        </ul>
      ) : (
        ""
      )}

      {!showPrice && journeyType === 0 ? (
        <ul
          className={`pt_0  ${styles.booking_summary_list} ${styles.booking_summary_list_two}`}
        >
          <li className={styles.booking_summary_list_item}>
            <h5>
              TOTAL PRICE: <span>£{totalPrice}</span>
            </h5>
          </li>
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default TransferSummarizeCard;
