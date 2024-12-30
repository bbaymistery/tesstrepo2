function GET_QUOTATION(params = {}) {
    let { state, action } = params
    let { data: { results, journeyType } } = action
    let newState = JSON.parse(JSON.stringify(state))


    if (parseInt(journeyType) === 0) {
        newState.params.quotations = [{ ...newState.params.quotations[0], ...results }]
    } else {
        // ..when we make both journey request ıt's responds already array
        newState.params.quotations = [{ ...newState.params.quotations[0], ...results[0] }, { ...results[1] }]
    }

    return newState;
}
export default GET_QUOTATION