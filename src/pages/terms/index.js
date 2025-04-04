/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Layout from '../../components/layouts/Layout';
import { getWindowDimensions } from '../../helpers/windowDimension';
import { SET_ACTIVELINK_ID } from '../../store/showFieldReducer/showFieldTypes';
import styles from "./styles.module.scss"
import { parseCookies } from '../../helpers/cokieesFunc';
const Terms = ({ data }) => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const dispatch = useDispatch()
    useEffect(() => {

        const handleResize = () => setWindowDimensions(getWindowDimensions());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        dispatch({ type: SET_ACTIVELINK_ID, payload: 6 });
        localStorage.setItem("activeLinkId", JSON.stringify(6))
    }, [dispatch])

    return (
        <Layout loggedIn={data}>
            <div className={`page ${styles.page} ${windowDimensions.width < 990 ? "ml_0" : "0"}`}>
                <div className={`page_section ${styles.page_section} `}  >
                    <div className={`page_section_container ${styles.page_section_container} `} >
                        <div className={styles.terms_content}>
                            <p className={styles.entry_text}>
                                <span>
                                    <img style={{ width: "320px" }} src="/logos/blueLogoAirPort.png" alt="" />
                                </span>
                            </p>
                        </div>


                        <div className={styles.terms_div}>
                            <p className={styles.entry_text}>


                                <span className={styles.entry_text_desc}>
                                    Trading as Airport Pickups London or APL, company registration number in England and Wales 08044775)  licensed by Transport for London, Taxi and Private Hire Operator number is 08004 Registered and Contact office address is: APL Office, Novotel Heathrow, Cherry Lane, UB7 9HJ.
                                </span>
                            </p>
                            <h3 className={styles.terms_div_title}>
                                1 Qutations,Rates and Charges
                            </h3>
                            <ul>
                                <li>
                                    <b>1.1</b>
                                    All prices are in GBP and  are inclusive of VAT (where applicable).
                                </li>
                                <li>
                                    <b>1.2</b>
                                    APL offices are open 24/7.  The operation contact number is 0208 688 7744 (from abroad: +44 (0)208 688 7744).
                                </li>
                                <li>
                                    <b>1.3</b>
                                    All quotations are valid  for 30 days and include Airport -meet and greet, waiting time*, parking or  tolls. Gratuities are at the Customer’s discretion.
                                </li>
                            </ul>
                            <h3 className={styles.terms_div_title}>
                                2 Free Meet and Greet
                            </h3>
                            <ul>
                                <li>
                                    <b>2.1</b>
                                    APL does not  apply any charges for flight delays. For all airport pick-ups, we track the  flight and amend the “requested pickup” time according to the actual “flight  landing time”. This is so that the driver is in the arrivals hall at the  appropriate time.
                                    <p>
                                        <b>For Airport pick-up,  APL booking form contains:</b>
                                    </p>
                                    <p>
                                        - Flight Landing time: This is the time which your  flight is scheduled to land
                                    </p>
                                    <p>
                                        - Requested pick-up time: The number of minutes after the landing time,  you want to be picked up
                                    </p>
                                </li>
                                <li>
                                    <b>2.2</b>

                                    After the requested pickup time, there will be a 30 minutes FREE waiting time at the airport. Our driver will be waiting for you in the arrivals hall, with an “Airport Pickups” name board with your name on it. They will then accompany you to the vehicle.
                                    <p>
                                        If you realise that you will not be able to meet the driver within the 30 minutes, then if you contact us, we will hold the driver in the terminal for an extra 30 mins at a charge of £5.00 for every 15 minutes. If you are still not out within this time then the driver will be pulled off and the job will be registered as a no show.
                                    </p>
                                    <p>For example, if your flight lands at 10:00 am, and you have requested your pickup time to be 60 mins after the flight landing time; our driver will be in the terminal at 11 am. The driver will wait till 11:30 am FREE of charge. After this time, if requested, the driver will wait an additional 30 mins chargeable at £5.00 for every 15 minutes.</p>
                                </li>
                                <li>
                                    <b>2.3</b>
                                    Our driver will  be waiting for you in the arrivals hall, with an “Airport Pickups” name board  with your name on it. </li>
                                <li>
                                    <b>2.4</b>
                                    If you cannot locate your  driver and you seek an alternative method of transport without first contacting  APL to try and resolve the situation, you will be charged the tariff rate based  on the service booked.Our 24/7 contact number is +44 (0)208 688 7744</li>

                                <li>
                                    <p>
                                        <b>Hotel and address Pick-up Rules:</b>
                                    </p>
                                </li>
                                <li><b>2.5</b> We allow a 15  minutes FREE waiting time at hotel and address pick-ups. </li>


                                <li>
                                    <p>
                                        <b>Cruise / Ferry Port Pickup Rules:</b>
                                    </p>
                                </li>
                                <li><b>2.6</b> We allow 60  minutes free waiting time from the requested pickup time, at the Cruise and  Ferry Ports.</li>
                                <li>
                                    <p>
                                        <b>Eurostar and Station Pickup Rules:</b>
                                    </p>
                                </li>
                                <li><b>2.7</b> “Eurostar”  arrivals:&nbsp; driver will hold passenger name board 30 mins after train arrival time, and  there will be extra 30 mins FREE waiting time.</li>

                                <li><p>For domestic  trains, driver will hold passenger name board 5 mins after train arrival time,  and there will&nbsp; be extra 30 mins FREE  waiting time.<br />
                                    Except for the  airport pickups (rules indicated above), Once the FREE waiting times are up,  all other above mentioned pickups will be recorded as a no-show and invoiced as  normal.</p></li>
                            </ul>
                            <h3 className={styles.terms_div_title}>
                                3  General Terms
                            </h3>
                            <ul>
                                <li><b>3.1</b> APL cannot be held  responsible for any late arrival to destination, airport or cruise port. Hence  we will not accept any responsibility for missed flights or ships.</li>
                                <li><b>3.2</b> APL shall be under no  liability to the Customer whatsoever for any indirect loss and/or expense  (including loss of profit) suffered by the Customer arising out of a breach by  the Company of these terms and conditions.</li>
                                <li><b>3.3</b> In the event of any claim  against APL arising out of its performance of hire, the Company’s liability  shall be limited to a refund not exceeding the cost of the journey. Any other  payments will be entirely at the discretion of the Company.</li>
                                <li><b>3.4</b> APL will not accept late  bookings online (within 2 hours of transfer time)</li>
                                <li><b>3.5</b> APL accepts no  responsibility for any loss or damage to property, howsoever such loss or  damage may be caused. In the event of property being left in a vehicle, we will  gladly organise the return of such items if you cover the postage and packaging  costs.</li>
                                <li><b>3.6</b> All our vehicles are  non-smoking.</li>
                                <li><b>3.7</b> APL reserves the right to  charge £10 supplement to the passengers, in the event that the passengers  arrives with excess luggage and where this luggage will need to be placed  inside the vehicle (at driver discretion and consent)</li>
                                <li><b>3.8</b> APL will charge a vehicle  valeting fee of £60.00 for any damage of their vehicle made by customer (e.g.  vomiting, spilling liquid or food to the vehicle).</li>
                                <li><b>3.9</b> APL reserves the right to  refuse to transport any Passenger who behaves in a disorderly, threatening or  abusive manner.</li>
                                <li><b>3.10</b> APL reserves the right to  charge the Customer extra if customer wants to take a different route than  company route APL extra charge will be £1.50 per mile</li>
                                <li><b>3.11</b> PETS are allowed in our  certain vehicles. We apply a flat £15.00 vehicle valeting charge for such  bookings. Pet must travel within a safe cage or secure safety lease/harness  while in the vehicle.</li>
                            </ul>
                            <h3 className={styles.terms_div_title}>
                                4 Free Child Seats
                            </h3>
                            <ul>
                                <li><b>4.1</b> APL will provide up to 2  child seats free of charge, for peace of mind guarantee, as by law London  private hire vehicles are exempt from this law. If the driver doesn’t provide  the correct child car seat, children can travel without one - but only if they  travel on a rear seat:<br />
                                    and wear an adult seat belt if  they’re 3 or older<br />
                                    without a seat belt if they’re  under 3<br />
                                    A child can travel without a  child car seat in taxis and private hire vehicles.</li>
                            </ul>

                            <h3 className={styles.terms_div_title}>
                                5 Booking Cancellation Charges
                            </h3>
                            <ul>
                                <li><b>5</b> Cancellation notice periods  and fees are as follows:</li>
                                <li><b>5.1</b> FREE cancellation if cancellation made more than 12 hours before delivery time;  APL will only charge £5.00 administrative fee for the Refund as this processing (interchange) fee charged by Merchant account. (£5.00 charge is not applicable for cancellations due to Covid_19. ).</li>
                                <li><b>5.2</b>&nbsp;50% cancellation charge if cancellation made between 6 and 12 hours before delivery time.</li>
                                <li><b>5.3</b> 100% cancellation charge if cancellation made within 6 hours of delivery time.</li>
                                <li><b>5.4</b> REFUNDS could take up to 15 working days to process.</li>
                            </ul>
                            <h3 className={styles.terms_div_title}>
                                6 No-Show Charges
                            </h3>
                            <ul>
                                <li><b>6.1</b> If customer does not show  up for a ride, we will apply the booking as no-show and will charge the full  amount of booking.</li>
                                <li><b>6.2</b> Waiting times and pickup rules are listed  on clause 2 of this Terms and Conditions. </li>
                            </ul>
                            <h3 className={styles.terms_div_title}>
                                7 Non-Solicitation of Personal
                            </h3>
                            <ul>
                                <li><b>7.1</b> If you wish to directly  hire or employ an APL driver, we reserve the right to levy a £5,000 fee to  cover the costs of recruiting and training the driver</li>
                            </ul>
                            <h3 className={styles.terms_div_title}>
                                8 Payments
                            </h3>
                            <ul>
                                <li><b>8.1</b> APL accepts Cash, PayPal  and most credit cards as a means of payment. There is no extra charge for  credit card payments.</li>
                                <li><b>8.2</b> Payments are secure: APL  does not store in any way your credit card details. Payments will be using  Secure Socket Layer (SSL) technology. Credit card numbers are protected with a  high level of encryption when transmitted over the Internet.<br />
                                    Credit Card slips will show  “APL Service” as merchant name</li>
                            </ul>
                        </div>
                    </div>


                </div>
            </div>
        </Layout>

    )
}

export default Terms;
export async function getServerSideProps({ req, res }) {
    const { cookie } = req.headers;
    const cookies = parseCookies(cookie);
  
    // Check if the required cookie exists
    const verify = Boolean(cookies["user-id"]); 
  
    if (!verify) {
      // If the cookie doesn't exist, redirect to home page
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  
    // If the cookie exists, proceed with rendering the page
    return {
      props: {
        data: verify,
      },
    };
  }