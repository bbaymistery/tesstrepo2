import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";

const HeaderOfResults = ({ distance, duration }) => {
  const { appData } = useSelector(state => state.initialReducer);

  // Check if distance exists, remove 'mile', and convert to km
  const distanceInMiles = distance ? parseFloat(distance.replace(' mile', '')) : null;
  const distanceInKm = distanceInMiles ? (distanceInMiles * 1.60934).toFixed(2) : null;

  return (
    <div className={` ${styles.quotation_header}`}>
      <ul>
        {distance ? (
          <li>
            <span><i className={`fa-solid fa-check ${styles.li_icon}`}></i></span>{" "}
            {appData?.words["strDistance"]} : <span>{distanceInMiles} {appData?.words["strMiles"]} ({distanceInKm} km)</span>
          </li>
        ) : (<> </>)}

        {duration ? (
          <li>
            <span><i className={`fa-solid fa-check ${styles.li_icon}`}></i></span>{" "}
            <span className={styles.left}>{appData?.words["strJourneyDurationTitle"]}</span> : <span>{duration}</span>
          </li>
        ) : (<> </>)}

        <li>
          <span><i className={`fa-solid fa-check ${styles.li_icon}`}></i></span>{" "}
          {appData?.words["strWeConstantlyMonitorAllFlights"] || "We constantly monitor all flights and do not charge for flight delays or cancellations."}
        </li>
        <li>
          <span><i className={`fa-solid fa-check ${styles.li_icon}`}></i></span>
          <span className={styles.strong}>{appData?.words["strAllInclusivePrices"]}</span> {appData?.words["strMeetandGreetIncludedForAirport"]}
        </li>
      </ul>
    </div>
  );
};

export default HeaderOfResults;
