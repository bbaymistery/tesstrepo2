

function SET_FLIGHT_NUMBER_OR_LUGGAGE(params = {}) {
    let { state, action } = params;
    let { data: { name, value,  } } = action;

    let newState = JSON.parse(JSON.stringify(state))
     newState = { ...state, flightDetails: { ...state.flightDetails, [name]: value } };

    return newState;
}

export default SET_FLIGHT_NUMBER_OR_LUGGAGE