import React, { useEffect, useRef, useState } from 'react'
import GlobalLayout from "../../components/layouts/GlobalLayout";
import styles from "./singletour.module.scss"
import { parse } from 'url';
import ReusableModal from "../../components/elements/ReusableModal";
import TourCardQuotation from "../../components/elements/TourCardQuotation";
import Slider from "../../components/elements/Slider";
import { useSelector } from "react-redux";
import { checkLanguageAttributeOntheUrl } from "../../helpers/checkLanguageAttributeOntheUrl";
import store from "../../store/store";
import { tourActions } from '../../store/tourActions'
import { Skeleton } from "../../components/elements/Skeleton";
import { parseCookies } from "../../helpers/cokieesFunc";
import Error404 from '../404/index'
import { fetchConfig } from '../../resources/getEnvConfig';




const TourContentDetails = (props) => {

    if (props.data === 'not found') {
        return <Error404 />
    }
    let { env } = props
    let {
        duration,
        headTitle,
        keywords,
        metaDescription,
        pageContent,
        breadcrumbTitle,
        thumbnailTitle,
        pageTitle,
        review,
        quotationOptions,
        images,
        snapshots,
        shortDescription
    } = props.toursDatas

    const informationDivRef = useRef(null);
    const [shouldShowModal, setshouldShowModal] = useState(false)
    const [index, setIndex] = React.useState(0);
    const [sliderItems, setsliderItems] = useState([])
    const [loadAlert, setLoadAlert] = useState(true)
    const tourActionState = useSelector(state => state.tourActions)
    const { appData } = useSelector(state => state.initialReducer)
    let stateReservation = useSelector((state) => state.pickUpDropOffActions)
    let { reservations, params: { direction, language, } } = stateReservation

    const gotoPreviousSlider = () => setIndex(index - 1)
    const gotoNextSlider = () => setIndex(index + 1)
    // Scroll to the information div when the button is clicked
    const handleButtonClick = () => informationDivRef.current.scrollIntoView({ behavior: 'smooth' });

    useEffect(() => {
        setsliderItems(images)
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

    //quotationOptions[0].price

    return (
        <GlobalLayout footerbggray={true} keywords={keywords} title={headTitle} description={metaDescription}>

            <div className={`page ${styles.page} `}>
                <div className={`${styles.descriptions} `} style={{ marginBottom: "1.5rem" }}>
                    <div className={`${styles.description_container} page_section`}>
                        <div className={`page_section_container mb-2  ${styles.page_section_container}`} >
                            <div className={styles.links}>
                                <p>
                                    <a href="/">{appData?.words["strNavHome"]}</a>
                                </p>
                                <p> {`>`} </p>
                                <p>
                                    <a href="/tours">
                                        {breadcrumbTitle}
                                    </a>
                                </p>
                                {loadAlert ? <></> : <p > {`>`} </p>}
                                {loadAlert ? "..." : <p >{thumbnailTitle} </p>}
                            </div>

                        </div>
                    </div>
                </div>
                <div className={`page_section ${styles.page_section} `}  >
                    <div className={`page_section_container ${styles.page_section_container} `} style={{ display: "flex", flexDirection: "column" }} >

                        <div className={styles.left_content}>
                            {/*images display  none at the 700px =>for desktop visible*/}
                            <div className={`${styles.title_div} ${styles.title_div_mobile}`}>
                                <h1>{pageTitle} </h1>
                                <div className={styles.title_div_description}>
                                    <a href="https://www.reviews.co.uk/company-reviews/store/airport-pickups-london-com" target={"_blank"} title="Airport Pickups London Reviews" className={styles.reviews} rel="noreferrer"   >
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star-half-stroke"></i>
                                        <span>{review} {appData?.words["strReviews"]}</span>
                                    </a>
                                </div>
                            </div>
                            <div className={styles.images}>
                                <div className={styles.images_content}>
                                    {Array.isArray(sliderItems) && sliderItems.slice(0, 4).map((item, index) => (
                                        <div key={index} className={styles.gallery_grid}>
                                            {loadAlert ? (
                                                <div style={{ height: index === 0 ? "100%" : "200px", background: "#eae6e6" }}>
                                                    <Skeleton width={"100%"} height="100%" />
                                                </div>) : (<img src={item} alt={item} />)}
                                            {/* If it's the last item, render the button */}
                                            {index === 3 && (
                                                <div className={styles.container_auto_center}>
                                                    <div className={styles.intro}>
                                                        <button className="btn" onClick={() => setshouldShowModal(true)}>
                                                           {appData?.words["strSeeAllPhotos"]}
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/*display block at the 700px =>for mobile visible*/}
                            <div className={styles.content} ref={informationDivRef}>
                                <div className={styles.slider}>
                                    {loadAlert ? <div style={{ width: "100%", height: "300px", background: "#eae6e6" }}>
                                        <Skeleton width={"100%"} height="100%" />
                                    </div> : <Slider appData={appData} setshouldShowModal={setshouldShowModal} index={index} gotoPreviousSlider={gotoPreviousSlider} gotoNextSlider={gotoNextSlider} sliderItems={sliderItems} />}
                                </div>
                                <ReusableModal shouldShowModal={shouldShowModal} onRequestClose={() => { setshouldShowModal(false) }} >
                                    <Slider appData={appData} gotoPreviousSlider={gotoPreviousSlider} gotoNextSlider={gotoNextSlider} insideModal={true} index={index} sliderItems={sliderItems} />
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
                                        </h1> : <h1>{pageTitle} </h1>}
                                        <div className={styles.title_div_description}>
                                            <a href="https://www.reviews.co.uk/company-reviews/store/airport-pickups-london-com" target={"_blank"} title="Airport Pickups London Reviews" className={styles.reviews} rel="noreferrer"   >
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star-half-stroke"></i>
                                                <span>{review} {appData?.words["strReviews"]}</span>
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
                                                : <span >£ {quotationOptions[0].price}</span>}
                                        </div>

                                        <button className="btn" onClick={handleButtonClick} >
                                            {appData.words["strPerVehicle"]}
                                            <i className="fa-solid fa-arrow-down"></i>
                                        </button>
                                    </div>
                                </div>
                                <h3 className={styles.snapshot_title}>
                                    {appData?.words["strTourSnapshot"]}
                                </h3>
                                <div className={styles.snapshot_icons_content}>
                                    {Array.isArray(snapshots) && snapshots.slice(0, 4).map((snapshot, index) => (
                                        <div key={index} className={styles.snapshot_icons_div}>
                                            <i className={`${snapshot.icon}`}></i>
                                            <div className={styles.snapshot_icons_div_description}>
                                                {loadAlert ? "..." : index===2 ?appData?.words["strLuxuryCars"]:appData?.words[snapshot.alias]}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {loadAlert ? <></> :
                                    <TourCardQuotation
                                        transferDateTime={reservations[0]?.transferDetails?.transferDateTimeString}
                                        language={language}
                                        selectedQuotation={reservations[0]?.quotation}
                                        quotationOptions={quotationOptions}
                                        direction={direction}
                                        duration={duration}
                                        images={images}
                                        shortDescription={shortDescription}
                                        pageTitle={pageTitle}
                                    />}
                            </div>
                            <div className={`${styles.page_content} `} dangerouslySetInnerHTML={{ __html: pageContent }} />
                        </div>


                    </div>
                </div>
            </div>
        </GlobalLayout>

    )
}



function adjustPathnameForLanguage(pathname, pageStartLanguage, cookies) {
    if (pageStartLanguage === 'en') {
        pathname = pathname.replace(/^\/_next\/data\/[^/]+\//, '/').replace(/\.[^/.]+$/, '').replace(/\.json$/, '');
        pageStartLanguage = cookies['lang'] || 'en';  // Default to 'en' if no lang cookie is present
    } else {
        //let pathname ='/tr/tours/cambridge-daily-tour'  let pagestartLanguage="tr"
        pathname = pathname.replace(`/${pageStartLanguage}`, '');

    }
    return { pathname, pageStartLanguage };
}
export async function getServerSideProps({ req, query }) {
    const env = await fetchConfig();

    let cookies = parseCookies(req.headers.cookie);
    let { pathname } = parse(req.url, true)
    let pageStartLanguage = checkLanguageAttributeOntheUrl(req?.url)

    // Adjust pathname and language based on initial language
    const adjusted = adjustPathnameForLanguage(pathname, pageStartLanguage, cookies);
    pathname = adjusted.pathname;
    pageStartLanguage = adjusted.pageStartLanguage;

    const method = "POST"
    const headers = { "Content-Type": "application/json", }
    const url = `${env.apiDomain}/api/v1/tours-deals/details`;
    const body = { pathname, language: pageStartLanguage };

    const reqOpt = { body: JSON.stringify(body), method, headers }
    const response = await fetch(url, reqOpt);
    let datas = await response.json();
    // Object to hold all the extracted data
    let toursDatas = {};
    // Check if the status is 200, otherwise return "not found"
    if (datas.status === 200) {
        //make array of schemas
        let schemaOfTourDetails = datas.data?.schema || []
        schemaOfTourDetails = Object.keys(schemaOfTourDetails).map(key => ({ [key]: schemaOfTourDetails[key] }));//array of objects [b:{ab:"1"},c:{ab:"2"},d:{ab:"3"}]
        schemaOfTourDetails = schemaOfTourDetails.map(obj => Object.values(obj)[0]);//Output: ["1", "2", "3"]


        const { data } = datas
        toursDatas = {
            snapshots: data.snapshots || [],
            pagePathname: data.pathname || "",
            pageTitle: data.pageTitle || "",
            headTitle: data.headTitle || "",
            metaDescription: data.metaDescription || "",
            shortDescription: data.shortDescription || "",
            keywords: data.keywords || "",
            images: data.images || [],
            thumbnailTitle: data.thumbnailTitle || "",
            breadcrumbTitle: data.breadcrumbTitle || "",
            durationValue: data.durationValue || "",
            schema: schemaOfTourDetails || [],
            metaTags: data.metaTags || [],
            pageContent: data.pageContent || "",
            distance: data.distance || "",
            duration: data.duration || "",
            quotationOptions: data.quotationOptions || [],
            review: data?.schema.Product.aggregateRating.reviewCount || 2477,

        }
    } else {
        return {
            props: { data: "not found" }
        };
    }
    // Return the object as props
    return {
        props: {
            toursDatas
        }
    };


}

export default TourContentDetails;
