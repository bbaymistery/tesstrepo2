import { splitDateTimeStringIntoDate, splitDateTimeStringIntoHourAndMinute } from '../../helpers/splitHelper'
import GlobalLayout from '../../components/layouts/GlobalLayout'
import DropOffPoints from './DropOffPoints'
import { useSelector } from 'react-redux'
import PickUpPoints from './PickUpPoints'
import styles from "./styles.module.scss"
import pdf from "./pdf.module.scss"
import React, { useState } from 'react'
import html2canvas from "html2canvas";
import { useEffect } from 'react'
import jsPDF from "jspdf";
import ProgresBar from '../../components/elements/ProgresBar'
import env from '../../resources/env'
import store from '../../store/store'
import { createWrapper } from 'next-redux-wrapper'
import { urlWithLangAtribute } from '../../helpers/urlWithLangAtrribute'
import { useRouter, Router } from 'next/router'
let title = ""
let keywords = ""
let description = ""

const ReservationsDocument = () => {
    let state = useSelector((state) => state.pickUpDropOffActions)
    let { reservations, params: { journeyType, tokenForArchieve, direction, language } } = state
    let { paymentDetails: { paymentType } } = reservations[0]


    const router = useRouter()
    const { appData, paymentTypes } = useSelector(state => state.initialReducer)
    const carObject = appData?.carsTypes?.reduce((obj, item) => ({ ...obj, [item.id]: item, }), {});
    // const confirmationAlert = useConfirm({ previousUrl: "/", nextUrl: "/", message: "If you leave the page, all data will be deleted." })
    const { previousUrls, currentUrls } = urlWithLangAtribute({ languages: appData.languages, previousUrl: "/payment-details", nextUrl: "/", currentUrl: router.asPath })

    const [reservId, setReservId] = useState("")
    const [confirmation, setConfirmation] = useState(true);

    //when passenger gets reserv d we need archieve token
    const fetchArchieveToken = async (params = {}) => {
        let { id, stage } = params
        let reservationObj = parseInt(journeyType) === 1 ? reservations : [reservations[0]];
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
            body: JSON.stringify({ token: tokenForArchieve, details: reservationObj, stage }),
            headers: { "Content-Type": "application/json", },
        });
        const data = await response.json();
        console.log({ data, stage });

    };
    const generatePdf = (e) => {
        if (typeof window === "object") {
            let file = document.getElementById("pdf_file");
            html2canvas(file, { logging: true, letterRendering: 1, useCORS: true, })
                .then(function (canvas) {
                    var imgData = canvas.toDataURL("img/png", "red");
                    var doc = new jsPDF("p", "mm", "a4");
                    doc.addImage(
                        imgData,
                        "PNG",
                        20,
                        reservations[1]?.quotation?.token ? 0 : 10,
                        file.clientWidth / 5,
                        reservations[1]?.quotation?.token ? file.clientHeight / 6.7 : file.clientHeight / 5.2
                    );
                    doc.save("AirportPickUpLondon_Reservation.pdf");
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

        const method = "POST"
        const headers = { "Content-Type": "application/json" }
        const body = JSON.stringify({ reservation: reservations, configurations: { sendConfirmationEmailToPassenger: true } })
        const url = `${env.apiDomain}/api/v1/reservation/`
        var requestOptions = { method, headers, body, };

        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((response) => {
                response = isJSON(isJSON) ? JSON.parse(response) : response;
                console.log(response, "reservation id responds");

                if (typeof response === "object" && response.status === 200) {
                    setReservId(response.data["reservations-ids"] ? response.data["reservations-ids"] : null);
                    // fetchArchieveToken({ id: response.data["reservations-ids"], stage: "GET_RESERVATION_ID" });

                } else {
                    //if fail it means we dont have any reservation id So we made it null
                    // fetchArchieveToken({ id: [[null], [null]], stage: "GET_SERVER_RESPONED" });
                    let location = "else part fetch response  https://api.london-tech.com/api/v1/reservation"
                    let message = 'Apl reservations-document Component - submitDataToGetReservId function fetch_response_ else part '
                    let options = { requestOptions, response, body }
                    window.handelErrorLogs(location, message, options)
                }
            })
            .catch((error) => {
                let location = error
                let message = 'Apl reservations-document Component - submitDataToGetReservId function fetch_ cathc blog'
                let options = { body }
                window.handelErrorLogs(location, message, options)
            });
    };
    // scrolling from top
    useEffect(() => { submitDataToGetReservId() }, [])
    useEffect(() => {
        // if (reservId) fetchArchieveToken({ id: reservId, stage: "RENDER_RESERVATION_DETAILS" });
    }, [reservId]);
    useEffect(() => {
        const confirmationMessage = "If you leave the page, all data will be deleted.";

        const beforeUnloadHandler = (e) => {
            e.preventDefault();
            e.returnValue = confirmationMessage;
        };

        const disableBackButton = () => {
            window.history.pushState(null, null, window.location.href);
            window.onpopstate = () => {
                window.history.pushState(null, null, window.location.href);
            };
        };

        // Call disableBackButton() once when the component mounts
        disableBackButton();

        const beforeRouteHandler = (url) => {
            // User is trying to go back to the previous page, prevent it
            if (!previousUrls.includes(url)) return;


            // User is trying to leave the current page, show a warning message
            window.addEventListener("beforeunload", beforeUnloadHandler);
            if (!confirm(confirmationMessage)) {
                // User cancelled the warning message, go back to the current page
                router.push(router.asPath);
            } else {
                // User confirmed the warning message, remove the beforeunload listener
                window.removeEventListener("beforeunload", beforeUnloadHandler);
            }
        };

        Router.events.on("routeChangeStart", beforeRouteHandler);

        return () => {
            Router.events.off("routeChangeStart", beforeRouteHandler);
        };
    }, [])
    return (
        <GlobalLayout keywords={keywords} title={title} description={description} footerbggray={true}>
            <div className={`${styles.rsv_details} page`}>
                <div className={`${styles.rsv_details_section} page_section`}>
                    <div className={`${styles.rsv_details_section_container} page_section_container`}>
                        {reservId ?
                            <div >
                                <div className={styles.document_details_section} >
                                    <div className={styles.first_section}>
                                        <div className={styles.icon_div}><i className="fa-solid fa-check"></i></div>
                                        <p className={styles.succes_message2}>{appData?.words["strYourbookingIsNowConfirmed"]}!</p>
                                        <p className={styles.sub_succes_message}> {appData?.words["strBookingDetailsHaveBeenSentTo"]}: {reservations[0].passengerDetails.email}</p>
                                    </div>
                                    {reservations.map((obj, index) => {
                                        let { transferDetails, passengerDetails, quotation, selectedPickupPoints, selectedDropoffPoints } = obj
                                        let { transferDateTimeString, passengersNumber, specialRequests } = transferDetails
                                        let { phone, email, firstname } = passengerDetails
                                        const [splitedHour, splitedMinute] = splitDateTimeStringIntoHourAndMinute(transferDateTimeString) || []
                                        const [splitedDate] = splitDateTimeStringIntoDate(transferDateTimeString) || []
                                        return (
                                            <div key={index}>
                                                <div className={styles.second_section}>
                                                    {index === 1 ? <p className={styles.title}>{appData?.words["strReturnJourneyDetails"]} </p> : <p className={styles.title}> {appData?.words["strYourBookingDetails"]} </p>}
                                                    <div className={styles.columns}>
                                                        <div className={styles.column_div}>
                                                            <div className={`${styles.text1} ${direction}`}> {appData?.words["strOrderIdTitle"]}</div>
                                                            <div className={`${styles.text2} ${direction}`}> {reservId[0][index]}</div>
                                                        </div>
                                                        <div className={styles.column_div}>
                                                            <div className={`${styles.text1} ${direction}`}> {appData?.words["strOn"]}</div>

                                                            <div className={`${styles.text2} ${direction}`}>
                                                                {direction === 'rtl'
                                                                    ? `${splitedDate.split(" ")[0].replace(/(\d+)\-(\d+)-(\d+)/, "$1-$2-$3")}`
                                                                    : `${splitedDate.split(" ")[0].replace(/(\d+)\-(\d+)-(\d+)/, "$3-$2-$1")}`} {splitedHour}:{splitedMinute}

                                                            </div>
                                                        </div>
                                                        <div className={styles.column_div}>
                                                            <div className={`${styles.text1} ${direction}`}>{appData?.words["strTotalPrice"]}</div>
                                                            <div className={`${styles.text2} ${direction}`}>
                                                                £{parseInt(journeyType) === 0 ? reservations[0].quotation.price : parseInt(reservations[0].quotation.price) + parseInt(reservations[1].quotation.price)}
                                                            </div>
                                                        </div>
                                                        <div className={styles.column_div}>
                                                            <div className={`${styles.text1} ${direction}`}>{appData?.words["strPaymentMethod"]}</div>
                                                            <div className={`${styles.text2} ${direction}`}>
                                                                {(() => {
                                                                    switch (paymentType) {
                                                                        case 1: return appData?.words["strCash"];
                                                                        case 5: return appData?.words["strPayWithPayPal"];
                                                                        case 7: return appData?.words["strPayByCard"];
                                                                        default: return "Pay by Cash";
                                                                    }
                                                                })()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.third_section}>
                                                    {index === 1 ? <p className={styles.title}>{appData?.words["strReturnJourneyDetails"]} </p> : <p className={styles.title}>{appData?.words["strYourBookingDetails"]} </p>}
                                                    <div className={`${styles.passenger_info} ${direction}`}>
                                                        <div className={styles.left}>{appData?.words["strFullName"]} </div>
                                                        <div className={styles.right}>{firstname} </div>
                                                    </div>
                                                    <div className={`${styles.passenger_info} ${direction}`}>
                                                        <div className={styles.left}>{appData?.words["strPhoneNumber"]} </div>
                                                        <div className={styles.right}>{phone}</div>
                                                    </div>
                                                    <div className={`${styles.passenger_info} ${direction}`}>
                                                        <div className={styles.left}>{appData?.words["strEmail"]}</div>
                                                        <div className={styles.right}>{email}</div>
                                                    </div>
                                                    <div className={`${styles.passenger_info} ${direction}`}>
                                                        <div className={styles.left}>{appData?.words["strNoofPassengers"]}</div>
                                                        <div className={styles.right}>{passengersNumber}</div>
                                                    </div>

                                                    <div className={`${styles.passenger_info} ${direction}`}>
                                                        <div className={styles.left}>{appData?.words["strVehicleTypeTitle"]}</div>
                                                        <div className={styles.right}>{typeof carObject === "object" ? carObject[quotation?.carId]?.name : <React.Fragment></React.Fragment>}</div>
                                                    </div>
                                                    <div className={`${styles.passenger_info} ${direction}`}>
                                                        <div className={styles.left}>{appData?.words['carsTransferType']}</div>
                                                        <div className={styles.right}>{typeof carObject === "object" ? carObject[quotation?.carId]?.transferType : <React.Fragment></React.Fragment>}</div>
                                                    </div>
                                                    <PickUpPoints language={language} direction={direction} selectedPickupPoints={selectedPickupPoints} />
                                                    <DropOffPoints language={language} direction={direction} selectedDropoffPoints={selectedDropoffPoints} />
                                                    <div className={`${styles.passenger_info} ${direction}`}>
                                                        <div className={styles.left}>{appData?.words["strPriceTitle"]}</div>
                                                        <div className={styles.right}>£{quotation.price}</div>
                                                    </div>
                                                    <div className={`${styles.passenger_info} ${direction}`}>
                                                        <div className={styles.left}>{appData?.words["strSpecialRequestsTitle"]}</div>
                                                        <div className={styles.right}>{specialRequests}</div>
                                                    </div>
                                                </div>
                                            </div>)
                                    })}
                                </div>
                                <div style={{ position: 'absolute', top: 0, left: 0, display: 'block', zIndex: -1000, width: 0, height: 0, overflow: 'hidden' }}>
                                    <div style={{ width: 1080, minHeight: 1000 }}>
                                        <div className={pdf.document_details_section_pdf} id="pdf_file"  >
                                            <div className={pdf.first_section}>
                                                <div className={pdf.icon_div}><i className="fa-solid fa-check"></i></div>
                                                <p className={pdf.succes_message2}>{appData?.words["strYourbookingIsNowConfirmed"]}!</p>

                                                <p className={pdf.sub_succes_message}> {appData?.words["strBookingDetailsHaveBeenSentTo"]}: admin@bookingcore.test</p>
                                            </div>
                                            {reservations.map((obj, index) => {
                                                let { transferDetails, passengerDetails, quotation, selectedPickupPoints, selectedDropoffPoints } = obj
                                                let { transferDateTimeString, passengersNumber, specialRequests } = transferDetails
                                                let { phone, email, firstname } = passengerDetails
                                                const [splitedHour, splitedMinute] = splitDateTimeStringIntoHourAndMinute(transferDateTimeString) || []
                                                const [splitedDate] = splitDateTimeStringIntoDate(transferDateTimeString) || []
                                                return (
                                                    <div key={index}>
                                                        <div className={pdf.second_section}>
                                                            {index === 1 ? <p className={pdf.title}>{appData?.words["strReturnJourneyDetails"]} </p> : <p className={pdf.title}> {appData?.words["strYourBookingDetails"]} </p>}
                                                            <div className={pdf.columns}>
                                                                <div className={pdf.column_div}>
                                                                    <div className={pdf.text1}> {appData?.words["strOrderIdTitle"]}</div>
                                                                    <div className={pdf.text2}> {reservId[0][index]}</div>
                                                                </div>
                                                                <div className={pdf.column_div}>
                                                                    <div className={pdf.text1}> {appData?.words["strOn"]}</div>
                                                                    <div className={pdf.text2}> {splitedDate} {splitedHour}:{splitedMinute} </div>
                                                                </div>
                                                                <div className={pdf.column_div}>
                                                                    <div className={pdf.text1}>{appData?.words["strTotalPrice"]}</div>
                                                                    <div className={pdf.text2}>
                                                                        £{parseInt(journeyType) === 0 ? reservations[0].quotation.price : parseInt(reservations[0].quotation.price) + parseInt(reservations[1].quotation.price)}
                                                                    </div>
                                                                </div>
                                                                <div className={pdf.column_div}>
                                                                    <div className={pdf.text1}>{appData?.words["strPaymentMethod"]}</div>
                                                                    <div className={pdf.text2}>
                                                                        {(() => {
                                                                            switch (paymentType) {
                                                                                case 1: return appData?.words["strCash"];
                                                                                case 5: return appData?.words["strPayWithPayPal"];
                                                                                case 7: return appData?.words["strPayByCard"];
                                                                                default: return "Pay by Cash";
                                                                            }
                                                                        })()}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={pdf.third_section}>
                                                            {index === 1 ? <p className={pdf.title}>Return Journey Details </p> : <p className={pdf.title}>Journey Details </p>}
                                                            <div className={pdf.passenger_info}>
                                                                <div className={pdf.left}>{appData?.words["strFullName"]} </div>
                                                                <div className={pdf.right}>{firstname} </div>
                                                            </div>
                                                            <div className={pdf.passenger_info}>
                                                                <div className={pdf.left}>{appData?.words["strPhoneNumber"]} </div>
                                                                <div className={pdf.right}>{phone}</div>
                                                            </div>
                                                            <div className={pdf.passenger_info}>
                                                                <div className={pdf.left}>{appData?.words["strEmail"]}</div>
                                                                <div className={pdf.right}>{email}</div>
                                                            </div>
                                                            <div className={pdf.passenger_info}>
                                                                <div className={pdf.left}>{appData?.words["strNoofPassengers"]}</div>
                                                                <div className={pdf.right}>{passengersNumber}</div>
                                                            </div>

                                                            <div className={pdf.passenger_info}>
                                                                <div className={pdf.left}>{appData?.words["strVehicleTypeTitle"]}</div>
                                                                <div className={pdf.right}>{typeof carObject === "object" ? carObject[quotation?.carId]?.name : <React.Fragment></React.Fragment>}</div>
                                                            </div>
                                                            <div className={pdf.passenger_info}>
                                                                <div className={pdf.left}>{appData?.words['carsTransferType']}</div>
                                                                <div className={pdf.right}>{typeof carObject === "object" ? carObject[quotation?.carId]?.transferType : <React.Fragment></React.Fragment>}</div>
                                                            </div>
                                                            <PickUpPoints selectedPickupPoints={selectedPickupPoints} />
                                                            <DropOffPoints selectedDropoffPoints={selectedDropoffPoints} />
                                                            <div className={pdf.passenger_info}>
                                                                <div className={pdf.left}>{appData?.words["strPriceTitle"]}</div>
                                                                <div className={pdf.right}>£{quotation.price}</div>
                                                            </div>
                                                            <div className={pdf.passenger_info}>
                                                                <div className={pdf.left}>{appData?.words["strSpecialRequestsTitle"]}</div>
                                                                <div className={pdf.right}>{specialRequests}</div>
                                                            </div>
                                                        </div>
                                                    </div>)
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.document_details_section}>
                                    <div className={styles.btn_div}><button style={{ marginBottom: '2rem' }} onClick={generatePdf} className='btn btn_primary '>Downland The Confirmation</button></div>
                                </div>
                            </div>
                            :
                            <ProgresBar />
                        }
                    </div>
                </div>
            </div>
        </GlobalLayout>
    )
}


export default ReservationsDocument
const makestore = () => store;
const wrapper = createWrapper(makestore);

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, ...etc }) => {
    const initialLanguages = store.getState().initialReducer?.appData?.languages
    const langs = initialLanguages.map((lang) => lang.value)

    for (let i = 0; i < langs.length; i++) {
        const lang = langs[i]
        const langUrl = lang === 'en' ? '/reservations-document' : `/${lang}/reservations-document`
        if (req.url === langUrl) {
            return {
                redirect: {
                    destination: lang === 'en' ? "/" : `/${lang}`,
                    permanent: false
                }
            }
        }
    }

    return {
        props: {
            data: ''
        }
    }


});

/*
    useEffect(() => {
        const confirmationMessage = "If you leave the page, all data will be deleted.";
        const beforeUnloadHandler = async (e) => {
            if (confirmation) {
                (e || window.event).returnValue = confirmationMessage;
                return confirmationMessage;
            }

        };

        // burasi bizim hangi sayfaya gecdigimizi soyler  (tiklayinca)
        const beforeRouteHandler = (url) => {
            if(previousUrl.includes(url)) router.reload
            if (confirmation) {
                //when we change language we dont want to confirmation message
                if (currentUrls.includes(url)) {
                    setConfirmation(false)
                    return
                } else {
                    setConfirmation(true)
                    router.reload()
                }

                if (Router.pathname !== url && !confirm(confirmationMessage)) {
                    Router.events.emit("routeChangeError");
                    throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
                }
            }
        };

        window.addEventListener("beforeunload", beforeUnloadHandler);
        Router.events.on("routeChangeStart", beforeRouteHandler);
        return () => {
            window.removeEventListener("beforeunload", beforeUnloadHandler);
            Router.events.off("routeChangeStart", beforeRouteHandler);
        };
    }, [confirmation]);
*/