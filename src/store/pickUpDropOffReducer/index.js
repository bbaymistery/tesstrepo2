import {
  FETCH_LOCATIONS_FAILURE,
  FETCH_LOCATIONS_REQUEST,
  FETCH_LOCATIONS_SUCCESS,
  GET_APP_DATA,
  CHECKED_INPUT_FOR_RETURN,
  SWITCH_JOURNEY,
  ADD_ITEM_TO_SELECTED_LIST,
  DELETE_ITEM_FROM_SELECTED_LIST,
  SET_DATE_TIME,
  SET_HOUR_AND_MINUTE,
  SET_QUOTATION,
  GET_TRANSFER_QUOTATIONS,
  GET_MEET_POINT,
  GET_TRANSFER_QUOT_REQUEST,
  GET_QUOT_TRANSFER_ERROR,
  UPDATE_SELECTED_ITEMS_INPUTS,
  SET_ERROR_IN_TRANSFER_DETAILS_PAGE,
  SET_ERROR_IN_RETURN_DETAILS_PAGE,
  GET_BOTH_TOGETHER_QUOT_REQUEST,
  GET_BOTH_TOGETHER_QUOTATIONS,
  GET_BOTH_TOGETHER_ERROR_QUOT,
  SET_POST_CODE_ADRESSES,
  GET_PAYMENT_DATA,
  SET_PAYMENT,
  SET_SELECT_ACTIVE_LINK,
  RESET_INPUT_LOADINGS,
  SET_ERROR_INSIDE_HEROR_CONTENT,
  RESET_FORM,
  UPDATE_PASSNEGER_DETAILS,
  UPDATE_SPECIAL_REQUEST,
  CHECK_JOURNEY_DETAILS_TO_GO_NEXT_PAGE,
} from "./pickUpDropTypes";
import {
  dateFormatCheatReturn,
  dateFormatCheatTransfer,
  dateTimeStringFunc,
  dateTimeStringFuncForReturn,
} from "../../helpers/getDate";

