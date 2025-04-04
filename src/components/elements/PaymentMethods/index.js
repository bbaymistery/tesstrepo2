import React, { useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const PaymentMethods = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  let state = useSelector((state) => state.pickUpDropOffActions)
  let { params: { journeyType, tokenForArchieve, sessionToken, }, reservations, } = state

  const [accountPaymentStatus, setAccountPaymentStatus] = useState(false)

  //this function triggering modal status of cash payment
  const setAccountModal = () => {
    setAccountPaymentStatus(true)
  }
  const accountMethod = (par) => {
    let { token, paymentType } = par
    dispatch({ type: "SET_PAYMENT_TYPE_AND_TOKEN", data: { token, paymentType } })
    router.push("/reservations-document")

  }
  //this function includes all the methods of payments
  const startPayment = (id) => {
    if (id === 4) accountMethod({ token: "", paymentType: id })
  }

  return (
    <>
      <div className={`${styles.payment_details}`}>
        <div className={styles.header} >
          <div className={styles.header_tot_price} >
            <p className={styles.header_tot_price_text}>total price</p>
            <span className={styles.header_tot_price_price}>

              £ {parseInt(journeyType) === 0 ? reservations[0].quotation.price : parseInt(reservations[0].quotation.price) + parseInt(reservations[1].quotation.price)}
            </span>
          </div>

          <div className={styles.header_bottom}>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img onClick={() => setAccountModal()} className={styles.acceptedcards_img} border="0" alt="Book Now for Airport Pickups London " src="/images/bookNow.png" />

          </div>
          {accountPaymentStatus ?
            <div className={`${styles.content_modal} ${styles.appear}`}>
              <div className={`${styles.confirmation_box} `}>
                <div className={styles.header}>
                  <p>{"Confirmation"}</p>
                  <i onClick={() => setAccountPaymentStatus(false)} className="fa-solid fa-xmark"></i>
                </div>
                <div className={styles.body}>
                  <p>{"You have chosen to pay by account"}.</p>
                </div>
                <div className={styles.footer}>
                  <button onClick={() => startPayment(4)} className="btn btn_primary"> Book Now</button>
                </div>
              </div>
            </div>
            : <></>}
        </div>
        <div  className={styles.button}>
          <Link href={"/transfer-details"}>
            <button style={{ backgroundColor: "#13307a" }} className='btn btn_primary'>Back</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PaymentMethods;
