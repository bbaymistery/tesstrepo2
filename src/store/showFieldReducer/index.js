import { SET_ACTIVELINK_ID, TOGGLE_SIDE_BAR } from "./showFieldTypes";

const INITIAL_STATE = {
  toggleSidebar: true,
  activeLinkId: typeof window !== 'undefined' && JSON.parse(localStorage.getItem("activeLinkId")) || 1,
  initalInputsStatesForAddingExtraItems: [
    {
      showAddExtraTextPickUp: false,
      inputAfterAddingPickUp: false,
      showAddExtraTextDropOff: false,
      inputAfterAddingDropOff: false,
    },
    {
      showAddExtraTextPickUp: false,
      inputAfterAddingPickUp: false,
      showAddExtraTextDropOff: false,
      inputAfterAddingDropOff: false,
    },
  ],
};
export const showFieldReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_SIDE_BAR:
      return {
        ...state,
        toggleSidebar: action.payload,
      };

    case SET_ACTIVELINK_ID:
      localStorage.setItem("activeLinkId", JSON.stringify(action.payload))
      return {
        ...state,
        activeLinkId: action.payload
      }
    default:
      return state;
  }
};
