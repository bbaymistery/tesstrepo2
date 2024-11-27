import { fetchConfig } from "../../resources/getEnvConfig";
import {
  FETCH_LOCATIONS_FAILURE,
  FETCH_LOCATIONS_REQUEST,
  FETCH_LOCATIONS_SUCCESS,
  GET_APP_DATA,
  SET_SEARCH_ENGINE_VALUE,
  SWITCH_JOURNEY,
  RESET_DATA,
  ADD_ITEM_TO_SELECTED_LIST,
  DELETE_ITEM_FROM_SELECTED_LIST,
  SET_DATE_TIME,
  SET_HOUR_AND_MINUTE,
  SET_PARAMS,
  SET_QUOTATION,
  ADD_EXTRA_INPUT_FOR_JOURNEY,
  GET_TRANSFER_QUOTATIONS,
  GET_RETURN_QUOTATIONS,
  GET_QUOT_TRANSFER_ERROR,
  GET_TRANSFER_QUOT_REQUEST,
  GET_RETURN_QUOT_REQUEST,
  UPDATE_SELECTED_ITEMS_INPUTS,
  SET_ERROR_IN_TRANSFER_DETAILS_PAGE,
  SET_ERROR_IN_RETURN_DETAILS_PAGE,
  UPDATE_PASSENGER_DETAILS_FOR_BOTH_JOURNEY,
  CHECKED_INPUT_FOR_RETURN,
  SET_ERROR_FOR_PASSENGER_DETAILS,
  GET_BOTH_TOGETHER_QUOT_REQUEST,
  GET_BOTH_TOGETHER_QUOTATIONS,
  GET_BOTH_TOGETHER_ERROR_QUOT,
  SET_POST_CODE_ADRESSES,
  GET_PAYMENT_DATA,
  SET_PAYMENT,
  GET_DATAS_FOR_EDITING,
  EDIT_SAVE_TRANSFER_PASSENGER_VALUES,
  CANCEL__TRANSFER_JOURNEY_EDITING,
} from "./pickUpDropTypes";

export const collectPickUpPoints = (inpValue, index, journeyType) => async (dispatch, getState) => {
  const env = await fetchConfig()
  const {
    pickUpDropOffReducer: {
      cookies: { sessionToken },
    },
  } = getState();
  dispatch({
    type: FETCH_LOCATIONS_REQUEST,
    payload: { journeyType, index },
  });
  const url = `${env.apiDomain}/api/v1/suggestions`;
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      value: inpValue,
      "session-token": `${sessionToken ? sessionToken : ""}`,
    }),
  };


  fetch(url, config)
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: FETCH_LOCATIONS_SUCCESS,
        payload: {
          data,
          index,
          inpValue,
          journeyType,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_LOCATIONS_FAILURE,
        payload: { errorMessage: error.message, index },
      });
    });
};

//Make Request for google places .This action was triggeren inside HanndleSearchResults
//we r also  cleaning input after selecting one item
export const addItemToSelectedList = (requestBody, pickOrDrop, journeyType, objectDetails, indexOfInputField) => async (dispatch) => {
  const env = await fetchConfig()
  const url = `${env.apiDomain}/api/v1/google-places`;
  let index = pickOrDrop === "pickupPoints" ? 0 : 1;
  //request for google place and add item to the list
  if (requestBody.pcatId === 10) {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ point: requestBody }),
    };
    fetch(url, config)
      .then((res) => res.json())
      .then((data) => {

        dispatch({
          type: ADD_ITEM_TO_SELECTED_LIST,
          payload: {
            data: data?.point,
            index,
            journeyType,
            objectDetails,
            indexOfInputField,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (requestBody.pcatId === 5) {
    //?transfer details icin post coda uygun adresleri getiririk
    const url = `${env.apiDomain}/api/v1/postcode-address`;
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postcodes: [requestBody.postcode],
      }),
    };
    fetch(url, config)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: SET_POST_CODE_ADRESSES, payload: data.results[0] });
      })
      .catch((error) => {
        console.log(error);
      });
    // add item to the list directly
    dispatch({
      type: ADD_ITEM_TO_SELECTED_LIST,
      payload: {
        data: requestBody,
        index,
        journeyType,
        objectDetails,
        indexOfInputField,
      },
    });
  } else {
    // add item to the list directly
    dispatch({
      type: ADD_ITEM_TO_SELECTED_LIST,
      payload: {
        data: requestBody,
        index,
        journeyType,
        objectDetails,
        indexOfInputField,
      },
    });

    // console.log(
    //   requestBody,
    //   index,
    //   journeyType,
    //   objectDetails,
    //   indexOfInputField
    // );
  }
};
export const deleteItemFromList =
  (index, journeyType, indexOfCurrentItem) => (dispatch) => {
    dispatch({
      type: DELETE_ITEM_FROM_SELECTED_LIST,
      payload: { index, journeyType, indexOfCurrentItem },
    });
  };

