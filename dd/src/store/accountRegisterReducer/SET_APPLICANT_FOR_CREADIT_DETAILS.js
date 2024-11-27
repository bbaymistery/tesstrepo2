function SET_APPLICANT_FOR_CREADIT_DETAILS(params = {}) {
    let { state, action } = params
    let { data: { name, value, } } = action

    let newState = JSON.parse(JSON.stringify(state))
    let applicantForCreditAccount = newState.accountRegisterDatas.applicantForCreditAccount
    newState.accountRegisterDatas.applicantForCreditAccount = { ...applicantForCreditAccount, [name]: value }
    return newState;
}
export default SET_APPLICANT_FOR_CREADIT_DETAILS