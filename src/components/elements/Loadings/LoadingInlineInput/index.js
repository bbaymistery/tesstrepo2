import React from "react";
import styles from "./styles.module.scss";
const LoadingInlineInput = ({ className, style = {} }) => {
  return (
    <div style={{ ...style }} className={`${styles.loading} ${className ? className : ""}`}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  );
};

export default LoadingInlineInput;
