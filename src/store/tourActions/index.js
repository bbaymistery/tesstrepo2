import SET_TOUR_QUOTATION from "./SET_TOUR_QUOTATION";
import { currentDateForJourney } from "../../helpers/getDates";
import SET_TOUR_DATETIME from "./SET_TOUR_DATETIME";
import SET_TOUR_PASSEGER_DETAILS from "./SET_TOUR_PASSEGER_DETAILS";
import SET_TOUR_TRANSFER_DETAILS from "./SET_TOUR_TRANSFER_DETAILS";
import SET_TOUR_PICKUP_ADRESS from "./SET_TOUR_PICKUP_ADRESS";

const INITIAL_STATE = {
    selectedTour: {},
}

export const tourActions = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_TOUR_QUOTATION': {
            return SET_TOUR_QUOTATION({ state, action })
        }
        case 'SET_TOUR_DATETIME': {
            return SET_TOUR_DATETIME({ state, action })
        }
        case 'SET_TOUR_PASSEGER_DETAILS': {
            return SET_TOUR_PASSEGER_DETAILS({ state, action })
        }
        case 'SET_TOUR_TRANSFER_DETAILS': {
            return SET_TOUR_TRANSFER_DETAILS({ state, action })
        }
        case 'SET_TOUR_PICKUP_ADRESS': {
            return SET_TOUR_PICKUP_ADRESS({ state, action })
        }
        
        default:
            return state;
    }
}