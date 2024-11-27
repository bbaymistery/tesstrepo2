import React, { useRef, useState } from 'react'
import styles from "./styles.module.scss"
import GlobalLayout from '../../layouts/GlobalLayout'
import { useSelector } from 'react-redux'
import CardQuotationItemTaxiDeal from '../CardQuotationItemTaxiDeal'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
const QuotationResultsTaxiDealLeftPart = dynamic(() => import('../QuotationResultsTaxiDealLeftPart'));
const QuotationResultsTaxiDeal = (props) => {
    //these props comes from ...pathname

    let {
        previousUrl,
        keywords: keywordsTaxiDeal,
        pageTitle,
        headTitle,
        description: descriptionTaxiDeal,
        returnPathname,
        pageContent,
        returnHeadTitle,
        returnPageTitle,
        distance,
        duration,
        quotationOptions,
        breadcrumbs,
        linkurl,
        review,
        env,
        polylinePath,
        markerPoints
    } = props//those props comes from ...pathname

    const state = useSelector(state => state.pickUpDropOffActions)
    let { reservations, params } = state
    let { direction, } = params
    const router = useRouter()

    const { appData } = useSelector(state => state.initialReducer)
    const objectDetailss = appData?.pointTypeCategories?.reduce((obj, item) => ({ ...obj, [item.id]: JSON.parse(item.objectDetails), }), {});
    const [isVisible, setIsVisible] = useState(false);
    const lastScrollTop = useRef(0);

    const handleScroll = () => {
        const fromTop = window.scrollY;
        const isScrollDown = fromTop > lastScrollTop.current;

        // Sadece aşağı doğru kaydırma işlemlerini kontrol et.
        if (isScrollDown && fromTop > 100 && !isVisible) {
            setIsVisible(true);
        }

        // Güncel kaydırma pozisyonunu kaydet.
        lastScrollTop.current = fromTop;
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        // Clean up event listener
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isVisible]);
    useEffect(() => {
        localStorage.setItem("path", router.asPath);
    }, [])


    return (<GlobalLayout keywords={keywordsTaxiDeal} title={headTitle} description={descriptionTaxiDeal} footerbggray={true} isVisible={isVisible} >
        <div className={`${styles.quotation} page`}>
            <div className={`${styles.quotation_section} page_section`}>
                <div className={`${styles.quotation_section_container} page_section_container`}>
                    <div >
                        <div className={`${direction} ${styles.main_container_taxideal}`}>
                            <QuotationResultsTaxiDealLeftPart polylinePath={polylinePath} markerPoints={markerPoints} env={env} />
                            <CardQuotationItemTaxiDeal
                                index={0}
                                distance={distance}
                                duration={duration}
                                selectedQuotation={reservations[0]?.quotation}
                                quotationOptions={quotationOptions}
                                headTitle={headTitle}
                                previousUrl={linkurl}
                                returnPathname={returnPathname}
                                pageTitle={pageTitle}
                                pageContent={pageContent}
                                returnHeadTitle={returnHeadTitle}
                                returnPageTitle={returnPageTitle}
                                objectDetailss={objectDetailss}
                                isVisible={isVisible}
                                breadcrumbs={breadcrumbs}
                                linkurl={linkurl}
                                review={review}
                                env={env}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </GlobalLayout>
    )
}

export default QuotationResultsTaxiDeal