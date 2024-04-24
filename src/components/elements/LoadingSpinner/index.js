import React from "react";
import styles from "./styles.module.css";

function LoadingSpinner() {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.loading}></div>
    </div>
  );
}

export { LoadingSpinner };
