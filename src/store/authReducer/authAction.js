import {
  CLEAR_ERRORS,
  LOAD_USER_FAIL_CHECK_PERMIT,
  LOAD_USER_REQUEST_CHECK_PERMIT,
  LOAD_USER_SUCCESS_CHECK_PERMIT,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
} from "./authTypes";
import { removeCookie, setCookie } from "../../helpers/cokieesFunc";
import { fetchConfig } from "../../resources/getEnvConfig";

export const login = (email, password, router, recaptchaToken = true, setAlert) => async (dispatch) => {
  const env = await fetchConfig();
  dispatch({ type: LOGIN_REQUEST });
  //
  // const removedUrl = `${env.apiDomain}/api/v1/corporate-account/login`;

  const url = `${env.apiDomain}/api/v1/corporate-account/login?passRecaptcha=true`;
  // const url = `${env.apiDomain}/api/v1/corporate-account/login`;
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");


  if (recaptchaToken) {
    let raw = JSON.stringify({ email, password, "recaptchaToken": "" });
    let requestOptions = { method: "POST", headers: myHeaders, body: raw, redirect: "follow", };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log({ result });

        if (result.status === 200) {
          localStorage.setItem("user", JSON.stringify(result.data));
          setCookie("user-id", result.data["id"], 7);
          setCookie("x-auth-token", result.data["x-auth-token"], 7);

          // Dispatch the action
          dispatch({ type: LOGIN_SUCCESS, payload: result.data });

          //in order to get user again after login
          router.push("/new-booking");

          let { channelId, accountId } = result.data
          localStorage.setItem("channelId", channelId);
          localStorage.setItem("accountId", accountId);
          dispatch({ type: 'SET_ACCOUNT_ID', data: { channelId, accountId } })

        } else {
          dispatch({ type: LOGIN_FAIL, payload: result.error.global[0] });


          setAlert({ alert: true, close: true, message: result.error.global[0], error: true, });

        }
      })
      .catch((error) => { dispatch({ type: LOGIN_FAIL, payload: error }); });
  } else {
    setAlert({ alert: true, close: true, message: "Select reCaptcha", error: true, });
    setTimeout(() => {
      dispatch({ type: LOGIN_FAIL, payload: "Select reCaptcha" });
    }, 1300);

  }
};

export const loaduserIfExist = (id, token, router) => async (dispatch) => {
  dispatch({ type: LOAD_USER_REQUEST_CHECK_PERMIT });
  const env = await fetchConfig();
  var myHeaders = new Headers();
  myHeaders.append("content-type", "application/json");
  var raw = JSON.stringify({ "x-auth-token": token, "user-id": id, });
  var requestOptions = { method: "POST", headers: myHeaders, body: raw, };

  fetch(`${env.apiDomain}/api/v1/corporate-account/check-auth`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.status === 200) {
        dispatch({ type: LOAD_USER_SUCCESS_CHECK_PERMIT, payload: result });
      } else {
        dispatch({ type: LOAD_USER_FAIL_CHECK_PERMIT, payload: result.status });
        removeCookie("user-id");
        removeCookie("x-auth-token");
        router.push("/new-booking");
      }
    })
    .catch((error) => {
      dispatch({ type: LOAD_USER_FAIL_CHECK_PERMIT, payload: error });
    });
};
export const logoutuser = (router) => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_SUCCESS });
    removeCookie("user-id");
    removeCookie("x-auth-token");

    //reset the activelinkitem id When logout
    window.localStorage.removeItem('activeLinkId');
    window.localStorage.removeItem('accountId');
    window.localStorage.removeItem('channelId');
    window.localStorage.removeItem('user');

    localStorage.setItem("activeLinkId", JSON.stringify(1))

    // localStorage.removeItem("allowedPtypes")

    router.push("/");
  } catch (error) { dispatch({ type: LOGOUT_FAIL, payload: error }); }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => dispatch({ type: CLEAR_ERRORS });
