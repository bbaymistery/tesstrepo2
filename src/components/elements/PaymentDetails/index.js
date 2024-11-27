import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";


import { useRouter } from "next/router";
import {
  selectArchieveToken,
  selectedJourneyType,
  selectedReturnQuot,
  selectedTransferQuot,
  selectPickUpDropOffReducer,
  transferPassengerEmail,
  transferPassengerPhone,
} from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import { setPayment } from "../../../store/pickUpDropOffReducer/pickUpDropAction";
const PaymentDetail = ({ setConfirmation ,env}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { paymentTypes, reservations, cookies } = useSelector(
    selectPickUpDropOffReducer
  );
  const trEmail = useSelector(transferPassengerEmail);
  const trPhone = useSelector(transferPassengerPhone);

  const journeyType = useSelector(selectedJourneyType);
  const selectedArchieveToken = useSelector(selectArchieveToken);


  const trQuot = useSelector(selectedTransferQuot);
  const returnQuot = useSelector(selectedReturnQuot);

  const [dataTokenForWebSocket, setDataTokenForWebSocket] = useState("");

  const [iframeStripe, setIframeStripe] = useState("");
  const [statusToken, setStatusToken] = useState("");
  const [popUpWindow, setPopUpWindow] = useState("")//for paypal

  const fetchArchieveToken = async (params = {}) => {
    let { token, paymentType, stage } = params


    let reservationObj =
      Number(journeyType) === 1 ? reservations : [reservations[0]];

    if (reservationObj.length > 1) {
      reservationObj = [
        {
          ...reservationObj[0],
          paymentDetails: {
            ...reservationObj[0].paymentDetails,
            token: token,
            paymentType: paymentType,
          },
        },
        {
          ...reservationObj[1],
          paymentDetails: {
            ...reservationObj[1].paymentDetails,
            token: token,
            paymentType: paymentType,
          },
        }
      ]
    } else {
      reservationObj = [
        {
          ...reservationObj[0],
          paymentDetails: {
            ...reservationObj[0].paymentDetails,
            token: token,
            paymentType: paymentType,
          },
        },
      ]
    }
    let url = `${env.apiDomain}/api/v1/sessions/add`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ token: selectedArchieveToken, details: reservationObj, stage }),
      headers: { "Content-Type": "application/json", },
    });
    const data = await response.json();

  };
  //sadece paypal icin bunu saxladim
  const openPopUpWindow = (params = {}) => {
    let { statusOfWindowCloseOrOpen, url } = params

    if (statusOfWindowCloseOrOpen === 'open') {
      let windowOptions = `menubar=no,location=yes,toolbar=no,left=${window.screen.width / 2 - 550 / 2},width=550,height=800`;
      let willPopUp
      willPopUp = window?.open(url, "_blank", windowOptions);


      setPopUpWindow(willPopUp)

    }
    if (statusOfWindowCloseOrOpen === 'close') {
      if (popUpWindow) {
        popUpWindow?.close();
      }
      setPopUpWindow("")
    }
  };
  //*payment _1_(cash)
  const cashMethod = (params = {}) => {
    let { token, paymentType } = params
    // if (id === 1) {
    //   // 2 if it is cash payment you have set payment type first of all then send archive
    //   fetchArchieveToken({ token: "", paymentType: "", stage: "CLICK_OVER_CASH_BUTTON" })
    //   dispatch(setPayment(id, "", router));

    //   // if paypal is opened the close
    //   if (urlPaypal) urlPaypal?.close();
    // }
    fetchArchieveToken({ token: "", paymentType: "", stage: "CLICK_OVER_CASH_BUTTON" })
    setIframeStripe("")
    dispatch(setPayment(1, "", router));
    openPopUpWindow({ statusOfWindowCloseOrOpen: "close", url: "" })
    setPopUpWindow("")
  };

  const stripeMethod = (params = {}) => {
    let { id, quotations, passengerEmail, url } = params
    if (!iframeStripe) {
      // if it is card payment you have set payment type first of all then send archive then
      // fetchArchieveToken({ token: "", paymentType: 7, stage: "CLICK_OVER_CARD_BUTTON" })
      const method = "POST"
      const body = JSON.stringify({
        quotations,
        type: id,
        language: "en",
        passengerEmail,
        "session-id": cookies.sessionToken,
        // mode: "sandbox",

      })
      const headers = { "Content-Type": "application/json" }
      const config = { method, headers, body, };
      try {
        fetch(url, config)
          .then((res) => res.json())
          .then((data) => {
            setDataTokenForWebSocket(data); //we use inside interval in order to detect it is which payment
            setStatusToken(data?.webSocketToken); //it will trigger interval and will make request
            setIframeStripe(data?.href);
            openPopUpWindow({ statusOfWindowCloseOrOpen: "close", url: "" })
            setPopUpWindow("")

          })
          .catch((error) => {
            window.handelErrorLogs(error, 'LHT PaymentMethods Component - stripeMethod function fetching catch blog  ', { config, url })
          });
      } catch (error) {
        window.handelErrorLogs(error, ' LHT PaymentMethods Component - stripeMethod function try catch blog ', { id, quotations, passengerEmail, url })
      }
    }
  };
  //*triggering payment methods And it  Will activate Cash or Stripe function => ((=>Step 1
  //this function includes all the methods of payments
  const startPayment = (id) => {

    setConfirmation(false)
    try {
      //general settings FOR PAYMENTS
      const paymentPagePath = JSON.parse(paymentTypes.filter((payment) => payment.id === id)[0].pagePath).path;


      const url = `${env.apiDomain}${paymentPagePath}`;

      let quotations = parseInt(journeyType) === 0 ? [reservations[0].quotation] : [reservations[0].quotation, reservations[1].quotation];

      let passengerEmail = reservations[0].passengerDetails.email;

      //Payment methods
      if (id === 1) cashMethod({ token: "", paymentType: id })
      if (id === 5) paypalMethod({ id, quotations, passengerEmail, url });
      if (id === 7) stripeMethod({ id, quotations, passengerEmail, url });
    } catch (error) {
      window.handelErrorLogs(error, 'LHT PaymentMethods Component -startPayment function trys catch blog', { id })

    }
  }

  const paypalMethod = (params = {}) => {

    let { id, quotations, passengerEmail, url } = params

    // if it is card payment you have set payment type first of all then send archive then
    // fetchArchieveToken({ token: "", paymentType: 5, stage: "CLICK_OVER_CARD_BUTTON" })
    const method = "POST"
    const headers = { "Content-Type": "application/json" }
    const body = JSON.stringify({
      quotations,
      type: id,
      language: "en",
      passengerEmail,
      "session-id": cookies.sessionToken,
      // mode: "sandbox",
    })
    const config = { method, headers, body, };


    try {
      if (!popUpWindow) {
        fetch(url, config)
          .then((res) => res.json())
          .then((data) => {

            setConfirmation(false);
            setIframeStripe("")//CLOSE OFRAME INSIDE OF Page (in case of if it was opened )
            setDataTokenForWebSocket(data);//we use inside interval in order to detect it is which payment
            setStatusToken(data.webSocketToken);//it will trigger interval and will make request
            openPopUpWindow({ statusOfWindowCloseOrOpen: "open", url: data?.href });
          })
          .catch((error) => {
            window.handelErrorLogs(error, 'lht PaymentMethods Component - paypalMethod function fetching catch blog  ', { config, url })
          });
      }
    } catch (error) {
      window.handelErrorLogs(error, ' lht PaymentMethods Component - paypalMethod function try catch blog ', { id, quotations, passengerEmail, url })
    }
  };
  useEffect(() => {
    const url = `${env.apiDomain}/api/v1/payment/status`;
    let interVal;
    if (statusToken) {
      interVal = setInterval(async () => {
        console.log(statusToken + "" + "inside");

        let config = { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify({ token: statusToken }), };
        try {
          let requ = await fetch(url, config);
          let resp = await requ.json();

          if (resp?.status === 200) {
            console.log(resp);

            window.scroll({ top: 0, left: 0, behavior: "smooth", });
            openPopUpWindow({ statusOfWindowCloseOrOpen: "close", url: "" })
            setStatusToken("");


            if (popUpWindow) {
              popUpWindow?.close();
            }
            if (dataTokenForWebSocket?.href?.includes("stripe")) {
              fetchArchieveToken({ token: resp.data.token, paymentType: 7, stage: "GET_SUCCESS_CARD_PAYMENT" })
              setIframeStripe("");
              setStatusToken("");
              dispatch(setPayment(7, resp.data.token, router));
            }

            if (dataTokenForWebSocket?.href?.includes("paypal")) {
              fetchArchieveToken({ token: resp.data.token, paymentType: 5, stage: "GET_SUCCESS_CARD_PAYMENT" })

              dispatch(setPayment(5, resp.data.token, router));

            }
            clearInterval(interVal);

            /// ....
          }
        } catch (error) {
          window.handelErrorLogs(error, 'LHT PaymentDetail Component - useEffect statusToken catch blog  ', { config })
        }
      }, 2000);
    }

    return () => clearInterval(interVal);
  }, [statusToken, popUpWindow]);

  return (
    <>
      <div className={`${styles.payment_details}`}>
        <div className={styles.header}>
          <div className={styles.header_top}>
            <h2 className={styles.header_top_title}>How would you like to pay ?</h2>

            <Link href={"/terms"}>
              <a target="_blank" className={styles.header_top_subtitle}>
                <i className="fa-solid fa-check"></i>
                By proceeding, you agree to our{" "}
                <span>terms and conditions</span>
              </a>
            </Link>
          </div>
          <div className={styles.header_tot_price}>
            <p className={styles.header_tot_price_text}>Total Price</p>
            <span className={styles.header_tot_price_price}>
              £
              {trQuot?.price && returnQuot?.price ? Number(trQuot?.price) + Number(returnQuot?.price) : Number(trQuot?.price)}
            </span>
          </div>
        </div>

        <div className={styles.payment_list}>
          {iframeStripe?.length > 0 ? <iframe src={iframeStripe} className={styles.iframe} frameBorder="0" allow="payment" ></iframe> : <React.Fragment></React.Fragment>}

          <div className={`${styles.items_buttons}`}>
            <div title="Pay With Cash To The Driver" className={` ${styles.item} ${styles.item_1}`} onClick={() => startPayment(1)}   >
              <div className={styles.topleft_circle}> </div>
              <div className={styles.bottomleft_circle}> </div>
              <div className={styles.topright_circle}> </div>
              <div className={styles.bottomright_circle}> </div>
              <p>Pay With Cash To The Driver </p>
              <img src="/images/cash.png" alt="cash" />
            </div>

            <div className={`${styles.item} ${styles.item_2} `} onClick={() => startPayment(5)} title="Pay by Paypal"   >
              <div className={styles.topleft_circle}> </div>
              <div className={styles.bottomleft_circle}> </div>
              <div className={styles.topright_circle}> </div>
              <div className={styles.bottomright_circle}> </div>
              <p>Pay by Paypal</p>
              <img src="/images/paypal.png" alt="" />
            </div>

            <div title="Pay with Stripe" className={`${styles.item} ${styles.item_4}`} onClick={() => startPayment(7)}  >
              <div className={styles.topleft_circle}> </div>
              <div className={styles.bottomleft_circle}> </div>
              <div className={styles.topright_circle}> </div>
              <div className={styles.bottomright_circle}> </div>
              <p>Pay by Card </p>
              <img src="/images/vsMaster.jpg" alt="master" />
            </div>


          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetail;
