import React from 'react'
import { useSelector } from 'react-redux'
import styles from "./styles.module.scss"
import GlobalLayout from '../../components/layouts/GlobalLayout'
import { tourLinks } from '../../constants/tours'
import Image from 'next/image'

const Tours = (props) => {
    let { bggray = false, insideGlobalLayout = true } = props
    const state = useSelector(state => state.pickUpDropOffActions)
    let { params: { direction, language } } = state
    const { appData } = useSelector(state => state.initialReducer)
    let description = "Daily Tours and excursions for London. London to Bath-Stonehenge-Cambridge-Oxford daily tours."
    let title = "Tour-Airport Pickups London"
    let keywords = "Travel tour,airport pickups Tour"

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
                                {
                                    tourLinks.map((item, index) => {
                                        return (
                                            <a href={`${language === "en" ? "" : `${language}/`}tours/${item.link}`} title={item?.pageTitle} className={`${styles.card}`} key={item.id}>
                                                <div className={styles.card_image_div}>
                                                    <Image src={`${item.urlImage}`} className={styles.img} fill alt={item.title} sizes="(max-width: 768px) 100vw, 50vw" />
                                                </div>
                                                <div className={styles.card_body}>
                                                    <h2>{appData?.words[item?.translate]}</h2>
                                                    <div className={styles.start_from}>
                                                        <div className={styles.start_from_text_left}>{appData.words["strStartFrom"]} </div>
                                                        <div className={styles.start_from_text_right}> £ {item?.price} </div>
                                                    </div>

                                                </div>
                                            </a>
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
                <div className={`${styles.tours_section_container} page_section_container`}>
                    <div className={styles.title}>
                        <h1>{appData.words["strDailyTours"]}</h1>
                    </div>

                    <div className={styles.cards_content}>
                        <div className={styles.cards}>
                            {
                                tourLinks.map((item, index) => {
                                    return (
                                        <a href={`${language === "en" ? "" : `${language}/`}tours/${item.link}`} title={item?.pageTitle} className={`${styles.card}`} key={item.id}>
                                            <div className={styles.card_image_div}>
                                                <Image src={`${item.urlImage}`} className={styles.img} fill alt={item.title} sizes="(max-width: 768px) 100vw, 50vw" />
                                            </div>
                                            <div className={styles.card_body}>
                                                <h2>{appData?.words[item?.translate]}</h2>
                                                <div className={styles.start_from}>
                                                    <div className={styles.start_from_text_left}>{appData.words["strStartFrom"]} </div>
                                                    <div className={styles.start_from_text_right}> £ {item?.price} </div>
                                                </div>

                                            </div>
                                        </a>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Tours