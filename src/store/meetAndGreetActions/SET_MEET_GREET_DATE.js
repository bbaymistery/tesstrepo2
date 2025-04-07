function SET_MEET_GREET_DATE(params = {}) {
    let { state, action } = params;
    let { data: { dateValue } } = action;

    let newState = JSON.parse(JSON.stringify(state))
    newState.meetgreetDate = dateValue
    return newState;
}

export default SET_MEET_GREET_DATE