import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
const PickDropPointNames = (props) => {
  const { pickUpPoints, dropPoints, title, date } = props;
  const [finalDate, setFinalDate] = useState("");

  const replaceDateTime = (e) => {
    let datee = date.split(" ")[0].replace(/-/g, "/");
    let time = date.split(" ")[1];
    let day = datee.split("/")[2];
    let month = datee.split("/")[1];
    let year = datee.split("/")[0];
    setFinalDate(`${day}/${month}/${year} ${time}`);
  };
  useEffect(() => {
    replaceDateTime();
  }, []);

  return (
    <div className={styles.quotation_details}>
      <h3 className={styles.quotation_details_title}>{title}</h3>
      <div className={styles.quotation_details_location_names}>
        <div className={`${styles.puck_up_column} ${styles.column}`}>
          <h5>
            <i className="fa-solid fa-location-dot"></i>
            &nbsp;
            <span>Pickup Point</span>
          </h5>
          <ul>
            {/* <li>London Heathrow Airport, Terminal 5</li> */}

            {pickUpPoints.map((item, index) => {
              return <li key={index}>{item.address}</li>;
            })}
          </ul>
        </div>
        <div className={`${styles.drop_off_column} ${styles.column}`}>
          <h5>
            <i className="fa-solid fa-location-dot"></i>
            &nbsp;
            <span> Dropoff Point</span>
          </h5>
          <ul>
            {/* <li>London Heathrow Airport, Terminal 3</li> */}
            {dropPoints.map((item, index) => {
              return <li key={index}>{item.address}</li>;
            })}
          </ul>
        </div>
        <div className={`${styles.date_column} ${styles.column}`}>
          <h5>
            <i className="fa-solid fa-calendar-days"></i>
            &nbsp;
            <span> Pickup Date & Time</span>
          </h5>
          <li className={styles.date}>{finalDate}</li>
        </div>
        {/* */}
      </div>
    </div>
  );
};

export default PickDropPointNames;
