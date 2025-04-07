import React from 'react'
import styles from "./styles.module.scss"
import DropOffPoints from './DropOffPoints'
import PickUpPoints from './PickUpPoints'
const PaymentPageSummary = (props) => {
  let { index, selectedPickupPoints, selectedDropoffPoints, firstname, email, phone, passengersNumber, specialRequests } = props
  return (
    <div className={styles.journey_summary_panel}>
      <div className={styles.content}>

        <div className={styles.journey_card} >
          <div className={styles.passsenger_details_div}>
            <h5>PASSENGER NAME</h5>
            <li ><span>{firstname}</span></li>
            <div className={styles.space}> </div>

            <h5>Phone Number </h5>
            <li ><span>{phone}</span></li>
            <div className={styles.space}> </div>

            <h5>email</h5>
            <li ><span>{email}</span></li>
            <div className={styles.space}> </div>

            <h5>Passenger(s)</h5>
            <li ><span>{passengersNumber}</span></li>
          </div>

          <div className={styles.details_div}>
            <h5 >From</h5>
            <PickUpPoints selectedPickupPoints={selectedPickupPoints} />
            <div className={styles.space}> </div>
            <h5 >To</h5>
            <DropOffPoints selectedDropoffPoints={selectedDropoffPoints} />
            <div className={styles.space}> </div>
            <h5 >notes:</h5>
            <li ><span>{specialRequests} </span></li>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PaymentPageSummary