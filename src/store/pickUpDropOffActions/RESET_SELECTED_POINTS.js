import { currentDateForJourney } from "../../helpers/getDates"

function RESET_SELECTED_POINTS(params = {}) {
    let { state, action } = params
    let {data:{journeyType}}=action
    let newState = JSON.parse(JSON.stringify(state))


if(parseInt(journeyType)===0){
    newState.reservations[0]["selectedPickupPoints"] = []
    newState.reservations[0]["selectedDropoffPoints"] = []
    newState.reservations[0].transferDetails.transferDateTimeString = currentDateForJourney()
    newState.reservations[0].quotation ={}
}else{
    newState.reservations[0].quotation = {}
    newState.reservations[0]["selectedPickupPoints"] = []
    newState.reservations[0]["selectedDropoffPoints"] = []
    newState.reservations[0].transferDetails.transferDateTimeString = currentDateForJourney()
    
    newState.reservations[1].quotation = {}
    newState.reservations[1]["selectedPickupPoints"] = []
    newState.reservations[1]["selectedDropoffPoints"] = []
    newState.reservations[1].transferDetails.transferDateTimeString = currentDateForJourney()
}



    return newState
}

export default RESET_SELECTED_POINTS


