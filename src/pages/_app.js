import "../styles/global.scss";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../store/store";
import { getAppData } from "../store/pickUpDropOffReducer/pickUpDropAction";
import { SET_SELECT_ACTIVE_LINK } from "../store/pickUpDropOffReducer/pickUpDropTypes";
import { useDispatch } from "react-redux";
import { fetchConfig } from "../resources/getEnvConfig";


function MyApp({ Component, pageProps }) {
  let { env } = pageProps

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (typeof window === 'object') {
      window.handelErrorLogs = (error = {}, location = '', logs = {}) => {
        let raw = {};
        try {
          let { name, message, stack } = typeof error === 'string' ? new Error(error) : error;
          raw = { "error": { name, message, stack }, "location": location, "logs": logs };
        } catch (e) {
          raw = { "error": { ...e, ...error }, "location": location, "logs": logs };
        }

        let requestOptions = {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(raw),
          redirect: 'follow'
        };
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
    dispatch({
      type: SET_SELECT_ACTIVE_LINK,
      payload: "home",
    });
    dispatch(getAppData());

  }, [])


  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
const makestore = () => store;
const wrapper = createWrapper(makestore);
MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async ({ Component, ctx }) => {
  const env = await fetchConfig();
  return { pageProps: { env } }
});
export default wrapper.withRedux(MyApp);
