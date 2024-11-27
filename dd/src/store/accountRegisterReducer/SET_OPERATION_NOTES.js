function SET_OPERATION_NOTES(params = {}) {
    let { state, action } = params
    let { data: { name, value, } } = action

    let newState = JSON.parse(JSON.stringify(state))
    let operationNotes = newState.accountRegisterDatas.operationNotes
    newState.accountRegisterDatas.operationNotes = { ...operationNotes, [name]: value }

    if (name ==='urgentSituationStatus' &&value==='No'){
        newState.accountRegisterDatas.operationNotes = { ...operationNotes, urgentSituationNumber: "", urgentSituationStatus :"No"}
    }
    return newState;
}
export default SET_OPERATION_NOTES