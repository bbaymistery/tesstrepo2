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

function Pages(props) {
    let { data, pickUps, dropoffs, keywords, language, pageTitle, headTitle, description, returnPathname, urlOfPage, pageContent, returnHeadTitle, returnPageTitle, duration, distance, quotationOptions, breadcrumbs, linkurl,review } = props
  
    if (data === "not found") return <Error404 />

    const state = useSelector(state => state.pickUpDropOffActions)
    let { reservations, params: { journeyType, quotations } } = state

    const dispatch = useDispatch()
    const { appData } = useSelector(state => state.initialReducer)
    const objectDetailss = appData?.pointTypeCategories.reduce((obj, item) => ({ ...obj, [item.id]: JSON.parse(item.objectDetails), }), {});

    const getDataBasedLanguage = async (language) => {
        //zaten en olanda app.js de butun datalari  fetch(`${env.apiDomain}/app/${language}`)   bununla getiririk
        //cunki burdaki fonksyon isliyir ancag :=>http://localhost:3500/tr/heathrow/heathrow-to-oxford-taxi =>tr goturub request edirik
        if (language !== 'en') {
            try {
                //payment hydation error ucun
                let response = await fetch(`${env.apiDomain}/app/${language}`)
                let data = await response.json()
                if (data.status === 200) {
                    //passing inital state in order make update in store js when language changing
                    dispatch({ type: "SET_NEW_APPDATA", data, initialStateReducer: store.getState().initialReducer })
                }
            } catch (error) {
                window.handelErrorLogs(
                    error,
                    ' APL ...pathname -getDataBasedLanguage function try catch blog ',
                    {
                        url: `${env.apiDomain}/app/${language}`
                    })

            }
        }
    }


    const setLanguage = (params = {}) => {
        let { language } = params
        if (language) {
            let index
            let direction
            direction = language === 'ar' ? "rtl" : "ltr"
            appData?.languages.map((item, idx) => {
                let { value: key, } = item
                if (language === key) index = idx
            })
            dispatch({ type: "SET_NEW_LANGUAGE", data: { languageKey: language, direction, langIndex: index } })
            //set language and dicertion  to localstorage
            localStorage.setItem("language", JSON.stringify(language));
            localStorage.setItem("direction", JSON.stringify(direction));
            localStorage.setItem("langIndex", JSON.stringify(index));
            getDataBasedLanguage(language)
        }
    }
    useEffect(() => {
        //when we go to transfer details then go back in that case we need to check if we have already quotations or not
        if (!quotations[0]?.quotationOptions?.length) dispatch({ type: "GET_QUOTATION_AT_PATHNAME", data: { results: data, journeyType } })

        // if (parseInt(journeyType) === 0) {
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
        // }
        //set language and bring appDAtas
        if (language?.length === 2) {
            setLanguage({ language })
        } else {
            setLanguage({ language: JSON.parse(localStorage.getItem("language")) })
        }
    }, [])


    return <QuotationResultsTaxiDeal
        isTaxiDeal={true}
        keywords={keywords}
        pageTitle={pageTitle}
        headTitle={headTitle}
        description={description}
        previousUrl={urlOfPage}
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
const cache = {}

// function getJsonSizeInKB(jsonObject) {
//     const jsonString = JSON.stringify(jsonObject);
//     const bytes = jsonString.length * 2;
//     const kilobytes = bytes / 1024;

//     return kilobytes;
// }
export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, ...etc }) => {
    const { resolvedUrl } = etc;
    const lowerCaseUrl = resolvedUrl.toLowerCase();

    if (resolvedUrl !== lowerCaseUrl) {
        res.setHeader('Location', lowerCaseUrl);
        res.statusCode = 301;
        res.end();
        return { props: { data: "not found", } }
    }

    res?.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')
    let pickUps = []
    let dropoffs = []
    let dealUrl = `${req.url}`
    const { pathname } = parse(req.url, true)
    dealUrl = pathname.replace(/^\/_next\/data\/[^/]+\//, '/').replace(/\.[^/.]+$/, '').replace(/\.json$/, '')
    const cacheKey = `page-${req.url}`
    let language = checkLanguageAttributeOntheUrl(dealUrl)

    // Check if the data is cached
    if (cache[cacheKey]) return { props: cache[cacheKey] }

    const body = { language, checkRedirect: true, taxiDealPathname: dealUrl, withoutExprectedPoints: true, }
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
        cache[cacheKey] = {
            data,
            pickUps,
            dropoffs,
            keywords,
            language,
            pageTitle,
            headTitle,
            description,
            returnPathname,
            urlOfPage: dealUrl,
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

        return { props: cache[cacheKey] }

    } else {
        return { props: { data: "not found", } }
    }
});
