import React from 'react'
import GlobalLayout from '../../components/layouts/GlobalLayout'
import styles from "./styles.module.scss"
import GeneralTerms from './GeneralTerms';
import { useSelector } from 'react-redux'
import { fetchContent } from '../../helpers/fetchContent'
import { checkLanguageAttributeOntheUrl } from '../../helpers/checkLanguageAttributeOntheUrl'
import { parse } from 'url';
const structuredSchema = {
    "@context": "http://schema.org/",
    "@type": "TaxiService",
    "description": "Airport taxi & shuttle service",
    "brand": "Airport Pickups London",
    "name": "Airport Pickups London",
    "url": "https://www.airport-pickups-london.com",
    "logo": "https://www.airport-pickups-london.com/Images/Airport-Pickups-London.jpg",
    "provider": {
        "@type": "LocalBusiness",
        "name": "Airport Pickups London",
        "image": "https://www.airport-pickups-london.com/Images/Airport-Pickups-London.jpg",
        "address": "APL Office, Novotel, Cherry Lane, UB7 9HJ",
        "telephone": "+44 208 688 7744",
        "priceRange": "£10.00 to £55.00",
        "currenciesAccepted": "GBP",
        "paymentAccepted": "Cash, Credit Card, Debit Card, PayPal"
    },
    "isRelatedTo": {
        "@type": "Service",
        "serviceType": "Airport Taxi & shuttle service",
        "description": "Avarage journey rating",
        "brand": "Airport Pickups London",
        "name": "booking terms and conditions"
    },
    "sameAs": [
        "https://www.facebook.com/AirportPickupsLondon",
        "https://x.com/Airport_Pickups",
        "https://plus.google.com/+Airport-pickups-london"
    ]
}
const structedSchema2 = {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.airport-pickups-london.com/terms"
    },
    "headline": "Booking Terms And Conditions",
    "image": {
        "@type": "ImageObject",
        "url": "https://www.airport-pickups-london.com",
        "height": 800,
        "width": 800
    },
    "datePublished": "04/12/2018 11:57:11",
    "dateModified": "04/12/2018 11:57:11",
    "author": {
        "@type": "Organization",
        "name": "Airport Pickups London"
    },
    "publisher": {
        "@type": "Organization",
        "name": "Airport Pickups London",
        "logo": {
            "@type": "ImageObject",
            "url": "https://www.airport-pickups-london.com/images/apl-google-logo.png",
            "width": 600,
            "height": 60
        }
    },
    "description": "Airport Pickups London Booking Terms And Conditions"
}
const Terms = (props) => {
    let { bggray = false } = props;
    let { metaTitle, keywords, metaDescription, pageContent, mainCanonicalUrl } = props
    const state = useSelector(state => state.pickUpDropOffActions);
    const { params: { direction } } = state;

    return (
        <GlobalLayout mainCanonicalUrl={mainCanonicalUrl} keywords={keywords} title={metaTitle} description={metaDescription} footerbggray={true}>
            <div className={`${styles.terms} ${direction} page`} bggray={String(bggray === "true")}>
                <div className={`${styles.terms_section} page_section`}>
                    <div className={`${styles.terms_section_container} page_section_container`}>
                        <GeneralTerms pageContent={pageContent} />
                    </div>
                </div>
            </div>
        </GlobalLayout>
    )
}
export async function getServerSideProps({ req, query }) {
    let firstLoadLangauge = checkLanguageAttributeOntheUrl(req?.url)
    const { cookie } = req.headers;
    let { pathname } = parse(req?.url, true)
    // Determine the section based on the query parameter
    const section = query?.section; // "general" or "privacy-policy"
    let pathnameUrlWHenChangeByTopbar = pathname
    let contentPath = section === 'privacy-policy' ? '/Privacy_Policy' : '/Terms';
    let pathNameUrlCanonical = "/terms"
    let { metaTitle, keywords, pageContent, metaDescription, canonicalUrl: mainCanonicalUrl } =
        await fetchContent(contentPath, cookie, firstLoadLangauge, pathnameUrlWHenChangeByTopbar, pathNameUrlCanonical)

    let schemas = [structuredSchema, structedSchema2]
    return {
        props: { metaTitle, keywords, pageContent, metaDescription, schemas, mainCanonicalUrl }
    }
}
export default Terms
