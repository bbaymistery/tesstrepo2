import { currentDate } from "../../helpers/getDates";
import SET_AIRLINE from "./SET_AIRLINE";
import SET_BOOKER_DETAILS from "./SET_BOOKER_DETAILS";
import SET_BUGGER_PORTER from "./SET_BUGGER_PORTER";
import SET_FLIGHT_CLASS from "./SET_FLIGHT_CLASS";
import SET_FLIGHT_NUMBER_OR_LUGGAGE from "./SET_FLIGHT_NUMBER_OR_LUGGAGE";
import SET_FLIGHT_TIME from "./SET_FLIGHT_TIME";
import SET_MEET_GREET_ACTIVE_BTN from "./SET_MEET_GREET_ACTIVE_BTN";
import SET_MEET_GREET_DATE from "./SET_MEET_GREET_DATE";
import SET_PASSENGERS_FROM from "./SET_PASSENGERS_FROM";
import SET_SEATLISTS from "./SET_SEATLISTS";
import SET_TERMINAL from "./SET_TERMINAL";

const INITIAL_STATE = {
    seatLists: [
        { name: "Adults", desc: "(above 12y.o.)", minNum: 1, maxNum: 20 },
        { name: "Children", desc: "(from 2 to  12y.o.)", minNum: 0, maxNum: 20 },
        { name: "Infants", desc: "(below 12y.o.)", minNum: 0, maxNum: 20 }
    ],
    seatListPrice: 180,
    buggerLists: [
        { name: "Porter", desc: "(£54.00 inc VAT)", minNum: 0, price: 54 },
        { name: "Buggy", desc: "(£60.00 inc VAT) ", minNum: 0, price: 60 },
        { name: "Additional Greeter", desc: "(£75.00 inc VAT)", minNum: 0, price: 75 }
    ],
    buggerListTotalPrice: 0,

    passengersForm: [{ firstname: "", lastname: "" }],
    flightDetails: {
        airline: "-- Select Airline --",
        flightNumber: "",
        flightClass: "-- Select Class --",
        flightTime: "00:00",
        noOfLuggageBags: "",
    },
    bookersDetails: {
        firstname: "",
        lastname: "",
        email: "",
        mobileNumber: ""
    },
    totalPrice: 180,
    meetgreetDate: currentDate(),
    meetgreetActiveBtn: 0,
    selectedService: 'Arrival Airport',
    terminalName: "-- Select Terminal --",
    porter: 0,
    buggy: 0,
    additionalGreeter: 0,
    vat: 30,
};

export const meetAndGreetActions = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_SEATLISTS": {
            return SET_SEATLISTS({ state, action })
        }
        case "SET_MEET_GREET_DATE": {
            return SET_MEET_GREET_DATE({ state, action })
        }
        case "SET_MEET_GREET_ACTIVE_BTN": {
            return SET_MEET_GREET_ACTIVE_BTN({ state, action })
        }
        case "SET_TERMINAL": {
            return SET_TERMINAL({ state, action })
        }
     
        case "SET_PASSENGERS_FROM": {
            return SET_PASSENGERS_FROM({ state, action })
        }
        case "SET_BUGGER_PORTER": {
            return SET_BUGGER_PORTER({ state, action })
        }
        case "SET_FLIGHT_NUMBER_OR_LUGGAGE": {
            return SET_FLIGHT_NUMBER_OR_LUGGAGE({ state, action })
        }
        case "SET_FLIGHT_CLASS": {
            return SET_FLIGHT_CLASS({ state, action })
        }
        case "SET_AIRLINE": {
            return SET_AIRLINE({ state, action })
        }
        case "SET_FLIGHT_TIME": {
            return SET_FLIGHT_TIME({ state, action })
        }
        case "SET_BOOKER_DETAILS": {
            return SET_BOOKER_DETAILS({ state, action })
        }
            
        default:
            return state;
    }
};