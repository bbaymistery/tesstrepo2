import React from 'react'
import GlobalLayout from '../../components/layouts/GlobalLayout'
import styles from "./styles.module.scss"
import PrivacyTerms from './PrivacyTerms'
import { useSelector } from 'react-redux'
import { fetchContent } from '../../helpers/fetchContent'
import { checkLanguageAttributeOntheUrl } from '../../helpers/checkLanguageAttributeOntheUrl'
import { parse } from 'url';
const structedSchema2 = {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.airport-pickups-london.com/privacy-policy"  // Change URL to your privacy policy page
    },
    "headline": "Privacy Policy",  // Change headline to "Privacy Policy"
    "image": {
        "@type": "ImageObject",
        "url": "https://www.airport-pickups-london.com",  // Replace with an appropriate image URL if needed
        "height": 800,
        "width": 800
    },
    "datePublished": "04/12/2018 11:57:11",  // Adjust date if necessary
    "dateModified": "04/12/2018 11:57:11",   // Adjust date if necessary
    "author": {
        "@type": "Organization",
        "name": "Airport Pickups London"  // Author stays the same
    },
    "publisher": {
        "@type": "Organization",
        "name": "Airport Pickups London",  // Publisher stays the same
        "logo": {
            "@type": "ImageObject",
            "url": "https://www.airport-pickups-london.com/images/apl-google-logo.png",  // Logo stays the same
            "width": 600,
            "height": 60
        }
    },
    "description": "Airport Pickups London Privacy Policy"  // Update description to reflect the privacy policy
};
const PrivacyPolicy = (props) => {
    let { bggray = false } = props;
    let { metaTitle, keywords, metaDescription, pageContent, mainCanonicalUrl } = props
    const state = useSelector(state => state.pickUpDropOffActions);
    const { params: { direction } } = state;

    return (
        <GlobalLayout mainCanonicalUrl={mainCanonicalUrl} keywords={keywords} title={metaTitle} description={metaDescription} footerbggray={true}>
            <div className={`${styles.terms} ${direction} page`} bggray={String(bggray === "true")}>
                <div className={`${styles.terms_section} page_section`}>
                    <div className={`${styles.terms_section_container} page_section_container`}>
                        <PrivacyTerms pageContent={pageContent} />
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
    let pathnameUrlWHenChangeByTopbar = pathname
    let contentPath = '/Privacy_Policy';
    let pathNameUrlCanonical = "/privacy-policy"
    let { metaTitle, keywords, pageContent, metaDescription, canonicalUrl: mainCanonicalUrl } =
        await fetchContent(contentPath, cookie, firstLoadLangauge, pathnameUrlWHenChangeByTopbar, pathNameUrlCanonical)

    let schemas = [structedSchema2]
    return {
        props: { metaTitle, keywords, pageContent, metaDescription, schemas, mainCanonicalUrl }
    }
}
export default PrivacyPolicy
