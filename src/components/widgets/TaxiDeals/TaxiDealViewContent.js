

import React from 'react'
import styles from "./styles.module.scss"
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { cruisePortimages, taxidealsImages } from '../../../constants/taxideals'
/**
 
//!Southpmap
Heathrow to Southampton taxi
Gatwick to Southampton taxi
Stansted to Southampton taxi
Luton to Southampton taxi
Southampton to Heathrow taxi
Southampton to Gatwick taxi
Southampton to Luton taxi
Southampton to Stansted taxi
 */

/*
!Dover
"Heathrow to Dover taxi"
"Gatwick to Dover taxi"
"Stansted to Dover taxi"
"Luton to Dover taxi"
Dover to Heathrow taxi
Dover to Gatwick taxi
Dover to Stansted taxi
Dover to Luton taxi
*/

/*
!portsmouth
 "Heathrow to Portsmouth taxi"
 "Gatwick to Portsmouth taxi"
 "Luton to Portsmouth taxi"
 "Stansted to Portsmouth taxi"
"Portsmouth to Heathrow taxi"
"Portsmouth to Luton taxi"
"Portsmouth to Gatwick taxi"
 "Portsmouth to Stansted taxi"
*/

//taking delas name and making it dynamic for gatwixk for heathrow and the others
const airportTaxiDealsValidLocations = (dealsName) => {
    //first letter uppercase


    dealsName = dealsName.charAt(0).toUpperCase() + dealsName.slice(1);
    if (dealsName === 'City airport') dealsName = 'City Airport'
    //we r destcructing to taxi trasnfer
    return [
        `${dealsName} to Oxford taxi`,
        `${dealsName} to Birmingham taxi`,
        `${dealsName} to Cambridge taxi`,
        `${dealsName} to Bath taxi`,
        `${dealsName} to Bristol taxi`,
        `${dealsName} to Brighton taxi`,
        `${dealsName} to Norwich taxi`,
        `${dealsName} to Canterbury taxi`
    ]
}

const cruiseTaxiDealsValidLocations = (dealsName) => {
    dealsName = dealsName.charAt(0).toUpperCase() + dealsName.slice(1);

    return [
        `Heathrow to ${dealsName} taxi`,
        `Gatwick to ${dealsName} taxi`,
        `Luton to ${dealsName} taxi`,
        `Stansted to ${dealsName} taxi`,
        `${dealsName} to Heathrow taxi`,
        `${dealsName} to Gatwick taxi`,
        `${dealsName} to Luton taxi`,
        `${dealsName} to Stansted taxi`
    ]
}

const TaxiDealViewContent = ({ points, dealsName, islinknamecomponent }) => {

    const { appData } = useSelector(state => state.initialReducer)
    function filterDatas(datas) {
        if (["portsmouth", "dover", "harwich", "southampton"].includes(dealsName)) {
            //we  do not need any destructing
            //0.8 yaziriq cunki bize 10 tane locations getirir
            //https://api.london-tech.com//api/v1/taxi-deals/list?points=southampton&language=en&channelId=2
            const orderedTitles = cruiseTaxiDealsValidLocations(dealsName); // Get the ordered list of titles
            const filteredData = [];
            orderedTitles.forEach(title => {
                // Find all items in datas that match the current title and add them to filteredData
                const matchingData = datas.filter(data => data.pageTitle === title);
                filteredData.push(...matchingData); // Using spread operator to flatten the array
            });
            return filteredData
        } else {
            return datas
                .filter(({ pageTitle }) => airportTaxiDealsValidLocations(dealsName).includes(pageTitle))
                .sort((a, b) => airportTaxiDealsValidLocations(dealsName).indexOf(a.pageTitle) - airportTaxiDealsValidLocations(dealsName).indexOf(b.pageTitle));
        }
    }
    //dealsName === 'dover' || dealsName === 'southampton' || dealsName === 'portsmouth' || dealsName === 'harwich'
    const filteredDatas = filterDatas(points);
    return (
        <>
            <div className={styles.cards}>
                {points.length > 1 ?
                    filteredDatas.map((item, index) => {
                        return (
                            <a data-id="a" title={item?.pageTitle} href={item.pathname} className={`${styles.card}`} key={item.id}>
                                <div className={styles.card_image_div}>
                                    {dealsName === 'dover' || dealsName === 'southampton' || dealsName === 'portsmouth' || dealsName === 'harwich' ?
                                        <Image src={`${cruisePortimages?.[index]?.image}`} className={styles.img} fill alt={item.pageTitle} sizes="(max-width: 768px) 30vw, (max-width: 1200px) 50vw" />
                                        : <Image src={`${taxidealsImages?.[index]?.image}`} className={styles.img} fill alt={item.pageTitle} sizes="(max-width: 768px) 30vw, (max-width: 1200px) 50vw" />}

                                </div>
                                <div className={styles.card_body}>
                                    <h2>{item?.translatedPageTitle ? item?.translatedPageTitle : item?.title}</h2>
                                    <div className={styles.review}>

                                        <div className={styles.review_left}>{item.point} </div>
                                    </div>
                                    <div className={styles.start_from}>
                                        <div className={styles.start_from_text_left}>{appData.words["strStartFrom"]} </div>
                                        <div className={styles.start_from_text_right}> {item?.price} </div>
                                    </div>

                                </div>
                            </a>
                        )
                    }) :
                    <div style={{ textAlign: 'center', width: '100%' }}>
                        No content
                    </div>
                }
            </div>
        </>
    )
}

export default TaxiDealViewContent