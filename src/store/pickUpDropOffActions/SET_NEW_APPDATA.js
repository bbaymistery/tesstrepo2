function SET_NEW_APPDATA(params = {}) {
    let { state, action } = params;
    let { data, initialStateReducer } = action;
    let newState = JSON.parse(JSON.stringify(state))
    // newState.appData = data
    initialStateReducer.appData = data

    localStorage.setItem("appData", JSON.stringify(data));
    return newState;
}

export default SET_NEW_APPDATA
