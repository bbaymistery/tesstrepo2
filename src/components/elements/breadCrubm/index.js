import React from "react";
import styles from "./styles.module.scss";
const BreadCrumb = ({ title }) => {
  return (
    <div className={styles.breadcrumb_area}>
      <div className={styles.breadcrumb_container}>
        <h2 className={styles.breadcrumb_container_title}>{title}</h2>
      </div>
    </div>
  );
};

export default BreadCrumb;
