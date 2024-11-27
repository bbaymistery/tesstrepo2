import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPickUpDropOffReducer } from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import DropOffPoints from "./DropOffPoints";
import PickUpPoints from "./PickUpPoints";
import styles from "./styles.module.scss";
const DetailsHeader = ({
  date,
  quot,
  pickUps,
  drops,
  fullName,
  email,
  passengers,
  phone,
  specialRequest,
}) => {
  const { appData } = useSelector(selectPickUpDropOffReducer);

  //bunu sadece imgni getirmek ucun yazdg Secilen cardn img si
  const carObject = appData?.carsTypes?.reduce(
    (obj, item) => ({
      ...obj,
      [item.id]: item,
    }),
    {}
  );

  return (
    <div className={styles.details_header}>
      {carObject && (
        <div className={styles.header_card}>
          <div className={styles.passenger_details}>
            <div className={styles.card_info}>
              <div className={styles.info}>
                <ul>
                  <li>
                    <div className={styles.details}>
                      <div className={styles.details_headerr_li}>
                        <div className={styles.li_info}>
                          <i className="fas fa-user" aria-hidden="true"></i>
                          <p className={styles.property}>Full Name</p>
                        </div>
                        <p className={styles.value}>:{fullName}</p>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className={styles.details}>
                      <div className={styles.details_headerr_li}>
                        <div className={styles.li_info}>
                          <i className="fas fa-users" aria-hidden="true"></i>
                          <p className={styles.property}>Passengers</p>
                        </div>
                        <p className={styles.value}>:{passengers}</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className={styles.details}>
                      <div className={styles.details_headerr_li}>
                        <div className={styles.li_info}>
                          <i className="fas fa-phone" aria-hidden="true"></i>
                          <p className={styles.property}>Phone Number</p>
                        </div>
                        <p className={styles.value}>:+{phone}</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className={styles.details}>
                      <div className={styles.details_headerr_li}>
                        <div className={styles.li_info}>
                          <i className="fas fa-at" aria-hidden="true"></i>
                          <p className={styles.property}>Email Address</p>
                        </div>
                        <p className={styles.value}>:{email}</p>
                      </div>
                    </div>
                  </li>

                  {specialRequest.length ? (
                    <li>
                      <div className={styles.details}>
                        <div className={styles.details_headerr_li}>
                          <div className={styles.li_info}>
                            <i className="fa-solid fa-comment"></i>
                            <p className={styles.property}>Notes</p>
                          </div>
                          <p className={styles.value}>:{specialRequest}</p>
                        </div>
                      </div>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>

            <div className={styles.card_right}>
              <div className={styles.info}>
                <ul>
                  <li className={styles.border_line}></li>
                  <li>
                    <PickUpPoints pickUps={pickUps} />
                  </li>
                  <li>
                    <DropOffPoints drops={drops} />
                  </li>
                  <li>
                    <div className={`${styles.details} ${styles.details_flex}`}>
                      <div className={styles.details_headerr_li}>
                        <i
                          className="fas fa-calendar-alt"
                          aria-hidden="true"
                        ></i>
                        <p>Landing Date :</p>
                      </div>
                      <div className={styles.details_bottom_container}>
                        <div className={styles.details_bottom}>
                          <span className={styles.desc}>
                            {`${date
                              .split(" ")[0]
                              .replace(/(\d+)\-(\d+)-(\d+)/, "$3-$2-$1")} `}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className={`${styles.details} ${styles.details_flex}`}>
                      <div className={styles.details_headerr_li}>
                        <i className="fas fa-clock" aria-hidden="true"></i>
                        <p>Landing Time :</p>
                      </div>

                      <div className={styles.details_bottom_container}>
                        <div className={styles.details_bottom}>
                          <span className={styles.desc}>
                            {date.split(" ")[1]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                  {/* <li>
                    <div className={styles.details}>
                      <div className={styles.details_headerr_li}>
                        <div className={styles.li_info}>
                          <i className="fas fa-calendar-alt"></i>
                          <p className={styles.property}>Landing Date</p>
                        </div>
                        <p className={styles.value}> :{date.split(" ")[0]}</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className={styles.details}>
                      <div className={styles.details_headerr_li}>
                        <div className={styles.li_info}>
                          <i className="fas fa-clock"></i>
                          <p className={styles.property}>Landing Time</p>
                        </div>
                        <p className={styles.value}> : {date.split(" ")[1]}</p>
                      </div>
                    </div>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsHeader;
