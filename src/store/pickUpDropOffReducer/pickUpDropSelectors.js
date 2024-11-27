//todo selecting general reducer
export const selectPickUpDropOffReducer = (state) => state.pickUpDropOffReducer;
//todo selecting type of journey
export const selectedJourneyType = (state) =>
  state.pickUpDropOffReducer?.params?.journeyType;

//linkActive
//* selecting type of journey
export const selectActiveLink = (state) =>
  state.pickUpDropOffReducer?.activeLinkName;
//* selectingHeroContentError
export const selectHeroContentError = (state) =>
  state.pickUpDropOffReducer?.params.searchErrors[0].setErrorToHeroContent;

//*pointsssssssssssssssssssssssssssssssssssssssssssss
//pickup drop of pointssss selectors one way
export const onewayPickUpPointsOneWay = (state) =>
  state?.pickUpDropOffReducer?.reservations[0]?.selectedPickupPoints;
export const onewayDroopOffPointsOneWay = (state) =>
  state?.pickUpDropOffReducer?.reservations[0]?.selectedDropoffPoints;
//!pickup drop of  points  selectors return
export const returnPickUpPointsReturn = (state) =>
  state?.pickUpDropOffReducer?.reservations[1]?.selectedPickupPoints;
export const returnDropOffPointsReturn = (state) =>
  state?.pickUpDropOffReducer?.reservations[1]?.selectedDropoffPoints;

//* quotLoading when click to get Quotations
//todo quotation selectors
export const quotTransferLoading = (state) =>
  state.pickUpDropOffReducer?.params?.quotations?.quotTransferLoading;
// export const quotReturnLoading = (state) =>
//   state?.pickUpDropOffReducer?.params?.quotations?.quotReturnLoading;
export const quotBothLoading = (state) =>
  state?.pickUpDropOffReducer?.params?.quotations?.quotBothLoading;

//todo selecting  quotations when searching with input oneway
export const quotationsPickOneWay = (state) =>
  state?.pickUpDropOffReducer?.params?.searchEngine[0]?.pickupPoints;
export const quotationsDroppOffOneWay = (state) =>
  state?.pickUpDropOffReducer?.params?.searchEngine[0]?.dropoffPoints;

//todo //todo selecting  quotations when searching with input return
export const quotationsPickReturn = (state) =>
  state?.pickUpDropOffReducer?.params?.searchEngine[1]?.pickupPoints;
export const quotationsDroppOffReturn = (state) =>
  state?.pickUpDropOffReducer?.params?.searchEngine[1]?.dropoffPoints;

//*2012/22/11 12:00
//here we r seleting date cheats But in order tpo update horu and minute we doesnt need date cheat
export const onewayDateTimeString = (state) =>
  state.pickUpDropOffReducer?.params.trDateCheat;
export const returnDateTimeString = (state) =>
  state.pickUpDropOffReducer?.params.returnDateCheat;
export const transferHour = (state) =>
  state.pickUpDropOffReducer?.reservations[0]?.transferDetails
    ?.transferDateTimeString;
export const retunHour = (state) =>
  state.pickUpDropOffReducer?.reservations[1]?.transferDetails
    ?.transferDateTimeString;

//*quotations options to show in quotation component
export const transferQuotOptions = (state) =>
  state?.pickUpDropOffReducer?.params?.quotations?.transferQuotations;
export const returnQuotOptions = (state) =>
  state?.pickUpDropOffReducer?.params?.quotations?.returnQuotations;

//select single quotation
export const selectedTransferQuot = (state) =>
  state?.pickUpDropOffReducer?.reservations[0]?.quotation;
export const selectedReturnQuot = (state) =>
  state?.pickUpDropOffReducer?.reservations[1]?.quotation;

//* transfer-details page passengerDetailsSelectors  And pax() and Request
export const transferPassengerFullName = (state) =>
  state.pickUpDropOffReducer?.reservations[0]?.passengerDetails?.firstname;
export const transferPassengerEmail = (state) =>
  state?.pickUpDropOffReducer?.reservations[0]?.passengerDetails?.email;
export const transferPassengerPhone = (state) =>
  state?.pickUpDropOffReducer?.reservations[0]?.passengerDetails?.phone;
export const transferPassengersNumber = (state) =>
  state?.pickUpDropOffReducer?.reservations[0]?.transferDetails
    ?.passengersNumber;
export const transferComment = (state) =>
  state?.pickUpDropOffReducer?.reservations[0]?.transferDetails
    ?.specialRequests;

export const returnComment = (state) =>
  state?.pickUpDropOffReducer?.reservations[1]?.transferDetails
    ?.specialRequests;
export const returnPassengerNumber = (state) =>
  state.pickUpDropOffReducer.reservations[1]?.transferDetails?.passengersNumber;
export const returnPassengerFullName = (state) =>
  state.pickUpDropOffReducer.reservations[1]?.passengerDetails?.firstname;
export const returnPassengerEmail = (state) =>
  state.pickUpDropOffReducer.reservations[1]?.passengerDetails?.email;
export const returnPassengerPhone = (state) =>
  state.pickUpDropOffReducer.reservations[1]?.passengerDetails?.phone;
// checked input
export const selectCHheckedInput = (state) =>
  state.pickUpDropOffReducer.checked;

//handlign with waintingpickuptime flight number and the rest
export const selectHandlingInputs = (state) =>
  state.pickUpDropOffReducer.objectDetailsForHandling;

export const pickUpHandlingsTransfer = (state) =>
  state.pickUpDropOffReducer.objectDetailsForHandling[0].pickupHandling;
export const dropHandlingsTransfer = (state) =>
  state.pickUpDropOffReducer.objectDetailsForHandling[0].dropHandling;

export const returnPickupHandling = (state) =>
  state.pickUpDropOffReducer.objectDetailsForHandling[1].returnPcikHandling;
export const returnDropHandling = (state) =>
  state.pickUpDropOffReducer.objectDetailsForHandling[1].returndropHandling;

//checking on transfer details go to next page In order to update component
export const checkingGoToNextPage = (state) =>
  state.pickUpDropOffReducer.checkingGoToNextPage;

//ARCHIEVETOKEN
export const selectArchieveToken = (state) =>
  state.pickUpDropOffReducer.tokenForArchieve;
