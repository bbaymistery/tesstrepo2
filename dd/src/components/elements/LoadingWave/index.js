import React from 'react'
import styles from "./styles.module.scss"
const WaveLoading = () => {
    return (
        <div className={styles.load}>
            <div className={styles.one}></div>
            <div className={styles.two}></div>
            <div className={styles.three}></div>
        </div>
    )
}

export default WaveLoading