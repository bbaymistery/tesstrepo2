function SET_QUOTATION(params = {}) {
    let { state, action } = params
    let { data: { quotation, journeyType } } = action
    let newState = JSON.parse(JSON.stringify(state))

    // set Quotation
    newState.reservations[journeyType].quotation = quotation


    let pickUpSelectedPoints = newState.reservations[journeyType].selectedPickupPoints
    let dropOffSelectedPoints = newState.reservations[journeyType].selectedDropoffPoints
    let paymentDetails = newState.reservations[journeyType].paymentDetails

    //changing waitingpickuptime to empty string if destination is pickup
    let newSelectedPickUpPoints = pickUpSelectedPoints.map((point, index) => {
        if (point.pcatId === 1) {
            return { ...point, flightDetails: { ...point.flightDetails, waitingPickupTime: "" } };
        } else if (point.pcatId === 5) {
            return { ...point, postCodeDetails: { ...point.postCodeDetails, id: "" } };
        } else {
            return point;
        }
    });

    let newSelectedDropoffPoints = dropOffSelectedPoints.map((point, index) => {
        if (point.pcatId === 5) {
            return point = { ...point, postCodeDetails: { ...point.postCodeDetails, id: "" } }
        } else {
            return point
        }
    })

    newState.reservations[journeyType].selectedPickupPoints = newSelectedPickUpPoints
    newState.reservations[journeyType].selectedDropoffPoints = newSelectedDropoffPoints
    // set quotation  price to payment details object
    newState.reservations[journeyType].paymentDetails = { ...paymentDetails, price: parseInt(quotation.price) }

    return newState;
}
export default SET_QUOTATION


