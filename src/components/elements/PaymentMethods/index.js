import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import env from "../../../resources/env";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
const PaymentMethods = (props) => {
  let { tourDetailsStatus = false, selectedTour } = props
  const router = useRouter()
  const dispatch = useDispatch()
  let state = useSelector((state) => state.pickUpDropOffActions)
  let { params: { journeyType, tokenForArchieve, sessionToken, direction, language }, reservations } = state
  const { appData, paymentTypes } = useSelector(state => state.initialReducer)


  const [iframeStripe, setIframeStripe] = useState("");
  const [dataTokenForWebSocket, setDataTokenForWebSocket] = useState("");
  const [statusToken, setStatusToken] = useState("");
  const [popUpWindow, setPopUpWindow] = useState("")//for paypal

  const [cashPaymentModal, setCashPaymentModal] = useState(false)
  const fetchArchieveToken = async (params = {}) => {
    let { token, paymentType, stage } = params

    let reservationObj = reservations

    if (parseInt(journeyType) === 1) {
      reservationObj = [
        {
          ...reservationObj[0],
          paymentDetails:
          {
            ...reservationObj[0].paymentDetails,
            token: token,
            paymentType: paymentType,
          },
        },
        {
          ...reservationObj[1],
          paymentDetails:
          {
            ...reservationObj[1].paymentDetails,
            token: token, paymentType: paymentType,
          },
        }
      ]
    } else {
      reservationObj = [{ ...reservationObj[0], paymentDetails: { ...reservationObj[0].paymentDetails, token: token, paymentType: paymentType, }, },]
    }
    const method = "POST"
    const url = `${env.apiDomain}/api/v1/sessions/add`;
    const body = JSON.stringify({ token: tokenForArchieve, details: reservationObj, stage })
    const headers = { "Content-Type": "application/json" }
    const response = await fetch(url, { method, body, headers });
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
  //*payment methods
  const cashMethod = (params = {}) => {
    if (!tourDetailsStatus) {
      let { token, paymentType } = params
      // if it is cash payment you have set payment type first of all then send archive
      // fetchArchieveToken({ token: "", paymentType: "", stage: "CLICK_OVER_CASH_BUTTON" })
      dispatch({ type: "SET_PAYMENT_TYPE_AND_TOKEN", data: { token, paymentType } })
      setIframeStripe("")//CLOSE OFRAME INSIDE OF Page (in case of if it was opened )
      setStatusToken("");//it will trigger interval and will make request
      router.push(`${language === 'en' ? "/reservations-document" : `${language}/reservations-document`}`)
    }

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
        "session-id": sessionToken,
        mode: "sandbox",
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

            window.handelErrorLogs(error, 'APL PaymentMethods Component - stripeMethod function fetching catch blog  ', { config, url })
          });
      } catch (error) {
        window.handelErrorLogs(error, ' APL PaymentMethods Component - stripeMethod function try catch blog ', { id, quotations, passengerEmail, url })
      }
    }
  };
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
      "session-id": sessionToken,
      mode: "sandbox",
    })
    const config = { method, headers, body, };

    try {
      if (!popUpWindow) {
        fetch(url, config)
          .then((res) => res.json())
          .then((data) => {

            setIframeStripe("")//CLOSE OFRAME INSIDE OF Page (in case of if it was opened )
            setDataTokenForWebSocket(data);//we use inside interval in order to detect it is which payment
            setStatusToken(data.webSocketToken);//it will trigger interval and will make request
            openPopUpWindow({ statusOfWindowCloseOrOpen: "open", url: data?.href });
          })
          .catch((error) => {
            window.handelErrorLogs(error, 'APL PaymentMethods Component - paypalMethod function fetching catch blog  ', { config, url })
          });
      }
    } catch (error) {
      window.handelErrorLogs(error, ' APL PaymentMethods Component - paypalMethod function try catch blog ', { id, quotations, passengerEmail, url })
    }
  };

  //this function includes all the methods of payments
  const startPayment = (id) => {


    try {
      //general settings FOR PAYMENTS
      const paymentPagePath = JSON.parse(paymentTypes.filter((payment) => payment.id === id)[0].pagePath).path;


      const url = `${env.apiDomain}${paymentPagePath}`;
      let quotations = parseInt(journeyType) === 0 ? [reservations[0].quotation] : [reservations[0].quotation, reservations[1].quotation];
      let passengerEmail = reservations[0].passengerDetails.email;
      let passengerPhoneNumber = reservations[0].passengerDetails.phone;

      //Payment methods
      if (id === 1) cashMethod({ token: "", paymentType: id })
      if (id === 5) paypalMethod({ id, quotations, passengerEmail, url });
      if (id === 7) stripeMethod({ id, quotations, passengerEmail, url });
    } catch (error) {
      window.handelErrorLogs(error, 'APL PaymentMethods Component -startPayment function trys catch blog', { id })

    }
  }

  //this function triggering modal status of cash payment
  const setCashModal = (par) => {
    setCashPaymentModal(true)
    setIframeStripe("")
    openPopUpWindow({ statusOfWindowCloseOrOpen: "close", url: "" })
    setPopUpWindow("")

  }
  //this is checking up interval for each second (payment suces or not)
  useEffect(() => {
    let interVal;

    if (statusToken) {
      interVal = setInterval(async () => {

        const method = "POST"
        const headers = { "Content-Type": "application/json", }
        const body = JSON.stringify({ token: statusToken })
        const url = `${env.apiDomain}/api/v1/payment/status`;
        let config = { method, headers, body };

        try {
          let requ = await fetch(url, config);
          let resp = await requ.json();

          if (resp?.status === 200) {
            //after you get a success payment status and after set a token into paymentDEtails object then send archive
            window.scroll({ top: 0, left: 0, behavior: "smooth", });

            if (dataTokenForWebSocket?.href?.includes("stripe")) {
              // fetchArchieveToken({ token: resp.data.token, paymentType: 7, stage: "GET_SUCCESS_CARD_PAYMENT" })
              dispatch({ type: "SET_PAYMENT_TYPE_AND_TOKEN", data: { token: resp.data.token, paymentType: 7 } })
              setIframeStripe("");
              setStatusToken("");
              router.push(`${language === 'en' ? "/reservations-document" : `${language}/reservations-document`}`)

            }

            if (dataTokenForWebSocket?.href?.includes("paypal")) {
              // fetchArchieveToken({ token: resp.data.token, paymentType: 5, stage: "GET_SUCCESS_CARD_PAYMENT" })
              dispatch({ type: "SET_PAYMENT_TYPE_AND_TOKEN", data: { token: resp.data.token, paymentType: 5 } })
              openPopUpWindow({ statusOfWindowCloseOrOpen: "close", url: "" })
              setStatusToken("");
              router.push(`${language === 'en' ? "/reservations-document" : `${language}/reservations-document`}`)
            }
            clearInterval(interVal);
          }
        } catch (error) {
          let message = "APL  PaymentMethods Component - useEffect statusToken catch blog  "
          window.handelErrorLogs(error, message, { config })
        }
      }, 2000);
    }
    return () => clearInterval(interVal);
  }, [statusToken]);

  useEffect(() => {
    //make interval to check if pop  up windiw closed or not
    //if yes then initialize status token
    const interval = setInterval(() => {
      if (popUpWindow.closed) {
        clearInterval(interval);
        setStatusToken("")
        setPopUpWindow("")
      }
    }, 500);
    return () => clearInterval(interval);
  }, [popUpWindow])




  return (
    <>
      <div className={`${styles.payment_details}`}>
        <div className={styles.header} direction={String(direction === 'rtl')}>
          <div className={styles.header_top}>
            <h2 className={`${styles.header_top_title} ${direction}`} > {appData?.words["strHowWouldYouLikeToPay"]}</h2>
            <Link href={"/terms"} target="_blank" >
              <p className={styles.header_top_subtitle} direction={String(direction === 'rtl')}>
                <i className="fa-solid fa-check"></i>
                <span dangerouslySetInnerHTML={{ __html: (appData?.words["strByProceedingNote"]) }} />
              </p>
            </Link>
          </div>
          <div className={styles.header_tot_price} direction={String(direction === 'rtl')}>
            <p className={styles.header_tot_price_text}>{appData?.words["strTotalPrice"]}</p>
            <span className={styles.header_tot_price_price}>
              £ {tourDetailsStatus ? selectedTour.price : parseInt(journeyType) === 0 ? reservations[0].quotation.price : parseInt(reservations[0].quotation.price) + parseInt(reservations[1].quotation.price)}
            </span>
          </div>
        </div>

        <div className={styles.payment_list}>
          {iframeStripe?.length > 0 ? <iframe src={iframeStripe} className={styles.iframe} frameBorder="0" allow="payment" ></iframe> : <React.Fragment></React.Fragment>}
          {/* */}

          <div className={`${styles.items_buttons}`}>
            <div title={appData?.words["strToDriverCashTitle"]} onClick={setCashModal} className={` ${styles.item} ${styles.item_1}`}   >
              <p>{appData?.words["strToDriverCashTitle"]}</p>
              <img src="/images/others/pp.jpg" alt="" />
            </div>
            {tourDetailsStatus ? <></> : <div title={appData?.words["Pay with PayPal"]} onClick={() => startPayment(5)} className={` ${styles.item} ${styles.item_2}`}   >
              <p>{appData?.words["strPaywithPayPal"]} </p>
              <img src="/images/others/paypal.png" alt="" />
            </div>
            }
            {tourDetailsStatus ? <></> : <div onClick={() => startPayment(7)} title={appData?.words["strPaybycard"]} className={`${styles.item} ${styles.item_4}`}   >
              <p>{appData?.words["strPaybycard"]} </p>
              <img src="/images/others/vsMaster.jpg" alt="" />
            </div>}
          </div>

          {cashPaymentModal ?
            <div className={`${styles.content_modal} ${styles.appear}`}>
              <div className={`${styles.confirmation_box} `}>
                <div className={styles.header}>
                  <p>{appData?.words["strConfirmation"]}</p>
                  <i onClick={() => setCashPaymentModal(false)} className="fa-solid fa-xmark"></i>
                </div>
                <div className={styles.body}>
                  <p>{appData?.words["strYouHaveChosenToPayByCash"]}.</p>
                </div>
                <div className={styles.footer}>
                  <button onClick={() => startPayment(1)} className="btn btn_primary"> {appData?.words["strBookNow"]}</button>
                </div>
              </div>
            </div>
            : <></>}
        </div>
      </div>
    </>
  );
};

export default PaymentMethods;
/*
  useEffect(() => {
      const socket = io();
      socket.on("<webSocketToken>", (response) => {

      });
  }, [third])
*/