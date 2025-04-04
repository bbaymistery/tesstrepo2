/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Steps from '../../components/elements/Steps';
import Layout from '../../components/layouts/Layout';
import { getWindowDimensions } from '../../helpers/windowDimension';
import styles from "./styles.module.scss"
import Router, { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';
import { splitDateTimeStringIntoDate, splitDateTimeStringIntoHourAndMinute } from '../../helpers/splitHelper';
import CarInfo from '../../components/elements/PaymentCarInfo'
import PaymentPageSummary from '../../components/elements/PaymentPageSummary'
import PaymentMethods from '../../components/elements/PaymentMethods';

const Payment = (props) => {
    let { data, env } = props
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const dispatch = useDispatch()
    const router = useRouter()
    let state = useSelector((state) => state.pickUpDropOffActions)
    let { reservations, params: { tokenForArchieve, } } = state

    const [confirmation, setConfirmation] = useState(true);




    // prompt the user if they try and leave with unsaved changes
    useEffect(() => {
        let previousUrl = "/transfer-details"
        let nextUrl = "/reservations-document"
        const confirmationMessage = "If you leave the page, all data will be deleted.";
        const beforeUnloadHandler = async (e) => {
            //when we click to close browser
            // /in case if it is cancelled

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
            const body = JSON.stringify({ token: tokenForArchieve, details: reservationObj, stage: "PAYMENT_PAGE_IS_CLOSED" })
            const response = await fetch(url, { method, body, headers, keepalive: true });
            const data = await response.json();
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
        <Layout loggedIn={data} pageUrl={router.pathname}>
            <div className={`page ${styles.page} ${windowDimensions.width < 990 ? "ml_0" : "0"}`}>
                <div className={`page_section ${styles.page_section} `}  >
                    <div className={`page_section_container ${styles.page_section_container} `} >
                        <div className={"steps_div"}>
                            <Steps fourIspending={true} threeIsDone={true} oneIsDone={true} twoIsDone={true} />
                        </div>

                        <div className={styles.payment_details_section} >


                            {reservations.map((obj, index) => {
                                let { transferDetails, quotation, selectedPickupPoints, selectedDropoffPoints, passengerDetails } = obj
                                let { transferDateTimeString, passengersNumber, specialRequests } = transferDetails
                                const [splitedHour, splitedMinute] = splitDateTimeStringIntoHourAndMinute(transferDateTimeString) || []
                                const [splitedDate] = splitDateTimeStringIntoDate(transferDateTimeString) || []

                                return (
                                    <div key={index}>
                                        <div className={`${styles.main_container} ${reservations.length > 1 && index === 0 ? "mb_4" : ""}`} >
                                            <CarInfo env={env} index={index} quotation={quotation} splitedHour={splitedHour} splitedDate={splitedDate} splitedMinute={splitedMinute} />

                                            <PaymentPageSummary
                                                env={env}
                                                index={index}
                                                email={passengerDetails.email}
                                                phone={passengerDetails.phone}
                                                specialRequests={specialRequests}
                                                passengersNumber={passengersNumber}
                                                firstname={passengerDetails.firstname}
                                                selectedPickupPoints={selectedPickupPoints}
                                                selectedDropoffPoints={selectedDropoffPoints}
                                            />
                                        </div>


                                    </div>
                                )
                            })}
                            <PaymentMethods env={env} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default Payment;
export async function getServerSideProps({ req, res }) {
    let verify = req.cookies["user-id"];
    if (req.url === "/payment") {
        return {
            redirect: {
                destination: `/new-booking`,

                permanent: false,
            },
        };
    }
    return {
        props: {
            data: verify,
        },
    };
}
