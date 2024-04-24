import SET_ADRESS_DESCRIPTION_FOR_POINTS from "./SET_ADRESS_DESCRIPTION_FOR_POINTS";
import SET_SAME_PASSENGER_DETAILS_STATUS from "./SET_SAME_PASSENGER_DETAILS_STATUS";
import SET_POSTCODE_DETAILS_FOR_POINTS from "./SET_POSTCODE_DETAILS_FOR_POINTS";
import SET_FLIGHT_DETAILS_FOR_POINTS from "./SET_FLIGHT_DETAILS_FOR_POINTS";
import SET_TOKEN_TO_PASSENGERDETAILS from "./SET_TOKEN_TO_PASSENGERDETAILS";
import DELETE_ITEM_FROM_SELECTEDLIST from "./DELETE_ITEM_FROM_SELECTEDLIST";
import SET_CRUISE_NUMBER_FOR_POINTS from "./SET_CRUISE_NUMBER_FOR_POINTS";
import SET_TRAIN_NUMBER_FOR_POINTS from "./SET_TRAIN_NUMBER_FOR_POINTS";
import CHECHK_FLIGHT_WAITING_TIME from "./CHECHK_FLIGHT_WAITING_TIME";
import SET_PAYMENT_TYPE_AND_TOKEN from "./SET_PAYMENT_TYPE_AND_TOKEN";
import SET_POST_CODE_ADRESSES from "./SET_POST_CODE_ADRESSES";
import SET_PASSEGER_DETAILS from "./SET_PASSEGER_DETAILS";
import SET_TRANSFER_DETAILS from "./SET_TRANSFER_DETAILS";
import SET_JOURNEY_DATETIME from "./SET_JOURNEY_DATETIME";
import CHECK_MOBILE_OR_NOT from "./CHECK_MOBILE_OR_NOT";
import SET_SESSION_TOKEN from "./SET_SESSION_TOKEN";
import SET_POINTS_MODAL from "./SET_POINTS_MODAL";
import SET_NEW_LANGUAGE from "./SET_NEW_LANGUAGE";
import SET_NEW_APPDATA from "./SET_NEW_APPDATA";
import SET_MODAL_INFO from "./SET_MODAL_INFO";
import SWITCH_JOURNEY from "./SWITCH_JOURNEY";
import SET_QUOTATION from "./SET_QUOTATION";
import ADD_NEW_POINT from "./ADD_NEW_POINT";
import GET_QUOTATION from "./GET_QUOTATION";

//taxi deals
import GET_QUOTATION_AT_PATHNAME from "./GET_QUOTATION_AT_PATHNAME";
import ADD_NEW_POINT_AT_PATHNAME from "./ADD_NEW_POINT_AT_PATHNAME";
import RESET_SELECTED_POINTS from "./RESET_SELECTED_POINTS";
import SET_NAVBAR_TAXI_DEALS from "./SET_NAVBAR_TAXI_DEALS";
import { currentDateForJourney } from "../../helpers/getDates";
import RESELECT_POINTS_FROM_STORE from "./RESELECT_POINTS_FROM_STORE";




