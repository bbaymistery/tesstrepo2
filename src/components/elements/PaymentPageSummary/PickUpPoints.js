import React from "react";
import pointsStyle from "./pointsStyle.module.scss";
const PickUpPoints = ({ selectedPickupPoints, }) => {
  return (
    <div className={pointsStyle.details}>
      {selectedPickupPoints?.map((point, i) => {
                const addressText = point.address.includes(point.postcode) ? `${point.address}` : `${point.address} ${point.postcode}`
        
        return (
          <div className={pointsStyle.details_bottom_container} key={i}>
            <p className={pointsStyle.point_adress} >{i + 1}.{addressText}</p>
            {/*  //! for flight  */}
            {point?.flightDetails?.flightNumber && (
              
              <div className={pointsStyle.details_bottom_description} >
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Flight No.</span>
                  <span>{point?.flightDetails?.flightNumber}</span>
                </div>
              </div>
            )}

            {/* check language_words */}
            {point?.flightDetails?.waitingPickupTime >= 0 && (
              <div className={pointsStyle.details_bottom_description} >
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Driver Meeting Time:</span>
                  <span className={pointsStyle.flight_has_landed}>{`${point?.flightDetails?.waitingPickupTime} mins after flight  has landed `}</span>
                </div>
              </div>
            )}
            {/* // ! for postcodes */}
            {point?.postCodeDetails?.postCodeAddress && (
              <div className={pointsStyle.details_bottom_description} >
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>postcode address</span>
                  <span>{point?.postCodeDetails?.postCodeAddress}</span>
                </div>
              </div>
            )}

            {/* //!for cruise  */}
            {point?.cruiseNumber && (
              <div className={pointsStyle.details_bottom_description} >
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>cruise name</span>
                   <span>{point?.cruiseNumber}</span>
                </div>
              </div>
            )}
            {/* check language_words */}
            {/* //!for train */}
            {point?.trainNumber && (
              <div className={pointsStyle.details_bottom_description} >
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Train Number:</span> <span>{point?.trainNumber}</span>
                </div>
              </div>
            )}
            {/* //!for hotel  */}
            {point?.roomNumber && (
              <div className={pointsStyle.details_bottom_description} >
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>room number</span> <span>{point?.roomNumber}</span>
                </div>
              </div>
            )}

            {/* //! cities*/}
            {/* is it gonna be description or cities? */}
            {/* check language_words */}
            {point?.pcatId === 8 && point?.["address-description"] && (
              <div className={pointsStyle.details_bottom_description} >
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Cities:</span>{" "}
                  <span>{point?.["address-description"]}</span>
                </div>
              </div>
            )}

            {/* UNIVERSITIES */}
            {/* check language_words */}
            {point?.pcatId === 9 && point?.["address-description"] && (
              <div className={pointsStyle.details_bottom_description} >
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Universities And Colleges:</span>{" "}
                  <span>{point?.["address-description"]}</span>
                </div>
              </div>
            )}

            {/* OTHERRRRRRR */}
            {/* check language_words */}
            {point?.pcatId === 10 && point?.["address-description"] && (
              <div className={pointsStyle.details_bottom_description} >
                <i className="fa-solid fa-circle-dot"></i>
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
