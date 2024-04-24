import React from "react";
import { carsItems } from "../../../constants/carss";
import styles from "./styles.module.scss";
import Image from 'next/image'
import { useSelector } from "react-redux";

const CarItem = ({ sliderRef }) => {
  const state = useSelector(state => state.pickUpDropOffActions)
  let { params: { direction } } = state
  const { appData } = useSelector(state => state.initialReducer)

  return (
    <div className={styles.owl_stage} ref={sliderRef}>
      {carsItems.map((car, i) => {
        return (
          <div className={styles.car_item} key={car.id}>
            <div className={styles.card_img_div}>


              <div className={styles.card_image_link} style={{ position: "relative", width: '300px' }} >
                <Image
                  src={car.carImage}
                  alt="Car Image"
                  width={300}
                  height={100}
                  style={{ objectFit: "contain", }}
                />
              </div>
            </div>
            <div className={styles.card_body}>
              <h2 className={`${direction} ${styles.card_body_title}`}>{car.carName}</h2>
              <br />
              <div className={styles.card_body_attributes}>

                <ul className={styles.card_atr_ul} direction={String(direction === 'rtl')}>
                  <li className={styles.card_atr_li}>
                    <i className={`fa-solid fa-users ${styles.li_icon}`}></i>
                    <span className={styles.li_desc}>
                      {`${appData?.words["strNoofPassengers"]} ${car.passenger}`}
                    </span>
                  </li>
                </ul>
                <ul className={styles.card_atr_ul} direction={String(direction === 'rtl')}>
                  <li className={styles.card_atr_li}>
                    <i className={`fa-solid fa-suitcase ${styles.li_icon}`}></i>
                    <span className={styles.li_desc}>
                      {`${appData?.words["strNoofSuitcases"]} ${car.suitcase}`}


                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CarItem;
