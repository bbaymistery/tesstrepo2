import { useRouter } from 'next/router';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import env from '../../../resources/env';
import styles from "./styles.module.scss"
const SelectedPointsOnHomePage = (params = {}) => {
    //hasOneItem related to taxi deals
    let { points, index, destination, getQuotations = () => { }, isTaxiDeal = false, hasOneItem = false } = params
    const dispatch = useDispatch()
    const router = useRouter()
    const state = useSelector((state) => state.pickUpDropOffActions);
    let { params: { direction, journeyType, language }, reservations } = state
    const { appData } = useSelector(state => state.initialReducer)
    const imageObjects = appData?.pointTypeCategories?.reduce(
        (obj, item) => ({
            ...obj,
            [item.id]: item.image,
        }),
        {}
    );

    const handleDelete = (params = {}) => {
        let { currentIndexOfDeletedItem } = params
        dispatch({ type: "DELETE_ITEM_FROM_SELECTEDLIST", data: { currentIndexOfDeletedItem, index, destination } })
        let points = reservations[index][`selected${destination === 'pickup' ? 'Pickup' : 'Dropoff'}Points`];
        reservations[index][`selected${destination === 'pickup' ? 'Pickup' : 'Dropoff'}Points`] = points.filter((point, i) => i !== currentIndexOfDeletedItem)
        getQuotations()

    }

    return (<div className={`${styles.selected_points} ${isTaxiDeal ? styles.isTaxiDeal_selected_points : ""} ${hasOneItem?styles.hasoneitem_taxideals:""}`}>
        {points.map((point, index) => {

            return (
                <div key={index} className={styles.point_div} direction={String(direction === "rtl")} title={`${language === 'en' ? point.address : point.translatedAddress}`}>
                    {imageObjects && <img className={styles.point_image} src={`${env.apiDomain}${imageObjects[point?.pcatId]}`} alt={`${language === 'en' ? point.address : point.translatedAddress}`} />}
                    <input type="text" readOnly={true} className={direction} name="pickup-address" placeholder={`${language === 'en' ? point.address : point.translatedAddress}`} />
                    {!hasOneItem ?
                        <span hideme={String(router.pathname === "/quotation-result")} className={`${styles.icons} ${styles.icons_delete_span}`} onClick={(e) => handleDelete({ currentIndexOfDeletedItem: index, v: e.target })}>
                            <i className="fa fa-times sef-loc-delete" aria-hidden="true"  ></i>
                        </span> : <></>}
                    {<span hideme={String(router.pathname === "/quotation-result")} className={`${styles.icons_check_span} ${styles.icons}`}>
                            <i className={`fa-solid fa-check ${styles.check_button}`} aria-hidden="true"></i>
                        </span> }

                </div>)
        })}
    </div>)
}

export default SelectedPointsOnHomePage

