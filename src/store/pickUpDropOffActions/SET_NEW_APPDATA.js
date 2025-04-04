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

/*
function SET_NEW_APPDATA(params = {}) {
    let { state, action } = params;
    let { data, initialStateReducer,data2 } = action;
    let newState = JSON.parse(JSON.stringify(state))
    // newState.appData = data
    initialStateReducer.appData = data
    initialStateReducer.paymenyTypes = data2

    localStorage.setItem("appData", JSON.stringify(data));
    localStorage.setItem("paymenyTypes", JSON.stringify(data2));
    
    return newState;
}

export default SET_NEW_APPDATA
*/