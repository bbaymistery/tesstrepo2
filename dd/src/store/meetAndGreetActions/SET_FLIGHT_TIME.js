function SET_FLIGHT_TIME(params = {}) {
    let { state, action } = params;
    let { data: { value, index } } = action;

    let newState = JSON.parse(JSON.stringify(state))
    const timeParts = newState.flightDetails.flightTime.split(':');

    if (index === 0) {
        // Update the hour part
        timeParts[0] = value;
    } else if (index === 1) {
        // Update the minute part
        timeParts[1] = value;
    }

    newState.flightDetails.flightTime = timeParts.join(':');
    return newState;
}

export default SET_FLIGHT_TIME