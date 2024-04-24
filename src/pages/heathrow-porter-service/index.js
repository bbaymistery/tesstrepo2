import React from 'react'
import { useSelector } from 'react-redux'
import styles from "./styles.module.scss"
import GlobalLayout from '../../components/layouts/GlobalLayout'
import LeftSidebarInformation from '../../components/elements/LeftSidebarInformation'
import { checkLanguageAttributeOntheUrl } from '../../helpers/checkLanguageAttributeOntheUrl'
import { parse } from 'url';
import { fetchContent } from '../../helpers/fetchContent'



const Porter = (props) => {
    let { bggray = false } = props;
    let { metaTitle, keywords, metaDescription, shortDescription, pageTitle, pageContent } = props

    const { appData } = useSelector(state => state.initialReducer)

    const state = useSelector(state => state.pickUpDropOffActions)
    let { params: { direction } } = state

    return (
        <GlobalLayout keywords={keywords} title={metaTitle} description={metaDescription} footerbggray={true}>
            <div className={`${styles.porter} ${direction} page`} bggray={String(bggray === "true")}>
                <div className={`${styles.porter_section} page_section`}>
                    <div className={`${styles.porter_section_container} page_section_container`}>
                        <div className={styles.left_content}>
                            {/* bura eftsidebar componentin normal div formasi yazilmisdi onu sadece reusable olsun deye tek sekilde yazdm */}
                            <LeftSidebarInformation direction={direction} appData={appData} />
                        </div>
                        <div className={styles.right_content}>
                            <div className={`${styles.porter_header}`}>
                                <h1>{pageTitle}</h1>
                            </div>

                            &nbsp;
                            <div className={`${styles.porter_footer}`}>
                                <ul>
                                    <li style={{ fontSize: "17px" }}>{shortDescription}</li>
                                </ul>
                                <div className={`${styles.page_content} `} dangerouslySetInnerHTML={{ __html: pageContent }} />
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </GlobalLayout>
    )
}
export async function getServerSideProps({ req, res }) {
    let firstLoadLangauge = checkLanguageAttributeOntheUrl(req?.url)
    const { cookie } = req.headers;
    let { pathname } = parse(req?.url, true)
    let pathnameUrlWHenChangeByTopbar = pathname
    let { metaTitle, keywords, pageContent, metaDescription, shortDescription, pageTitle } = await fetchContent("/heathrow-porter-service", cookie, firstLoadLangauge, pathnameUrlWHenChangeByTopbar)
    return {
        props: { metaTitle, keywords, pageContent, metaDescription, shortDescription, pageTitle }
    }
}
export default Porter