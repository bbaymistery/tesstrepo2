import React, { useState } from "react";
import Informations from "./Informations/Informations";
import Layout from "../../components/layouts/Layout";
import styles from "./styles.module.scss";
import {
  onewayDateTimeString,
  onewayDroopOffPointsOneWay,
  onewayPickUpPointsOneWay,
  returnComment,
  returnDateTimeString,
  returnDropOffPointsReturn,
  returnPassengerEmail,
  returnPassengerFullName,
  returnPassengerNumber,
  returnPassengerPhone,
  returnPickUpPointsReturn,
  selectArchieveToken,
  selectCHheckedInput,
  selectedJourneyType,
  selectedReturnQuot,
  selectedTransferQuot,
  selectPickUpDropOffReducer,
  transferComment,
  transferPassengerEmail,
  transferPassengerFullName,
  transferPassengerPhone,
  transferPassengersNumber,
} from "../../store/pickUpDropOffReducer/pickUpDropSelectors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Progressbar from "../../components/elements/Progressbar";
import LogoDiv from "./LogoDiv";
import ContentLeft from "./ContentLeft";
import { useConfirm } from '../../hooks/useConfirm'

const ReservationDocument = (props) => {
  let  { env } = props
  const dispatch = useDispatch();
  const [reservId, setReservId] = useState("");

  const {
    appData,
    reservations,
    meetPoint,

    params: { journeyType },
  } = useSelector(selectPickUpDropOffReducer);
  const carObject = appData?.carsTypes?.reduce(
    (obj, item) => ({
      ...obj,
      [item.id]: item,
    }),
    {}
  );
  const selectedArchieveToken = useSelector(selectArchieveToken);

  const selectJourneyType = useSelector(selectedJourneyType);
  const checked = useSelector(selectCHheckedInput);
  const selectedPickUpPointsTr = useSelector(onewayPickUpPointsOneWay);
  const selectedDropPointsTr = useSelector(onewayDroopOffPointsOneWay);
  const selectedQuotTransfer = useSelector(selectedTransferQuot);
  const trDateTime = useSelector(onewayDateTimeString);
  // //*inputs 0
  const fullnameTransfer = useSelector(transferPassengerFullName);
  const emailTransfer = useSelector(transferPassengerEmail);
  const phoneTranfer = useSelector(transferPassengerPhone);
  const passengersTransfer = useSelector(transferPassengersNumber);
  const selectTransferComment = useSelector(transferComment);

  const selectReturPickUs = useSelector(returnPickUpPointsReturn);
  const selectReturnDrop = useSelector(returnDropOffPointsReturn);
  const selectSelectedReturnQuot = useSelector(selectedReturnQuot);
  const selectDateReturn = useSelector(returnDateTimeString);
  // //*inputs 1
  const selectReturnComment = useSelector(returnComment);
  const selectReturnPassangers = useSelector(returnPassengerNumber);
  const selectReturnFullName = useSelector(returnPassengerFullName);
  const selectReturnEmail = useSelector(returnPassengerEmail);
  const selectReturnPhone = useSelector(returnPassengerPhone);
  const confirmationAlert = useConfirm({ previousUrl: "/", nextUrl: "/", message: "If you leave the page, all data will be deleted." })

  //when passenger gets reserv d we need archieve token
  const fetchArchieveToken = async (params = {}) => {
    let { id, stage } = params

    let reservationObj = parseInt(selectJourneyType) === 1 ? reservations : [reservations[0]];
    if (reservationObj.length > 1) {
      reservationObj = [
        {
          ...reservationObj[0],
          reservationDetails: {
            ...reservationObj[0].reservationDetails,
            id: id[0][0]
          },
        },
        {
          ...reservationObj[1],
          reservationDetails: {
            ...reservationObj[1].reservationDetails,
            id: id[0][1]
          },
        },
      ]
    } else {
      reservationObj = [
        {
          ...reservationObj[0],
          reservationDetails: {
            ...reservationObj[0].reservationDetails,
            id: id[0][0]
          },
        },
      ]
    }

    let url = `${env.apiDomain}/api/v1/sessions/add`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        token: selectedArchieveToken,
        details: reservationObj,
        stage
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(stage, data);
  };

  const generatePdf = (e) => {
    if (typeof window === "object") {
      let file = document.getElementById("pdf_file");
      html2canvas(file, {
        logging: true,
        letterRendering: 1,
        useCORS: true,
      }).then(function (canvas) {
        var imgData = canvas.toDataURL("img/png", "red");
        var doc = new jsPDF("p", "mm", "a4");
        doc.addImage(
          imgData,
          "PNG",
          20,
          selectSelectedReturnQuot?.token ? 0 : 10,
          file.clientWidth / 5,
          selectSelectedReturnQuot?.token
            ? file.clientHeight / 6.5
            : file.clientHeight / 5.2
        );
        doc.save("reserv.pdf");
      });
    }
  };
  function isJSON(string) {
    try {
      let json = JSON.parse(string);
      return true;
    } catch (error) {
      return false;
    }
  }
  const submitDataToGetReservId = () => {

    let body = parseInt(journeyType) === 1 ? reservations : [reservations[0]];
    var requestOptions = {
      method: "POST", headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        reservation: body,
        configurations: { sendConfirmationEmailToPassenger: true }
      }),
    };
    fetch(`${env.apiDomain}/api/v1/reservation/`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        response = isJSON(isJSON) ? JSON.parse(response) : response;
        console.log(response, "response");
        if (typeof response === "object" && response.status === 200) {
          setReservId(response.data["reservations-ids"] ? response.data["reservations-ids"] : null);
          fetchArchieveToken({ id: response.data["reservations-ids"], stage: "GET_RESERVATION_ID" });

        } else {
          fetchArchieveToken({ id: [[null], [null]], stage: "GET_SERVER_RESPONED" });

          window.handelErrorLogs(
            "else part fetch response  https://api.london-tech.com/api/v1/reservation",
            'LHT ReservationDocument Component lht - submitDataToGetReservId function fetch_response_ else part ',
            { requestOptions, response, body }
          )
        }
      })
      .catch((error) => {
        window.handelErrorLogs(error, 'LHT ReservationDocument Component lht - submitDataToGetReservId function fetch_ cathc blog', { requestOptions, body })
      });
  };

  useEffect(() => {
    submitDataToGetReservId();
  }, []);

  useEffect(() => {
    if (reservId) {
      window.scroll({
        top: 150,
        left: 0,
        behavior: "smooth",
      });
      fetchArchieveToken({ id: reservId, stage: "RENDER_RESERVATION_DETAILS" });


    }
  }, [reservId]);

  return (
    <>
      <Layout title="APL" noFooter={true}>
        <div className={`page ${styles.reserv_page}`}>
          <div className={`page_section ${styles.reserv_page_section}`}>
            {reservId ? (
              <div className={`page_section_container ${styles.reserv_page_section_container}`}  >
                <div className={`${styles.downland_button} text_center mb_1`} onClick={generatePdf}   >
                  <button className="btn btn_primary">Downland the Confirmation</button>
                </div>
                <div className={styles.reserv_content} id="pdf_file">
                  <LogoDiv />
                  <ContentLeft />

                  {/*//! right */}
                  <div className={styles.reserv_content_right}>
                    {/* //!right side of transfer details  */}
                    <div className={styles.right_header}>
                      <div className={styles.right_header_left}>
                        <div className={styles.left_box}>
                          <span className={styles.box_left}>Date</span>
                          <span className={styles.box_right}>
                            :
                            {`${trDateTime
                              .split(" ")[0]
                              .replace(/(\d+)\-(\d+)-(\d+)/, "$3-$2-$1")}`}
                          </span>
                        </div>
                        <div className={styles.left_box}>
                          <span className={styles.box_left}>Reference Id:</span>
                          <span className={styles.box_right}>
                            :{reservId[0][0]}
                          </span>
                        </div>
                      </div>

                      <div className={styles.right_box}>
                        <p className={styles.amount_text}>Amount</p>
                        <p className={styles.right_box__number}>
                          £{" "}
                          {selectedQuotTransfer?.price && Number(selectedQuotTransfer?.price)}
                          .00
                        </p>
                      </div>
                    </div>
                    {/*//! transfer details */}
                    <div className={styles.right_passenger_details}>
                      <Informations
                        date={trDateTime}
                        quot={selectedQuotTransfer}
                        pickUps={selectedPickUpPointsTr}
                        drops={selectedDropPointsTr}
                        fullName={fullnameTransfer}
                        email={emailTransfer}
                        phone={phoneTranfer}
                        passengers={passengersTransfer}
                        note={selectTransferComment}
                        paymentType={
                          reservations[0]?.paymentDetails?.paymentType
                        }
                        title="Transfer Details"
                      />
                    </div>

                    {/* //!right side of return journey */}
                    {selectReturPickUs.length > 0 &&
                      selectReturnDrop.length > 0 ? (
                      <div className={`${styles.right_header} mt_5 mb_2`}>
                        <div className={styles.right_header_left}>
                          <div className={styles.left_box}>
                            <span className={styles.box_left}>Date</span>
                            <span className={styles.box_right}>
                              :
                              {`${selectDateReturn
                                .split(" ")[0]
                                .replace(/(\d+)\-(\d+)-(\d+)/, "$3-$2-$1")}`}
                            </span>
                          </div>
                          <div className={styles.left_box}>
                            <span className={styles.box_left}>
                              Reference Id:
                            </span>
                            <span className={styles.box_right}>
                              :{reservId[0][1]}
                            </span>
                          </div>
                        </div>

                        <div className={styles.right_box}>
                          <p className={styles.amount_text}>Amount</p>
                          <p className={styles.right_box__number}>
                            £ {Number(selectSelectedReturnQuot?.price)}.00
                          </p>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {/*//! return journey details */}
                    {selectReturPickUs.length > 0 &&
                      selectReturnDrop.length > 0 ? (
                      <Informations
                        date={selectDateReturn}
                        quot={selectSelectedReturnQuot}
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
                        note={selectReturnComment}
                        paymentType={
                          reservations[1]?.paymentDetails?.paymentType
                        }
                        title="Return Details"
                      />
                    ) : (
                      ""
                    )}
                    {/* //!thank u text */}
                    <div className={styles.bottom_tot}>
                      <div className={styles.thankyou}>
                        <i className="fa-solid fa-face-smile"></i>
                        <p>Thank you for booking with us.</p>
                      </div>
                    </div>
                    {/*//! if return selected then show totl price */}
                    {selectReturPickUs.length > 0 &&
                      selectReturnDrop.length > 0 && (
                        <div className={`${styles.bottom_tot_price} mb_1`}>
                          <p className={styles.bottom_tot_price_text}>
                            Total Price:
                          </p>
                          <span className={styles.bottom_tot_price_price}>
                            £
                            {selectedQuotTransfer?.price && selectSelectedReturnQuot?.price ? Number(selectedQuotTransfer?.price) + Number(selectSelectedReturnQuot?.price) : Number(selectedQuotTransfer?.price)}
                          </span>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ) : (
              <div className={`${styles.progress_div}  page_section_container`}>
                <Progressbar />
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ReservationDocument;
export async function getServerSideProps({ req, res }) {
  if (req.url === "/reservations-document") {
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
