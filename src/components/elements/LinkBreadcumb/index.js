import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
const LinkBreadCumb = ({ crumbs }) => {
  return (
    <ul className={styles.link_breadcumb}>
      {crumbs.map((cr, index) => {
        return (
          <li className={`${index === 0 ? styles.home : " "}`} key={index}>
            <a href={cr.linkName}>{cr.name}</a>
          </li>
        );
      })}
    </ul>
  );
};

export default LinkBreadCumb;
