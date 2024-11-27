function SET_TOUR_PICKUP_ADRESS(params = {}) {
    let { state, action } = params
    let { data: { pickupadress } } = action
    let newState = JSON.parse(JSON.stringify(state))

    newState.pickupPoint.pickupadress = pickupadress
    return newState;
}
export default SET_TOUR_PICKUP_ADRESS