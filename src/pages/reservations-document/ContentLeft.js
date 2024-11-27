import React from "react";
import styles from "./styles.module.scss";
const ContentLeft = () => {
  return (
    <div className={styles.reserv_content_left}>
      <div className={`${styles.left_break} ${styles.left_break_1}`}>
        <p className={styles.break_to_whom}>Registered Office</p>
        <p className={`${styles.break_explanation_email} ${styles.break_explanation}`} >
        London Heathrow Taxi Ltd :
        Orega Offices, 4 Longwalk Road, Uxbridge, United Kingdom, UB11 1FE
        </p>
      </div>

      <div className={styles.left_break}>
        <p className={styles.break_to_whom}>Contact Us</p>
        <div className={` ${styles.break_explanation_email} ${styles.break_explanation}`} >
        <span style={{paddingRight:"3px"}}><i className="fa-solid fa-phone"></i></span>   +442038873844 <br />
        <span style={{paddingRight:"5px"}}><i className="fa-brands fa-whatsapp"></i> </span>   +447387901028<br />
          info@london-heathrow.taxi
        </div>
      </div>
      <div className={styles.left_break}>
      </div>
    </div>
  );
};

export default ContentLeft;