let initialReservationState = [{
  reservationDetails: {
    channelId: 2,//mobile 3
    accountId: 1,
  },
  selectedPickupPoints: [],
  selectedDropoffPoints: [],
  quotation: {},
  transferDetails: {
    transferDateTimeString: currentDateForJourney(),
    pickupCategoryId: "",
    passengersNumber: 1,
    passengerSuitcase: 1,
    specialRequests: "",
  },
  passengerDetails: {
    token: "",
    lastname: "",
    language: "en",
    firstname: "",
    email: "",
    phone: "",
  },
  paymentDetails: {
    token: "",
    paymentType: "",
    account: 1,

  },
}]
const INITIAL_STATE = {
  reservations: initialReservationState,
  params: {
    journeyType: "0",
    sessionToken: "",
    language: typeof window !== 'undefined' && localStorage.getItem("language") ? JSON.parse(localStorage.getItem("language")) : "en",
    direction: typeof window !== 'undefined' && localStorage.getItem("direction") ? JSON.parse(localStorage.getItem("direction")) : "ltr",
    langIndex: typeof window !== 'undefined' && localStorage.getItem("langIndex") ? JSON.parse(localStorage.getItem("langIndex")) : 0,
    modalInfo: false,//when we click carInfo icon pops up modal,  //!check again if u didnt use eliminate this
    quotations: [{}],//we use it when we collect quotations
    postCodeAdresses: [],//when we select pcatId5 we need to add adresses
    passengerDetailsStatus: true,//checkbox status on transferdetails page
    tokenForArchieve: "",
    pointsModalStatus: false,//we use it on taxi deals component
    //when we click  Heathrow Airport transfer on navbar we set taxidealsName then we cath it with serverSideProps[linkname].js
    // inthatCase WE need to pass a props to the changed router So we use redux for that
    // hasTaxiDeals: typeof window !== 'undefined' && localStorage.getItem("hasTaxiDeals") ? JSON.parse(localStorage.getItem("hasTaxiDeals")) : "heathrow",
    hasTaxiDeals: "heathrow",

  }
};
export const pickUpDropOffActions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SWITCH_JOURNEY': {
      return SWITCH_JOURNEY({ state, action })
    }
    case "SET_JOURNEY_DATETIME": {
      return SET_JOURNEY_DATETIME({ state, action })
    }
    case "SET_TOKEN_TO_PASSENGERDETAILS": {
      return SET_TOKEN_TO_PASSENGERDETAILS({ state, action })
    }

    case "ADD_NEW_POINT": {
      return ADD_NEW_POINT({ state, action })
    }
    case "DELETE_ITEM_FROM_SELECTEDLIST": {
      return DELETE_ITEM_FROM_SELECTEDLIST({ state, action })
    }
    case "SET_SESSION_TOKEN": {
      return SET_SESSION_TOKEN({ state, action })
    }
    case "GET_QUOTATION": {
      return GET_QUOTATION({ state, action })
    }
    case "SET_MODAL_INFO": {
      return SET_MODAL_INFO({ state, action })
    }
    case "SET_QUOTATION": {
      return SET_QUOTATION({ state, action })
    }
    case "SET_POST_CODE_ADRESSES": {
      return SET_POST_CODE_ADRESSES({ state, action })
    }
    case "SET_PASSEGER_DETAILS": {
      return SET_PASSEGER_DETAILS({ state, action })
    }
    case "SET_SAME_PASSENGER_DETAILS_STATUS": {
      return SET_SAME_PASSENGER_DETAILS_STATUS({ state, action })
    }
    case "SET_TRANSFER_DETAILS": {
      return SET_TRANSFER_DETAILS({ state, action })
    }
    //!handling selected points inside transfer details
    case "SET_FLIGHT_DETAILS_FOR_POINTS": {
      return SET_FLIGHT_DETAILS_FOR_POINTS({ state, action })
    }
    case "SET_TRAIN_NUMBER_FOR_POINTS": {
      return SET_TRAIN_NUMBER_FOR_POINTS({ state, action })
    }
    case "SET_POSTCODE_DETAILS_FOR_POINTS": {
      return SET_POSTCODE_DETAILS_FOR_POINTS({ state, action })
    }
    case "SET_CRUISE_NUMBER_FOR_POINTS": {
      return SET_CRUISE_NUMBER_FOR_POINTS({ state, action })
    }
    case "SET_ADRESS_DESCRIPTION_FOR_POINTS": {
      return SET_ADRESS_DESCRIPTION_FOR_POINTS({ state, action })
    }
    //!finish handling selected points inside transfer details
    case "SET_PAYMENT_TYPE_AND_TOKEN": {
      return SET_PAYMENT_TYPE_AND_TOKEN({ state, action })
    }
    //?&****here we start new projects
    case "SET_NEW_LANGUAGE": {
      return SET_NEW_LANGUAGE({ state, action })
    }
    case "SET_NEW_APPDATA": {
      return SET_NEW_APPDATA({ state, action })
    }
    case "CHECHK_FLIGHT_WAITING_TIME": {
      return CHECHK_FLIGHT_WAITING_TIME({ state, action })
    }
    case "CHECK_MOBILE_OR_NOT": {
      return CHECK_MOBILE_OR_NOT({ state, action })
    }
    case "SET_POINTS_MODAL": {
      return SET_POINTS_MODAL({ state, action })
    }
    case "GET_QUOTATION_AT_PATHNAME": {
      return GET_QUOTATION_AT_PATHNAME({ state, action })
    }
    case "ADD_NEW_POINT_AT_PATHNAME": {
      return ADD_NEW_POINT_AT_PATHNAME({ state, action })
    }

    case "RESET_SELECTED_POINTS": {
      return RESET_SELECTED_POINTS({ state, action })
    }
    case "SET_NAVBAR_TAXI_DEALS": {
      return SET_NAVBAR_TAXI_DEALS({ state, action })
    }
    case "RESELECT_POINTS_FROM_STORE": {
      return RESELECT_POINTS_FROM_STORE({ state, action })
    }

    default:
      return state;
  }
};
