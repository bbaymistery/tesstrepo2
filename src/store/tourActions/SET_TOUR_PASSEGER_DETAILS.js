function SET_TOUR_PASSEGER_DETAILS(params = {}) {
    let { state, action } = params
    let { data: { name, value, } } = action
    let newState = JSON.parse(JSON.stringify(state))
    let passengerDetails = newState.passengerDetails
    newState.passengerDetails = { ...passengerDetails, [name]: value }
    return newState;
}
export default SET_TOUR_PASSEGER_DETAILS