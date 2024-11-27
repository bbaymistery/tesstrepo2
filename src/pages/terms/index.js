import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import BreadCrumb from "../../components/elements/breadCrubm";
import Layout from "../../components/layouts/Layout";
import HappyCustomer from "../../components/widgets/HappyCustomer";
import { SET_SELECT_ACTIVE_LINK } from "../../store/pickUpDropOffReducer/pickUpDropTypes";
import styles from "./styles.module.scss";
const Terms = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: SET_SELECT_ACTIVE_LINK,
      payload: "terms",
    });
  }, []);
  return (
    <Layout
      title="London  Heathrow Taxi Terms and Conditions"
      keywords="Heathrow taxi terms and conditions"
      description="Terms for London Heathrow taxi service."
    >
      <div className={`page ${styles.terms_page}`}>
        <BreadCrumb title="" />

        <div className={`page_section ${styles.terms_page_section}`}>
          <div
            className={`page_section_container ${styles.terms_page_section_container}`}
          >
            <h1 className={styles.title}>BOOKING TERMS & CONDITIONS</h1>
            <div className={styles.text_content_div}>
              <p>
                We are London Heathrow Taxi, a company registered in England and Wales whose registered address is located at Orega Offices, 4 Longwalk Road, Uxbridge, United Kingdom, UB11 1FE  ("LHT", "we", “our” or "us").
                <br />
                LHT provides taxi transport services to/from London Heathrow Airport all terminals to London and other UK destinations.
              </p>
              <h2>Definitions</h2>
              <ul>
                <li>
                  <strong>Meet &amp; Greet </strong> river holds name board by the arrival gates.
                </li>
                <li>
                  <strong>Requested Pickup time:</strong>&nbsp;  Once flight has landed, there will be a passport control and baggage claim.
                  <br />We are asking customers the approximate clearing times from the customs.  As guidance this time is 15 mins for domestic flights and 60 minutes for international flights.
                </li>
                <li>
                  <strong> Waiting time: </strong>Time calculated after requested pickup time which the driver holds name board inside the terminal.
                </li>
                <li>
                  <strong>Additional Charges: </strong> After 30 mins Free waiting time ends, we reflect the cost of Heathrow car parking charges. These charges are defined at clause 6 of this terms and conditions.
                </li>
              </ul>
              <h2>Booking Terms</h2>
              <ul>
                <li>
                  <strong>1-</strong>  Prices on the website are FIXED & All Inclusive Prices <br />

                  <strong>
                    2-
                  </strong>   Meet & Greet included the prices. (Our driver will hold the passenger name board by arrival barriers) 30 Minutes waiting time is included the prices
                  <br />
                  <strong>3-</strong> All taxes, road tolls <br />
                  <strong>4-</strong> LHT does not charge for flight delays.<br />
                  <strong>5-</strong> We use real-time airline data to track the flight landing times <br />
                  <strong>6-</strong> After requested pickup time, and FREE 30 minutes wating time ends, we reflect the cost of Heathrow parking to the customer as an additional.Charges are as below. <br />

                </li>



                <table >
                  <thead>
                    <tr>
                      <th >Duration</th>
                      <th>Charge</th>
                    </tr>

                  </thead>
                  <tbody>
                    <tr>
                      <td>0 - 15 minutes</td>
                      <td>£10.00</td>
                    </tr>
                    <tr>
                      <td>15 - 30 minutes</td>
                      <td>£15.00</td>
                    </tr>
                    <tr>
                      <td>30 - 45 minutes</td>
                      <td>£20.00</td>
                    </tr>
                    <tr>
                      <td>45 - 60 minutes</td>
                      <td>£25.00</td>
                    </tr>
                    <tr>
                      <td>60 - 90 Minutes</td>
                      <td>£35.00</td>
                    </tr>
                  </tbody>
                </table>

                <li>
                  <strong>7-</strong> In case of not meet with the driver,  please call us immediately, if you leave  the terminal we will register the booking as no-show and charge full.<br />
                  <strong>8-</strong> For Hotel transfers, we allow a 15 minutes FREE waiting time. <br />
                  <strong>9-</strong> For Cruise or  Ferry Port: We allow 30 minutes free waiting by the disembarking gate. <br />
                  <strong>10-</strong> Eurostar and Station meeting: “Eurostar” arrivals: driver will hold passenger name board 30 mins after train arrival time, and there will be extra 30 mins FREE waiting time. <br />
                  <strong>11-</strong> LHT cannot be held responsible for any late arrival to destination, airport or cruise port.Hence we will not accept any responsibility for missed flights or ships.LHT shall be under no liability to the Customer whatsoever for any indirect loss and/or expense (including loss of profit) suffered by the Customer arising out of a breach by the Company of these terms and conditions.  In the event of any claim against LHT arising out of its performance of hire, the Company’s liability shall be limited to a refund not exceeding the cost of the journey. Any other payments will be entirely at the discretion of the Company.<br />
                  <strong>12-</strong> LHT accepts no responsibility for any loss or damage to property, howsoever such loss or damage may be caused. In the event of property being left in a vehicle, we will gladly organise the return of such items if you cover the postage and packaging costs.
                  Any vomiting, spilling liquid or food to the vehicle, LHT will charge £80.00 for valeting.<br />
                  <strong>13-</strong>LHT reserves the right to charge £15 supplement to the passengers, in the event that the passengers arrives with excess luggage and where this luggage will need to be placed inside the vehicle (at driver discretion and consent)<br />
                  
                </li>
              </ul>
              <h2>Free Child Seats</h2>
              <ul>
                <li>
                  <strong>14-</strong> LHT will provide up to 1 child seat for Saloon, 2 child seat for MPV and 4 child seat for 8 seater minubus free of charge,
                </li>
              </ul>
              <h2>Booking Cancellation Charges</h2>
              <ul>
                <li style={{ listStyle: "inside", marginLeft: '1.5rem' }}>
                  FREE cancellation if, cancellation made more than 12 hours before the transfer time; LHT will only charge £10.00 administration fee for the Refund as merchant processing) fee. Refunds may take upto 5 working days.
                </li>
                <li style={{ listStyle: "inside", marginLeft: '1.5rem' }}>


                  50% cancellation charge if cancellation made between 6 and 12 hours before delivery time.
                </li>
                <li style={{ listStyle: "inside", marginLeft: '1.5rem' }}>


                  100% cancellation charge if cancellation made within 6 hours of delivery time.
                </li>
              </ul>
              <h2>No-Show Charges</h2>
              <ul>
                <li>
                  <strong>15-</strong> If customer does not show up for a ride, we will apply the booking as no-show and will charge the full amount of booking.
                  Waiting times and pickup rules are listed on clause 2 of this Terms and Conditions.
                </li>

              </ul>
              <h2>Payments</h2>
              <ul>
                <li>
                  <strong>16-</strong>  LHT accepts Cash, PayPal , Apple Pay, Google Pay and all other major credit cards.
                  Credit Card slips will show “Taxi Services” as merchant name
                </li>
              </ul>
            </div>
            <p>&nbsp;</p>
          </div>
        </div>
        <HappyCustomer aboutPage={true} />
      </div>
    </Layout>
  );
};

export default Terms;
