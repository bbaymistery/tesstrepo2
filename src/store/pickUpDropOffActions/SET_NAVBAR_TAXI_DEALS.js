function SET_NAVBAR_TAXI_DEALS(params = {}) {
    let { state, action } = params
    let { data: { hasTaxiDeals } } = action
    let newState = JSON.parse(JSON.stringify(state))
    if (hasTaxiDeals.length > 0) newState.params.hasTaxiDeals = hasTaxiDeals
    return newState;
}
export default SET_NAVBAR_TAXI_DEALS