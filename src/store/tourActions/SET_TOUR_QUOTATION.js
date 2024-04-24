function SET_TOUR_QUOTATION(params = {}) {
    let { state, action } = params
    let { data: { selectedTour } } = action
    let newState = JSON.parse(JSON.stringify(state))
    newState.selectedTour = selectedTour
    return newState;
}
export default SET_TOUR_QUOTATION