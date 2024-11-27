//
//? ******************* start update and giving error of passenger details
//passenger details
// export const UPDATE_PASSENGER_DETAILS_FOR_BOTH_JOURNEY =
//   "UPDATE_PASSENGER_DETAILS_FOR_BOTH_JOURNEY";//oteki projede check buton koydugumuzdan bunu kullandik
// export const SET_ERROR_FOR_PASSENGER_DETAILS =
//   "SET_ERROR_FOR_PASSENGER_DETAILS"; //yeni projede hepsini handle inputsla heel etdik
//! ******************* end of update and giving   error of passenger details

//*****************************************************************

//FETCHING REQUEST AND GETTING SUGGESTIONS
export const FETCH_LOCATIONS_REQUEST = " FETCH_LOCATIONS_REQUEST";
export const FETCH_LOCATIONS_SUCCESS = "FETCH_LOCATIONS_SUCCESS";
export const FETCH_LOCATIONS_FAILURE = "FETCH_LOCATIONS_FAILURE";

export const GET_TRANSFER_QUOT_REQUEST = "GET_TRANSFER_QUOT_REQUEST";
export const GET_TRANSFER_QUOTATIONS = "GET_TRANSFER_QUOTATIONS";
export const GET_QUOT_TRANSFER_ERROR = "GET_QUOT_TRANSFER_ERROR";

export const GET_BOTH_TOGETHER_QUOTATIONS = "GET_BOTH_TOGETHER_QUOTATIONS";
export const GET_BOTH_TOGETHER_QUOT_REQUEST = "GET_BOTH_TOGETHER_QUOT_REQUEST";
export const GET_BOTH_TOGETHER_ERROR_QUOT = "GET_BOTH_TOGETHER_ERROR_QUOT";

//ading _DELETE  item to the list
export const ADD_ITEM_TO_SELECTED_LIST = "ADD_ITEM_TO_SELECTED_LIST";
export const DELETE_ITEM_FROM_SELECTED_LIST = "DELETE_ITEM_FROM_SELECTED_LIST";
export const SET_POST_CODE_ADRESSES = "SET_POST_CODE_ADRESSES";

//getting all app datas which cars   =>    /app/en
export const GET_APP_DATA = "GET_APP_DATA";
export const GET_PAYMENT_DATA = "GET_PAYMENT_DATA";

//setting datetime hour minute
export const SET_DATE_TIME = "SET_DATE_TIME";
export const SET_HOUR_AND_MINUTE = "SET_HOUR_AND_MINUTE";

export const SET_SELECT_ACTIVE_LINK = "SET_SELECT_ACTIVE_LINK";
export const RESET_INPUT_LOADINGS = "RESET_INPUT_LOADINGS"; //BUNU INPUTDA 3 HERF olmuyanda loadingi false elemek ucun yazdik
export const SET_ERROR_INSIDE_HEROR_CONTENT = "SET_ERROR_INSIDE_HEROR_CONTENT"; //bunuda egerr add text edende selectedPoint yoxise hero contentde  alert goresenecek

//swithing types of journey
export const SWITCH_JOURNEY = "SWITCH_JOURNEY";
//get meeting point
export const GET_MEET_POINT = "GET_MEET_POINT";
//reset form
export const RESET_FORM = "RESET_FORM";

//UPDAT PASS DETAILS
export const UPDATE_PASSNEGER_DETAILS = "UPDATE_PASSNEGER_DETAILS";
export const UPDATE_SPECIAL_REQUEST = "UPDATE_SPECIAL_REQUEST";
//CHECK INPUT BOX
export const CHECKED_INPUT_FOR_RETURN = "CHECKED_INPUT_FOR_RETURN";
//flightdetails faln onlari udpdate elyrk
export const UPDATE_SELECTED_ITEMS_INPUTS = "UPDATE_SELECTED_ITEMS_INPUTS";

//FOR  TRANSFER DETAILS PAGE selected items(IT IS NEW one which i handled  objectDetailsForHandling   )
export const SET_ERROR_IN_TRANSFER_DETAILS_PAGE =
  "SET_ERROR_IN_TRANSFER_DETAILS_PAGE";
export const SET_ERROR_IN_RETURN_DETAILS_PAGE =
  "SET_ERROR_IN_RETURN_DETAILS_PAGE";
//! ******************* end of update and giving error of selected items on transfer page details

export const CHECK_JOURNEY_DETAILS_TO_GO_NEXT_PAGE =
  "CHECK_JOURNEY_DETAILS_TO_GO_NEXT_PAGE";
//?payment start
export const SET_PAYMENT = "SET_PAYMENT";
//!payment finish
//click to
export const SET_QUOTATION = "SET_QUOTATION"; //CATEGORYiD AND PAYMENT pRICE arranging
