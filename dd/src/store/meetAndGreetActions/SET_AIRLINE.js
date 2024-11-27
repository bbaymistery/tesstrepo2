


function SET_AIRLINE(params = {}) {
    let { state, action } = params;
    let { data: { newAirline } } = action;

    let newState = JSON.parse(JSON.stringify(state))
    newState = { ...state, flightDetails: { ...state.flightDetails, airline: newAirline } };

    return newState;
}

export default SET_AIRLINE