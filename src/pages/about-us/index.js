import React from 'react'
import { useSelector } from 'react-redux'
import styles from "./styles.module.scss"
import GlobalLayout from '../../components/layouts/GlobalLayout';
import CarsSlider from "../../components/widgets/CarsSlider";
import { parse } from 'url';
import DestinationsCustomers from '../../components/elements/DestinationsCustomers';
import { fetchContent } from '../../helpers/fetchContent';
import { checkLanguageAttributeOntheUrl } from '../../helpers/checkLanguageAttributeOntheUrl';
const AboutUs = (props) => {
    const state = useSelector(state => state.pickUpDropOffActions)
    let { params: { direction } } = state
    let { metaTitle, keywords, metaDescription, shortDescription, pageTitle, pageContent ,mainCanonicalUrl} = props

    return (
        <GlobalLayout mainCanonicalUrl={mainCanonicalUrl} keywords={keywords} title={metaTitle} description={metaDescription} footerbggray={true}>
            <div className={`${styles.about_us} ${direction} page`}>
                <div className={`${styles.about_us_section} page_section`}>
                    <div className={`${styles.about_us_section_container} page_section_container`}>
                        <div className={styles.content}>
                            <div className={styles.left}>
                                <h1 className={styles.title}>
                                    {pageTitle}
                                </h1>
                                <p>
                                    {shortDescription}
                                </p>
                            </div>
                            <div className={styles.right}>
                                <img src="/images/others/aboutPage.jpg" alt="APL about us " />
                            </div>
                        </div>
                        <div className={styles.page_content} dangerouslySetInnerHTML={{ __html: pageContent }} />
                        <DestinationsCustomers />

                        <CarsSlider noborder={true} />
                    </div>
                </div>
            </div>
        </GlobalLayout >
    )
}
export async function getServerSideProps({ req, res }) {
    let firstLoadLangauge = checkLanguageAttributeOntheUrl(req?.url)
    const { cookie } = req.headers;
    let { pathname } = parse(req?.url, true)
    let pathnameUrlWHenChangeByTopbar = pathname
    let pathNameUrlCanonical = "/about-us"
    let { metaTitle, keywords, pageContent, metaDescription, shortDescription, pageTitle, canonicalUrl: mainCanonicalUrl } =
        await fetchContent("/About_APL", cookie, firstLoadLangauge, pathnameUrlWHenChangeByTopbar, pathNameUrlCanonical)

    return {
        props: { metaTitle, keywords, pageContent, metaDescription, shortDescription, pageTitle, mainCanonicalUrl }
    }
}
export default AboutUs