export const gettingQuotations = (router, journeyType, updateInsideQuotation, seterrorDisabledMessageTransfer, seterrorDisabledMessageReturn) => async (dispatch, getState) => {
  const env =await fetchConfig()
  const { pickUpDropOffReducer: { reservations }, } = getState();

  //transfer
  let trSelectedPickPoints = reservations[0]?.selectedPickupPoints;
  let trSelectedDroppPoints = reservations[0]?.selectedDropoffPoints;
  let transferDAteTimeString =
    reservations[0]?.transferDetails?.transferDateTimeString;

  //return
  let returnPickPoints = reservations[1]?.selectedPickupPoints;
  let returnDroppPoints = reservations[1]?.selectedDropoffPoints;
  let returnDAteTimeString =
    reservations[1]?.transferDetails?.transferDateTimeString;

  const url = `${env.apiDomain}/api/v1/quotation`;
  const configTransfer = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      selectedPickupPoints: trSelectedPickPoints,
      selectedDropoffPoints: trSelectedDroppPoints,
      transferDateTimeString: transferDAteTimeString,
    }),
  };
  const configReturn = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      selectedPickupPoints: returnPickPoints,
      selectedDropoffPoints: returnDroppPoints,
      transferDateTimeString: returnDAteTimeString,
    }),
  };
  //sadece disardan home pageden isteg gondererse calisir Transfer
  if (journeyType === 0 && !updateInsideQuotation.updateInsideQuotation) {
    dispatch({
      type: GET_TRANSFER_QUOT_REQUEST,
      payload: "",
    });
    fetch(url, configTransfer)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          if (router) {
            dispatch({ type: GET_TRANSFER_QUOTATIONS, payload: { data, }, });
            router?.push("/quotation");
          }
        } else {
          if (data?.error?.global?.[0]) {

            seterrorDisabledMessageTransfer(data?.error?.global?.[0])
            dispatch({ type: GET_QUOT_TRANSFER_ERROR, payload: { errorMessage: data?.error?.global[0] }, });

            setTimeout(() => {
              dispatch({ type: GET_QUOT_TRANSFER_ERROR, payload: { errorMessage: "" }, });
              seterrorDisabledMessageTransfer("")
            }, 2500)
          }
        }
      })
      .catch((error) => {
        dispatch({ type: GET_QUOT_TRANSFER_ERROR, payload: { errorMessage: error.message }, });
      });
  }

  //sadece disardan return ile istek gondererse Ikisi icinde calisdiririq
  if (journeyType === 1 && !updateInsideQuotation.updateInsideQuotation) {
    dispatch({ type: GET_BOTH_TOGETHER_QUOT_REQUEST, payload: "" });
    Promise.all([fetch(url, configTransfer), fetch(url, configReturn)])
      .then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(
          responses.map(function (response) {
            return response.json();
          })
        );
      })
      .then(function (data) {


        // Log the data to the console
        // You would do something with both sets of data here
        if (data[0].status === 200 && data[1].status === 200) {
          dispatch({ type: GET_BOTH_TOGETHER_QUOTATIONS, payload: { trQuots: data[0], retrunQuots: data[1], }, });
          if (router) { router?.push("/quotation"); }
          seterrorDisabledMessageTransfer("")
          seterrorDisabledMessageReturn("")
        }





        if (data[0].status !== 200 && data[0]?.error?.global[0]) {
          dispatch({ type: GET_BOTH_TOGETHER_ERROR_QUOT, payload: { errorMessage: data[0]?.error?.global[0] } });
          seterrorDisabledMessageTransfer(data[0]?.error?.global[0])

          setTimeout(() => {
            seterrorDisabledMessageTransfer("")
            dispatch({ type: GET_BOTH_TOGETHER_ERROR_QUOT, payload: { errorMessage: "" }, });
          }, 2500)
        }
        if (data[1].status !== 200 && data[1]?.error?.global[0]) {
          dispatch({ type: GET_BOTH_TOGETHER_ERROR_QUOT, payload: { errorMessage: data[1]?.error?.global[0] } });
          seterrorDisabledMessageReturn(data[1]?.error?.global[0])

          setTimeout(() => {
            seterrorDisabledMessageReturn("")
            dispatch({ type: GET_BOTH_TOGETHER_ERROR_QUOT, payload: { errorMessage: "" }, });
          }, 4000)

        }
      })
      .catch(function (error) {
        dispatch({ type: GET_BOTH_TOGETHER_ERROR_QUOT, payload: error });
        console.log(error);
      });
  }
};

export const setPayment = (id, token, router) => (dispatch) => {
  dispatch({ type: SET_PAYMENT, payload: { token, paymentType: id } });
  if (id) router?.push(`/reservations-document`);
};

//words cartypes categorytypes ...
export const getAppData = () => async (dispatch) => {
  const env =await fetchConfig();
  const appDataUrl = `${env.apiDomain}/app/en`;
  const paymentTypesUrl = `${env.apiDomain}/api/v1/payment-types`;

  Promise.all([
    fetch(appDataUrl).then(res => res.json()),
    fetch(paymentTypesUrl).then(res => res.json()),
  ])
    .then(([appData, paymentTypes]) => {
      dispatch({ type: GET_APP_DATA, payload: appData });
      dispatch({ type: GET_PAYMENT_DATA, payload: paymentTypes });

    })
    .catch((error) => {
      console.error(error);
    });
};
