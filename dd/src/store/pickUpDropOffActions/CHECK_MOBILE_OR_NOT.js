function CHECK_MOBILE_OR_NOT(params = {}) {
    let { state, action } = params
    let { data: { mobileAndTabletCheck } } = action;
    let newState = JSON.parse(JSON.stringify(state))
    newState.reservations[0].reservationDetails.channelId = mobileAndTabletCheck ? 3 : 2
    return newState
}
export default CHECK_MOBILE_OR_NOT


