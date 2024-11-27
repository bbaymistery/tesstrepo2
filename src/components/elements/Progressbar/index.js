import React from "react";
import styles from "./styles.module.scss";
const Progressbar = () => {
  return (
    <div className={styles.load_bar}>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
    </div>
  );
};

export default Progressbar;
