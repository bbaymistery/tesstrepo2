function RESELECT_POINTS_FROM_STORE(params = {}) {
    let { state, action } = params
    let { data: { type } } = action
    let newState = JSON.parse(JSON.stringify(state))
    let pickUpSelectedPoints = []
    let dropOffSelectedPoints = []
    //BIZ NORMALDA TRANSFER DETAILSE GECENDE TOKENLI PCARid li falan full point ile gecerik
    //ama --select gorsensin deye biz sadece butun o tekonleri falan icin bosaldiriq
    if (type === 'pickup') {
        pickUpSelectedPoints = [{ token: "", pcatdId: "", address: "", ptype: "" }]
    }
    if (type === 'dropoff') {
        dropOffSelectedPoints = [{ token: "", pcatdId: "", address: "", ptype: "" }]
    }
    newState.reservations[0].selectedPickupPoints = pickUpSelectedPoints
    newState.reservations[0].selectedDropoffPoints = dropOffSelectedPoints
    return newState;
}
export default RESELECT_POINTS_FROM_STORE


