import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error404 from '../../../pages/404/index'
import QuotationResultsTaxiDeal from '../QuotationResultsTaxiDeal';
import { useState } from 'react';
import { fetchPathnamePageDatas } from '../../../helpers/fetchPathnamePageDatas';
import { useRouter } from 'next/router';

function TestA(props) {
    const state = useSelector(state => state.pickUpDropOffActions)
    let { reservations, params: { journeyType, quotations, language: reduxLanguage } } = state

    const dispatch = useDispatch()
    const { appData } = useSelector(state => state.initialReducer)
    const objectDetailss = appData?.pointTypeCategories.reduce((obj, item) => ({ ...obj, [item.id]: JSON.parse(item.objectDetails), }), {});
    const router = useRouter()
    const [fetchdatas, setFetchDatas] = useState(props.props ? props.props : null)

    let
        { data = "",
            pickUps = [], dropoffs = [], polylinePath = [], markerPoints = [],
            keywords = [], pageTitle = "", headTitle = "", description = "", returnPathname = "",
            pageContent = "", returnHeadTitle = "", returnPageTitle = "", duration = "", distance = "", quotationOptions = [], breadcrumbs = [], linkurl = "", review = {} } = fetchdatas

    if (data === "not found") return <Error404 />

    useEffect(() => {
        //when we go to transfer details then go back in that case we need to check if we have already quotations or not
        if (!quotations[0]?.quotationOptions?.length) dispatch({ type: "GET_QUOTATION_AT_PATHNAME", data: { results: data, journeyType } })

        //if it is already selected It means when user go to quotain and go to transfer details then come back It should be selected
        if (reservations[0].selectedDropoffPoints.length > 0 && reservations[0].selectedPickupPoints.length > 0) {
            let pickupPoints = reservations[0].selectedPickupPoints
            let dropoffPoints = reservations[0].selectedDropoffPoints
            dispatch({ type: "ADD_NEW_POINT_AT_PATHNAME", data: { pickupPoints, dropoffPoints, index: 0 } })
        } else {
            //for first time
            //   point = { ...point, ...objectDetailss[point.pcatId] }   flightDetails{ flightNumber="",waitingPickupTime=0}
            let pickupPoints = pickUps.length > 0 ? [{ ...pickUps[0], ...objectDetailss[pickUps[0].pcatId] }] : []

            let dropoffPoints = dropoffs.length > 0 ? [{ ...dropoffs[0], ...objectDetailss[dropoffs[0].pcatId] }] : []
            dispatch({ type: "ADD_NEW_POINT_AT_PATHNAME", data: { pickupPoints, dropoffPoints, index: 0 } })
        }
        const urls = [`/${returnPathname.split("/")[2]}`, linkurl]
        fetchPathnamePageDatas(urls);

        //returnPathname

    }, [])

    useEffect(() => {
        const cacheKey = `page-${reduxLanguage}-${linkurl}`;

        let cache = sessionStorage.getItem('pathnameLinkCache');
        let allAppDatas = JSON.parse(sessionStorage.getItem('allAppDatas'))

        if (cache && allAppDatas && JSON.parse(cache)[cacheKey]) {
            setFetchDatas(JSON.parse(cache)[cacheKey])
        }


    }, [reduxLanguage])
    

    return <QuotationResultsTaxiDeal
        isTaxiDeal={true}
        keywords={keywords}
        pageTitle={pageTitle}
        headTitle={headTitle}
        description={description}
        previousUrl={linkurl}
        returnPathname={returnPathname}
        pageContent={pageContent}
        returnHeadTitle={returnHeadTitle}
        returnPageTitle={returnPageTitle}
        distance={distance}
        duration={duration}
        quotationOptions={quotationOptions}
        breadcrumbs={breadcrumbs}
        linkurl={linkurl}
        review={review}
        env={props.props.env}
        polylinePath={polylinePath}
        markerPoints={markerPoints}
    />
}


export default TestA
