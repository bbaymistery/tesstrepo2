function SET_CONTACT_DETAILS(params = {}) {
    let { state, action } = params
    let { data: { name, value, } } = action

    let newState = JSON.parse(JSON.stringify(state))
    let contactDetails = newState.accountRegisterDatas.contactDetails
    newState.accountRegisterDatas.contactDetails = { ...contactDetails, [name]: value }
    return newState;
}
export default SET_CONTACT_DETAILS