import { createWrapper } from 'next-redux-wrapper';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postDataAPI } from '../helpers/fetchDatas';
import env from '../resources/env';
import store from '../store/store';
import Error404 from './404/index'
import { parse } from 'url'
import { checkLanguageAttributeOntheUrl } from '../helpers/checkLanguageAttributeOntheUrl';
import QuotationResultsTaxiDeal from '../components/elements/QuotationResultsTaxiDeal';
import { urlToTitle } from '../helpers/letters';
import { parseCookies } from '../helpers/cokieesFunc';
import { useState } from 'react';
import { fetchPathnamePageDatas } from '../helpers/fetchPathnamePageDatas';

function Pages(props) {

    const state = useSelector(state => state.pickUpDropOffActions)
    let { reservations, params: { journeyType, quotations, language: reduxLanguage } } = state

    const dispatch = useDispatch()
    const { appData } = useSelector(state => state.initialReducer)
    const objectDetailss = appData?.pointTypeCategories.reduce((obj, item) => ({ ...obj, [item.id]: JSON.parse(item.objectDetails), }), {});

    const [fetchdatas, setFetchDatas] = useState(props)
    let
        { data = "",
            pickUps = [], dropoffs = [],
            keywords = [], pageTitle = "", headTitle = "", description = "", returnPathname = "",
            pageContent = "", returnHeadTitle = "", returnPageTitle = "", duration = "", distance = "", quotationOptions = [], breadcrumbs = [], linkurl = "", review = {} } = fetchdatas

    if (data === "not found") return <Error404 />

    useEffect(() => {
        //when we go to transfer details then go back in that case we need to check if we have already quotations or not
        if (!quotations[0]?.quotationOptions?.length) dispatch({ type: "GET_QUOTATION_AT_PATHNAME", data: { results: data, journeyType } })

        //if it is already selected It means when user go to quotain and go to transfer details then come back It should be selected
        if (reservations[0].selectedDropoffPoints.length > 0 && reservations[0].selectedPickupPoints.length > 0) {
            let pickupPoints = reservations[0].selectedPickupPoints
            let dropoffPoints = reservations[0].selectedDropoffPoints
            dispatch({ type: "ADD_NEW_POINT_AT_PATHNAME", data: { pickupPoints, dropoffPoints, index: 0 } })
        } else {
            //for first time
            //   point = { ...point, ...objectDetailss[point.pcatId] }   flightDetails{ flightNumber="",waitingPickupTime=0}
            let pickupPoints = pickUps.length > 0 ? [{ ...pickUps[0], ...objectDetailss[pickUps[0].pcatId] }] : []

            let dropoffPoints = dropoffs.length > 0 ? [{ ...dropoffs[0], ...objectDetailss[dropoffs[0].pcatId] }] : []
            dispatch({ type: "ADD_NEW_POINT_AT_PATHNAME", data: { pickupPoints, dropoffPoints, index: 0 } })
        }

        fetchPathnamePageDatas(linkurl,);
        console.log({ linkurl, reduxLanguage });

    }, [])

    useEffect(() => {
        const cacheKey = `page-${reduxLanguage}-${linkurl}`;
        let cache = sessionStorage.getItem('pathnameLinkCache');
        let allAppDatas = JSON.parse(sessionStorage.getItem('allAppDatas'))
        console.log({ cache, allAppDatas });

        if (cache && allAppDatas) {
            setFetchDatas(JSON.parse(cache)[cacheKey])
        }
    }, [reduxLanguage])

    return <QuotationResultsTaxiDeal
        isTaxiDeal={true}
        keywords={keywords}
        pageTitle={pageTitle}
        headTitle={headTitle}
        description={description}
        previousUrl={linkurl}
        returnPathname={returnPathname}
        pageContent={pageContent}
        returnHeadTitle={returnHeadTitle}
        returnPageTitle={returnPageTitle}
        distance={distance}
        duration={duration}
        quotationOptions={quotationOptions}
        breadcrumbs={breadcrumbs}
        linkurl={linkurl}
        review={review}
    />
}


export default Pages
const makestore = () => store;
const wrapper = createWrapper(makestore);

// function getJsonSizeInKB(jsonObject) {
//     const jsonString = JSON.stringify(jsonObject);
//     const bytes = jsonString.length * 2;
//     const kilobytes = bytes / 1024;