const INITIAL_STATE = {
  cookies: {
    sessionToken: "",
  },
  showOnlyTransferCOmp: true,
  reservations: [
    {
      reservationDetails: {
        channelId: 7,
        accountId: 1402,
      },
      selectedPickupPoints: [],
      selectedDropoffPoints: [],
      quotation: {},
      transferDetails: {
        transferDateTimeString: dateFormatCheatTransfer(),
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
        account: 1402,
      },
    },
    {
      reservationDetails: {
        channelId: 7,
        accountId: 1402,
      },
      selectedPickupPoints: [],
      selectedDropoffPoints: [],
      quotation: {},
      transferDetails: {
        transferDateTimeString: dateFormatCheatReturn(),
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
        account: 1402,
      },
    },
  ],
  activeLinkName: "",
  appData: {},
  postCodeAdresses: [],
  checked: true,
  loadingPickUpOneWay: false,
  loadingDropOffOneWay: false,
  loadingPickUpReturn: false,
  loadingDropOffReturn: false,
  tokenForArchieve: "",
  params: {
    journeyType: "0",
    searchLoading: false,
    quotations: {
      quotationLoading: false, //sadece bu kullanilmadi
      quotTransferLoading: false,
      // quotReturnLoading: false,
      quotBothLoading: false,
      quotationError: "",
      transferQuotations: [],
      returnQuotations: [],
    },

    searchErrors: [{ setErrorToHeroContent: false }],
    searchEngine: [
      {
        pickupPoints: {},
        dropoffPoints: {},
      },
      {
        pickupPoints: {},
        dropoffPoints: {},
      },
    ],
    trDateCheat: dateTimeStringFunc(),
    returnDateCheat: dateTimeStringFuncForReturn(),
  },
  paymentTypes: [],
  direction: "left",
  checkingGoToNextPage: false,
  // flightNumber waiting pick up time ve baskalari
  objectDetailsForHandling: [
    {
      pickupHandling: [],
      dropHandling: [],
    },
    {
      returnPcikHandling: [],
      returndropHandling: [],
    },
  ],
  meetPoint: "",
};
export const pickUpDropOffReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SELECT_ACTIVE_LINK: {
      return {
        ...state,
        activeLinkName: action.payload,
      };
    }
    case FETCH_LOCATIONS_REQUEST: {
      let { journeyType, index } = action.payload;

      return {
        ...state,
        loadingPickUpOneWay: journeyType === 0 && index === 0 ? true : false,
        loadingDropOffOneWay: journeyType === 0 && index === 1 ? true : false,
        loadingPickUpReturn: journeyType === 1 && index === 0 ? true : false,
        loadingDropOffReturn: journeyType === 1 && index === 1 ? true : false,
      };
    }
    case FETCH_LOCATIONS_SUCCESS: {
      const { index, data, journeyType } = action.payload;

      return {
        ...state,
        cookies: {
          ...state.cookies,
          sessionToken: `${data["session-token"]}`,
        },
        reservations: [
          {
            ...state.reservations[0],
            passengerDetails: {
              ...state.reservations[0].passengerDetails,
              token: data?.token,
            },
          },
          {
            ...state.reservations[1],
            passengerDetails: {
              ...state.reservations[1].passengerDetails,
              token: data?.token,
            },
          },
        ],
        loadingPickUpOneWay: false,
        loadingDropOffOneWay: false,
        loadingPickUpReturn: false,
        loadingDropOffReturn: false,
        // session_token: data.session - token,
        params: {
          ...state.params,
          journeyType,
          searchEngine: [
            //!here changing pickup or dropoff  *points*
            journeyType === 0
              ? {
                ...state.params.searchEngine[0],
                pickupPoints:
                  index === 0
                    ? data.result
                    : state.params.searchEngine[0].pickupPoints,
                dropoffPoints:
                  index === 1
                    ? data.result
                    : state.params.searchEngine[0].dropoffPoints,
              }
              : { ...state.params.searchEngine[0] },

            //!here changing pickup or dropoff  *points*
            journeyType === 1
              ? {
                ...state.params.searchEngine[1],
                pickupPoints:
                  index === 0
                    ? data.result
                    : state.params.searchEngine[1].pickupPoints,
                dropoffPoints:
                  index === 1
                    ? data.result
                    : state.params.searchEngine[1].dropoffPoints,
              }
              : {
                ...state.params.searchEngine[1],
              },
          ],
        },
        tokenForArchieve: data?.token,
      };
    }
    case FETCH_LOCATIONS_FAILURE: {
      return {
        ...state,
        loadingPickUpOneWay: false,
        loadingDropOffOneWay: false,
        loadingPickUpReturn: false,
        loadingDropOffReturn: false,
      };
    }

    case ADD_ITEM_TO_SELECTED_LIST: {
      const { data, index, journeyType, objectDetails, indexOfInputField } =
        action.payload;

      //flightNumber gii olanlarin error kkismini ayarlamamiz icin
      let pickupHandling = state.objectDetailsForHandling[0].pickupHandling;
      let dropHandling = state.objectDetailsForHandling[0].dropHandling;
      let returnPcikHandling =
        state.objectDetailsForHandling[1].returnPcikHandling;
      let returndropHandling =
        state.objectDetailsForHandling[1].returndropHandling;

      let errorObject = {
        pcatId: data.pcatId,
        errorMessage: "",
        ...objectDetails,
        //adding waitingTime to each field Because laith wanted to add --select-- to flight waiting time
        waitingMinute: index === 0 && data.pcatId === 1 ? "" : "1",
        waitingError: "",
      };






      let newFinalObj = {
        ...data,
        ...objectDetails,
      };

      let pickUpsTr = state.reservations[0].selectedPickupPoints;
      let dropOffsTr = state.reservations[0].selectedDropoffPoints;

      let pickUpsReturn = state?.reservations[1]?.selectedPickupPoints;
      let dropOffsReturn = state?.reservations[1]?.selectedDropoffPoints;

      if (index === 0 && journeyType === 0) {
        pickUpsTr = [...pickUpsTr];
        pickupHandling = [...pickupHandling];
        pickUpsTr.splice(indexOfInputField, 1, newFinalObj);
        // pickupHandling.splice(indexOfInputField, 1, errorObject);
        pickupHandling[indexOfInputField] = errorObject; //a noter way of adding item to the list by index
      }

      if (index === 1 && journeyType === 0) {
        dropOffsTr = [...dropOffsTr];
        dropOffsTr.splice(indexOfInputField, 1, newFinalObj);
        dropHandling.splice(indexOfInputField, 1, errorObject);
      }

      if (index === 0 && journeyType === 1) {
        pickUpsReturn = [...pickUpsReturn];
        returnPcikHandling = [...returnPcikHandling];
        pickUpsReturn.splice(indexOfInputField, 1, newFinalObj);
        returnPcikHandling.splice(indexOfInputField, 1, errorObject);
      }

      if (index === 1 && journeyType === 1) {
        dropOffsReturn = [...dropOffsReturn];
        returndropHandling = [...returndropHandling];
        dropOffsReturn.splice(indexOfInputField, 1, newFinalObj);
        returndropHandling.splice(indexOfInputField, 1, errorObject);
      }

      return {
        ...state,
        reservations: [
          {
            ...state.reservations[0],
            selectedPickupPoints: pickUpsTr,
            selectedDropoffPoints: dropOffsTr,
          },
          {
            ...state.reservations[1],
            selectedPickupPoints: pickUpsReturn,
            selectedDropoffPoints: dropOffsReturn,
          },
        ],

        objectDetailsForHandling: [
          { pickupHandling, dropHandling },
          { returnPcikHandling, returndropHandling },
        ],
      };
    }

    case DELETE_ITEM_FROM_SELECTED_LIST: {
      const { index, journeyType, indexOfCurrentItem } = action.payload;
      let pickUpsOneWAY = state.reservations[0].selectedPickupPoints;
      let dropOffOneWay = state.reservations[0].selectedDropoffPoints;
      // console.log(index, journeyType, indexOfCurrentItem);

      let pickUpsReturn = state.reservations[1]?.selectedPickupPoints;
      let dropOffReturn = state.reservations[1]?.selectedDropoffPoints;

      //flightNumber gii olanlarin error kkismini ayarlamamiz icin
      let pickupHandling = state.objectDetailsForHandling[0].pickupHandling;
      let dropHandling = state.objectDetailsForHandling[0].dropHandling;
      let returnPcikHandling =
        state.objectDetailsForHandling[1].returnPcikHandling;
      let returndropHandling =
        state.objectDetailsForHandling[1].returndropHandling;

      //filter for  oneway
      if (index === 0 && journeyType === 0) {
        pickUpsOneWAY?.splice(indexOfCurrentItem, 1);
        pickupHandling?.splice(indexOfCurrentItem, 1);
      }
      if (index === 1 && journeyType === 0) {
        dropOffOneWay?.splice(indexOfCurrentItem, 1);
        dropHandling?.splice(indexOfCurrentItem, 1);
      }
      //filter for  return
      if (index === 0 && journeyType === 1) {
        pickUpsReturn?.splice(indexOfCurrentItem, 1);
        returnPcikHandling?.splice(indexOfCurrentItem, 1);
      }
      if (index === 1 && journeyType === 1) {
        dropOffReturn?.splice(indexOfCurrentItem, 1);
        returndropHandling?.splice(indexOfCurrentItem, 1);
      }

      return {
        ...state,

        reservations: [
          {
            ...state.reservations[0],
            selectedPickupPoints: pickUpsOneWAY,
            selectedDropoffPoints: dropOffOneWay,
          },
          {
            ...state.reservations[1],
            selectedPickupPoints: pickUpsReturn,
            selectedDropoffPoints: dropOffReturn,
          },
        ],
      };
    }
    case SET_POST_CODE_ADRESSES: {
      let newpostcodeAdress = state.postCodeAdresses;

      if (action.payload?.length > 0) {
        newpostcodeAdress.push(...action.payload);
      } else {
        newpostcodeAdress.push(action.payload);
      }
      return {
        ...state,
        postCodeAdresses: newpostcodeAdress,
      };
    }
    case RESET_INPUT_LOADINGS: {
      return {
        ...state,
        loadingPickUpOneWay: false,
        loadingDropOffOneWay: false,
        loadingPickUpReturn: false,
        loadingDropOffReturn: false,
      };
    }

    case SET_DATE_TIME: {
      const { dateValue, journeyType, pickupOrDropOrDate } = action.payload;

      //these are for getting input date
      let trDateFormat;
      let tranferDatatime = state?.params.trDateCheat;
      let hourMinuteTransfer = tranferDatatime?.split(" ")[1];
      let yearTransfer = tranferDatatime?.split(" ")[0].split("-")[0];
      let monthTranfer = tranferDatatime?.split(" ")[0].split("-")[1];
      let dayTransfer = tranferDatatime?.split(" ")[0].split("-")[2];
      trDateFormat = `${dayTransfer}/${monthTranfer}/${yearTransfer} ${hourMinuteTransfer}`;

      //!return
      let returnDateFormat;
      let returnDatatime = state?.params.returnDateCheat;
      let hourMinuteReturn = returnDatatime?.split(" ")[1];
      let yearReturn = returnDatatime?.split(" ")[0].split("-")[0];
      let monthReturn = returnDatatime?.split(" ")[0].split("-")[1];
      let dayReturn = returnDatatime?.split(" ")[0].split("-")[2];
      returnDateFormat = `${dayReturn}/${monthReturn}/${yearReturn} ${hourMinuteReturn}`;

      //burasi teze gelen tarixi parcaliyirYuxardaki ise trDateFormatin undefined olmasinin garssin alr
      let year = dateValue.split("-")[0];
      let month = dateValue.split("-")[1];
      let day = dateValue.split("-")[2];
      //replacing frist index with new input date value
      if (pickupOrDropOrDate === "date") {
        if (journeyType === 0) {
          trDateFormat = `${day}/${month}/${year} ${hourMinuteTransfer}`;
          tranferDatatime = `${dateValue} ${hourMinuteTransfer}`;
        }
        if (journeyType === 1) {
          returnDateFormat = `${day}/${month}/${year} ${hourMinuteReturn}`;
          returnDatatime = `${dateValue} ${hourMinuteReturn}`;


        }
      }
      //these are for getting hour and minute for each return and transfer
      let direction = state.direction;
      if (journeyType === 0) {
        direction = "left";
      }
      if (journeyType === 1) {
        direction = "right";
      }

      return {
        ...state,
        direction: direction,
        reservations: [
          {
            ...state.reservations[0],
            transferDetails: {
              ...state.reservations[0].transferDetails,
              transferDateTimeString: trDateFormat, //new one,
            },
          },
          {
            ...state.reservations[1],
            transferDetails: {
              ...state.reservations[1].transferDetails,
              transferDateTimeString: returnDateFormat, //new one,
            },
          },
        ],
        params: {
          ...state.params,
          trDateCheat: tranferDatatime,
          returnDateCheat: returnDatatime,
        },
      };
    }

    case SET_HOUR_AND_MINUTE: {
      const { valueOfHourOrMinute, transferOrReturn } = action.payload;
      //these are for getting input date
      let tranferDatatime =
        state?.reservations[0].transferDetails?.transferDateTimeString;
      let trDate = tranferDatatime.split(" ")[0]; //2022-04-18
      let trMinute = tranferDatatime.split(" ")[1]?.split(":")[1]; //00   15 20 25
      let trHour = tranferDatatime?.split(" ")[1]?.split(":")[0]; //1 2 3 4 5 6

      //cheat olanin saatini ayarlamak
      let tranferDatatimeCheat = state?.params.trDateCheat;
      let trCheatDate = tranferDatatimeCheat.split(" ")[0];

      //taking each hour 12   and minute 00
      let returnDatatime;
      let returnDate;
      let returnMinute; //00   15 20 25
      let returnHour;
      let returnDatatimeChaet = state?.params?.returnDateCheat;
      let returnCheatDate = returnDatatimeChaet.split(" ")[0];

      if (state?.reservations[1]) {
        returnDatatime =
          state?.reservations[1]?.transferDetails?.transferDateTimeString;
        returnDate = returnDatatime?.split(" ")[0];
        returnMinute = returnDatatime?.split(" ")[1]?.split(":")[1]; //00   15 20 25
        returnHour = returnDatatime?.split(" ")[1]?.split(":")[0];
      }

      //replacing frist index with new input date value
      if (transferOrReturn === "hourTr") {
        tranferDatatime = `${trDate} ${valueOfHourOrMinute}:${trMinute}`;
        tranferDatatimeCheat = `${trCheatDate} ${valueOfHourOrMinute}:${trMinute}`;
      }
      if (transferOrReturn === "minuteTr") {
        tranferDatatime = `${trDate} ${trHour}:${valueOfHourOrMinute}`;
        tranferDatatimeCheat = `${trCheatDate} ${trHour}:${valueOfHourOrMinute}`;
      }

      if (transferOrReturn === "hourReturn") {
        returnDatatime = `${returnDate} ${valueOfHourOrMinute}:${returnMinute}`;
        returnDatatimeChaet = `${returnCheatDate} ${valueOfHourOrMinute}:${returnMinute}`;
      }
      if (transferOrReturn === "minuteReturn") {
        returnDatatime = `${returnDate} ${returnHour}:${valueOfHourOrMinute}`;
        returnDatatimeChaet = `${returnCheatDate} ${returnHour}:${valueOfHourOrMinute}`;
      }

      return {
        ...state,
        reservations: [
          {
            ...state.reservations[0],
            transferDetails: {
              ...state.reservations[0].transferDetails,
              transferDateTimeString: tranferDatatime,
            },
          },
          {
            ...state.reservations[1],
            transferDetails: {
              ...state.reservations[1]?.transferDetails,
              transferDateTimeString: returnDatatime,
            },
          },
        ],
        params: {
          ...state.params,
          trDateCheat: tranferDatatimeCheat,
          returnDateCheat: returnDatatimeChaet,
        },
      };
    }
    case GET_TRANSFER_QUOT_REQUEST: {
      return {
        ...state,
        params: {
          ...state.params,
          quotations: {
            ...state.params.quotations,
            quotTransferLoading: true,
          },
        },
      };
    }

    case GET_TRANSFER_QUOTATIONS: {
      let tr = action.payload.data;
      let pickUpsTr = state?.reservations[0]?.selectedPickupPoints; //CATEGORYiD VE PRICIN ilk gelenlere gore ayarlanmasi
      let newQuotationTransfer = state?.reservations[0]?.quotation;
      return {
        ...state,
        // otomotik secilmesi icin direk quotation icine birinci geleni atrq quotation icine(ve bu olur ilk secilen quotation)
        reservations: [
          {
            ...state?.reservations[0],
            quotation: {
              ...action.payload?.data?.quotationOptions[0],
            },
            transferDetails: {
              ...state.reservations[0].transferDetails,
              pickupCategoryId:
                pickUpsTr.length > 0 ? pickUpsTr[0]?.pcatId : "",
            },
            paymentDetails: {
              ...state.reservations[0].paymentDetails,
              price: Number(action.payload?.data?.quotationOptions[0]?.price),
            },
          },
          { ...state?.reservations[1] },
        ],
        params: {
          ...state.params,
          quotations: {
            ...state.params.quotations,
            quotTransferLoading: false,
            transferQuotations: tr,
          },
        },
      };
    }
    case GET_QUOT_TRANSFER_ERROR: {
      return {
        ...state,
        params: {
          ...state.params,
          quotations: {
            ...state.params.quotations,
            quotationError: action.payload,
            quotTransferLoading: false,
          },
        },
      };
    }

    case GET_BOTH_TOGETHER_QUOT_REQUEST: {
      return {
        ...state,
        params: {
          ...state.params,
          quotations: {
            ...state.params.quotations,
            quotBothLoading: true,
          },
        },
      };
    }

    case GET_BOTH_TOGETHER_QUOTATIONS: {
      let { trQuots, retrunQuots } = action.payload;
      let pickUpsTr = state?.reservations[0]?.selectedPickupPoints;
      let pickUpsReturn = state?.reservations[1]?.selectedPickupPoints;
      let newQuotationReturn = state?.reservations[1]?.quotation;
      let newQuotationTransfer = state?.reservations[0]?.quotation;
      return {
        ...state,
        reservations: [
          {
            ...state?.reservations[0],
            quotation: {
              ...trQuots.quotationOptions[0],
            },
            transferDetails: {
              ...state.reservations[0].transferDetails,
              pickupCategoryId:
                pickUpsTr.length > 0 ? pickUpsTr[0]?.pcatId : "",
            },
            paymentDetails: {
              ...state.reservations[0].paymentDetails,
              price: Number(trQuots.quotationOptions[0]?.price),
            },
          },
          {
            ...state?.reservations[1],
            quotation: {
              ...retrunQuots.quotationOptions[0],
            },
            transferDetails: {
              ...state?.reservations[1]?.transferDetails,
              pickupCategoryId:
                pickUpsReturn?.length > 0 ? pickUpsReturn[0]?.pcatId : "",
            },
            paymentDetails: {
              ...state.reservations[1]?.paymentDetails,
              price: Number(retrunQuots.quotationOptions[0]?.price),
            },
          },
        ],
        params: {
          ...state.params,
          quotations: {
            ...state.params.quotations,
            quotBothLoading: false,
            transferQuotations: trQuots,
            returnQuotations: retrunQuots,
          },
        },
      };
    }

    case GET_BOTH_TOGETHER_ERROR_QUOT: {
      return {
        ...state,
        params: {
          ...state.params,
          quotations: {
            ...state.params.quotations,
            quotationError: action.payload,
            quotBothLoading: false,
          },
        },
      };
    }

    //we r using in alert div when eror is occured
    case SET_ERROR_INSIDE_HEROR_CONTENT: {
      return {
        ...state,
        params: {
          ...state.params,
          searchErrors: [
            {
              ...state.params.searchErrors[0],
              setErrorToHeroContent: action.payload,
            },
          ],
        },
      };
    }
    case SET_QUOTATION: {
      const { quotation, journeyType } = action.payload;
      let pickUpsTr = state?.reservations[0]?.selectedPickupPoints;
      let pickUpsReturn = state?.reservations[1]?.selectedPickupPoints;
      let newQuotationReturn = state?.reservations[1]?.quotation;
      let newQuotationTransfer = state?.reservations[0]?.quotation;
      if (journeyType === 0) newQuotationTransfer = quotation;
      if (journeyType === 1) newQuotationReturn = quotation;

      return {
        ...state,
        reservations: [
          {
            ...state.reservations[0],
            quotation: newQuotationTransfer,
            transferDetails: {
              ...state.reservations[0].transferDetails,
              pickupCategoryId:
                pickUpsTr.length > 0 ? pickUpsTr[0]?.pcatId : "",
            },
            paymentDetails: {
              ...state.reservations[0].paymentDetails,
              price: Number(newQuotationTransfer?.price),
            },
          },
          {
            ...state.reservations[1],
            quotation: newQuotationReturn,

            transferDetails: {
              ...state?.reservations[1]?.transferDetails,
              pickupCategoryId:
                pickUpsReturn?.length > 0 ? pickUpsReturn[0]?.pcatId : "",
            },
            paymentDetails: {
              ...state.reservations[1]?.paymentDetails,
              price: Number(newQuotationReturn?.price),
            },
          },
        ],
      };
    }

    case UPDATE_PASSNEGER_DETAILS: {
      const { value, nameOfInput, journeyType } = action.payload;
      const passTrDetails = state.reservations[0]?.passengerDetails;
      const passReturnDetails = state.reservations[1]?.passengerDetails;
      const checked = state.checked;
      let newValue = null;
      let returnValue = null;

      if (journeyType === 0 && nameOfInput !== "passengersNumber") {
        newValue = {
          ...passTrDetails,
          [nameOfInput]: value,
        };
        if (checked) {
          returnValue = {
            ...passTrDetails,
            [nameOfInput]: value,
          };
        }
      }

      if (journeyType === 1 && nameOfInput !== "passengersNumber") {
        returnValue = {
          ...passReturnDetails,
          [nameOfInput]: value,
        };
      }
      //*

      //*
      //burda pax ve requwest ucun degerleri stora yazrg
      const paxTr = state.reservations[0]?.transferDetails;
      const paxReturn = state.reservations[1]?.transferDetails;
      //PASSENGERNUMBERS
      let newPaxValueForTr = null;
      let newPaxReturnValue = null;

      if (journeyType === 0 && nameOfInput === "passengersNumber") {
        newPaxValueForTr = {
          ...paxTr,
          passengersNumber: value,
        };

        //burda ise transferde degisen passenger numberi return icine atyrq eger checked ise
        if (checked) {
          newPaxReturnValue = {
            ...paxReturn,
            passengersNumber: value,
          };
        }
      }

      if (journeyType === 1 && nameOfInput === "passengersNumber" && !checked) {
        newPaxReturnValue = {
          ...paxReturn,
          passengersNumber: value,
        };
      }

      return {
        ...state,
        reservations: [
          {
            ...state.reservations[0],
            passengerDetails: newValue ? newValue : passTrDetails,
            transferDetails: newPaxValueForTr ? newPaxValueForTr : paxTr,
          },
          {
            ...state.reservations[1],
            passengerDetails: returnValue ? returnValue : passReturnDetails,
            transferDetails: newPaxReturnValue ? newPaxReturnValue : paxReturn,
          },
        ],
      };
    }
    case UPDATE_SPECIAL_REQUEST: {
      const { journeyType, value } = action.payload;

      const paxTr = state.reservations[0]?.transferDetails;
      const paxReturn = state.reservations[1]?.transferDetails;
      let newPaxValueForTr = null;
      let newPaxReturnValue = null;

      if (journeyType === 0) {
        newPaxValueForTr = {
          ...paxTr,
          specialRequests: value,
        };
      }

      if (journeyType === 1) {
        newPaxReturnValue = {
          ...paxReturn,
          specialRequests: value,
        };
      }
      return {
        ...state,
        reservations: [
          {
            ...state.reservations[0],
            transferDetails: newPaxValueForTr ? newPaxValueForTr : paxTr,
          },
          {
            ...state.reservations[1],
            transferDetails: newPaxReturnValue ? newPaxReturnValue : paxReturn,
          },
        ],
      };
    }
    case SET_ERROR_IN_TRANSFER_DETAILS_PAGE: {
      const { erMessage, jourrneyType, categoryOfError, whichSelectedItem } =
        action.payload;
      let pickupHandling = state.objectDetailsForHandling[0]?.pickupHandling;
      let dropHandling = state.objectDetailsForHandling[0]?.dropHandling;

      //transferPickUp
      if (jourrneyType === "transfer" && categoryOfError === "flightCategory") {
        pickupHandling = pickupHandling?.map((item, i) => {
          return i === whichSelectedItem && item.pcatId === 1
            ? {
              ...item,
              errorMessage: erMessage,
            }
            : item;
        });
      }
      if (jourrneyType === "transfer" && categoryOfError === "flightCategory_Waiting") {

        pickupHandling = pickupHandling?.map((item, i) => {
          return i === whichSelectedItem && item.pcatId === 1
            ? {
              ...item,
              waitingError: erMessage,
            }
            : item;
        });
      }
      //*post statr
      if (jourrneyType === "transfer" && categoryOfError === "postCategory") {
        pickupHandling = pickupHandling?.map((item, i) => {
          return i === whichSelectedItem && item.pcatId === 5
            ? {
              ...item,
              errorMessage: erMessage,
            }
            : item;
        });
      }
      if (
        jourrneyType === "transfertwo" &&
        categoryOfError === "postCategory"
      ) {
        dropHandling = dropHandling?.map((item, i) => {
          return i === whichSelectedItem && item.pcatId === 5
            ? {
              ...item,
              errorMessage: erMessage,
            }
            : item;
        });
      }
      //*post finish

      //!cruise start
      if (jourrneyType === "transfer" && categoryOfError === "cruise") {
        pickupHandling = pickupHandling?.map((item, i) => {
          return i === whichSelectedItem && item.pcatId === 2
            ? {
              ...item,
              errorMessage: erMessage,
            }
            : item;
        });
      }
      //!cruise finish

      let returnPcikHandling =
        state.objectDetailsForHandling[1].returnPcikHandling;
      let returndropHandling =
        state.objectDetailsForHandling[1].returndropHandling;
      return {
        ...state,

        objectDetailsForHandling: [
          { pickupHandling, dropHandling },
          { returnPcikHandling, returndropHandling },
        ],
      };
    }
    case SET_ERROR_IN_RETURN_DETAILS_PAGE: {
      const { erMessage, jourrneyType, categoryOfError, whichSelectedItem } =
        action.payload;

      let returnPcikHandling =
        state.objectDetailsForHandling[1].returnPcikHandling;
      let returndropHandling =
        state.objectDetailsForHandling[1].returndropHandling;
      //return pickuppoints

      if (jourrneyType === "return" && categoryOfError === "flightCategory") {
        returnPcikHandling = returnPcikHandling?.map((item, i) => {
          return i === whichSelectedItem && item.pcatId === 1
            ? {
              ...item,
              errorMessage: erMessage,
            }
            : item;
        });
      }
      if (jourrneyType === "return" && categoryOfError === "flightCategory_Waiting") {
        returnPcikHandling = returnPcikHandling?.map((item, i) => {
          return i === whichSelectedItem && item.pcatId === 1
            ? {
              ...item,
              waitingError: erMessage,
            }
            : item;
        });
      }

      //!post start
      if (jourrneyType === "return" && categoryOfError === "postCategory") {
        returnPcikHandling = returnPcikHandling?.map((item, i) => {
          return i === whichSelectedItem && item.pcatId === 5
            ? {
              ...item,
              errorMessage: erMessage,
            }
            : item;
        });
      }
      if (jourrneyType === "returntwo" && categoryOfError === "postCategory") {
        returndropHandling = returndropHandling?.map((item, i) => {
          return i === whichSelectedItem && item.pcatId === 5
            ? {
              ...item,
              errorMessage: erMessage,
            }
            : item;
        });
      }
      //!post finish
      let pickupHandling = state.objectDetailsForHandling[0]?.pickupHandling;
      let dropHandling = state.objectDetailsForHandling[0]?.dropHandling;
      //!cruise start
      if (jourrneyType === "return" && categoryOfError === "cruise") {
        returnPcikHandling = returnPcikHandling?.map((item, i) => {
          return i === whichSelectedItem && item.pcatId === 2
            ? {
              ...item,
              errorMessage: erMessage,
            }
            : item;
        });
      }
      //!cruise finish

      return {
        ...state,
        objectDetailsForHandling: [
          { pickupHandling, dropHandling },
          { returnPcikHandling, returndropHandling },
        ],
      };
    }
    //flightdetails faln onlari udpdate elyrk
    case UPDATE_SELECTED_ITEMS_INPUTS: {
      const { value, pickOrDrop, journeyType, nameOfInput, whichSelectedItem, categoryOfTheType, selectedIndex } = action.payload;



      //flightCategory
      let pickUpTransferPoints = state?.reservations[0]?.selectedPickupPoints;
      let dropOfTransferPoints = state?.reservations[0]?.selectedDropoffPoints;

      let pickUpReturnPoints = state?.reservations[1]?.selectedPickupPoints;
      let dropOfReturnPoints = state?.reservations[1]?.selectedDropoffPoints;

      //flightNumber gii olanlarin error kkismini ayarlamamiz icin
      let pickupHandling = state.objectDetailsForHandling[0].pickupHandling;
      let dropHandling = state.objectDetailsForHandling[0].dropHandling;
      let returnPcikHandling =
        state.objectDetailsForHandling[1].returnPcikHandling;
      let returndropHandling =
        state.objectDetailsForHandling[1].returndropHandling;

      //*flight start
      //!transferin pickup ayarlamasi
      if (journeyType === 0 && pickOrDrop === 0 && categoryOfTheType === 1) {
        pickUpTransferPoints = pickUpTransferPoints?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              flightDetails: {
                ...item?.flightDetails,
                [nameOfInput]: value,
              },
            }
            : item;
        });

        pickupHandling = pickupHandling?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              errorMessage:
                nameOfInput === "flightNumber" && value
                  ? ""
                  : value.length <= 0
                    ? "required"
                    : item.errorMessage,
              flightDetails: {
                ...item.flightDetails,
                [nameOfInput]: value,
              },
              waitingMinute:
                nameOfInput === "waitingPickupTime" && selectedIndex === 0 ? "" : nameOfInput === "waitingPickupTime" ? value.toString() : item.waitingMinute,
              waitingError:
                nameOfInput === "waitingPickupTime" && selectedIndex === 0 ? "required" : "",

            }
            : item;
        });
      }
      //!transferin dropOff ayarlamasi
      //burda waiting numberi gizletdik cunki gelen jsonnan aldgmz deger 3 du
      if (journeyType === 0 && pickOrDrop === 1 && categoryOfTheType === 1) {
        dropOfTransferPoints = dropOfTransferPoints?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              flightDetails: {
                ...item.flightDetails,
                ["flightNumber"]: value,
              },
            }
            : item;
        });
        dropHandling = dropHandling?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              flightDetails: {
                ...item.flightDetails,
                ["flightNumber"]: value,
              },
            }
            : item;
        });
      }

      //!return pick up ayarlamasi
      if (journeyType === 1 && pickOrDrop === 0 && categoryOfTheType === 1) {
        pickUpReturnPoints = pickUpReturnPoints?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              flightDetails: {
                ...item.flightDetails,
                [nameOfInput]: value,
              },
            }
            : item;
        });
        returnPcikHandling = returnPcikHandling?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              errorMessage:
                nameOfInput === "flightNumber" && value
                  ? ""
                  : value.length <= 0
                    ? "required"
                    : item.errorMessage,
              flightDetails: {
                ...item.flightDetails,
                [nameOfInput]: value,
              },
              waitingMinute:
                nameOfInput === "waitingPickupTime" && selectedIndex === 0 ? "" : nameOfInput === "waitingPickupTime" ? value.toString() : item.waitingMinute,
              waitingError:
                nameOfInput === "waitingPickupTime" && selectedIndex === 0 ? "required" : "",
            }
            : item;
        });
      }
      //!return drop off ayarlamasi
      if (journeyType === 1 && pickOrDrop === 1 && categoryOfTheType === 1) {
        dropOfReturnPoints = dropOfReturnPoints?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              flightDetails: {
                ...item.flightDetails,
                ["flightNumber"]: value,
              },
            }
            : item;
        });
        returndropHandling = returndropHandling?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              flightDetails: {
                ...item.flightDetails,
                ["flightNumber"]: value,
              },
            }
            : item;
        });
      }
      //?flight finish

      //?start cruices /train/ RoomNumber / Place of interest //cities //universities //otthers(10)
      if (
        journeyType === 0 &&
        pickOrDrop === 0 &&
        categoryOfTheType !== 1 &&
        categoryOfTheType !== 5
      ) {
        pickUpTransferPoints = pickUpTransferPoints?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              [nameOfInput]: value,
            }
            : item;
        });

        pickupHandling = pickupHandling?.map((item, i) => {
          return i === whichSelectedItem
            ? //roomNumber
            {
              ...item,
              errorMessage:
                nameOfInput === "cruiseNumber"
                  ? ""
                  : value.length <= 0
                    ? "required"
                    : item.errorMessage || nameOfInput === "roomNumber"
                      ? ""
                      : value.length <= 0
                        ? "required"
                        : item.errorMessage,
              [nameOfInput]: value,
            }
            : item;
        });
      }
      if (
        journeyType === 0 &&
        pickOrDrop === 1 &&
        categoryOfTheType !== 1 &&
        categoryOfTheType !== 5
      ) {
        dropOfTransferPoints = dropOfTransferPoints?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              [nameOfInput]: value,
            }
            : item;
        });
        dropHandling = dropHandling?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              [nameOfInput]: value,
            }
            : item;
        });
      }
      if (
        journeyType === 1 &&
        pickOrDrop === 0 &&
        categoryOfTheType !== 1 &&
        categoryOfTheType !== 5
      ) {
        pickUpReturnPoints = pickUpReturnPoints?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              [nameOfInput]: value,
            }
            : item;
        });
        returnPcikHandling = returnPcikHandling?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              errorMessage:
                nameOfInput === "cruiseNumber"
                  ? ""
                  : value.length <= 0
                    ? "required"
                    : item.errorMessage || nameOfInput === "roomNumber"
                      ? ""
                      : value.length <= 0
                        ? "required"
                        : item.errorMessage,
              [nameOfInput]: value,
            }
            : item;
        });
      }
      if (
        journeyType === 1 &&
        pickOrDrop === 1 &&
        categoryOfTheType !== 1 &&
        categoryOfTheType !== 5
      ) {
        dropOfReturnPoints = dropOfReturnPoints?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              [nameOfInput]: value,
            }
            : item;
        });
        returndropHandling = returndropHandling?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              [nameOfInput]: value,
            }
            : item;
        });
      }
      //****

      //*postCodeStart
      //burda naeofInput value gibi islem gorur value ise id gibi
      //oyuzden nameofinput.length falan ile error handle olunur
      if (journeyType === 0 && pickOrDrop === 0 && categoryOfTheType === 5) {
        pickUpTransferPoints = pickUpTransferPoints?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              postCodeDetails: {
                ...item.postCodeDetails,
                id: value,
                postCodeAddress: nameOfInput,
              },
            }
            : item;
        });
        pickupHandling = pickupHandling?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              errorMessage:
                nameOfInput.length > 0
                  ? ""
                  : nameOfInput.length <= 0
                    ? "required"
                    : item.errorMessage,
              postCodeDetails: {
                ...item.postCodeDetails,
                id: value,
                postCodeAddress: nameOfInput,
              },
            }
            : item;
        });
      }
      if (journeyType === 0 && pickOrDrop === 1 && categoryOfTheType === 5) {
        dropOfTransferPoints = dropOfTransferPoints?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              postCodeDetails: {
                ...item.postCodeDetails,
                id: value,
                postCodeAddress: nameOfInput,
              },
            }
            : item;
        });
        dropHandling = dropHandling?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              errorMessage:
                nameOfInput.length > 0
                  ? ""
                  : nameOfInput.length <= 0
                    ? "required"
                    : item.errorMessage,
              postCodeDetails: {
                ...item.postCodeDetails,
                id: value,
                postCodeAddress: nameOfInput,
              },
            }
            : item;
        });
      }

      if (journeyType === 1 && pickOrDrop === 0 && categoryOfTheType === 5) {
        pickUpReturnPoints = pickUpReturnPoints?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              postCodeDetails: {
                ...item.postCodeDetails,
                id: value,
                postCodeAddress: nameOfInput,
              },
            }
            : item;
        });

        returnPcikHandling = returnPcikHandling?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              errorMessage:
                nameOfInput.length > 0
                  ? ""
                  : nameOfInput.length <= 0
                    ? "required"
                    : item.errorMessage,
              postCodeDetails: {
                ...item.postCodeDetails,
                id: value,
                postCodeAddress: nameOfInput,
              },
            }
            : item;
        });
      }
      if (journeyType === 1 && pickOrDrop === 1 && categoryOfTheType === 5) {
        dropOfReturnPoints = dropOfReturnPoints?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              postCodeDetails: {
                ...item.postCodeDetails,
                id: value,
                postCodeAddress: nameOfInput,
              },
            }
            : item;
        });
        returndropHandling = returndropHandling?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              errorMessage:
                nameOfInput.length > 0
                  ? ""
                  : nameOfInput.length <= 0
                    ? "required"
                    : item.errorMessage,
              postCodeDetails: {
                ...item.postCodeDetails,
                id: value,
                postCodeAddress: nameOfInput,
              },
            }
            : item;
        });
      }
      //?fpostCOde finish

      return {
        ...state,
        reservations: [
          {
            ...state.reservations[0],
            selectedPickupPoints: pickUpTransferPoints,
            selectedDropoffPoints: dropOfTransferPoints,
          },
          {
            ...state.reservations[1],
            selectedPickupPoints: pickUpReturnPoints,
            selectedDropoffPoints: dropOfReturnPoints,
          },
        ],
        objectDetailsForHandling: [
          { pickupHandling, dropHandling },
          { returnPcikHandling, returndropHandling },
        ],
      };
    }
    case SWITCH_JOURNEY: {
      let pickUpsTr = state.reservations[0].selectedPickupPoints;
      let dropOffsTr = state.reservations[0].selectedDropoffPoints;


      let trHnadlingPickUp = state.objectDetailsForHandling[0].pickupHandling
      let trHandlingDrop = state.objectDetailsForHandling[0].dropHandling

      //these are for getting input date
      let newFormatDate, returnFormatDate;
      let tr = state?.params.trDateCheat;
      let trDate = tr.split(" ")[0]; //14:22
      let trMinuteHour = tr.split(" ")[1];
      let year = trDate.split("-")[0];
      let month = trDate.split("-")[1];
      let day = trDate.split("-")[2];

      newFormatDate = `${day}/${month}/${year} ${trMinuteHour}`;

      let rt = state?.params.returnDateCheat;
      let rrtDt = rt.split(" ")[0];
      let rtHourMinute = rt.split(" ")[1];

      let yearRt = rrtDt.split("-")[0];
      let monthRt = rrtDt.split("-")[1];
      let dayRt = rrtDt.split("-")[2];
      returnFormatDate = `${dayRt}/${monthRt}/${yearRt} ${rtHourMinute}`;

      return {
        ...state,
        params: {
          ...state.params,
          journeyType: action.payload,
        },
        reservations: [
          {
            ...state.reservations[0],
            transferDetails: {
              ...state.reservations[0].transferDetails,
              transferDateTimeString: newFormatDate,
            },
          },
          {
            ...state.reservations[1],
            transferDetails: {
              ...state.reservations[1]?.transferDetails,
              transferDateTimeString: returnFormatDate,
            },
            passengerDetails: {
              ...state.reservations[0].passengerDetails
            },
            selectedPickupPoints: [...dropOffsTr],
            selectedDropoffPoints: [...pickUpsTr],
          },
        ],
        objectDetailsForHandling: [
          { ...state.objectDetailsForHandling[0] },
          {
            ...state.objectDetailsForHandling[1],
            // returnPcikHandling: [...trHandlingDrop],
            returnPcikHandling: trHandlingDrop.map((item) => {
              return item?.pcatId === 1
                ? { ...item, waitingMinute: "" }
                : { ...item };
            }),
            // returndropHandling: [...trHnadlingPickUp]
            returndropHandling: trHnadlingPickUp.map((item) => {
              return item?.pcatId === 1
                ? { ...item, waitingMinute: "1" }
                : { ...item }
            }),
          }
        ],
      };
    }
    case "RESET_JOURNEY_TO_INITIAL": {
      let pickUpsTr = state.reservations[0].selectedPickupPoints;
      let dropOffsTr = state.reservations[0].selectedDropoffPoints;
      let trHnadlingPickUp = state.objectDetailsForHandling[0].pickupHandling
      let trHandlingDrop = state.objectDetailsForHandling[0].dropHandling

      //these are for getting input date
      let newFormatDate, returnFormatDate;
      let tr = state?.params.trDateCheat;
      let trDate = tr.split(" ")[0]; //14:22
      let trMinuteHour = tr.split(" ")[1];
      let year = trDate.split("-")[0];
      let month = trDate.split("-")[1];
      let day = trDate.split("-")[2];

      newFormatDate = `${day}/${month}/${year} ${trMinuteHour}`;

      let rt = state?.params.returnDateCheat;
      let rrtDt = rt.split(" ")[0];
      let rtHourMinute = rt.split(" ")[1];

      let yearRt = rrtDt.split("-")[0];
      let monthRt = rrtDt.split("-")[1];
      let dayRt = rrtDt.split("-")[2];
      returnFormatDate = `${dayRt}/${monthRt}/${yearRt} ${rtHourMinute}`;

      return {
        ...state,
        params: { ...state.params, journeyType: action.payload, },
        reservations: [
          {
            ...state.reservations[0],
            transferDetails: {
              ...state.reservations[0].transferDetails,
              transferDateTimeString: newFormatDate,
            },
          },
          {
            reservationDetails: {
              channelId: 7,
              accountId: 1402,
            },
            selectedPickupPoints: [],
            selectedDropoffPoints: [],
            quotation: {},
            transferDetails: {
              transferDateTimeString: dateFormatCheatReturn(),
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
              account: 1402,
            },
          },
        ],
        objectDetailsForHandling: [
          { ...state.objectDetailsForHandling[0] },
          {
            returnPcikHandling: [],
            returndropHandling: [],
          },
        ],
      };
    }
    case SET_PAYMENT: {
      return {
        ...state,
        reservations: [
          {
            ...state.reservations[0],
            paymentDetails: {
              ...state.reservations[0]?.paymentDetails,
              token: action?.payload?.token,
              paymentType: action?.payload?.paymentType,
            },
          },
          {
            ...state?.reservations[1],
            paymentDetails: {
              ...state.reservations[1]?.paymentDetails,
              token: action?.payload?.token,
              paymentType: action?.payload?.paymentType,
            },
          },
        ],
      };
    }
    case GET_APP_DATA: {
      return {
        ...state,
        appData: action.payload,
        // loadingPickUpOneWay: false,
      };
    }
    case GET_PAYMENT_DATA: {
      const { data } = action.payload;
      return {
        ...state,
        paymentTypes: data,
      };
    }
    case CHECKED_INPUT_FOR_RETURN: {
      let checked = state.checked;
      //PASSENGER DETAILS
      const passTrDetails = state.reservations[0].passengerDetails;
      const passReturnDetails = state.reservations[1].passengerDetails;

      let newValues = null;
      if (!checked) {
        newValues = {
          ...passTrDetails,
        };
      }
      if (checked) {
        newValues = {
          ...passReturnDetails,
        };
      }

      return {
        ...state,
        checked: !state.checked,
        reservations: [
          {
            ...state.reservations[0],
            passengerDetails: newValues ? newValues : passTrDetails,
          },
          {
            ...state.reservations[1],
            passengerDetails: newValues ? newValues : passReturnDetails,
            transferDetails: {
              ...state.reservations[1].transferDetails,
              passengersNumber: !checked
                ? state.reservations[0].transferDetails.passengersNumber
                : state.reservations[1].transferDetails.passengersNumber,
            },
          },
        ],
      };
    }
    case RESET_FORM: {
      return {
        ...state,
        reservations: [
          {
            ...state.reservations[0],
            selectedPickupPoints: [],
            selectedDropoffPoints: [],
            quotation: {},
            transferDetails: {
              ...state.reservations[0].transferDetails,
              transferDateTimeString: dateFormatCheatTransfer(),
            },
          },
          {
            ...state.reservations[1],
            selectedPickupPoints: [],
            selectedDropoffPoints: [],
            quotation: {},

            transferDetails: {
              ...state.reservations[1]?.transferDetails,
              transferDateTimeString: dateFormatCheatReturn(),
            },
          },
        ],
      };
    }
    case CHECK_JOURNEY_DETAILS_TO_GO_NEXT_PAGE: {
      return {
        ...state,
        checkingGoToNextPage: action.payload,
      };
    }
    case GET_MEET_POINT: {
      return {
        ...state,
        meetPoint: action.payload,
      };
    }
    default:
      return state;
  }
};
