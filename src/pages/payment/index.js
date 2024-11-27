import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import { useDispatch, useSelector } from "react-redux";
import LinkBreadCumb from "../../components/elements/LinkBreadcumb";
import styles from "./styles.module.scss";
import Router from "next/router";
import {
  GET_MEET_POINT,
  SET_SELECT_ACTIVE_LINK,
} from "../../store/pickUpDropOffReducer/pickUpDropTypes";
import TransferSummarizeLeft from "../../components/elements/TDP_JourneySummary";
import {
  selectPickUpDropOffReducer,
  selectedJourneyType,
  onewayDateTimeString,
  onewayDroopOffPointsOneWay,
  onewayPickUpPointsOneWay,
  selectedTransferQuot,
  transferPassengerFullName,
  transferPassengerEmail,
  transferPassengerPhone,
  transferPassengersNumber,
  transferComment,
  returnPassengerNumber,
  returnPassengerFullName,
  returnPassengerEmail,
  returnPassengerPhone,
  returnComment,
  returnPickUpPointsReturn,
  returnDropOffPointsReturn,
  selectedReturnQuot,
  returnDateTimeString,
  selectCHheckedInput,
  selectArchieveToken,
} from "../../store/pickUpDropOffReducer/pickUpDropSelectors";
import ReservDetail from "./ReservDetail/ReservDetail";
import PaymentDetail from "../../components/elements/PaymentDetails";


