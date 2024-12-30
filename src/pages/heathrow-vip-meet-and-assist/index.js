import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./styles.module.scss"
import GlobalLayout from '../../components/layouts/GlobalLayout'
import { parse } from 'url';
import LeftSidebarInformation from '../../components/elements/LeftSidebarInformation'
import ShowcaseRight from './ShowcaseRight'
import DropDown from '../../components/elements/Dropdown/dropdown'
import DateInput from '../../components/elements/DateInput'
import { currentDate } from '../../helpers/getDates'
import { useRouter } from 'next/router';
import { meetAndGreetActions } from '../../store/meetAndGreetActions'
import store from '../../store/store'
import Loading from '../../components/elements/alert/Loading'
import { checkLanguageAttributeOntheUrl } from '../../helpers/checkLanguageAttributeOntheUrl'
import { fetchContent } from '../../helpers/fetchContent';


const buttonLabels = [
    { labelName: "strArrival", headingName: "strArrivalAirport", normalName: "Arrival" },
    { labelName: "strDeparture", headingName: "strDepartureAirport", normalName: "Departure" },
    { labelName: "strConnecting", headingName: "strConnectingAirport", normalName: "Connecting" }];


const HeathrowVipMeet = (props) => {
    let { metaTitle, keywords, metaDescription, shortDescription, pageTitle, pageContent, mainCanonicalUrl } = props

    const router = useRouter()
    const dispatch = useDispatch()
    //buttons
    let { bggray = false } = props;
    const { appData } = useSelector(state => state.initialReducer)

    const state = useSelector(state => state.pickUpDropOffActions)
    let { params: { direction, language } } = state

    const meetAndGreetState = useSelector(state => state.meetAndGreetActions)
    const [loadAlert, setLoadAlert] = useState(true)
    const [headingSelectedService, setHeadingSelectedService] = useState("strArrivalAirport")
    const [dropdownLabels, setDropdownLabels] = useState([`-- Select Terminal --`, 'Heathrow Terminal 2 ', 'Heathrow Terminal 3', 'Heathrow Terminal 4', "Heathrow Terminal 5"])
    useEffect(() => {
        // Check if the new label is not undefined or null
        const newSelectLabel = appData?.words["strSelectTerminal"];

        if (newSelectLabel) {
            // Update the first element of the dropdownLabels array
            setDropdownLabels(previousLabels => [
                `-- ${newSelectLabel} --`,
                ...previousLabels.slice(1) // This keeps the rest of the array items unchanged
            ]);
            dispatch({ type: "SET_TERMINAL", data: { newTerminal: `-- ${newSelectLabel} --` } })
        }

        //baslangcda terminali secirik book now tikliyrq
        //onnan sonra geri gelende yoxluyrug eger  --  yoxdursa demeli terminal name secilibdir ve oldugu kimi galacag
        //check as a string if 2 3 4 5 exist in that name or not
        if (/(2|3|4|5)/.test(meetAndGreetState?.terminalName) && meetAndGreetState?.terminalName?.length) {
            dispatch({ type: "SET_TERMINAL", data: { newTerminal: `-- ${meetAndGreetState?.terminalName} --` } })
        }
        if (loadAlert) {
            setTimeout(() => { setLoadAlert(false) }, 550);
        }

    }, [language]);


    if (!meetAndGreetState && loadAlert) {
        // Render a loading spinner or a placeholder
        store.injectReducer('meetAndGreetActions', meetAndGreetActions);
        setTimeout(() => { setLoadAlert(false) }, 550);
    }
    if (loadAlert) {
        return <GlobalLayout mainCanonicalUrl={mainCanonicalUrl} keywords={keywords} title={metaTitle} description={metaDescription} footerbggray={true}>
            <Loading bgImage={"/images/meetGreet/meetShowCase2.jpg"} />
        </GlobalLayout>
    }
    let { seatLists, meetgreetDate, meetgreetActiveBtn, selectedService, terminalName, seatListPrice } = meetAndGreetState

    const handleButtons = (params = {}) => {
        let { index, heading, normalName } = params
        setHeadingSelectedService(heading)
        dispatch({ type: "SET_MEET_GREET_ACTIVE_BTN", data: { activeBtnValue: index, newSelectedService: normalName } })
    }
    const onchangeDate = (e) => dispatch({ type: "SET_MEET_GREET_DATE", data: { dateValue: e.target.value } })
    const handleDecrement = (idx, incordec) => dispatch({ type: 'SET_SEATLISTS', data: { idx, incordec } })

    const handleIncrement = (idx, incordec) => dispatch({ type: 'SET_SEATLISTS', data: { idx, incordec } })
    const handleTerminalSelection = (option) => {
        dispatch({ type: "SET_TERMINAL", data: { newTerminal: option } })
    }


    const IsDropdownTextSelectionValid = () => /(2|3|4|5)/.test(terminalName)
    const handleBookNow = () => {
        if (IsDropdownTextSelectionValid()) {
            router.push(`${language === 'en' ? "/meetgreet" : `${language}/meetgreet`}`)
        }
    }



    return (
        <GlobalLayout mainCanonicalUrl={mainCanonicalUrl} keywords={keywords} title={metaTitle} description={metaDescription} footerbggray={true}>
            <div className={`${styles.vipmeet} ${direction} page`} bggray={String(bggray === "true")}>
                <div className={styles.showcase_column}>
                    <div className={styles.showcase_column_container}>
                        <div className={styles.showcase_column_container_content}>
                            <div className={styles.left}>
                                <div className={styles.form_div}>
                                    <h1>{appData?.words["strAirportVIPMeetGreetServices"]}</h1>
                                    <p className={styles.description}> {appData?.words["strSelectAndBookYourService"]}</p>
                                    <div className={styles.buttons}>
                                        {buttonLabels?.map((obj, index) => {
                                            let { labelName: label, headingName: heading, normalName } = obj
                                            return (
                                                //ref={buttonRefs[index]}
                                                <button key={index} direction={String(direction === 'rtl')} isactive={String(meetgreetActiveBtn === index)} onClick={() => handleButtons({ index, heading, normalName })} className={`btn`}  >
                                                    {/* {useRipple(buttonRefs[index])} */}
                                                    {appData?.words[label]}
                                                    {index === 0
                                                        ? (<i direction={String(direction === 'rtl')} className={`fa-solid fa-plane-arrival `}></i>)
                                                        : index === 1 ? (<i direction={String(direction === 'rtl')} className="fa-solid fa-plane-departure"></i>)
                                                            : (<i direction={String(direction === 'rtl')} className="fa-sharp fa-solid fa-circle-nodes"></i>)}
                                                </button>
                                            )
                                        })}
                                    </div>

                                    <div className={styles.arrivaldate_div}>
                                        <div className={styles.dropdown_div}>
                                            <DropDown headingStyle={{ fontSize: "15px", marginBottom: "-2px" }} heading={appData?.words[headingSelectedService]} options={dropdownLabels} selectedOption={terminalName} setSelectedOption={handleTerminalSelection} />
                                        </div>
                                        <div className={styles.date_picker_div}>
                                            <DateInput form_control_input_div_style={{ width: "100%", maxWidth: "100%" }} showIcon={true} headingStyle={{ fontSize: "15px", marginBottom: "-2px" }} value={meetgreetDate} min={currentDate()} title={appData?.words["strFlightDate"]} onChange={onchangeDate} />
                                        </div>
                                    </div>

                                    <div className={styles.adults_selection_div}>
                                        {seatLists?.map((item, index) => {
                                            return <div key={index} className={styles.adults_selection_div_column}>
                                                <p className={styles.name}> {appData?.words[item.strName]}</p>
                                                <p className={styles.desc}>  {appData?.words[item.strDesc]}</p>
                                                <div className={styles.adults_selection_div_column_numbers_div} direction={String(direction === 'rtl')}>
                                                    <p className={`${styles.left_arrow} ${(item.minNum === 0 && index !== 0 || item.minNum === 1 && index === 0) ? styles.disabled : ""}`} onClick={() => handleDecrement(index, "dec")}>
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

                                    {/* {IsDropdownTextSelectionValid() ? <div className={styles.price}> {appData?.words["strTotalPrice"]}: £{seatListPrice} inc. VAT</div> : <></>} */}
                                    {IsDropdownTextSelectionValid() ? <div className={styles.price}> {appData?.words["strTotalPrice"]}: £{seatListPrice} </div> : <></>}

                                    <div className={styles.booknow_div}>
                                        <button active={String(IsDropdownTextSelectionValid())} onClick={handleBookNow} className='btn'  >
                                            {appData?.words["strBookNow"]}
                                        </button>
                                    </div>

                                    <div className={styles.needhelp_text}>
                                        {/* Need Help Booking? */}
                                        <a href="tel:+442086887744" >{appData?.words["strClicktocall"]} +4402086887744</a>
                                    </div>
                                </div>
                            </div>
                            <ShowcaseRight />
                        </div>
                    </div>
                </div>
                <div className={`${styles.vipmeet_section} page_section`}>
                    <div className={`${styles.vipmeet_section_container} page_section_container`}>
                        <div className={styles.information_column}>
                            <div className={styles.left_content}>
                                {/* bura eftsidebar componentin normal div formasi yazilmisdi onu sadece reusable olsun deye tek sekilde yazdm */}
                                <LeftSidebarInformation direction={direction} appData={appData} />
                            </div>
                            <div className={styles.right_content}>
                                <div className={`${styles.vipmeet_footer}`}>

                                    <h1>{pageTitle}</h1>
                                    <ul className={styles.img_flex_ul}>
                                        <p style={{ listStyleType: "none" }}>
                                            {shortDescription}
                                            <br />
                                        </p>
                                        <p style={{ listStyleType: "none" }}>
                                            <img src="/images/meetGreet/meetCollective.jpg" alt="" />
                                        </p>
                                    </ul>
                                    <br />
                                    <div className={`${styles.page_content} `} dangerouslySetInnerHTML={{ __html: pageContent.replace("URL-to-Porter-Service", "/heathrow-porter-service") }} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GlobalLayout>
    )
}
export async function getServerSideProps({ req, res }) {
    let firstLoadLangauge = checkLanguageAttributeOntheUrl(req?.url)
    const { cookie } = req.headers;
    let { pathname } = parse(req?.url, true)
    let pathnameUrlWHenChangeByTopbar = pathname
    let pathNameUrlCanonical = "/heathrow-vip-meet-and-assist"

    let { metaTitle, keywords, pageContent, metaDescription, shortDescription, pageTitle, canonicalUrl: mainCanonicalUrl } =
        await fetchContent("/heathrow-vip-meet-and-assist", cookie, firstLoadLangauge, pathnameUrlWHenChangeByTopbar, pathNameUrlCanonical)
    return {
        props: { metaTitle, keywords, pageContent, metaDescription, shortDescription, pageTitle, mainCanonicalUrl }
    }
}
export default HeathrowVipMeet