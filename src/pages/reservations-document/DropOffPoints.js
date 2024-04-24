import React from "react";
import { useSelector } from "react-redux";
import pointsStyle from "./pointsStyle.module.scss";
const DropOffPoints = ({ selectedDropoffPoints, direction, language }) => {
  const { appData } = useSelector(state => state.initialReducer)

  return (
    <div className={pointsStyle.details}>
      {selectedDropoffPoints?.map((point, i) => {
        return (
          <div className={pointsStyle.details_bottom_container} key={i}>

            <div className={pointsStyle.details_header_div} direction={String(direction === 'rtl')}>
              <p className={pointsStyle.left}>{appData?.words["strTo"]} </p>
              <p className={`${pointsStyle.point_adress} ${pointsStyle.right}`}>{language === 'en' ? point.address : point.translatedAddress}</p>

            </div>
            {/*  //! for flight  */}
            {point?.flightDetails?.flightNumber && (
              <div className={pointsStyle.details_bottom_description} direction={String(direction === 'rtl')}>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>{appData?.words["strFlightNumberTitle"]}</span>{" "}
                  <span>{point?.flightDetails?.flightNumber}</span>
                </div>
              </div>
            )}
            {point?.postCodeDetails?.postCodeAddress && (
              <div className={pointsStyle.details_bottom_description} direction={String(direction === 'rtl')}>
                <div className={`${pointsStyle.bottom_main_desc} ${pointsStyle.postcodes}`}>
                  <span>{appData?.words["strPostCodeAddress"]}</span>{" "}
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
            {point?.pcatId === 8 && point?.["address-description"] && (
              <div className={pointsStyle.details_bottom_description} direction={String(direction === 'rtl')}>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>{appData?.words["strCities"]}:</span>{" "}
                  <span>{point?.["address-description"]}</span>
                </div>
              </div>
            )}
            {/* UNIVERSITIES */}
            {point?.pcatId === 9 && point?.["address-description"] && (
              <div className={pointsStyle.details_bottom_description} direction={String(direction === 'rtl')}>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>{appData?.words["strUniversitiesAndColleges"]}:</span>{" "}
                  <span>{point?.["address-description"]}</span>
                </div>
              </div>
            )}

            {/* OTHERRRRRRR */}
            {point?.pcatId === 10 && point?.["address-description"] && (
              <div className={styles.details_bottom_description} direction={String(direction === 'rtl')}>
                <div className={styles.bottom_main_desc}>
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

export default DropOffPoints;