//     return kilobytes;
// }
function cleanPath(path) {
    // Replace any sequence of "/../" with "/"
    // This might be needed for paths that attempt to go up a directory level
    let cleanedPath = path.replace(/\/\.\.\//g, '/');

    // Remove a two-letter country/language code at the beginning of the path
    cleanedPath = cleanedPath.replace(/^\/[a-z]{2}\//, '/');

    return cleanedPath;
}
export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, ...etc }) => {
    res?.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')
    const { resolvedUrl } = etc;
    const lowerCaseUrl = resolvedUrl.toLowerCase();
    if (resolvedUrl !== lowerCaseUrl) {
        res.setHeader('Location', lowerCaseUrl);
        res.statusCode = 301;
        res.end();
        return { props: { data: "not found", } }
    }

    let pickUps = []
    let dropoffs = []
    const { cookie } = req.headers;
    const cookies = parseCookies(cookie);
    let language = checkLanguageAttributeOntheUrl(req.url)
    let { pathname } = parse(req.url, true)

    //navbarda dil degisende burasi calisir o yuzden cookiden alrq
    if (language === 'en' &&cookies['lang']) {
        pathname = cleanPath(pathname.replace(/^\/_next\/data\/[^/]+\//, '/').replace(/\.[^/.]+$/, '').replace(/\.json$/, ''))
        language = cookies['lang'];
    } else {
        //http://localhost:3500/es/heathrow/heathrow-to-oxford-taxi  yazb google enter basarsa burasi isliyr
        pathname = cleanPath(pathname)
    }


    const body = { language, checkRedirect: true, taxiDealPathname: pathname, withoutExprectedPoints: true, }
    const url = `${env.apiDomain}/api/v1/taxi-deals/details`
    const { status, data } = await postDataAPI({ url, body })
    if (status === 205) return { redirect: { destination: data.redirectPathname, permanent: false } }

    // homepagedeki appDatafalanbunu asagisinda idi
    if (status === 200) {
        // getJsonSizeInKB(data)
        let {
            distance,
            duration,
            quotationOptions,
            taxiDeal: { pickupPoints, dropoffPoints, pageTitle = "", headTitle = "", description = "", keywords = "", returnPathname = "", pageContent = "", returnHeadTitle = "", returnPageTitle = "", pathname: linkurl, metaTags = [] } } = data

        // select first item from all points
        pickUps = pickupPoints?.length >= 1 ? [pickupPoints[0]] : []
        dropoffs = dropoffPoints?.length >= 1 ? [dropoffPoints[0]] : []

        const newPageContent = pageContent?.replace(/__website_domain__/g, "https://www.airport-pickups-london.com/");
        let review = {}
        review.bestRating = data?.taxiDeal?.schema.Product.aggregateRating.bestRating || 5
        review.ratingValue = data?.taxiDeal?.schema.Product.aggregateRating.ratingValue || 4.95
        review.reviewCount = data?.taxiDeal?.schema.Product.aggregateRating.reviewCount || 1988

        let schemaOfTaxiDeals = data?.taxiDeal?.schema || []
        schemaOfTaxiDeals = Object.keys(schemaOfTaxiDeals).map(key => ({ [key]: schemaOfTaxiDeals[key] }));//array of objects [b:{ab:"1"},c:{ab:"2"},d:{ab:"3"}]
        schemaOfTaxiDeals = schemaOfTaxiDeals.map(obj => Object.values(obj)[0]);//Output: ["1", "2", "3"]

        let { breadcrumbs } = urlToTitle({ url: pathname, pathnamePage: true })

        let breadcumbSchema = {
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "item": { "@id": "https://www.airport-pickups-london.com/", "name": `Home` }
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "item": { "@id": `https://www.airport-pickups-london.com${pathname}/`, "name": `${breadcrumbs?.[1]}` }
                },
            ]
        }


        let schemas = [breadcumbSchema]
        // Cache the data
        let finalData = {
            data: "",
            pickUps,
            dropoffs,
            keywords,
            language,
            pageTitle,
            headTitle,
            description,
            returnPathname,
            schemaOfTaxiDeals,
            pageContent: newPageContent,
            returnHeadTitle,
            returnPageTitle,
            distance,
            duration,
            quotationOptions,
            schemas,
            breadcrumbs,
            linkurl,
            metaTags,
            review
        }
        return { props: finalData }

    }
    else {
        return { props: { data: "not found", } }
    }
});
