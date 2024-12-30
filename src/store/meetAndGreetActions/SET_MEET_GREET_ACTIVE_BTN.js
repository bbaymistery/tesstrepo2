function SET_MEET_GREET_ACTIVE_BTN(params = {}) {
    let { state, action } = params;
    let { data: { activeBtnValue, newSelectedService } } = action;

    let newState = JSON.parse(JSON.stringify(state))
    newState.meetgreetActiveBtn = activeBtnValue
    newState.selectedService = newSelectedService
    return newState;
}

export default SET_MEET_GREET_ACTIVE_BTN