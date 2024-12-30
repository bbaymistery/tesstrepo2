import { createWrapper } from 'next-redux-wrapper';
import React, { useState } from 'react'
import GlobalLayout from '../components/layouts/GlobalLayout';
import Hero from '../components/widgets/Hero';
import TaxiDeals from '../components/widgets/TaxiDeals';
import store from '../store/store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContent } from '../helpers/fetchContent';
import { parse } from 'url'
import Error404 from './404/index'
import { checkLanguageAttributeOntheUrl } from '../helpers/checkLanguageAttributeOntheUrl';
import { Airports, CruisePorts } from '../constants/navigatior';
import { urlToTitle } from '../helpers/letters';
import { parseCookies } from '../helpers/cokieesFunc';
import { taxiPricesLinks } from './../constants/navigatior'
import { postDataAPI } from '../helpers/fetchDatas';
import { fetchConfig } from '../resources/getEnvConfig';
import { urls } from '../resources/urls';
import dynamic from 'next/dynamic';
import { checkUnwantedQuery } from '../helpers/ifHasUnwantedCharacters';
const CarsSlider = dynamic(() => import('../components/widgets/CarsSlider'),);
const TaaxidealsQuotationLink = dynamic(() => import('../components/elements/TaaxidealsQuotationLink'),);
const LinkNameDescription = dynamic(() => import('../components/elements/LinkNameDescription'),);
const unwantedQueryRoutesLinkname = [
    { "heathrow-to-loughborough-taxi?forcedesktop=1": "/heathrow-to-loughborough-taxi" },
];

const NavbarLinkName = (props) => {

    const { env, mainCanonicalUrl } = props
    const dispatch = useDispatch()
    const router = useRouter();
    const { params: { language, } } = useSelector(state => state.pickUpDropOffActions)

    const { linkname } = router.query;
    let { metaTitle = "", keywords = "", metaDescription = "", pageContent = "", data = "", isItQuationLink = false } = props || {}
    console.log({ props });

    if (data === "not found") return <Error404 />
    const [hasScrolled, setHasScrolled] = useState(false);
    const handleScroll = () => {
        if (!hasScrolled) setHasScrolled(true);
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasScrolled]);
    useEffect(() => {
        if (!isItQuationLink) {
            // Combine both Airports and CruisePorts into a single array
            const lists = [...Airports, ...CruisePorts];
            // Find the object that matches the current linkname based on the path
            const matchingItem = lists.find(item => item.path.includes(linkname));
            // If a matching item is found, dispatch the appropriate action
            // Use the 'hasTaxiDeals' property of the matching item for dispatch 
            if (matchingItem) dispatch({ type: "SET_NAVBAR_TAXI_DEALS", data: { hasTaxiDeals: matchingItem.hasTaxiDeals } });
        }
    }, [linkname, dispatch, language]); // Add linkname and dispatch to the dependency array



    return (isItQuationLink ? <TaaxidealsQuotationLink props={props} /> :
        <GlobalLayout mainCanonicalUrl={mainCanonicalUrl} keywords={keywords} title={metaTitle} description={metaDescription} footerbggray={false}>
            <Hero islinknamecomponent={true} bggray={false} env={env} />
            <TaxiDeals env={env} showTabs={false} bggray={false} islinknamecomponent={true} />
            {pageContent.length > 0 ? <LinkNameDescription pageContent={pageContent} language={language} /> : ""}
            {hasScrolled && <CarsSlider bggray={true} />}
        </GlobalLayout>

    )
}

export default NavbarLinkName

const makestore = () => store;
const wrapper = createWrapper(makestore);
function createBreadcrumbSchema(pathname) {
    const breadcumbName1 = urlToTitle({ url: pathname, linknamePage: true });
    return {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "item": { "@id": "https://www.airport-pickups-london.com", "name": "Home" }
            },
            {
                "@type": "ListItem",
                "position": 2,
                "item": { "@id": `https://www.airport-pickups-london.com${pathname}`, "name": breadcumbName1 }
            },
        ]
    };
}

