import React from "react";
import styles from "./styles.module.scss";
const ContentLeft = () => {
  return (
    <div className={styles.form_content_left}>
      <p className={styles.form_content_left_title}>Contact Info</p>
      <div className={styles.icon_div}>
        <i className="fa-solid fa-phone"></i>
        <h5>Phone</h5>
        <p>+44 (0)20 3887 3844</p>
      </div>
      <div className={styles.icon_div}>
        <i className="fa-solid fa-print"></i>
        <h5>Fax</h5>
        <p>+44 (0) 208 683 0884</p>
      </div>
      <div className={styles.icon_div}>
        <i className="fa-solid fa-envelope"></i>
        <h5>Email</h5>
        <p>info@london-heathrow.taxi</p>
      </div>
      <div className={styles.icon_div}>
        <i className="fa-solid fa-location-dot"></i>
        <h5>Address </h5>
        <p>
        London Heathrow Taxi Ltd
        Orega Offices, 4 Longwalk Road,
          <br />
          Uxbridge, United Kingdom, UB11 1FE
        </p>
      </div>
    </div>
  );
};

export default ContentLeft;
