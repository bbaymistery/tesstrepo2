
function GET_APP_DATA(params = {}) {
    let { state, action } = params
    let { data: { appData, paymentTypes } } = action;
    let newState = JSON.parse(JSON.stringify(state))
    newState.appData = { ...appData }
    newState.paymentTypes = paymentTypes
   
    // localStorage.setItem("paymentTypes", JSON.stringify(paymentTypes));
    return newState
}
export default GET_APP_DATA


