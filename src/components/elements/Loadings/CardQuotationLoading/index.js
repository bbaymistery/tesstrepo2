import React from "react";
import styles from "./styles.module.scss";

const CardQuotationLoading = ({ className }) => {
  return (
    <div className={`${styles.loading} ${className ? className : ""}`}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  );
};

export default CardQuotationLoading;
