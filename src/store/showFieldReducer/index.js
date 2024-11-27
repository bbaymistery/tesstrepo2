import {
  RESET_FIELDS,
  SET_CRUMBS,
  SET_MODAL_INFO,
  // SET_RETURN_SHOW_TIME_PICKER,
  SET_SHOW_DROP_FIELD_ONEWAY,
  SET_SHOW_DROP_FIELD_RETURN,
  SET_SHOW_PICK_FIELD_ONEWAY,
  SET_SHOW_PICK_FIELD_RETURN,
  // SET_SHOW_TIME_PICKER,
  SET_WAITING_MODAL_INFO,
} from "./showFieldTypes";

const INITIAL_STATE = {
  initialShowResultBoxStates: [
    { showInputFieldPickUpOneWay: false, showInputFieldDroppOffOneWay: false },
    { showInputFieldPickUpReturn: false, showInputFieldDroppOffReturn: false },
  ],
  showTimePicker: false,
  returnShowTimePicker: false,
  modalInfo: false,
  waitingPickkModalInfo: false,
  crumbs: [{ linkName: "/", name: "home" }],
};
export const showFieldReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SHOW_PICK_FIELD_ONEWAY: {
      return {
        ...state,
        initialShowResultBoxStates: [
          {
            ...state.initialShowResultBoxStates[0],
            showInputFieldPickUpOneWay: action.payload,
          },
          {
            ...state.initialShowResultBoxStates[1],
          },
        ],
      };
    }
    case SET_SHOW_DROP_FIELD_ONEWAY: {
      return {
        ...state,
        initialShowResultBoxStates: [
          {
            ...state.initialShowResultBoxStates[0],
            showInputFieldDroppOffOneWay: action.payload,
          },
          {
            ...state.initialShowResultBoxStates[1],
          },
        ],
      };
    }
    case SET_SHOW_PICK_FIELD_RETURN: {
      return {
        ...state,
        initialShowResultBoxStates: [
          {
            ...state.initialShowResultBoxStates[0],
          },
          {
            ...state.initialShowResultBoxStates[1],
            showInputFieldPickUpReturn: action.payload,
          },
        ],
      };
    }
    case SET_SHOW_DROP_FIELD_RETURN: {
      return {
        ...state,
        initialShowResultBoxStates: [
          {
            ...state.initialShowResultBoxStates[0],
          },
          {
            ...state.initialShowResultBoxStates[1],
            showInputFieldDroppOffReturn: action.payload,
          },
        ],
      };
    }

    // case SET_SHOW_TIME_PICKER: {
    //   return {
    //     ...state,
    //     showTimePicker: action.payload,
    //   };
    // }

    // case SET_RETURN_SHOW_TIME_PICKER: {
    //   return {
    //     ...state,
    //     returnShowTimePicker: action.payload,
    //   };
    // }

    case RESET_FIELDS: {
      return {
        ...state,
        initialShowResultBoxStates: [
          {
            showInputFieldPickUpOneWay: false,
            showInputFieldDroppOffOneWay: false,
          },
          {
            showInputFieldPickUpReturn: false,
            showInputFieldDroppOffReturn: false,
          },
        ],
        showTimePicker: false,
        returnShowTimePicker: false,
      };
    }
    case SET_MODAL_INFO: {
      return {
        ...state,
        modalInfo: action.payload,
      };
    }

    case SET_CRUMBS: {
      return {
        ...state,
        crumbs: [...state.crumbs, action.payload],
      };
    }
    case SET_WAITING_MODAL_INFO: {

      return {
        ...state,
        waitingPickkModalInfo: action.payload,
      };
    }

    default:
      return state;
  }
};
