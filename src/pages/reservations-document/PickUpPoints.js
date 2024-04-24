import React from "react";
import { useSelector } from "react-redux";
import pointsStyle from "./pointsStyle.module.scss";
const PickUpPoints = ({ selectedPickupPoints, direction, language }) => {
  const { appData } = useSelector(state => state.initialReducer)

  return (
    <div className={pointsStyle.details}>
      {selectedPickupPoints?.map((point, i) => {

        return (
          <div className={pointsStyle.details_bottom_container} key={i}>
            <div className={`${pointsStyle.details_header_div}`} direction={String(direction === 'rtl')}>
              <p className={pointsStyle.left}>{appData?.words["strFrom2"]} </p>
              <p className={`${pointsStyle.point_adress} ${pointsStyle.right}`}>{language === 'en' ? point.address : point.translatedAddress}</p>
            </div>
            {/*  //! for flight  */}
            {point?.flightDetails?.flightNumber && (
              <div className={pointsStyle.details_bottom_description} direction={String(direction === 'rtl')}>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>{appData?.words["strFlightNumberTitle"]}</span>
                  <span>{point?.flightDetails?.flightNumber}</span>
                </div>
              </div>
            )}
            {/* check language_words */}

            {point?.flightDetails?.waitingPickupTime >= 0 && (
              <div className={pointsStyle.details_bottom_description} direction={String(direction === 'rtl')}>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>{appData?.words["strRequestedPickupTime"]}:</span>
                  <span>{point?.flightDetails?.waitingPickupTime}</span>
                </div>
              </div>
            )}
            {/* // ! for postcodes */}
            {point?.postCodeDetails?.postCodeAddress && (
              <div className={pointsStyle.details_bottom_description} direction={String(direction === 'rtl')}>
                <div className={`${pointsStyle.bottom_main_desc} ${pointsStyle.postcodes}`}>
                  <span>{appData?.words["strPostCodeAddress"]}</span>{" "}
                  <br />
                  <span>{point?.postCodeDetails?.postCodeAddress}</span>
                </div>
              </div>
            )}

            {/* //!for cruise  */}
            {point?.cruiseNumber && (
              <div className={pointsStyle.details_bottom_description} direction={String(direction === 'rtl')}>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>{appData?.words["strCruiseNameTitle"]}</span> <span>{point?.cruiseNumber}</span>
                </div>
              </div>
            )}

            {/* check language_words */}
            {/* //!for train */}
            {point?.trainNumber && (
              <div className={pointsStyle.details_bottom_description} direction={String(direction === 'rtl')}>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>{appData?.words["strTrainNumber"]}:</span> <span>{point?.trainNumber}</span>
                </div>
              </div>
            )}
            {/* //!for hotel  */}
            {point?.roomNumber && (
              <div className={pointsStyle.details_bottom_description} direction={String(direction === 'rtl')}>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>{appData?.words["strRoomNumberTitle"]}</span> <span>{point?.roomNumber}</span>
                </div>
              </div>
            )}
            {/* //!place of interest */}
            {point?.pcatId === 7 && point?.["address-description"] && (
              <div className={pointsStyle.details_bottom_description} direction={String(direction === 'rtl')}>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>{appData?.words["strPlacesofInterest"]}:</span>{" "}
                  <span>{point?.["address-description"]}</span>
                </div>
              </div>
            )}
            {/* //! cities*/}
            {/* check language_words */}

            {point?.pcatId === 8 && point?.["address-description"] && (
              <div className={pointsStyle.details_bottom_description} direction={String(direction === 'rtl')}>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>{appData?.words["strCities"]}:</span>{" "}
                  <span>{point?.["address-description"]}</span>
                </div>
              </div>
            )}
            {/* check language_words */}

            {/* UNIVERSITIES */}
            {point?.pcatId === 9 && point?.["address-description"] && (
              <div className={pointsStyle.details_bottom_description} direction={String(direction === 'rtl')}>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>{appData?.words["strUniversitiesAndColleges"]}:</span>{" "}
                  <span>{point?.["address-description"]}</span>
                </div>
              </div>
            )}
            {/* check language_words */}

            {/* OTHERRRRRRR */}
            {point?.pcatId === 10 && point?.["address-description"] && (
              <div className={pointsStyle.details_bottom_description} direction={String(direction === 'rtl')}>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>{appData?.words["strAddress"]}:</span>{" "}
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
