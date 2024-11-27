import { currentDateForJourney } from "../../helpers/getDates"

function RESET_SELECTED_POINTS(params = {}) {
    let { state, action } = params
    let {data:{journeyType}}=action
    let newState = JSON.parse(JSON.stringify(state))



    return newState
}

export default RESET_SELECTED_POINTS


