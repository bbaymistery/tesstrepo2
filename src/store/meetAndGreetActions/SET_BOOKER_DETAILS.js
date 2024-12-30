function SET_BOOKER_DETAILS(params = {}) {
    let { state, action } = params;
    let { data: { name, value } } = action;

    let newState = JSON.parse(JSON.stringify(state))
    newState = { ...state, bookersDetails: { ...state.bookersDetails, [name]: value } };

    return newState;
}

export default SET_BOOKER_DETAILS