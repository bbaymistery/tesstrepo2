function SET_ACCOUNT_ID(params = {}) {
    let { state, action } = params
    let { data: { accountId, channelId } } = action
    let newState = JSON.parse(JSON.stringify(state))


    newState.reservations[0].reservationDetails.accountId = accountId
    newState.reservations[0].reservationDetails.channelId = channelId
    newState.reservations[0].paymentDetails.account = accountId

    return newState;
}
export default SET_ACCOUNT_ID