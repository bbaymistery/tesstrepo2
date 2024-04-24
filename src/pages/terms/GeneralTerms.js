import React from 'react'
import styles from "./styles.module.scss"
const GeneralTerms = ({ pageContent }) => {
    return (
        <div className={styles.right}>
            {pageContent
                ?
                <div className={styles.right_content} dangerouslySetInnerHTML={{ __html: pageContent }} />
                :
                <div className={styles.right_content}>
                    <h1>Booking Terms & Conditions</h1>
                    <p className={styles.title_description}>
                        Airport Pickups London (APL) registered and
                        Contact office address is: <br /> APL Office,
                        Novotel Heathrow, Cherry Lane, West Drayton,
                        London, UB7 9HJ.
                    </p>
                    <h2>1 quotations, rates and charges</h2>
                    <ul><li><b>1.1</b> All prices are in GBP and  are inclusive of VAT (where applicable).</li>
                        <li><b>1.2</b> APL offices are open 24/7.  The operation contact number is 0208 688 7744 (from abroad: +44 (0)208 688 7744).</li>
                        <li><b>1.3</b> All quotations are valid  for 30 days and include Airport -meet and greet, waiting time*, parking or  tolls. Gratuities are at the Customer’s discretion.</li>
                    </ul>

                    <h2>2 Free meet & greet</h2>
                    <ul>
                        <li><b>2.1</b> APL does not  apply any charges for flight delays. For all airport pick-ups, we track the  flight and amend the “requested pickup” time according to the actual “flight  landing time”. This is so that the driver is in the arrivals hall at the  appropriate time.
                            <p><b>For Airport pick-up,  APL booking form contains:</b></p>
                            <p>Flight Landing time: This is the time which your  flight is scheduled to land</p>
                            <p>Requested pick-up time: The number of minutes after the landing time,  you want to be picked up</p>
                        </li>
                        <li><b>2.2</b>&nbsp;After the requested pickup time, there will be a <b>30 minutes FREE waiting time </b> at the airport. Our driver will be waiting for you in the arrivals hall, with an “Airport Pickups” name board with your name on it. They will then accompany you to the vehicle.
                            <p>If you realise that you will not be able to meet the driver within the 30 minutes, then if you contact us, we will hold the driver in the terminal at the below shown cost.</p>
                            <p>For example, if your flight lands at 10:00 am, and you have requested your pickup time to be 60 mins after the flight landing time; our driver will be in the terminal at 11 am. The driver will wait till 11:30 am FREE of charge. After this time, the below charges will apply.</p>
                        </li>
                        <li>
                            <table className={styles.second_table}>
                                <tbody><tr>
                                    <th  ><b>Duration</b></th>
                                    <th ><b>Charge</b></th>
                                </tr>
                                    <tr>
                                        <td > 0 - 15 minutes</td>
                                        <td > £10.00</td>
                                    </tr>
                                    <tr>
                                        <td >16 - 30 minutes</td>
                                        <td >£15.00</td>
                                    </tr>
                                    <tr>
                                        <td >31 - 45 minutes</td>
                                        <td >£20.00</td>
                                    </tr>
                                    <tr>
                                        <td >46 - 60 minutes</td>
                                        <td >£25.00</td>
                                    </tr>
                                    <tr>
                                        <td >61 - 90 Minutes</td>
                                        <td >£35.00</td>
                                    </tr>
                                </tbody></table>
                        </li>

                        <li><b>2.3</b> Our driver will  be waiting for you in the arrivals hall, with an “Airport Pickups” name board  with your name on it. </li>
                        <li><b>2.4</b> If you cannot locate your  driver and you seek an alternative method of transport without first contacting  APL to try and resolve the situation, you will be charged the tariff rate based  on the service booked.<br /> Our 24/7 contact number is +44 (0)208 688 7744</li>
                    </ul>
                    <h2 style={{ textDecoration: "underline", paddingBottom: "5px", marginBottom: "0px" }} >Hotel and address Pick-up Rules:</h2>
                    <ul>
                        <li><b>2.5</b> We allow a 15  minutes FREE waiting time at hotel and address pick-ups. </li>
                    </ul>
                    <h2 style={{ textDecoration: "underline", paddingBottom: "5px", marginBottom: "0px" }} >Cruise / Ferry Port Pickup Rules:</h2>
                    <ul>
                        <li><b>2.6</b> We allow 60  minutes free waiting time from the requested pickup time, at the Cruise and  Ferry Ports.</li>
                    </ul>
                    <h2 style={{ textDecoration: "underline", paddingBottom: "5px", marginBottom: "0px" }} >Eurostar and Station Pickup Rules:</h2>
                    <ul>
                        <li><b>2.7</b> “Eurostar”  arrivals:  driver will hold passenger name board 30 mins after train arrival time, and  there will be extra 30 mins FREE waiting time.</li>

                        <li><p>For domestic  trains, driver will hold passenger name board 5 mins after train arrival time,  and there will  be extra 30 mins FREE  waiting time.<br />
                            Except for the  airport pickups (rules indicated above), Once the FREE waiting times are up,  all other above mentioned pickups will be recorded as a no-show and invoiced as  normal.</p></li>
                    </ul>

                    <h2>3 general terms</h2>
                    <ul>
                        <li><b>3.1</b> APL cannot be held  responsible for any late arrival to destination, airport or cruise port. Hence  we will not accept any responsibility for missed flights or ships.</li>
                        <li><b>3.2</b> APL shall be under no  liability to the Customer whatsoever for any indirect loss and/or expense  (including loss of profit) suffered by the Customer arising out of a breach by  the Company of these terms and conditions.</li>
                        <li><b>3.3</b> In the event of any claim  against APL arising out of its performance of hire, the Company’s liability  shall be limited to a refund not exceeding the cost of the journey. Any other  payments will be entirely at the discretion of the Company.</li>
                        <li><b>3.4</b> APL will not accept late  bookings online (within 2 hours of transfer time)</li>
                        <li><b>3.5</b> APL accepts no  responsibility for any loss or damage to property, howsoever such loss or  damage may be caused. In the event of property being left in a vehicle, we will  gladly organise the return of such items if you cover the postage and packaging  costs.</li>
                        <li><b>3.6</b> All our vehicles are  non-smoking.</li>
                        <li><b>3.7</b> APL reserves the right to  charge £15 supplement to the passengers, in the event that the passengers  arrives with excess luggage and where this luggage will need to be placed  inside the vehicle (at driver discretion and consent)</li>
                        <li><b>3.8</b> APL will charge a vehicle  valeting fee of £60.00 for any damage of their vehicle made by customer (e.g.  vomiting, spilling liquid or food to the vehicle).</li>
                        <li><b>3.9</b> APL reserves the right to  refuse to transport any Passenger who behaves in a disorderly, threatening or  abusive manner.</li>
                        <li><b>3.10</b> APL reserves the right to  charge the Customer extra if customer wants to take a different route than  company route APL extra charge will be £1.50 per mile</li>
                        <li><b>3.11</b> PETS are allowed in our  certain vehicles. We apply a flat £15.00 vehicle valeting charge for such  bookings. Pet must travel within a safe cage or secure safety lease/harness  while in the vehicle.</li>
                    </ul>

                    <h2>4 Free child seats</h2>
                    <ul>
                        <li><b>4.1</b> APL will provide up to 2  child seats free of charge, for peace of mind guarantee, as by law London  private hire vehicles are exempt from this law. If the driver doesn’t provide  the correct child car seat, children can travel without one - but only if they  travel on a rear seat:<br />
                            and wear an adult seat belt if  they’re 3 or older<br />
                            without a seat belt if they’re  under 3<br />
                            A child can travel without a  child car seat in private hire vehicles.</li>
                    </ul>

                    <h2>5 Booking cancelletaion charges</h2>
                    <ul>
                        <li><b>5</b> Cancellation notice periods  and fees are as follows:</li>
                        <li><b>5.1</b> FREE cancellation if, cancellation made more than 12 hours before the transfer time; APL will only charge £10.00 administration fee for the Refund as this processing (interchange) fee, charged by Merchant account. </li>
                        <li><b>5.2</b>&nbsp;50% cancellation charge if cancellation made between 6 and 12 hours before delivery time.</li>
                        <li><b>5.3</b> 100% cancellation charge if cancellation made within 6 hours of delivery time.</li>
                        <li><b>5.4</b> REFUNDS could take up to 15 working days to process.</li>
                    </ul>
                    <h2>6 no-show charges</h2>
                    <ul>
                        <li><b>6.1</b> If customer does not show  up for a ride, we will apply the booking as no-show and will charge the full  amount of booking.</li>
                        <li><b>6.2</b> Waiting times and pickup rules are listed  on clause 2 of this Terms and Conditions. </li>
                    </ul>
                    <h2>7 non-solicitation of personal</h2>
                    <ul>
                        <li><b>7.1</b> If you wish to directly  hire or employ an APL driver, we reserve the right to levy a £5,000 fee to  cover the costs of recruiting and training the driver</li>
                    </ul>
                    <h2>8 payments</h2>
                    <ul>
                        <li><b>8.1</b> APL accepts Cash, PayPal  and most credit cards as a means of payment. There is no extra charge for  credit card payments.</li>
                        <li><b>8.2</b> Payments are secure: APL  does not store in any way your credit card details. Payments will be using  Secure Socket Layer (SSL) technology. Credit card numbers are protected with a  high level of encryption when transmitted over the Internet.<br />
                            Credit Card slips will show  “ Taxi Services” as merchant name</li>
                    </ul>
                </div>
            }



        </div>
    )
}

export default GeneralTerms