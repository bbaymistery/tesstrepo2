import React from "react";
import styles from "./styles.module.scss";
const PickUpPointsInvoices = ({ pickUps }) => {
  return (
    <div className={styles.details}>
      <div className={styles.details_headerr_li}>
        <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
        <p>Pick-up Location :</p>
      </div>
      {pickUps?.map((point, i) => {
        return (
          <div className={styles.details_bottom_container} key={i}>
            <div className={styles.details_bottom}>
              <i className="fa-solid fa-check"></i>
              <span className={styles.desc}>{point.address}</span>
            </div>
            {/*  //! for flight  */}
            {point?.flightDetails?.flightNumber && (
              <div className={styles.details_bottom_description}>
                <i className="fa-solid fa-circle-dot"></i>
                <div className={styles.bottom_main_desc}>
                  <span>Fligth Number:</span>&nbsp;
                  <span>{point?.flightDetails?.flightNumber}</span>
                </div>
              </div>
            )}
            {point?.flightDetails?.waitingPickupTime > 0 && (
              <div className={styles.details_bottom_description}>
                <i className="fa-solid fa-circle-dot"></i>
                <div className={styles.bottom_main_desc}>
                  <span>Waiting Pickup Time:</span>&nbsp;
                  <span>{point?.flightDetails?.waitingPickupTime}</span>
                </div>
              </div>
            )}
            {/* // ! for postcodes */}
            {point?.postCodeDetails?.postCodeAddress && (
              <div className={styles.details_bottom_description}>
                <i className="fa-solid fa-circle-dot"></i>
                <div className={styles.bottom_main_desc}>
                  <span>Postcode Address:</span>&nbsp;
                  <span>{point?.postCodeDetails?.postCodeAddress}</span>
                </div>
              </div>
            )}

            {/* //!for cruise  */}
            {point?.cruiseNumber && (
              <div className={styles.details_bottom_description}>
                <i className="fa-solid fa-circle-dot"></i>
                <div className={styles.bottom_main_desc}>
                  <span>Cruise Name:</span>&nbsp;
                  <span>{point?.cruiseNumber}</span>
                </div>
              </div>
            )}

            {/* //!for train */}
            {point?.trainNumber && (
              <div className={styles.details_bottom_description}>
                <i className="fa-solid fa-circle-dot"></i>
                <div className={styles.bottom_main_desc}>
                  <span>Train Number:</span> &nbsp;
                  <span>{point?.trainNumber}</span>
                </div>
              </div>
            )}
            {/* //!for hotel  */}
            {point?.roomNumber && (
              <div className={styles.details_bottom_description}>
                <i className="fa-solid fa-circle-dot"></i>
                <div className={styles.bottom_main_desc}>
                  <span>Address Description:</span>&nbsp;
                  <span>{point?.roomNumber}</span>
                </div>
              </div>
            )}

            {/* //! cities*/}

            {point?.pcatId === 8 && point?.["address-description"] && (
              <div className={styles.details_bottom_description}>
                <i className="fa-solid fa-circle-dot"></i>
                <div className={styles.bottom_main_desc}>
                  <span>Cities:</span>&nbsp;
                  <span>{point?.["address-description"]}</span>
                </div>
              </div>
            )}

            {/* UNIVERSITIES */}
            {point?.pcatId === 9 && point?.["address-description"] && (
              <div className={styles.details_bottom_description}>
                <i className="fa-solid fa-circle-dot"></i>
                <div className={styles.bottom_main_desc}>
                  <span>Universities And Colleges:</span>{" "}
                  <span>{point?.["address-description"]}</span>
                </div>
              </div>
            )}

            {/* OTHERRRRRRR */}
            {point?.pcatId === 10 && point?.["address-description"] && (
              <div className={styles.details_bottom_description}>
                <i className="fa-solid fa-circle-dot"></i>
                <div className={styles.bottom_main_desc}>
                  <span>Description:</span>{" "}
                  <span>{point?.["address-description"]}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PickUpPointsInvoices;
