import React, { useEffect, useState } from 'react'
import styles from "./styles.module.scss"
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { quotationImagesObjWebp } from '../../../constants/quotationImages';
import env from '../../../resources/env';
import Image from 'next/image';
import { formatPriceInTitle } from '../../../helpers/formatPriceInTitle';
import TaxiDealsContents from '../TaxiDealsContents';
import { postDataAPI } from '../../../helpers/fetchDatas';
const checkJourneyTypeAndAddQuotationToReducer = (params = {}) => {
    //by this index  we r gonna assure in which journey we should add quotation
    //by journey type we r gonn assure should we directly pass to next page or not
    let { journeyType, quotation, index, router, dispatch, language, isTaxiDeal, quotations } = params

    //if it is both way journey then do not push directly to other page
    if (parseInt(journeyType) === 1) {
        dispatch({ type: "SET_QUOTATION", data: { quotation, journeyType: index } })
    } else {
        dispatch({ type: "SET_QUOTATION", data: { quotation, journeyType: index } })
        //if is taxi deal tru it means we should remove selected point from redux (because someofthem can be with  --select--)
        if (isTaxiDeal) {
            if (quotations[0]?.taxiDeal?.pickupPoints.length > 1) {

                dispatch({ type: "RESELECT_POINTS_FROM_STORE", data: { type: "pickup" } })
            }
            if (quotations[0]?.taxiDeal?.dropoffPoints.length > 1) {
                dispatch({ type: "RESELECT_POINTS_FROM_STORE", data: { type: "dropoff" } })
            }
            router.push(`${language === 'en' ? "/transfer-details" : `${language}/transfer-details`}`)
        } else {
            router.push(`${language === 'en' ? "/transfer-details" : `${language}/transfer-details`}`)

        }
    }
}
function mergeDetails(points, objectDetails) {
    return points.map(point => {
        // Extract the pcatId from the point
        const { pcatId } = point;

        // Find the corresponding detail in objectDetails
        const detail = objectDetails[pcatId];

        // If detail exists, spread its properties into point
        if (detail) {
            return { ...point, ...detail };
        }

        return point;
    });
}
const CardQuotationItemTaxiDeal = (params = {}) => {

    //by this index  we r gonna assure in which journey we should add quotation
    let {
        quotationOptions: datas,
        selectedQuotation,
        index,
        duration,
        distance,
        isTaxiDeal = true,
        previousUrl,
        pageContent,
        objectDetailss,
        pageTitle,
        headTitle,
        returnPathname,
        returnHeadTitle,
        returnPageTitle,
        isVisible = false,
        breadcrumbs,
        linkurl,
        review
    } = params
    const router = useRouter();
    const dispatch = useDispatch();
    const state = useSelector((state) => state.pickUpDropOffActions)
    let { params: { journeyType, direction, language, quotations } } = state
    const { appData } = useSelector(state => state.initialReducer)
    //cartypes object for card item as {1:{image:'sds, name:Economy}}
    const carObject = appData?.carsTypes?.reduce((obj, item) => ({ ...obj, [item.id]: item, }), {});
    const [uploadedPageContent, setUploadedPageContent] = useState('');
    // Conditionally slice the array before mapping

    const setQuotationHandleClick = async (params = {}) => {
        let { quotation } = params
        checkJourneyTypeAndAddQuotationToReducer({ journeyType, quotation, index, router, dispatch, language, isTaxiDeal, quotations })
        if (isTaxiDeal) {
            const body = { language, checkRedirect: true, taxiDealPathname: previousUrl, withoutExprectedPoints: false, }
            const url = `${env.apiDomain}/api/v1/taxi-deals/details`
            const { status, data } = await postDataAPI({ url, body })
            let { taxiDeal: { pickupPoints, dropoffPoints, } } = data
            pickupPoints = mergeDetails(pickupPoints, objectDetailss)
            dropoffPoints = mergeDetails(dropoffPoints, objectDetailss)
            dispatch({ type: "GET_QUOTATION_AT_PATHNAME", data: { results: data, journeyType } })
        }
    };

    const handleClickForMobile = ({ e, quotation }) => {
        if (451 > document.documentElement.clientWidth) {
            checkJourneyTypeAndAddQuotationToReducer({ journeyType, quotation, index, router, dispatch, language, isTaxiDeal, quotations })
        }
    };

    useEffect(() => {
        const imgTagRegex = /<img\s+[^>]*src="([^"]*)"[^>]*>/g;
        // Check if there are any <img> tags
        if (imgTagRegex.test(pageContent)) {
            //Replace function with empty string ""
            const updatedPageContent = pageContent.replace(imgTagRegex, " ");
            setUploadedPageContent(updatedPageContent);
        } else {
            setUploadedPageContent(pageContent)
        }
    }, [datas,]);

    return (<div className={`${styles.taxideal_result_container}`}>
        {/* 111  */}


        <h1 alt={pageTitle} className={`${styles.title} ${styles.title_center} ${direction}`}>{headTitle ? formatPriceInTitle(headTitle) : "..."}</h1>
        <p className={styles.breadcrumbs}>
            <span>
                <a href="/" title="Airport Pickups London">
                    <span>Home</span>
                </a>
                →
            </span>
            &nbsp;
            &nbsp;
            <span>
                <a href={linkurl} title={pageTitle}>
                    <span>{pageTitle}</span>
                </a>
            </span>
        </p>
        <div direction={String(direction === "rtl")} className={styles.stars}>
            <a href="https://www.reviews.co.uk/company-reviews/store/airport-pickups-london-com" target={"_blank"} title="Airport Pickups London Reviews" className={styles.reviews} rel="noreferrer"  >
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <span style={{ marginLeft: "10px" }}> {review?.ratingValue}/{review?.bestRating}</span>

            </a>

            <a href="https://www.reviews.co.uk/company-reviews/store/airport-pickups-london-com" target={"_blank"} title="Airport Pickups London Reviews  " className={styles.reviews} rel="noreferrer">
                <i className="fa-solid fa-comment"></i>
                {review?.reviewCount} {`${appData?.words["strReviews"]}`}
            </a>
        </div>
        {/* 111  */}
        <p className={styles.viceversa}>
            <a href={returnPathname} title={returnPageTitle}> {returnHeadTitle ? formatPriceInTitle(returnHeadTitle) : "..."} </a>

        </p>

        <div className={`${styles.quotation_header}`}>
            <ul>
                {distance ? <li><span><i className={`fa-solid fa-check ${styles.li_icon}`}></i></span>{appData?.words["strDistance"]} : <span>{distance}</span></li> : (<></>)}
                {duration ? <li><span><i className={`fa-solid fa-check ${styles.li_icon}`}></i></span><span className={styles.left} >{appData?.words["strJourneyDurationTitle"]}</span>:<span>{duration}</span></li> : (<></>)}
                <li><span><i className={`fa-solid fa-check ${styles.li_icon}`}></i></span>  {appData?.words["strWeConstantlyMonitorAllFlights"]}</li>
                <li><span><i className={`fa-solid fa-check ${styles.li_icon}`}></i></span> <span className={styles.strong}>{appData?.words["strAllInclusivePrices"]}</span> {appData?.words["strMeetandGreetIncludedForAirport"]} </li>
            </ul>
        </div>


        {datas?.map((item, index) => {
            return (
                <div id="main_container" key={index}>
                    <div
                        dataid={index === 0 ? "first_car" : (index === 1 ? "second_car" : "")}
                        className={`${styles.card_item} ${Number(selectedQuotation?.carId) === Number(quotationImagesObjWebp[item?.carId].id) ? styles.selectedCard : ""}`}
                        onClick={(e) => handleClickForMobile({ e, quotation: item })} >
                        {/* style={{ backgroundImage: `url(${quotationImagesObjWebp[item?.carId]?.image})` }} */}
                        <div data={quotationImagesObjWebp[item?.carId].id} className={styles.column_first} >
                            <Image
                                src={quotationImagesObjWebp[item?.carId]?.image}
                                alt="Car Image"
                                width={300}
                                height={100}
                                style={{ objectFit: "contain", }}
                                priority
                            />
                        </div>
                        <div className={styles.column_second}>
                            <div className={styles.column_second_flex_column}>
                                <div className={styles.name_and_postcode_div}>
                                    <div className={styles.postcode}>
                                        {carObject[item?.carId]?.transferType}
                                        <div className={styles.feature_column}> <i className="fa-solid fa-suitcase"></i><span>{carObject[item?.carId]?.suitcases}</span></div>
                                    </div>
                                    <div className={styles.name}>
                                        {carObject[item?.carId]?.name}
                                        <div className={styles.feature_column}> <i className="fa-solid fa-user"></i> <span>{carObject[item?.carId]?.pax}</span>  </div>
                                    </div>
                                </div>
                                <div className={styles.car_features}>
                                    <div className={styles.feature_column}> <i className="fa-solid fa-user"></i> <span>{carObject[item?.carId]?.pax}</span>  </div>
                                    <div className={styles.feature_column}> <i className="fa-solid fa-suitcase"></i><span>{carObject[item?.carId]?.suitcases}</span></div>
                                    <div className={`${styles.feature_column} ${styles.meet_greet_icon}`} direction={String(direction === 'rtl')}>
                                        <Image src={"/images/icons/blackMeetAndGreet.webp"} width="18" height="20" alt="Meet and Greet icon " priority />
                                        <span style={{ paddingLeft: "5px", fontWeight: '500' }}>Meet & Greet</span>
                                    </div>

                                </div>
                                <div className={styles.apl_features}>
                                    <p className={`${styles.apl_feature} ${styles.show_more_than360}`}> <i className={`fa-solid fa-check ${direction === "rtl" ? styles.leftFeatureIcon : ""}`}></i> <span>{appData?.words["strCarFeatureFreeMeetAndGreet"]}</span></p>
                                    <p className={`${styles.apl_feature} ${styles.show_more_than360}`}>  <i className={`fa-solid fa-check ${direction === "rtl" ? styles.leftFeatureIcon : ""}`}></i><span>{appData?.words["strCarFeatureNoCharge4Delay"]}</span></p>
                                    <p className={`${styles.apl_feature} ${styles.show_more_than360}`}> <i className={`fa-solid fa-check ${direction === "rtl" ? styles.leftFeatureIcon : ""}`}></i><span>{appData?.words["strCarFeatureFreeWaitingTime"]}</span> </p>
                                    <p className={`${styles.apl_feature} ${styles.show_more_than360}`}> <i className={`fa-solid fa-check ${direction === "rtl" ? styles.leftFeatureIcon : ""}`}></i><span>{appData?.words["strFreeCancellation24h"]}</span> </p>
                                    <p className={`${styles.apl_feature} ${styles.show_more_than360}`}><i className={`fa-solid fa-check ${direction === "rtl" ? styles.leftFeatureIcon : ""}`}></i><span>{appData?.words["strCarFeatureFlightTracking"]}</span></p>
                                    <p className={`${styles.apl_feature} ${styles.show_more_than360}`}> <i className={`fa-solid fa-check ${direction === "rtl" ? styles.leftFeatureIcon : ""}`}></i><span>{appData?.words["strComfortableVehicles"]}</span> </p>
                                    <p className={`${styles.apl_feature} ${styles.show_less_than360}`}><i className={`fa-solid fa-check ${direction === "rtl" ? styles.leftFeatureIcon : ""}`}></i><span>{appData?.words["strCarFeatureFlightTracking"]}</span></p>
                                    <p className={`${styles.apl_feature} ${styles.show_less_than360}`}>  <i className={`fa-solid fa-check ${direction === "rtl" ? styles.leftFeatureIcon : ""}`}></i><span>{appData?.words["strCarFeatureFreeMeetAndGreet"]}</span></p>
                                    <p className={`${styles.apl_feature} ${styles.show_less_than360} ${styles.show_less_than360_with_price}`}>
                                        <span>
                                            <i className={`fa-solid fa-check ${direction === "rtl" ? styles.leftFeatureIcon : ""}`}>
                                            </i>
                                            <span>{appData?.words["strFreeCancellation24h"]}</span>
                                        </span>
                                        <span className={`${styles.price_span}`} >
                                            {`£${item?.price.split(".")[0]}.`}
                                            <span>00</span>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={`${direction === 'rtl' ? styles.thirdcolumnDirection : ""} ${styles.column_third}`}>
                            <div className={styles.price}>{`£${item?.price.split(".")[0]}.`} <span>00</span> </div>
                            <div className={styles.total}>{appData?.words["strTotalPrice"]}</div>
                            <button onClick={() => setQuotationHandleClick({ quotation: item })} className={`btn btn_primary ${Number(selectedQuotation?.carId) === Number(carObject[item?.carId].id) ? styles.selectedBtn : ""}`}   >
                                {Number(selectedQuotation?.carId) === Number(carObject[item?.carId].id) ? `${appData?.words["quSelectedButton"]}` : `${appData?.words["quSelectButton"]}`}
                            </button>
                        </div>
                    </div>
                </div>
            )
        })}

        {isVisible && uploadedPageContent?.length > 1 ? <TaxiDealsContents pageContent={uploadedPageContent} isVisible={isVisible} /> : <></>}

    </div>
    )
}

export default CardQuotationItemTaxiDeal
