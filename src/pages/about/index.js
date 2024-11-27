import React, { useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import { SET_SELECT_ACTIVE_LINK } from "../../store/pickUpDropOffReducer/pickUpDropTypes";
import { useDispatch } from "react-redux";
import styles from "./styles.module.scss";
import BreadCrumb from "../../components/elements/breadCrubm";
import HappyCustomer from "../../components/widgets/HappyCustomer";
const About = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: SET_SELECT_ACTIVE_LINK,
      payload: "about",
    });
  }, []);

  return (
    <Layout
      title="London  About London Heathrow Taxi"
      keywords="Heathrow taxi info"
      description="Information about London Heathrow taxi service..  "
    >
      <div className={`page ${styles.about_page}`}>
        <BreadCrumb title="" />
        <div className={`page_section ${styles.about_page_section}`}>
          <div
            className={`page_section_container ${styles.about_page_section_container}`}
          >
            <h1 className={styles.title}>About Us</h1>
            <p className={styles.part_one}>
              <strong>
                <em>London Heathrow Taxi&nbsp;</em>
              </strong>
              <strong>
                <em>is a dedicated provider of&nbsp;</em>
              </strong>
              <strong>
                <em>Heathrow-Central London transfer&nbsp;services</em>
              </strong>
              <strong>
                <em>. In addition, we offer&nbsp;</em>
              </strong>
              <strong>
                <em>cheap Heathrow hotel minicabs&nbsp;</em>
              </strong>
              <strong>
                <em>and&nbsp;</em>
              </strong>
              <strong>
                <em>transfers services between terminals at London Heathrow</em>
              </strong>
              <strong>
                <em>.</em>
              </strong>
            </p>
            <p className={styles.part_two}>
              <em>Searching for&nbsp;</em>
              <em>Heathrow transfer quotes</em>
              <em>
                &nbsp;on the internet can be overwhelming and exhausting.&nbsp;
              </em>
              <em>London Heathrow Taxi Ltd&nbsp;</em>
              <em>
                is located right beside the airport and boasts one of the
                largest fleets of minicabs&nbsp;
              </em>
              <em>at Heathrow</em>
              <em>.</em>
            </p>
            <p>
              We offer straightforward, all-inclusive,&nbsp;cheap transfer
              services from Heathrow Airport. London Heathrow Taxi Ltd is fully
              licensed, with comfortable, modern cars. We provide a very high
              standard of service and reliability.
            </p>
            <p>
              The benefits of booking your Heathrow Airport transfer through us
              include:
            </p>
            <ul className={`ml_3 ul_disc ${styles.ul_one}`}>
              <li>
                Fully inclusive, flat rate fares with no hidden extras to pay.
                One-way fares starting from:
              </li>
            </ul>
            <p className={styles.some}>
              &nbsp;<strong>SOME OF&nbsp;OUR PRICES</strong>
            </p>
            <p className={styles.p_list}>
              <strong>
                -&nbsp;&nbsp;&nbsp;Heathrow Airport – Central London transfer
                from £37.00.{" "}
              </strong>
              <strong>
                -&nbsp;&nbsp;&nbsp;Central London – Heathrow
                Airport&nbsp;transfer&nbsp;from £30.
              </strong>
              <strong>
                -&nbsp;&nbsp;&nbsp;Transfer between terminals at Heathrow, £19.
              </strong>
              <strong>
                -&nbsp;&nbsp;&nbsp;Heathrow Airport – Heathrow
                hotel&nbsp;transfer&nbsp;, £12.
              </strong>
              <strong>
                -&nbsp;&nbsp;&nbsp;Heathrow hotel to Heathrow
                Airport&nbsp;transfer&nbsp;, £9.
              </strong>
            </p>
            <ul className={`${styles.long_ul} ul_disc ml_3`}>
              <li>
                High service standards –&nbsp;London Heathrow Taxi Ltd is punctual,
                reliable, fully licensed, English-speaking drivers and boasts a
                large fleet of modern cars.&nbsp;
              </li>
              <li>
                Prices include: airport meet and greet, 30 minutes’ free waiting
                time, parking and tolls. Once we’ve provided you with your
                no-obligation&nbsp;Heathrow Airport transfer quote, there will
                be nothing more to pay.&nbsp;
              </li>
              <li>
                We are based right beside Heathrow and we know the airport, the
                local area and Central London inside-out, ensuring a speedy and
                fuss-free&nbsp;Heathrow transfer service.&nbsp;
              </li>
              <li>
                A host of specialist services for your convenience, including a
                Business Class&nbsp;Heathrow transfer service, using Mercedes S
                and E class cars. In addition, we provide complimentary baby and
                child seats for all our&nbsp;Heathrow private car
                transfers&nbsp;should you request this at the time of booking.
                We will also need to know the age(s) of your child(ren).&nbsp;
              </li>
              <li>
                Our offices are open 24 hours a day, 365 days of the year. You
                can be sure of a friendly and helpful voice at the end of the
                line should you wish to obtain a&nbsp;Heathrow transfer
                quote&nbsp;or ask us a question about an existing booking.&nbsp;
              </li>
              <li>
                A high proportion of&nbsp;London Heathrow Taxi Ltd's customers go on
                to become regular users of our&nbsp;Heathrow Airport transfer
                service. That’s because we take away all the stress and
                uncertainty of booking an airport private car.&nbsp;
              </li>
              <li>
                Convinced? Call us today to book your&nbsp;cheap Heathrow
                transfer . We’re available on 020 3887 3844&nbsp;(+44 (0)20 3887
                3844&nbsp;if calling from outside the UK). In addition to flat
                rate fares for our most popular services, we can accommodate
                pretty much any&nbsp;Heathrow Airport transfer need.&nbsp;{" "}
                <br /> London Heathrow Taxi Ltd is based at: Orega Offices, 4 Longwalk Road, Uxbridge, United Kingdom, UB11 1FE&nbsp; <br />{" "}
                <strong>
                  <em>London Heathrow Taxi Ltd&nbsp;</em>
                </strong>
                <strong>
                  <em>is a&nbsp;</em>
                </strong>
                <strong>
                  <em>true Heathrow Airport transfer specialist</em>
                </strong>
                <strong>
                  <em>
                    , offering straightforward fares and a reliable service.
                  </em>
                </strong>
              </li>
            </ul>
            <p>&nbsp;</p>
          </div>
        </div>
        <HappyCustomer aboutPage={true} />
      </div>
    </Layout>
  );
};

export default About;
