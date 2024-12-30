import React from 'react'
import { useSelector } from 'react-redux'
import styles from "./styles.module.scss"
import GlobalLayout from '../../components/layouts/GlobalLayout'
import CarsSlider from "../../components/widgets/CarsSlider";
import DestinationsCustomers from '../../components/elements/DestinationsCustomers';
import Link from 'next/link'
import { checkLanguageAttributeOntheUrl } from '../../helpers/checkLanguageAttributeOntheUrl'
import { parse } from 'url';
import { fetchContent } from '../../helpers/fetchContent'


const Corporate = (props) => {
  let { bggray, metaTitle, keywords, pageContent, metaDescription, mainCanonicalUrl } = props
  const state = useSelector(state => state.pickUpDropOffActions)
  let { params: { direction, language } } = state
  const { appData } = useSelector(state => state.initialReducer)

  return (
    <GlobalLayout mainCanonicalUrl={mainCanonicalUrl} keywords={keywords} title={metaTitle} description={metaDescription}>
      <div className={`${styles.corporate} ${direction} page`} bggray={String(bggray === "true")}>
        <div className={`${styles.corporate_section} page_section`}>
          <div className={`${styles.corporate_section_container} page_section_container`}>
            <div className={styles.content}>

              <div className={styles.left}>
                <h1 className={styles.title}>
                  {appData?.words["strTravelNews"]}
                </h1>
                <br />
                <div className={styles.account_div}>
                  <Link target='_blank' href="https://agency.airport-pickups-london.com/" >
                    <button className='btn btn_primary'>{appData?.words["strLogin"]}</button>
                  </Link>
                  <a href={language === 'en' ? '/account-register' : `/${language}/account-register`} title="AccountRegister" >
                    <button className='btn btn_primary'>{appData?.words["strRegister"]}</button>
                  </a>
                </div>

                <div className={styles.pageContent} dangerouslySetInnerHTML={{ __html: pageContent }}>
                </div>
              </div>
              <div className={styles.right}>
                <img src="/images/others/apl_family.jpg" alt="" />
              </div>
            </div>
            <DestinationsCustomers />

            <CarsSlider noborder={true} />


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
  let pathNameUrlCanonical = "/travel-agents"

  let { metaTitle, keywords, pageContent, metaDescription, shortDescription, pageTitle,canonicalUrl: mainCanonicalUrl} =
   await fetchContent("/travel-agents", cookie, firstLoadLangauge, pathnameUrlWHenChangeByTopbar,pathNameUrlCanonical)
  return {
    props: { metaTitle, keywords, pageContent, metaDescription, shortDescription, pageTitle,mainCanonicalUrl }
  }
}

export default Corporate