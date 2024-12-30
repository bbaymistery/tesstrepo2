import { fetchConfig } from "../resources/getEnvConfig";
import { postDataAPI } from "./fetchDatas";
import { urlToTitle } from "./letters";

export const fetchPathnamePageDatas = async (urls) => {
    const env = await fetchConfig(); // Fetch the env config

    let cache = {}
    const allLanguages = ["en", "tr", "ar", "es", "zh", "it", "ru"]
    try {
        // Iterate over each URL and perform operations
        await Promise.all(urls.map(async (linkurl) => {

            await Promise.all(allLanguages.map(async (lang) => {
                const cacheKey = `page-${lang}-${linkurl}`;
                const url = `${env.apiDomain}/api/v1/taxi-deals/details`;
                if (!cache[cacheKey]) { // Eğer önbellekte yoksa, veri çek
                    const body = { language: lang, taxiDealPathname: linkurl, withoutExprectedPoints: true, checkRedirect: true, };
                    const { status, data } = await postDataAPI({ url, body })

                    if (status === 200) {
                        // getJsonSizeInKB(data)
                        let {
                            distance,
                            duration,
                            quotationOptions,
                            markerPoints,
                            polylinePath,
                            taxiDeal: {
                                pickupPoints = [],
                                dropoffPoints = [],
                                pageTitle = "",
                                headTitle = "",
                                description = "",
                                keywords = "",
                                returnPathname = "",
                                pageContent = "",
                                returnHeadTitle = "",
                                returnPageTitle = "",
                                pathname: linkurl,
                                metaTags = [] }
                        } = data

                        // select first item from all points
                        let pickUps = pickupPoints?.length >= 1 ? [pickupPoints[0]] : []
                        let dropoffs = dropoffPoints?.length >= 1 ? [dropoffPoints[0]] : []

                        const newPageContent = pageContent?.replace(/__website_domain__/g, "https://www.airport-pickups-london.com/");
                        let review = {}
                        review.bestRating = data?.taxiDeal?.schema?.Product ? data?.taxiDeal?.schema?.Product?.aggregateRating?.bestRating : 5
                        review.ratingValue = data?.taxiDeal?.schema?.Product ? data?.taxiDeal?.schema?.Product?.aggregateRating?.ratingValue : 4.95
                        review.reviewCount = data?.taxiDeal?.schema?.Product ? data?.taxiDeal?.schema?.Product?.aggregateRating?.reviewCount : 1988

                        let schemaOfTaxiDeals = data?.taxiDeal?.schema || []
                        schemaOfTaxiDeals = Object.keys(schemaOfTaxiDeals).map(key => ({ [key]: schemaOfTaxiDeals[key] }));//array of objects [b:{ab:"1"},c:{ab:"2"},d:{ab:"3"}]
                        schemaOfTaxiDeals = schemaOfTaxiDeals.map(obj => Object.values(obj)[0]);//Output: ["1", "2", "3"]

                        let { breadcrumbs } = urlToTitle({ url: linkurl, pathnamePage: true })

                        let breadcumbSchema = {
                            "@context": "http://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "item": { "@id": "https://www.airport-pickups-london.com", "name": `Home` }
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "item": { "@id": `https://www.airport-pickups-london.com${linkurl}`, "name": `${breadcrumbs?.[1]}` }
                                },
                            ]
                        }
                        let schemas = [breadcumbSchema]
                        // Cache the data
                        cache[cacheKey] = {
                            data: "",
                            pickUps,
                            dropoffs,
                            keywords,
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
                            markerPoints,
                            polylinePath,
                            review
                        }
                        //here i want to save cacheKey and cache[cacheKey  
                        //as we made before  =>    store.dispatch(setCache(cacheKey, cache[cacheKey])); on serverside


                        sessionStorage.setItem('pathnameLinkCache', JSON.stringify(cache)); // Store the active link ID in sessionStorage
                    }

                }
            }))
        }))


    } catch (error) {
        console.log(error);
    }
}
