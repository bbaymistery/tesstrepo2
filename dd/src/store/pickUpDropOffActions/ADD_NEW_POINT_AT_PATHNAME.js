function ADD_NEW_POINT_AT_PATHNAME(params = {}) {
    let { state, action } = params;
    let { data: { pickupPoints, dropoffPoints, index } } = action;
    let newState = JSON.parse(JSON.stringify(state))
    newState.reservations[index][`selectedPickupPoints`] = pickupPoints
    newState.reservations[index][`selectedDropoffPoints`] = dropoffPoints
    //set pickUpCategoryId first item of selectedPickUppoints
    let pickUpSelectedPoints = newState.reservations[0].selectedPickupPoints
    let transferDetails = newState.reservations[0].transferDetails
    newState.reservations[index].transferDetails = { ...transferDetails, pickupCategoryId: pickUpSelectedPoints[0]?.pcatId }
    return newState;
}

export default ADD_NEW_POINT_AT_PATHNAME
