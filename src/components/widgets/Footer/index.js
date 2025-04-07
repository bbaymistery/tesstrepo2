import React from 'react'
import styles from "./styles.module.scss"

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <div className={`${styles.footer_page}`}>
      <div className={`${styles.footer_page_section}`}>
        <p className={styles.all_rights}>
          {`APL Agency © ${currentYear}. All Rights Reserved.`}
          <a href="https://www.airport-pickups-london.com/" title="Airport Pickups London" rel='noreferrer' target="_blank">Airport Pickups London</a>
        </p>
      </div>
    </div>




  )
}

export default Footer