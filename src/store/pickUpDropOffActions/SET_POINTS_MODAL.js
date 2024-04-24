function SET_POINTS_MODAL(params = {}) {
    let { state, action } = params
    let { data: { trueOrFalse } } = action
    let newState = JSON.parse(JSON.stringify(state))
    newState.params.pointsModalStatus = trueOrFalse
    return newState;
}
export default SET_POINTS_MODAL