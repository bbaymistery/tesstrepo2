import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

const HappyCustomer = (props) => {
  const { aboutPage } = props;
  // Return your component with the bgHolderStyle applied
  return (
    <div className={styles.bg_holder} >
      <div className={styles.bg_parallax}></div>
      <div className={styles.bg_content}>
        <div className={`container ${styles.bg_container}`}>
          <div className={`gap_big text_center ${styles.bg_box} ${aboutPage && styles.about_bg_box}`}  >
            {!aboutPage ? (<h2 className={styles.bg_box_title}>Happy Customer</h2>) : <></>}
            {!aboutPage ? (
              <div className={styles.image_div}>
                <a href="https://www.reviews.co.uk/company-reviews/store/london-heathrow-taxi?utm_source=london-heathrow-taxi&utm_medium=widget&utm_campaign=badge" target="_blank">
                  <Image width={495} height={118} className={styles.hover_img} src="/images/reviewsImage.webp" alt="Reveiws London Heathrow Taxi" priority />
                </a>
              </div>
            ) : <></>}
            {aboutPage ? (
              <div>
                <h3 className={styles.about_title}>
                  Our offices are located as follows:
                </h3>

                <div className={styles.about_adresses}>
                  <span>
                    <strong>London Heathrow 
                    &nbsp;Taxi Ltd</strong>
                    <br />
                  </span>
                  <span>
                  Orega Offices
                    <br />
                  </span>
                  <span>
                  4 Longwalk Road,
                    <br />
                  </span>
                  <span>
                  Uxbridge,
                    <br />
                  </span>
                  <span>
                  United Kingdom, 
                    <br />
                  </span>
                  <span>UB11 1FE</span>
                </div>
                <p className={styles.about_adress_bottom}>
                  <span>
                    <span>
                      <span>
                        Find out more about travelling with Heathrow Car
                        Service, including Business Class fares and quotes for
                        destinations outside Central London. Contact us on 020
                        3887 3844&nbsp;(+44 (0)
                      </span>
                      <span>20 3887 3844</span>
                      <span>&nbsp;if calling from outside the UK).</span>
                    </span>
                  </span>
                </p>
              </div>
            ) : <></>}
          </div>
        </div>
      </div>

    </div>


  );
};


export default HappyCustomer;