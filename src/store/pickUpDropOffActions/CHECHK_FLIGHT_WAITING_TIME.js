function CHECHK_FLIGHT_WAITING_TIME(params = {}) {
    let { state, action } = params
    let { data: { journeyType } } = action
    let newState = JSON.parse(JSON.stringify(state))

    let pickUpSelectedPoints = newState.reservations[journeyType].selectedPickupPoints
    let dropOffSelectedPoints = newState.reservations[journeyType].selectedDropoffPoints

    //changing waitingpickuptime to empty string if destination is pickup
    let newSelectedPickUpPoints = pickUpSelectedPoints.map((point, index) => {
        if (point.pcatId === 1) {
            return point = { ...point, flightDetails: { ...point.flightDetails, waitingPickupTime: 0 } }
        } else if (point.pcatId === 5) {
            return { ...point, postCodeDetails: { ...point.postCodeDetails, id: point.postCodeDetails.id ? point.postCodeDetails.id : 0 } };
        }
        else {
            return point
        }
    })

    let newSelectedDropoffPoints = dropOffSelectedPoints.map((point, index) => {
        if (point.pcatId === 5) {
            return point = { ...point, postCodeDetails: { ...point.postCodeDetails, id: point.postCodeDetails.id ? point.postCodeDetails.id : 0 } }
        } else {
            return point
        }
    })
    newState.reservations[journeyType].selectedPickupPoints = newSelectedPickUpPoints
    newState.reservations[journeyType].selectedDropoffPoints = newSelectedDropoffPoints


    return newState;
}
export default CHECHK_FLIGHT_WAITING_TIME


