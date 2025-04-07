import { useDispatch, useSelector } from 'react-redux';
import CheckPlaceOfInterest from './CheckPlaceOfInterest';
import CheckingForPostcodes from './CheckingForPostcodes';
import CheckForCitites from './CheckForCitites';
import CheckForCruises from './CheckForCruises';
import CheckForFlight from './CheckForFlight';
import CheckForTrain from './CheckForTrain';
import CheckForOther from './CheckForOther';
import styles from "./styles.module.scss"
import React from 'react'
import CheckForUniversity from './CheckForUniversity';
const SelectedPointOnTransferDetails = (props) => {
    //index it is a destination if 0 it means pick up
    let { selectedPoints, journeyType, type, pointsError = props.selectedPoints.map(obj => ({})), env} = props;
    const state = useSelector(state => state.pickUpDropOffActions)
    let {  appData } = state

    const dispatch = useDispatch()

    const imageObjects = appData?.pointTypeCategories?.reduce((obj, item) => ({ ...obj, [item.id]: item.image }), {}); //1:"/media/mglafg5zqlrsocfwodwj.svg"
    const objectDetailStatuses = appData?.pointTypeCategories?.reduce((obj, item) => ({ ...obj, [item.id]: JSON.parse(item.detailsStatus), }), []);//cruiseNumber:{ pickup: 1, dropoff: 2, fieldType: 'text' }
    // 1:index of point
    // type is pickup or dropoff
    // journeyType is index of reservation
    return (
        <>
            {selectedPoints?.map((point, i) => {
                let pointError = Array.isArray(pointsError) && typeof pointsError[i] === 'object' ? pointsError[i] : {}
                const addressText = point.address.includes(point.postcode) ? `${point.address}` : `${point.address} ${point.postcode}`

                return (
                    <div className={`${styles.selected_list} ${selectedPoints.length > 0 ? "m_0" : ""}`} key={i} id="selectedlist">
                        <div className={styles.list_container}>
                     
                                 <div className={styles.list}>
                                   {/* eslint-disable-next-line @next/next/no-img-element */}
                                    {imageObjects && <img className={styles.list_image} src={`${env.apiDomain}${imageObjects[point?.pcatId]}`} alt={point.address} />}
                                <p className={styles.list_description}>{addressText}</p>
                                </div>
                           
                            {/* index it is a destination if 0 it means pick up  */}
                            {/* //!checking for flight pickups */}

                            {point.pcatId === 1 ?
                                <CheckForFlight
                                    type={type}
                                    point={point}
                                    error={pointError}
                                    journeyType={journeyType}
                                    objectDetailStatuses={objectDetailStatuses}
                                    onChange={flightDetails => dispatch({ type: 'SET_FLIGHT_DETAILS_FOR_POINTS', 'data': { 'index': journeyType, type, 'pointIndex': i, flightDetails } })}
                                /> : <React.Fragment></React.Fragment>}

                            {/* //! checking for CheckForCruises  */}
                            {point.pcatId === 2 ?
                                <CheckForCruises
                                    point={point}
                                    error={pointError}
                                    journeyType={journeyType}
                                    onChange={cruiseNumber => dispatch({ type: 'SET_CRUISE_NUMBER_FOR_POINTS', 'data': { 'index': journeyType, type, 'pointIndex': i, cruiseNumber } })}
                                /> : <React.Fragment></React.Fragment>}

                            {/* //! checking for CheckForTrain  */}
                            {point.pcatId === 3 ?
                                <CheckForTrain
                                    point={point}
                                    journeyType={journeyType}
                                    onChange={trainNumber => dispatch({ type: 'SET_TRAIN_NUMBER_FOR_POINTS', 'data': { 'index': journeyType, type, 'pointIndex': i, trainNumber } })}
                                /> : <React.Fragment></React.Fragment>}

                            {/* skip roomNumber */}

                            {/* //! checking for postcodes  */}
                            {point.pcatId === 5 ?
                                <CheckingForPostcodes
                                    point={point}
                                    error={pointError}
                                    journeyType={journeyType}
                                    onChange={postCodeDetails => dispatch({ type: 'SET_POSTCODE_DETAILS_FOR_POINTS', 'data': { 'index': journeyType, type, 'pointIndex': i, postCodeDetails } })}
                                /> : <React.Fragment></React.Fragment>}


                            {/* //! places of interest  cities universities and colleges other  */}
                            {/* SET_ADRESS_DESCRIPTION_FOR_POINTS =>  places of interest  cities universities and colleges other */}
                            {/*chck for place of interest  Lexington House*/}
                            {point.pcatId === 7 ?
                                <CheckPlaceOfInterest
                                    point={point}
                                    journeyType={journeyType}
                                    onChange={value => dispatch({ type: 'SET_ADRESS_DESCRIPTION_FOR_POINTS', 'data': { 'index': journeyType, type, 'pointIndex': i, value } })}
                                />
                                : <React.Fragment></React.Fragment>}

                            {/* //check for citites   */}
                            {point.pcatId === 8 ?
                                <CheckForCitites
                                    point={point}
                                    journeyType={journeyType}
                                    onChange={value => dispatch({ type: 'SET_ADRESS_DESCRIPTION_FOR_POINTS', 'data': { 'index': journeyType, type, 'pointIndex': i, value } })}
                                />
                                : <React.Fragment></React.Fragment>}

                            {/* universitirs Cotuit */}
                            {point.pcatId === 9 ?
                                <CheckForUniversity
                                    point={point}
                                    journeyType={journeyType}
                                    onChange={value => dispatch({ type: 'SET_ADRESS_DESCRIPTION_FOR_POINTS', 'data': { 'index': journeyType, type, 'pointIndex': i, value } })}
                                />
                                : <React.Fragment></React.Fragment>}

                            {point.pcatId === 10 ?
                                <CheckForOther
                                    point={point}
                                    journeyType={journeyType}
                                    onChange={value => dispatch({ type: 'SET_ADRESS_DESCRIPTION_FOR_POINTS', 'data': { 'index': journeyType, type, 'pointIndex': i, value } })}
                                />
                                : <React.Fragment></React.Fragment>}
                        </div>
                    </div>
                );
            })}
        </>
    )
}

export default SelectedPointOnTransferDetails

