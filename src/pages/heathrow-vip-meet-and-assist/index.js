import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./styles.module.scss"
import Layout from '../../components/layouts/Layout/index'
import ShowcaseRight from './ShowcaseRight'
import useRipple from '../../hooks/useRipple'
import DropDown from '../../components/elements/Dropdown/dropdown'
import DateInput from '../../components/elements/DateInput'
import { currentDate } from '../../helpers/getDates'
import { useRouter } from 'next/router'
let description = " VIP Meet and Assist service includes meet by the plane door and assist the passenger to final detsination."
let title = "VIP Meet and assist at Heathrow Airport"
let keywords = "VIP Meet and assist"
const buttonLabels = ['Arrival', 'Departure', 'Connecting'];
const dropdownLabels = ["-- Select Terminal --", 'Heathrow Terminal 2 ', 'Heathrow Terminal 3', 'Heathrow Terminal 4', "Heathrow Terminal 5"];

const HeathrowVipMeet = ({ data }) => {
    const meetAndGreetState = useSelector(state => state.meetAndGreetActions)
    let { seatLists, meetgreetDate, meetgreetActiveBtn, selectedService, terminalName, seatListPrice } = meetAndGreetState

    const router = useRouter()
    const dispatch = useDispatch()

    //buttons
    const buttonRefs = [useRef(null), useRef(null), useRef(null)];


    const handleButtons = (index) => dispatch({ type: "SET_MEET_GREET_ACTIVE_BTN", data: { activeBtnValue: index, newSelectedService: `${buttonLabels[index]} Airport` } })
    const onchangeDate = (e) => dispatch({ type: "SET_MEET_GREET_DATE", data: { dateValue: e.target.value } })
    const handleDecrement = (idx, incordec) => dispatch({ type: 'SET_SEATLISTS', data: { idx, incordec } })
    const handleIncrement = (idx, incordec) => dispatch({ type: 'SET_SEATLISTS', data: { idx, incordec } })
    const handleTerminalSelection = (option) => dispatch({ type: "SET_TERMINAL", data: { newTerminal: option } })


    const IsDropdownTextSelectionValid = () => dropdownLabels.slice(1).includes(terminalName)
    const handleBookNow = () => {
        if (IsDropdownTextSelectionValid()) {
            router.push("/meetgreet")
        }
    }

    return (
        <Layout keywords={keywords} title={title} description={description} loggedIn={data}>
            <div className={`${styles.vipmeet} page`}>
                <div className={`${styles.showcase_column}`}>
                    <div className={styles.showcase_column_container}>
                        <div className={styles.showcase_column_container_content}>
                            <div className={styles.left}>
                                <div className={styles.form_div}>
                                    <h1>Airport Meet & Greet Services</h1>
                                    <p className={styles.description}>select and book your service</p>
                                    <div className={styles.buttons}>
                                        {buttonLabels.map((label, index) => (
                                            // eslint-disable-next-line react/no-unknown-property
                                            <button key={index} ref={buttonRefs[index]} isactive={String(meetgreetActiveBtn === index)} onClick={() => handleButtons(index)} className={`btn`}  >
                                                {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
                                                {useRipple(buttonRefs[index])}
                                                {label}
                                                {index === 0
                                                    ? (<i className={`fa-solid fa-plane-arrival `}></i>)
                                                    : index === 1 ? (<i className="fa-solid fa-plane-departure"></i>)
                                                        : (<i className="fa-sharp fa-solid fa-circle-nodes"></i>)}
                                            </button>
                                        ))}
                                    </div>

                                    <div className={styles.arrivaldate_div}>
                                        <div className={styles.dropdown_div}>
                                            <DropDown headingStyle={{ fontSize: "15px", marginBottom: "2px" }} heading={selectedService} options={dropdownLabels} selectedOption={terminalName} setSelectedOption={handleTerminalSelection} />
                                        </div>
                                        <div className={styles.date_picker_div}>
                                            <DateInput showIcon={false} headingStyle={{ fontSize: "15px", marginBottom: "2px" }} value={meetgreetDate} min={currentDate()} title="Flight Date" onChange={onchangeDate} />
                                        </div>
                                    </div>


                                    <div className={styles.adults_selection_div}>
                                        {seatLists.map((item, index) => {
                                            return <div key={index} className={styles.adults_selection_div_column}>
                                                <p className={styles.name}> {item.name}</p>
                                                <p className={styles.desc}>  {item.desc}</p>
                                                <div className={styles.adults_selection_div_column_numbers_div} >
                                                    <p className={`${styles.left_arrow} ${item.minNum === 0 ? styles.disabled : ""}`} onClick={() => handleDecrement(index, "dec")}>
                                                        <i className="fa-solid fa-chevron-left"></i>
                                                    </p>
                                                    <p className={styles.number}>  {item.minNum}  </p>
                                                    <p className={`${styles.right_arrow} `} onClick={() => handleIncrement(index, "inc")}>
                                                        <i className="fa-solid fa-chevron-right"></i>
                                                    </p>
                                                </div>
                                            </div>
                                        })}
                                    </div>

                                    {IsDropdownTextSelectionValid() ? <div className={styles.price}> Total: £{seatListPrice} inc. VAT</div> : <></>}

                                    <div className={styles.booknow_div}>
                                        {/* eslint-disable-next-line react/no-unknown-property */}
                                        <button active={String(IsDropdownTextSelectionValid())} onClick={handleBookNow} className='btn'  >
                                            Book Now
                                        </button>
                                    </div>


                                    <div className={styles.needhelp_text}>
                                        <a href="tel:+442086887744" >Click to call +4402086887744</a>
                                    </div>
                                </div>
                            </div>
                            <ShowcaseRight />
                        </div>
                    </div>
                </div>
                <div className={`${styles.meet_text_section} page_section`}>
                    <div className={`${styles.meet_text_section_container} page_section_container`}>
                        <div className={styles.information_column}>
                            <div className={styles.right_content}>
                                <div className={`${styles.vipmeet_header}`}>
                                    <h1>{`Start Your Journey with a Smile."Meet, Greet, and Fly with Ease."`}</h1>
                                    <p>For bookings and information please email us at   <a style={{ fontWeight: "500" }} href="mailto: info@aplcars.com"> info@aplcars.com</a>
                                    </p>
                                </div>
                                &nbsp;
                                <div className={`${styles.vipmeet_footer}`}>

                                    <h2>{`Heathrow's Premier Personal Assistance Service`}</h2>
                                    <ul className={styles.img_flex_ul}>
                                        <li >
                                            {` Navigating a bustling international airport like Heathrow can be overwhelming,
                                            especially after a long flight. Whether you're a seasoned traveler or on your first
                                            international journey, our Heathrow Meet and Assist service ensures a seamless and stress-free experience.`}
                                            <br />


                                        </li>

                                        <li>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src="/images/meetGreet/meetCollective.jpg" alt="" />
                                        </li>
                                    </ul>

                                    <br />
                                    <h2>From the Airplane Door to Beyond</h2>
                                    <ul className={styles.img_flex_ul}>
                                        <li>
                                            {`Our dedicated agents will be waiting
                                            for you as soon as you step off the plane.
                                            With a friendly smile and an in-depth knowledge
                                            of Heathrow's layout and procedures, we'll ensure you feel taken care of from the moment you land.`}
                                        </li>

                                        <li>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src="/images/meetGreet/meetGroup2.jpg" alt="" />

                                        </li>
                                    </ul>
                                    <br />
                                    <h2>Swift Passport Control</h2>

                                    <ul className={styles.img_flex_ul}>
                                        <li>
                                            Avoid the long queues and uncertainty at Passport Control.
                                            With our Meet and Assist service, our agents will guide you through a
                                            streamlined process, making sure all your documentation is in order and assisting with any questions or concerns.
                                        </li>

                                        <li>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src="/images/meetGreet/passControl2.jpeg" alt="" />

                                        </li>
                                    </ul>



                                    <br />
                                    <h2>
                                        Hassle-Free Baggage Claim
                                    </h2>
                                    <ul className={styles.img_flex_ul}>
                                        <li>
                                            No more waiting around or searching for your luggage. Our team will assist you at the baggage claim area, ensuring that you retrieve all your belongings quickly and efficiently.
                                        </li>

                                        <li>


                                        </li>
                                    </ul>
                                    <br />
                                    <br />
                                    <h2>Why Choose Our Meet and Assist Service?</h2>
                                    <ul className={styles.img_flex_ul}>
                                        <li>
                                            <ul className={styles.li_circle_ul}>
                                                <li className={styles.li_circle}>Personalized Service: Our agents are trained to cater to your specific needs, ensuring a tailor-made experience every time.</li>
                                                <li className={styles.li_circle}>Time-Saving: Navigate the airport quickly and efficiently, maximizing your time for what truly matters.</li>
                                                <li className={styles.li_circle}>Peace of Mind: Travel can be stressful. Let us handle the complexities of the airport while you relax and enjoy the journey.</li>
                                                <li className={styles.li_circle}>Take them to the VIP lounge if they have a booking (time permitting) and then escort them to the aircraft of the connecting flight.</li>
                                                <br />
                                                {`Join the hundreds of travelers who start their journey with a smile, knowing they're in capable hands. Choose Heathrow Meet and Assist for a smoother, more enjoyable travel experience.`}
                                            </ul>
                                        </li>

                                        <li>

                                        </li>
                                    </ul>

                                    <br />
                                    <h2>Porter Service</h2>
                                    <ul>
                                        {/* <li>For porter service please visit our  <a style={{ fontWeight: "500" }} href="/heathrow-porter-service">Porter page</a></li> */}
                                        <li>For porter service please visit our  Porter page</li>
                                    </ul>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default HeathrowVipMeet;
export async function getServerSideProps({ req, res }) {
    let verify = req.cookies["user-id"];
    return {
        props: {
            data: verify,
        },
    };
}