const Payment = (props) => {
  let { env } = props
  const [crumbs, setCrumbs] = useState([
    { linkName: "/", name: "home" },
    { linkName: "/quotation", name: "Airport Transfer Quotations" },
    { linkName: "/payment", name: "Airport Transfer Payment" },
  ]);
  const [confirmation, setConfirmation] = useState(true);
  const dispatch = useDispatch();
  const { reservations } = useSelector(selectPickUpDropOffReducer);
  const selectedArchieveToken = useSelector(selectArchieveToken);
  const selectJourneyType = useSelector(selectedJourneyType);
  const checked = useSelector(selectCHheckedInput);

  const selectedPickUpPointsTr = useSelector(onewayPickUpPointsOneWay);
  const selectedDropPointsTr = useSelector(onewayDroopOffPointsOneWay);
  const selectedQuotTransfer = useSelector(selectedTransferQuot);
  const selectedDateTimeOneway = useSelector(onewayDateTimeString);
  // //*inputs 0
  const fullnameTransfer = useSelector(transferPassengerFullName);
  const emailTransfer = useSelector(transferPassengerEmail);
  const phoneTranfer = useSelector(transferPassengerPhone);
  const passengersTransfer = useSelector(transferPassengersNumber);
  const selectTransferComment = useSelector(transferComment);

  const selectReturPickUs = useSelector(returnPickUpPointsReturn);
  const selectReturnDrop = useSelector(returnDropOffPointsReturn);
  const selectReturnQuot = useSelector(selectedReturnQuot);
  const selectDateReturn = useSelector(returnDateTimeString);
  // //*inputs 1
  const selectReturnComment = useSelector(returnComment);
  const selectReturnPassangers = useSelector(returnPassengerNumber);
  const selectReturnFullName = useSelector(returnPassengerFullName);
  const selectReturnEmail = useSelector(returnPassengerEmail);
  const selectReturnPhone = useSelector(returnPassengerPhone);


  //passenger landing payment page We need archieveToken
  const fetchArchieveToken = async (params = {}) => {
    let { stage, } = params

    let reservationObj =Number(selectJourneyType) === 1 ? reservations : [reservations[0]];
    let url = `${env.apiDomain}/api/v1/sessions/add`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({  token: selectedArchieveToken, details: reservationObj,  stage,  }),
      headers: { "Content-Type": "application/json",   },
    });
    const data = await response.json();
    console.log({ data, stage });
    console.log({ reservationObj });

  };
  const getmettingPoint = (par) => {
    const url = `${env.apiDomain}/api/v1/drivers/meet-point`;
    let reqOptions = {
      method: "POST",
      body: JSON.stringify({
        point: reservations[0].selectedPickupPoints[0],
      }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    };
    fetch(url, reqOptions)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        dispatch({ type: GET_MEET_POINT, payload: data.data["meet-point"] });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //passenger landing payment page We need archieveToken

  useEffect(() => {
    getmettingPoint();
    dispatch({ type: SET_SELECT_ACTIVE_LINK, payload: "", });
    window.scroll({ top: 170, left: 0, behavior: "smooth", });
    fetchArchieveToken({ stage: "LANDED_INTO_PAYMENT_PAGE" })

  }, []);

  // prompt the user if they try and leave with unsaved changes
  useEffect(() => {
    let previousUrl = "/transfer-details"
    let nextUrl = "/reservations-document"
    const confirmationMessage = "If you leave the page, all data will be deleted.";
    const beforeUnloadHandler = async (e) => {
      //when we click to close browser
      setTimeout(() => { fetchArchieveToken({ stage: "PLAN_TO_CLOSE_PAYMENT_PAGE" }) }, 10)
      // /in case if it is cancelled
      if (window.event.cancelable) {
        setTimeout(() => { fetchArchieveToken({ stage: "PAYMENT_PAGE_NOT_CLOSED" }) }, 450)
      }
      if (confirmation) {
        (e || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
      }

    };

    // burasi bizim hangi sayfaya gecdigimizi soyler  (tiklayinca)
    const beforeRouteHandler = (url) => {
      if (confirmation) {
        if (url === nextUrl || url === previousUrl) {
          setConfirmation(false)
          return
        } else {
          setConfirmation(true)
        }
        if (Router.pathname !== url && !confirm(confirmationMessage)) {
          Router.events.emit("routeChangeError");
          throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
        }
      }
    };

    const handleEndConcert = async () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const method = "POST"
      const reservationObj = reservations
      const url = `${env.apiDomain}/api/v1/sessions/add`;
      const body = JSON.stringify({ token: selectedArchieveToken, details: reservationObj, stage: "PAYMENT_PAGE_IS_CLOSED" })
      const response = await fetch(url, { method, body, headers, keepalive: true });
      const data = await response.json();
      console.log({ data, });
    }
    window.addEventListener("beforeunload", beforeUnloadHandler);
    window.addEventListener('unload', handleEndConcert)
    Router.events.on("routeChangeStart", beforeRouteHandler);
    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
      window.removeEventListener('unload', handleEndConcert);
      Router.events.off("routeChangeStart", beforeRouteHandler);
    };
  }, [confirmation]);


  return (
    <Layout title="Payment Details London Taxi">
      <div className={`page ${styles.payment_page}`}>
        <div className={`page_section ${styles.payment_page_section}`}>
          <div
            className={`page_section_container ${styles.payment_page_section_container}`}
          >
            <LinkBreadCumb crumbs={crumbs} />
            <div className={styles.payment_details_content}>
              {/*  */}

              <div className={styles.reserv_details}>
                <h3 className={styles.title}>Go Jurney Details</h3>
                <ReservDetail
                  date={selectedDateTimeOneway}
                  quot={selectedQuotTransfer}
                  pickUps={selectedPickUpPointsTr}
                  drops={selectedDropPointsTr}
                  fullName={fullnameTransfer}
                  email={emailTransfer}
                  phone={phoneTranfer}
                  passengers={passengersTransfer}
                  specialRequest={selectTransferComment}
                />
              </div>
              {/*  */}

              <div className={styles.car_image_div}>
                <TransferSummarizeLeft
                  title="Transfer Details"
                  journeyType={0}
                  showPrice={false}
                  showPriceIncluded={true}
                  mb_0={true}
                  no_boxshadow={true}
                  py_1={true}
                  paymentPage={true}
                  env={env}
                />
              </div>
            </div>

            {selectReturPickUs.length > 0 &&
              selectReturnDrop.length > 0 &&
              selectReturnQuot && (
                <div className={styles.payment_details_content}>
                  {/* <div className={styles.topleft_circle}> </div>
                  <div className={styles.bottomleft_circle}> </div>
                  <div className={styles.topright_circle}> </div>
                  <div className={styles.bottomright_circle}> </div> */}

                  {/*  */}
                  <div className={styles.reserv_details}>
                    <h3
                      className={`${styles.title} ${selectReturPickUs.length > 0 ? "mt_4" : ""
                        }`}
                    >
                      Return Details
                    </h3>
                    <ReservDetail
                      date={selectDateReturn}
                      quot={selectReturnQuot}
                      pickUps={selectReturPickUs}
                      drops={selectReturnDrop}
                      fullName={
                        checked ? fullnameTransfer : selectReturnFullName
                      }
                      email={checked ? emailTransfer : selectReturnEmail}
                      phone={checked ? phoneTranfer : selectReturnPhone}
                      passengers={
                        checked ? passengersTransfer : selectReturnPassangers
                      }
                      specialRequest={selectReturnComment}
                    />
                  </div>
                  {/*  */}

                  <div className={styles.car_image_div}>
                    <TransferSummarizeLeft
                      title="Return Journey"
                      journeyType={1}
                      showPrice={false}
                      showPriceIncluded={true}
                      mb_0={true}
                      no_boxshadow={true}
                      py_1={true}
                      paymentPage={true}
                      env={env}
                    />
                  </div>
                </div>
              )}

            <PaymentDetail env={env} setConfirmation={setConfirmation} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
export async function getServerSideProps({ req, res }) {
  if (req.url === "/payment") {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }
  return {
    props: {
      data: "",
    },
  };
}
