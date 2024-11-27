function SET_APPROXIMATE_DATA(params = {}) {
    let { state, action } = params
    let { data: { value } } = action

    let newState = JSON.parse(JSON.stringify(state))
    newState.accountRegisterDatas.approximateSpend = value
    return newState;
}
export default SET_APPROXIMATE_DATA