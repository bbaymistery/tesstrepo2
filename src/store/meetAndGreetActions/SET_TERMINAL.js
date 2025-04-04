function SET_TERMINAL(params = {}) {
    let { state, action } = params;
    let { data: { newTerminal } } = action;

    let newState = JSON.parse(JSON.stringify(state))
    newState.terminalName = newTerminal
    return newState;
}

export default SET_TERMINAL