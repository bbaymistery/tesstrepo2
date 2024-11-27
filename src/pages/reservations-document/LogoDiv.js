import React from "react";
import styles from "./styles.module.scss";
const LogoDiv = () => {
  return (
    <div className={styles.logo_div}>
      <div className={styles.text}>
        <h1 >Confirmation</h1>

      </div>
      <div className={styles.content}>
        <div className={styles.img_div}>
          <img src="/images/londonTaxi.jpeg" alt="logo image" />
        </div>
        <div className={styles.text}>
          <h1>LONDON - HEATHROW TAXI</h1>
          <p>24/7 Dedicated Customer Support</p>{" "}
        </div>
      </div>
    </div>
  );
};

export default LogoDiv;
