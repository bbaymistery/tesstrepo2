import React from "react";
import { useSelector } from "react-redux";
import pointsStyle from "./pointsStyle.module.scss";
const DropOffPoints = ({ selectedDropoffPoints, direction, language  }) => {
  const { appData } = useSelector(state => state.initialReducer)

  return (
    <div className={pointsStyle.details}>
      {selectedDropoffPoints?.map((point, i) => {
        return (
          <div className={pointsStyle.details_bottom_container} key={i}>
            <p className={pointsStyle.point_adress} direction={String(direction === 'rtl')}>{i + 1}. {language === 'en' ? point.address : point.translatedAddress}</p>
            {/*  //! for flight  */}
            {point?.flightDetails?.flightNumber && (
              <div className={pointsStyle.details_bottom_description}  direction={String(direction==='rtl')}>
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>{appData?.words["strFlightNumberTitle"]}</span>{" "}
                  <span>{point?.flightDetails?.flightNumber}</span>
                </div>
              </div>
            )}
            {point?.postCodeDetails?.postCodeAddress && (
              <div className={pointsStyle.details_bottom_description}  direction={String(direction==='rtl')}>
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>{appData?.words["strPostCodeAddress"]}</span>{" "}
                  <span>{point?.postCodeDetails?.postCodeAddress}</span>
                </div>
              </div>
            )}

            {/* //!for cruise  */}

            {point?.cruiseNumber && (
              <div className={pointsStyle.details_bottom_description}  direction={String(direction==='rtl')}>
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>{appData?.words["strCruiseNameTitle"]}</span> <span>{point?.cruiseNumber}</span>
                </div>
              </div>
            )}

            {/* //!for train */}
            {point?.trainNumber && (
              <div className={pointsStyle.details_bottom_description}  direction={String(direction==='rtl')}>
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Train Number:</span> <span>{point?.trainNumber}</span>
                </div>
              </div>
            )}

            {/* //!for hotel  */}
            {point?.roomNumber && (
              <div className={pointsStyle.details_bottom_description}  direction={String(direction==='rtl')}>
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>{appData?.words["strRoomNumberTitle"]}</span> <span>{point?.roomNumber}</span>
                </div>
              </div>
            )}

            {/* //!place of interest */}
            {point?.pcatId === 7 && point?.["address-description"] && (
              <div className={pointsStyle.details_bottom_description}  direction={String(direction==='rtl')}>
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Places of Interest:</span>{" "}
                  <span>{point?.["address-description"]}</span>
                </div>
              </div>
            )}

            {/* //! cities*/}
            {point?.pcatId === 8 && point?.["address-description"] && (
              <div className={pointsStyle.details_bottom_description}  direction={String(direction==='rtl')}>
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Cities:</span>{" "}
                  <span>{point?.["address-description"]}</span>
                </div>
              </div>
            )}
            {/* UNIVERSITIES */}
            {point?.pcatId === 9 && point?.["address-description"] && (
              <div className={pointsStyle.details_bottom_description}  direction={String(direction==='rtl')}>
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Universities And Colleges:</span>{" "}
                  <span>{point?.["address-description"]}</span>
                </div>
              </div>
            )}

            {/* OTHERRRRRRR */}
            {point?.pcatId === 10 && point?.["address-description"] && (
              <div className={pointsStyle.details_bottom_description}>
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

export default DropOffPoints;
