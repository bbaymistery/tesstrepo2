import ALERT from "./ALERT";

export const alertReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ALERT': {
            return ALERT({ action })
        }
        default:
            return state;
    }
};
