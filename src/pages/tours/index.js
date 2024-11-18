import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from "./styles.module.scss"
import GlobalLayout from '../../components/layouts/GlobalLayout'
import Image from 'next/image'
import Link from 'next/link'

const Tours = (props) => {
    let { bggray = false, insideGlobalLayout = true, env } = props
    const state = useSelector(state => state.pickUpDropOffActions)
    let { params: { direction, language } } = state
    const { appData } = useSelector(state => state.initialReducer)
    let description = "Daily Tours and excursions for London. London to Bath-Stonehenge-Cambridge-Oxford daily tours."
    let title = "Tour-Airport Pickups London"
    let keywords = "Travel tour,airport pickups Tour"
    // useState to control "View All" state
    const [viewAll, setViewAll] = useState(false);
    const [toursData, setToursData] = useState([])
    const displayedTours = viewAll ? toursData : toursData.slice(0, 4);

    const handleViewAllClick = () => {
        setViewAll(!viewAll);
    };
    const fecthPoints = async (language) => {
        let url = `${env.apiDomain}/api/v1/tours-deals/list?language=${language}`;
        let response = await fetch(url);
        let { data, status } = await response.json();
        if (status === 200) {
            setToursData(data)
        }
    };


    //!Daily tour expand collapse 
    //!yazilari kucult /heathrowdaki gibi
    useEffect(() => {
        fecthPoints(language)
    }, [language])



    return (insideGlobalLayout ?
        <GlobalLayout keywords={keywords} title={title} description={description} footerbggray={true}>
            <div className={`${styles.tours} ${direction} page`} bggray={String(bggray)} style={{ backgroundColor: `${String(bggray) === "true" ? "#f5f5f5" : "white"}` }}>
                <div className={`${styles.tours_section} page_section`}>
                    <div className={`${styles.tours_section_container} page_section_container`}>
                        <div className={styles.title}>
                            <h1>{appData.words["strDailyTours"]}</h1>
                        </div>
                        <div className={styles.cards_content}>
                            <div className={styles.cards}>
                                {toursData.map((item, _) => {
                                    return (
                                        <Link href={`${language === "en" ? "" : `${language}`}${item.pathname}`} title={item?.pageTitle} className={`${styles.card}`} key={item.tourDealId}>
                                            <div className={styles.card_image_div}>
                                                <Image src={`${item.images[0]}`} className={styles.img} fill alt={item.headTitle} sizes="(max-width: 768px) 100vw, 50vw" />
                                            </div>
                                            <div className={styles.card_body}>
                                                <h2>{item.pageTitle}</h2>
                                                <div className={styles.card_desc}>
                                                    <div className={styles.card_desc_subtitle}>
                                                        <div className={styles.card_detail_btn_box}>
                                                            <div className={styles.detail_btn}>{(appData || {})?.words["strReadMore"]}</div>
                                                            <p className={styles.detail_arrow_icon}>
                                                                <i className="fa-solid fa-angle-right"></i>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </Link>
                                    )
                                })
                                }
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </GlobalLayout> :
        <div className={`${styles.tours} ${direction} page`} bggray={String(bggray)} style={{ backgroundColor: `${String(bggray) === "true" ? "#f5f5f5" : "white"}`, marginTop: `${!insideGlobalLayout ? '0px !important' : ""}` }}>
            <div className={`${styles.tours_section} page_section`}>
                <div className={`${styles.tours_section_container} page_section_container`} >
                    <div className={styles.title}>
                        <h1>{appData.words["strDailyTours"]}</h1>
                    </div>

                    <div className={styles.cards_content}>
                        <div className={styles.cards}>
                            {
                                displayedTours.map((item, _) => {
                                    return (
                                        <a href={`${language === "en" ? "" : `${language}`}${item.pathname}`} title={item?.pageTitle} className={`${styles.card}`} key={item.tourDealId}>
                                            <div className={styles.card_image_div}>
                                                <Image src={`${item.images[0]}`} className={styles.img} fill alt={item.headTitle} sizes="(max-width: 768px) 100vw, 50vw" />
                                            </div>
                                            <div className={styles.card_body}>
                                                <h2>{item.pageTitle}</h2>
                                                <div className={styles.card_desc}>
                                                    <div className={styles.card_desc_subtitle}>
                                                        <div className={styles.card_detail_btn_box}>
                                                            <div className={styles.detail_btn}>{(appData || {})?.words["strReadMore"]}</div>
                                                            <p className={styles.detail_arrow_icon}>
                                                                <i className="fa-solid fa-angle-right"></i>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </a>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.btn_div}>
                            <button className="btn_hover_reverse_primary" onClick={handleViewAllClick}   >
                                {viewAll ? appData?.words["strViewLess"] || "View Less" : appData?.words["strViewAll"] || "View All"}
                                <i className="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Tours