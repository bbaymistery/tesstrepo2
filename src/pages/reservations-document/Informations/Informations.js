import React from "react";
import { useSelector } from "react-redux";
import { selectPickUpDropOffReducer } from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import styles from "./styles.module.scss";
import PickUpPoints from "../../../components/elements/PickUpPointsInvoices";
import DropOffPoints from "../../../components/elements/DroppPointsInvoices";
const Informations = ({
  date,
  quot,
  pickUps,
  drops,
  fullName,
  email,
  passengers,
  phone,
  note,
  paymentType,
  hidePassengers,
  title,
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
    <div
      className={`${styles.details_header} ${
        hidePassengers && styles.booking_header
      }`}
    >
      {carObject && (
        <div className={styles.header_card}>
          <div className={styles.card_top}>
            {!hidePassengers && (
              <div className={styles.card_info}>
                <p className={styles.right_title}>{title}</p>
                <div className={styles.info}>
                  <ul>
                    <li>
                      <div className={styles.details}>
                        <div className={styles.details_headerr_li}>
                          <i className="fas fa-user" aria-hidden="true"></i>
                          <div className={styles.li_info}>
                            <p className={styles.property}>Full Name:</p>
                            <p className={styles.value}>{fullName}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={styles.details}>
                        <div className={styles.details_headerr_li}>
                          <i className="fas fa-phone" aria-hidden="true"></i>
                          <div className={styles.li_info}>
                            <p className={styles.property}>Phone Number:</p>
                            <p className={styles.value}>+{phone}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={styles.details}>
                        <div className={styles.details_headerr_li}>
                          <i className="fas fa-at" aria-hidden="true"></i>
                          <div className={styles.li_info}>
                            <p className={styles.property}>Email Adress:</p>
                            <p className={styles.value}>{email}</p>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className={styles.details}>
                        <div className={styles.details_headerr_li}>
                          <i className="fas fa-users" aria-hidden="true"></i>
                          <div className={styles.li_info}>
                            <p className={styles.property}>Passengers:</p>
                            <p className={styles.value}>{passengers}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            <div className={styles.card_right}>
              <p className={styles.right_title}>TransferDetails</p>
              <div className={styles.info}>
                <ul>
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
                              .replace(/(\d+)\-(\d+)-(\d+)/, "$3-$2-$1")}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className={`${styles.details} ${styles.details_flex}`}>
                      <div className={styles.details_headerr_li}>
                        <i className="fas fa-clock" aria-hidden="true"></i>
                        <p>Landing Time</p>:
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
                  {note && (
                    <li>
                      <div
                        className={`${styles.details} ${styles.details_flex}`}
                      >
                        <div className={styles.details_headerr_li}>
                          <i className="fa-solid fa-comment"></i>
                          <p>Note </p>:
                        </div>

                        <div className={styles.details_bottom_container}>
                          <div className={styles.details_bottom}>
                            <span className={styles.desc}>{note}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  )}
                  {quot && (
                    <li>
                      <div
                        className={`${styles.details} ${styles.details_flex}`}
                      >
                        <div className={styles.details_headerr_li}>
                          <i className="fa-solid fa-car"></i>
                          <p>Vehicle Type :</p>
                        </div>

                        <div className={styles.details_bottom_container}>
                          <div className={styles.details_bottom}>
                            <span className={styles.desc}>
                              {quot && carObject[quot?.carId]?.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  )}
                  {quot && (
                    <li>
                      <div
                        className={`${styles.details} ${styles.details_flex}`}
                      >
                        <div className={styles.details_headerr_li}>
                          <i className="fa-solid fa-hurricane"></i>
                          <p>Transfer Type :</p>
                        </div>

                        <div className={styles.details_bottom_container}>
                          <div className={styles.details_bottom}>
                            <span className={styles.desc}>
                              {carObject[quot?.carId]?.transferType}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  )}
                  {quot && (
                    <li>
                      <div
                        className={`${styles.details} ${styles.details_flex}`}
                      >
                        <div className={styles.details_headerr_li}>
                          <i className="fa-solid fa-money-check"></i>
                          <p>Price :</p>
                        </div>

                        <div className={styles.details_bottom_container}>
                          <div className={styles.details_bottom}>
                            <span className={styles.desc}>£ {quot.price}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  )}

                  {quot && (
                    <li>
                      <div
                        className={`${styles.details} ${styles.details_flex}`}
                      >
                        <div className={styles.details_headerr_li}>
                          <i className="fa-solid fa-hand-holding-dollar"></i>
                          <p>Payment Method:</p>
                        </div>

                        <div className={styles.details_bottom_container}>
                          <div className={styles.details_bottom}>
                            <span className={styles.desc}>
                              {paymentType === 1 && "Pay With Cash To The Driver"}
                              {paymentType === 2 && "Pay With Credit Card"}
                              {paymentType === 6 && "Pay With American Express"}
                              {paymentType === 7 && "Pay With Stripe"}
                              {paymentType === 5 && "Pay With Paypal"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Informations;