function adjustPathnameForLanguage(pathname, pageStartLanguage, cookies) {

    if (pageStartLanguage === 'en') {
        pathname = pathname.replace(/^\/_next\/data\/[^/]+\//, '/').replace(/\.[^/.]+$/, '').replace(/\.json$/, '');
        pageStartLanguage = cookies['lang'] || 'en';  // Default to 'en' if no lang cookie is present
    } else {

        pathname = `/${pathname.split("/")[2]}`;
    }
    return { pathname, pageStartLanguage };
}
//when we click to navbar and go to /heathorw taxi price
async function handleStandardContent(pathname, cookie, pageStartLanguage, schemas, pathnameUrlWHenChangeByTopbar, env) {
    let pathNameUrlCanonical = pathname
    let { metaTitle, keywords, pageContent, metaDescription, status, lang, canonicalUrl: mainCanonicalUrl } = await fetchContent(pathname, cookie, pageStartLanguage, pathnameUrlWHenChangeByTopbar, pathNameUrlCanonical);
    //!Istisnalar
    let exceptions = pathname === "/dover-cruise-taxi" || pathname === "/portsmouth-taxi-prices" || pathname === "/harwich-taxi-prices" || pathname === "/southampton-cruise-taxi"

    if (exceptions) status = 200

    if (status === 200) {
        //!Canoncakls
        // let mainCanonical = pageStartLanguage === 'en' ? `${env.websiteDomain}${pathname}` : `${env.websiteDomain}/${pageStartLanguage}${pathname}`
        // let canonicalAlternates = generateCanonicalAlternates(pathname, env);

        return {
            props: {
                metaTitle,
                keywords,
                pageContent,
                metaDescription,
                schemas,
                isItQuationLink: false,
                mainCanonicalUrl
            }
        };
    } else {
        return { props: { data: "not found" } };
    }
}

//for taxid eals pickups and drop offs
async function handleQuotationLink(language, pathname, schemas, env, ipAddress, userAgent) {
    let pickUps = []
    let dropoffs = []
    let review = {}
    //!nneww Pathname yox idi direk yazilirdi 
    if (pathname) {
        const body = { language, checkRedirect: true, taxiDealPathname: pathname, withoutExprectedPoints: true, visitorIpAddress: ipAddress, "userAgent": userAgent, bodyOfRequest: "", methodOfRequest: "" }
        let { breadcrumbs } = urlToTitle({ url: pathname, pathnamePage: true })

        const url = `${env.apiDomain}/api/v1/taxi-deals/details`;
        const { status, data } = await postDataAPI({ url, body });
        if (status === 205) return { redirect: { destination: data.redirectPathname, permanent: false } };
        if (status === 200) {
            let {
                distance,
                duration,
                quotationOptions,
                markerPoints,
                polylinePath,
                taxiDeal: { pickupPoints, dropoffPoints, pageTitle = "", headTitle = "", description = "", keywords = "", returnPathname = "", pageContent = "", returnHeadTitle = "", returnPageTitle = "", pathname: linkurl, metaTags = [] } } = data

            // select first item from all points
            pickUps = pickupPoints?.length >= 1 ? [pickupPoints[0]] : []
            dropoffs = dropoffPoints?.length >= 1 ? [dropoffPoints[0]] : []

            const newPageContent = pageContent?.replace(/__website_domain__/g, "https://www.airport-pickups-london.com/");
            review.bestRating = data?.taxiDeal?.schema?.Product ? data?.taxiDeal?.schema?.Product?.aggregateRating?.bestRating : 5
            review.ratingValue = data?.taxiDeal?.schema?.Product ? data?.taxiDeal?.schema?.Product?.aggregateRating?.ratingValue : 4.95
            review.reviewCount = data?.taxiDeal?.schema?.Product ? data?.taxiDeal?.schema?.Product?.aggregateRating?.reviewCount : 1988

            let schemaOfTaxiDeals = data?.taxiDeal?.schema || []
            schemaOfTaxiDeals = Object.keys(schemaOfTaxiDeals).map(key => ({ [key]: schemaOfTaxiDeals[key] }));//array of objects [b:{ab:"1"},c:{ab:"2"},d:{ab:"3"}]
            schemaOfTaxiDeals = schemaOfTaxiDeals.map(obj => Object.values(obj)[0]);//Output: ["1", "2", "3"]

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
                review,
                markerPoints,
                polylinePath,
                isItQuationLink: true
            }
            return { props: finalData }

        }
        else {
            return { props: { data: "not found", } }
        }
    }
}
//?biz burada metatile metaDescriptionlari fethcContente gore alib gonderirirk Her sayfa icin ayri bi sekilde gider
export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, ...etc }) => {

    const env = await fetchConfig();

    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    const { resolvedUrl } = etc;
    const lowerCaseUrl = resolvedUrl.toLowerCase();

    if (resolvedUrl !== lowerCaseUrl) {
        res.setHeader('Location', lowerCaseUrl);
        res.statusCode = 301;
        res.end();
        return { props: { data: "not found", } }
    }



    let cookies = parseCookies(req.headers.cookie);//!var
    let { pathname, query } = parse(req.url, true) //!var

    const redirectTarget = checkUnwantedQuery(pathname, query, unwantedQueryRoutesLinkname);

    if (redirectTarget) {
        // Redirect to the desired path
        res.writeHead(301, { Location: redirectTarget });
        res.end();
        return { props: {} }; // No props needed since we are redirecting
    }

    //redirect pages which dont have asp
    const destination = urls[pathname];
    // Eğer eşleşen bir URL varsa, yönlendirme yapın
    if (destination) {
        return {
            redirect: {
                destination: destination,
                permanent: true, // Kalıcı yönlendirme (301) olarak ayarlayabilirsiniz
            },
        };
    }
    //language congiguration based on the url (http://localhost:3500/it/gatwick-taxi-prices  if he pres enter we get lang) at first time
    let pageStartLanguage = checkLanguageAttributeOntheUrl(req?.url)//!var
    // Extract query parameters
    let pathnameUrlWHenChangeByTopbar = pathname
    let schemas = []


    // Breadcumb Schema
    const breadcumbSchema = createBreadcrumbSchema(pathname);
    schemas.push(breadcumbSchema);


    // Adjust pathname and language based on initial language
    const adjusted = adjustPathnameForLanguage(pathname, pageStartLanguage, cookies);

    pathname = adjusted.pathname;
    pageStartLanguage = adjusted.pageStartLanguage;

    //so here i check if it is quation link or it is simple taxi prices link 
    let isItQuationLink = false
    if (!taxiPricesLinks.includes(pathname)) isItQuationLink = true

    // Extract the IP address
    const forwarded = req.headers['x-forwarded-for']
    const ipAddress = typeof forwarded === 'string' ? forwarded.split(/, /)[0] : req.socket.remoteAddress

    // Extract the User Agent
    const userAgent = req.headers['user-agent'] || '';
    if (!isItQuationLink) {
        return handleStandardContent(pathname, req.headers.cookie, pageStartLanguage, schemas, pathnameUrlWHenChangeByTopbar, env);
    } else {
        return handleQuotationLink(pageStartLanguage, pathname, schemas, env, ipAddress, userAgent);
    }
});
