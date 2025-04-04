


function SET_FLIGHT_CLASS(params = {}) {
    let { state, action } = params;
    let { data: { newFlightClass } } = action;

    let newState = JSON.parse(JSON.stringify(state))
    newState = { ...state, flightDetails: { ...state.flightDetails, flightClass: newFlightClass } };

    return newState;
}

export default SET_FLIGHT_CLASS