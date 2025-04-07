import "../styles/global.scss";
import React, { useEffect, useState, } from "react";
import { Provider, useDispatch, } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../store/store";
import { loaduserIfExist } from "../store/authReducer/authAction";
import { getCookie } from "../helpers/cokieesFunc";
import { useRouter } from "next/router";
import { LOGIN_SUCCESS } from "../store/authReducer/authTypes";
import useTokenCheckService from "../hooks/useTokenCheckService";
import Alert from "../components/elements/Alert";
import { fetchConfig } from "../resources/getEnvConfig";

// import "../components/elements/PopoverLabel/style.css";
function MyApp({ Component, pageProps }) {
  let { env } = pageProps
  const router = useRouter();
  const dispatch = useDispatch();
  const [alert, setAlert] = useState({ alert: false, message: "", close: false, });
  const checkToken = useTokenCheckService(setAlert);

  //it comes from app_js Initialprops beloww js serVerSide props
  let { paymentTypes, appData } = pageProps

  useEffect(() => {
    if (typeof window === 'object') {
      window.handelErrorLogs = (error = {}, location = '', logs = {}) => {
        let raw = {};
        try {
          let { name, message, stack } = typeof error === 'string' ? new Error(error) : error;
          raw = { "error": { name, message, stack }, "location": location, "logs": logs };
        } catch (e) {
          raw = { "error": { ...e, ...error }, "location": location, "logs": logs };
        }

        let requestOptions = { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(raw) };

        if (!env.websiteDomain.includes("localhost")) {
          try {
            fetch(`${env.apiDomain}/tools/add-error-logs`, requestOptions)
              .then(response => response.text())
              .then(result => console.log(result))
              .catch(error => console.log('error', error));
          } catch (err) {
            console.log(err)
          }
        }
      }
    }
    // Getting app data cartypes ..ext and save on store
    dispatch({ type: "GET_APP_DATA", data: { paymentTypes, appData } })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appData, paymentTypes, dispatch])

  //reloading user
  useEffect(() => {
    if (getCookie("user-id") && getCookie("x-auth-token")) {
      let id = getCookie("user-id");
      let authToken = getCookie("x-auth-token");
      dispatch(loaduserIfExist(id, authToken, router));
    }

    // Check for user data in Local Storage
    const userData = localStorage.getItem("user");
    const channelId = +localStorage.getItem("channelId");
    const accountId = +localStorage.getItem("accountId");
    // Dispatch the user data to Redux
    dispatch({ type: LOGIN_SUCCESS, payload: JSON.parse(userData) });
    dispatch({ type: 'SET_ACCOUNT_ID', data: { channelId, accountId } })

    const interval = setInterval(() => {
      checkToken()

    }, 420002); // Check every 7minutes (420000 ms)

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [dispatch, router, checkToken]);


  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (isClient && <Provider store={store}>
    {alert.alert && (
      <Alert
        setAlert={setAlert}
        alert={alert}
        message={alert.message}
        close={alert.close}
        error={alert.error}
        warning={alert.warning}
      />
    )}
    <Component {...pageProps} />
  </Provider>)
}
const makestore = () => store;
const wrapper = createWrapper(makestore);
MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async ({ Component, ctx }) => {
  const env = await fetchConfig();
  // Fetch app data and payment types
  const paymentUrl = `${env.apiDomain}/api/v1/payment-types`;
  const appDataUrl = `${env.apiDomain}/app/en}`; // Use the preferred language if available, otherwise default to English
  const urls = [paymentUrl, appDataUrl];

  let response = await Promise.all(urls.map(async url => {
    let resp = await fetch(url);
    return resp.json();
  }));
  console.log({ a: env });

  let appDataInitial = response[1];
  let paymentTypesInitial = response[0].data;
  return { pageProps: { appData: appDataInitial, paymentTypes: paymentTypesInitial, env } }
});
export default wrapper.withRedux(MyApp);
