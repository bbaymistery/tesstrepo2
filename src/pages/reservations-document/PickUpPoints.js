import React from "react";
import pointsStyle from "./pointsStyle.module.scss";
const PickUpPoints = ({ selectedPickupPoints }) => {
  
  return (
    <div className={pointsStyle.details}>
      {selectedPickupPoints?.map((point, i) => {
                    const addressText = point.address.includes(point.postcode) ? `${point.address}` : `${point.address} ${point.postcode}`
        
        return (
          <div className={pointsStyle.details_bottom_container} key={i}>
            <div className={`${pointsStyle.details_header_div}`}>
              <p className={pointsStyle.left}>From </p>
              <p className={`${pointsStyle.point_adress} ${pointsStyle.right}`}>{addressText}</p>
            </div>
            {/*  //! for flight  */}
            {point?.flightDetails?.flightNumber && (
              <div className={pointsStyle.details_bottom_description} >
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Flight No.</span>
                  <span>{point?.flightDetails?.flightNumber}</span>
                </div>
              </div>
            )}
            {/* check language_words */}

            {point?.flightDetails?.waitingPickupTime >= 0 && (
              <div className={pointsStyle.details_bottom_description} >
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Requested Pickup Time:</span>
                  <span>{point?.flightDetails?.waitingPickupTime}</span>
                </div>
              </div>
            )}
            {/* // ! for postcodes */}
            {point?.postCodeDetails?.postCodeAddress && (
              <div className={pointsStyle.details_bottom_description} >
                <div className={`${pointsStyle.bottom_main_desc} ${pointsStyle.postcodes}`}>
                  <span>Postcode Address</span>{" "}
                  <br />
                  <span>{point?.postCodeDetails?.postCodeAddress}</span>
                </div>
              </div>
            )}

            {/* //!for cruise  */}
            {point?.cruiseNumber && (
              <div className={pointsStyle.details_bottom_description} >
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Cruise Name</span> <span>{point?.cruiseNumber}</span>
                </div>
              </div>
            )}

            {/* check language_words */}
            {/* //!for train */}
            {point?.trainNumber && (
              <div className={pointsStyle.details_bottom_description} >
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Train Number:</span> <span>{point?.trainNumber}</span>
                </div>
              </div>
            )}
            {/* //!for hotel  */}
            {point?.roomNumber && (
              <div className={pointsStyle.details_bottom_description} >
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Room Number:</span> <span>{point?.roomNumber}</span>
                </div>
              </div>
            )}

            {/* //! cities*/}
            {/* check language_words */}

            {point?.pcatId === 8 && point?.["address-description"] && (
              <div className={pointsStyle.details_bottom_description} >
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Cities:</span>{" "}
                  <span>{point?.["address-description"]}</span>
                </div>
              </div>
            )}
            {/* check language_words */}

            {/* UNIVERSITIES */}
            {point?.pcatId === 9 && point?.["address-description"] && (
              <div className={pointsStyle.details_bottom_description} >
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Universities And Colleges:</span>{" "}
                  <span>{point?.["address-description"]}</span>
                </div>
              </div>
            )}
            {/* check language_words */}

            {/* OTHERRRRRRR */}
            {point?.pcatId === 10 && point?.["address-description"] && (
              <div className={pointsStyle.details_bottom_description} >
                <div className={pointsStyle.bottom_main_desc}>
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

export default PickUpPoints;
