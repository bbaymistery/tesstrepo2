function SET_TOUR_TRANSFER_DETAILS(params = {}) {
    let { state, action } = params
    let { data: { name, value, } } = action

    let newState = JSON.parse(JSON.stringify(state))
    let transferDetails = newState.transferDetails

    if (name === "passengersNumber") {
        newState.transferDetails = { ...transferDetails, [name]: parseInt(value) }
    } else if (name === "specialRequests") {
        newState.transferDetails = { ...transferDetails, [name]: value }
    }
    return newState;
}
export default SET_TOUR_TRANSFER_DETAILS