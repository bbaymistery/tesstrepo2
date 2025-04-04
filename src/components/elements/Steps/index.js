import React from 'react'
import styles from "./styles.module.scss"
const Steps = (props) => {
    let { oneIsDone, twoIsDone, threeIsDone, fourIsDone, oneIspending, twoIspending, threeIspending, fourIspending } = props
    return (
        <div className={styles.Container}>
            <ul className={styles.Containerprogessbar}>
                <li className={oneIsDone ? styles.active : (oneIspending ? styles.pending : "")}><span>Destination</span></li>
                <li className={twoIsDone ? styles.active : (twoIspending ? styles.pending : "")}><span>Vehicles</span></li>
                <li className={threeIsDone ? styles.active : (threeIspending ? styles.pending : "")}><span>Customer Details</span></li>
                <li className={fourIsDone ? styles.active : (fourIspending ? styles.pending : "")}><span>Complete booking</span></li>
            </ul>
        </div >
    )
}

export default Steps