import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from 'react'
import GlobalLayout from "../../components/layouts/GlobalLayout";
import styles from "./singletour.module.scss"
import { parse } from 'url';


import ReusableModal from "../../components/elements/ReusableModal";
import TourCardQuotation from "../../components/elements/TourCardQuotation";
import Slider from "../../components/elements/Slider";
import { useSelector } from "react-redux";
import { tourLinks } from "../../constants/tours";
import { fetchContent } from "../../helpers/fetchContent";
import { checkLanguageAttributeOntheUrl } from "../../helpers/checkLanguageAttributeOntheUrl";
import store from "../../store/store";

import { tourActions } from '../../store/tourActions'

import { Skeleton } from "../../components/elements/Skeleton";


// Function to get the title based on the link
function getTour(link) {
    return tourLinks.find(tour => tour.link === link);
}

const TourContentDetails = (props) => {
    let { metaTitle, keywords, metaDescription, pageContent } = props

    const router = useRouter();
    const informationDivRef = useRef(null);
    const { link: tourname } = router.query;
    const [shouldShowModal, setshouldShowModal] = useState(false)
    const [selectedTour, setSelectedTour] = useState("")
    const [index, setIndex] = React.useState(0);
    const [sliderItems, setsliderItems] = useState([])

    const [loadAlert, setLoadAlert] = useState(true)

    const tourActionState = useSelector(state => state.tourActions)

    const { appData } = useSelector(state => state.initialReducer)


    let stateReservation = useSelector((state) => state.pickUpDropOffActions)
    let { reservations, params: { direction,  language,  } } = stateReservation

    const gotoPreviousSlider = () => setIndex(index - 1)
    const gotoNextSlider = () => setIndex(index + 1)
    // Scroll to the information div when the button is clicked
    const handleButtonClick = () => informationDivRef.current.scrollIntoView({ behavior: 'smooth' });

    useEffect(() => {
        let tour = getTour(tourname)
        setSelectedTour(tour)
        setsliderItems(tour.images)
    }, [])
    useEffect(() => {
        if (loadAlert) {
            setTimeout(() => { setLoadAlert(false) }, 550);
        }
    }, [language]);
    useEffect(() => {
        const lastIndex = sliderItems.length - 1;
        if (index < 0) setIndex(lastIndex);
        if (index > lastIndex) setIndex(0);
    }, [index, sliderItems]);

    if (!tourActionState && loadAlert) {
        // Render a loading spinner or a placeholder
        store.injectReducer('tourActions', tourActions);
        setTimeout(() => { setLoadAlert(false) }, 550);
    }



    return (
        <GlobalLayout footerbggray={true} keywords={keywords} title={metaTitle} description={metaDescription}>

            <div className={`page ${styles.page} `}>
                <div className={`${styles.descriptions} `} style={{ marginBottom: "1.5rem" }}>
                    <div className={`${styles.description_container} page_section`}>
                        <div className={`page_section_container mb-2  ${styles.page_section_container}`} >
                            <div className={styles.links}>
                                <p >{appData?.words["strNavHome"]} </p>
                                <p > {`>`} </p>
                                <p >{appData?.words["strDailyTours"]} </p>
                                {loadAlert ? <></> : <p > {`>`} </p>}
                                {loadAlert ?
                                    "..."
                                    : <p >{appData?.words[selectedTour.translate]} </p>}
                            </div>

                        </div>
                    </div>
                </div>
                <div className={`page_section ${styles.page_section} `}  >
                    <div className={`page_section_container ${styles.page_section_container} `} style={{ display: "flex", flexDirection: "column" }} >

                        <div className={styles.left_content}>
                            {/*images display  none at the 700px =>for desktop visible*/}
                            <div className={`${styles.title_div} ${styles.title_div_mobile}`}>
                                <h1>{appData?.words[selectedTour.translate]} </h1>
                                <div className={styles.title_div_description}>
                                    <a href="https://www.reviews.co.uk/company-reviews/store/airport-pickups-london-com" target={"_blank"} title="Airport Pickups London Reviews" className={styles.reviews} rel="noreferrer"   >
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star-half-stroke"></i>
                                        <span>759 {appData?.words["strReviews"]}</span>
                                    </a>
                                </div>
                            </div>
                            <div className={styles.images}>
                                <div className={styles.images_content}>
                                    <div className={styles.gallery_grid}>
                                        {loadAlert ? <div style={{ width: "100%", height: "100%", background: "#eae6e6" }}>
                                            <Skeleton width={"100%"} height="100%" />
                                        </div> : <img src={sliderItems[0].img} alt={sliderItems[0].title} />}
                                    </div>
                                    <div className={styles.gallery_grid}>
                                        {loadAlert ? <div style={{ height: "200px", background: "#eae6e6" }}>
                                            <Skeleton width={"100%"} height="100%" />
                                        </div> : <img src={sliderItems[2].img} alt={sliderItems[2].title} />}


                                    </div>
                                    <div className={styles.gallery_grid}>

                                        {loadAlert ? <div style={{ height: "200px", background: "#eae6e6" }}>
                                            <Skeleton width={"100%"} height="100%" />
                                        </div> : <img src={sliderItems[3].img} alt={sliderItems[3].title} />}

                                    </div>
                                    <div className={styles.gallery_grid}>
                                        {loadAlert ? <div style={{ height: "200px", background: "#eae6e6" }}>
                                            <Skeleton width={"100%"} height="100%" />
                                        </div> : <img src={sliderItems[1].img} alt={sliderItems[1].title} />}

                                        <div className={styles.container_auto_center}>
                                            <div className={styles.intro}>
                                                <button className="btn" onClick={() => setshouldShowModal(true)}>
                                                    See All Photos
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.content} ref={informationDivRef}>
                                {/*display block at the 700px =>for mobile visible*/}
                                <div className={styles.slider}>
                                    {loadAlert ? <div style={{ width: "100%", height: "300px", background: "#eae6e6" }}>
                                        <Skeleton width={"100%"} height="100%" />
                                    </div> : <Slider setshouldShowModal={setshouldShowModal} index={index} gotoPreviousSlider={gotoPreviousSlider} gotoNextSlider={gotoNextSlider} sliderItems={sliderItems} />}
                                </div>
                                <ReusableModal shouldShowModal={shouldShowModal} onRequestClose={() => { setshouldShowModal(false) }} >
                                    <Slider gotoPreviousSlider={gotoPreviousSlider} gotoNextSlider={gotoNextSlider} insideModal={true} index={index} sliderItems={sliderItems} />
                                    <div className={styles.navigation_modal_slider}>
                                        <span className={styles.prev_btn} onClick={gotoPreviousSlider}>
                                            <i className="fa-solid fa-chevron-left"></i>
                                        </span>
                                        <span className={styles.next_btn} onClick={gotoNextSlider}>
                                            <i className="fa-solid fa-chevron-right"></i>
                                        </span>
                                    </div>
                                </ReusableModal>
                                <div className={styles.title}>
                                    <div className={styles.title_div}>
                                        {loadAlert ? <h1>
                                            <div style={{ width: "100%", height: "100%", background: "#eae6e6" }}>
                                                <Skeleton width={"100%"} height="100%" />
                                            </div>
                                        </h1> : <h1>{appData?.words[selectedTour.translate]} </h1>}
                                        <div className={styles.title_div_description}>
                                            <a href="https://www.reviews.co.uk/company-reviews/store/airport-pickups-london-com" target={"_blank"} title="Airport Pickups London Reviews" className={styles.reviews} rel="noreferrer"   >
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star-half-stroke"></i>
                                                <span>759 {appData?.words["strReviews"]}</span>
                                            </a>

                                        </div>
                                    </div>
                                    <div className={styles.price_btn_div}>
                                        <div className={styles.price_div}>
                                            {appData?.words["strStartFrom"]}
                                            {loadAlert ?
                                                <span style={{ width: "100%", height: "100%", background: "#eae6e6" }}>
                                                    <Skeleton width={"100%"} height="100%" />
                                                </span>
                                                : <span >£ {selectedTour.price}</span>}
                                        </div>

                                        <button className="btn" onClick={handleButtonClick} >
                                            Select Car
                                            <i className="fa-solid fa-arrow-down"></i>
                                        </button>
                                    </div>
                                </div>
                                <h3 className={styles.snapshot_title}>
                                    Tour Snapshot
                                </h3>
                                <div className={styles.snapshot_icons_content}>

                                    <div className={styles.snapshot_icons_div}>
                                        <i className="fa-solid fa-clock"></i>
                                        <div className={styles.snapshot_icons_div_description}>
                                            {appData?.words["strDuration"]}:<br /> {loadAlert ? "..." : selectedTour.duration?.split(" ")[0]} {appData?.words["strHours"]}
                                        </div>
                                    </div>

                                    <div className={styles.snapshot_icons_div}>
                                        <i className="fa-solid fa-user-group"></i>
                                        <div className={styles.snapshot_icons_div_description}>
                                            Private tour
                                        </div>
                                    </div>


                                    <div className={styles.snapshot_icons_div}>
                                        <i className="fa-solid fa-route"></i>
                                        <div className={styles.snapshot_icons_div_description}>
                                            Flexible Itinerary
                                        </div>
                                    </div>

                                    <div className={styles.snapshot_icons_div}>
                                        <i className="fa-solid fa-square-check"></i>
                                        <div className={styles.snapshot_icons_div_description}>
                                            {appData?.words["strFreeCancellation24h"]}
                                        </div>
                                    </div>
                                </div>
                                {loadAlert ? <></> : <TourCardQuotation transferDateTime={reservations[0]?.transferDetails?.transferDateTimeString} language={language} index={0} selectedQuotation={reservations[0]?.quotation} quotationOptions={selectedTour.quotationOptions} direction={direction} selectedTour={selectedTour} />}
                            </div>
                            <div className={`${styles.page_content} `} dangerouslySetInnerHTML={{ __html: pageContent }} />
                        </div>


                    </div>
                </div>
            </div>
        </GlobalLayout>

    )
}
const extractTourPath = async (url) => {
    let languages = ['/tr', '/es', '/it', '/ar', '/zh', '/ru', '/en']
    // Check if the URL ends with '.json'
    if (url.endsWith('.json')) {
        // Extract the path between 'tours/' and '.json'
        const match = url.match(/tours\/(.*?)\.json/);
        if (match && match[1]) {
            return `/tours/${match[1]}`;
        }
    } else if (url.startsWith('/tours')) {
        // The URL is already in the desired format
        return url;
    } else {
        // New condition to handle URLs containing language codes
        for (const lang of languages) {
            if (url.includes(lang)) {
                // Remove the language code from the URL and return the modified URL
                return url.replace(lang, '');
            }
        }
    }

}

export async function getServerSideProps({ req, query }) {
    let firstLoadLangauge = checkLanguageAttributeOntheUrl(req?.url)
    const { cookie } = req.headers;
    let { pathname } = parse(req?.url, true)
    // Determine the section based on the query parameter
    let pathnameUrlWHenChangeByTopbar = pathname
    let contentPath = await (extractTourPath(pathname));
    let { metaTitle, keywords, pageContent, metaDescription } = await fetchContent(contentPath, cookie, firstLoadLangauge, pathnameUrlWHenChangeByTopbar)
    let schemas = []
    return {
        props: { metaTitle, keywords, pageContent, metaDescription, schemas }

    }
}

export default TourContentDetails;
