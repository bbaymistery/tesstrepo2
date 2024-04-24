import "../styles/global.scss";
import { createWrapper } from 'next-redux-wrapper';
import { Provider, useDispatch } from 'react-redux';
import store from '../store/store';
import { checkLanguageAttributeOntheUrl } from '../helpers/checkLanguageAttributeOntheUrl';
import env from '../resources/env';
import { useRouter } from 'next/router';
import { extractLanguage } from '../helpers/extractLanguage';
import { useCallback, useEffect } from 'react';
import { mobileAndTabletCheck } from '../helpers/mobileAndTabletCheck';
import { setCookie } from "../helpers/cokieesFunc";
import { DM_Sans } from "next/font/google";
const dmsans = DM_Sans({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});
function MyApp({ Component, pageProps }) {
  const router = useRouter()

  //localhost:3500//test
  // Check if 'asPath' contains two or more consecutive slashes
  // If it does, return an error or handle it as needed
  if (/\/{2,}/.test(router.asPath)) return <Error404 />

  const dispatch = useDispatch()
  //it comes from index js serVerSide props
  const { store, props } = wrapper.useWrappedStore(pageProps);
  let { hasLanguage, appData } = props//has language used for when user comes it write lcalhost:3000/tr

  //based on hasnLAnguage attribute we r upding appData content
  const languages = appData?.languages
  const hasLanguageCode = languages.map(lang => `/${lang.value}/`).some(code => router.asPath.includes(code))
  let langAtrribute = "en"
  if (hasLanguageCode) langAtrribute = extractLanguage(router.asPath)//if it is tr then we assingg langAtribute to tr

  const setLanguage = useCallback(async (params = {}) => {
    let { language, hydrate = true } = params;

    if (language) {
      let index
      let direction = language === 'ar' ? "rtl" : "ltr"
      //assign idx to index
      appData?.languages.map((item, idx) => (language === item.value) ? index = idx : idx)

      dispatch({ type: "SET_NEW_LANGUAGE", data: { languageKey: language, direction, langIndex: index } })
      //set language and dicertion  to localstorage
      localStorage.setItem("language", JSON.stringify(language));
      localStorage.setItem("direction", JSON.stringify(direction));
      localStorage.setItem("langIndex", JSON.stringify(index));
      // in order to hydate redux store i need to save to localstorage new version of appData(based on langugae) so i use
      // if (hydrate) {
      //   dispatch({ type: "SET_NEW_APPDATA", data: appData, initialStateReducer: store.getState().initialReducer })
      //   console.log("hydrate");

      // } else {
      const appDataUrl = `${env.apiDomain}/app/${language}`; // Use the preferred language if available, otherwise default to English
      const response = await fetch(appDataUrl);
      const appDatass = await response.json();

      // Dispatch values to Redux store
      dispatch({ type: "SET_NEW_APPDATA", data: appDatass, initialStateReducer: store.getState().initialReducer })
      console.log("not hydrate");

      // }
    }
  }, [dispatch, appData,])
  useEffect(() => {
    //global errors
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
              .then(result => { console.log(result) })
              .catch(error => console.log('error', error));
          } catch (err) {
            console.log(err)
          }
        }
      }
    }
    dispatch({ type: "CHECK_MOBILE_OR_NOT", data: { mobileAndTabletCheck: mobileAndTabletCheck() } })
    //set language and bring appDAtas  when user write loaclhost3500/tr
    if (hasLanguage?.length === 2) {
      setLanguage({ language: hasLanguage })
      setCookie("lang", hasLanguage, 7);

    } else {
      setLanguage({ language: "en" })
      setCookie("lang", "en", 7);

    }
    //if user close browser initialize localstorage
    const handleBeforeUnload = () => {
      localStorage.removeItem("langIndex"); // remove an item from local storage
      localStorage.removeItem("appData"); // remove an item from local storage
      localStorage.removeItem("language"); // remove an item from local storage
      localStorage.removeItem("direction"); // remove an item from local storage
      localStorage.removeItem("path"); // remove an item from local storage
      // Dynamically inject the termsReducer when this component mounts

    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };

  }, [])


  //when we r on payment page and change lang twice then go back with browser then our content changes
  useEffect(() => {
    setLanguage({ language: hasLanguage !== 'en' ? hasLanguage : langAtrribute, hydrate: false })
  }, [langAtrribute])


  return (
    <Provider store={store}>
      <main className={dmsans.className}>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
const makestore = () => store;
const wrapper = createWrapper(makestore);


MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  //language congiguration based on the url (http://localhost:3500/it/gatwick-taxi-prices  if he pres enter we get lang)
  let lang = checkLanguageAttributeOntheUrl(ctx?.req?.url)
  let appDataInitial = store.getState().initialReducer?.appData
  let paymentTypesInitial = store.getState().initialReducer?.paymentTypes

  // Fetch app data and payment types only if not already fetched
  if (!appDataInitial || !paymentTypesInitial) {

    // Fetch app data and payment types
    const paymentUrl = `${env.apiDomain}/api/v1/payment-types`;
    const appDataUrl = `${env.apiDomain}/app/${lang?.length === 2 ? lang : 'en'}`; // Use the preferred language if available, otherwise default to English
    const urls = [paymentUrl, appDataUrl];

    let response = await Promise.all(urls.map(async url => {
      let resp = await fetch(url);
      return resp.json();
    }));

    appDataInitial = response[1];
    paymentTypesInitial = response[0].data;

    // Dispatch values to Redux store
    store.dispatch({ type: "GET_APP_DATA", data: { appData: appDataInitial, paymentTypes: paymentTypesInitial, }, });
  }

  return { pageProps: { ...pageProps, appData: appDataInitial, hasLanguage: lang || "en", } }

});
export default wrapper.withRedux(MyApp);
/*
 if (hydrate) {
        dispatch({ type: "SET_NEW_APPDATA", data: appData, initialStateReducer: store.getState().initialReducer })
        console.log("hydrate");

      } else {
      const appDataUrl = `${env.apiDomain}/app/${language}`; // Use the preferred language if available, otherwise default to English
      const response = await fetch(appDataUrl);
      const appDatass = await response.json();

      // Dispatch values to Redux store
      dispatch({ type: "SET_NEW_APPDATA", data: appDatass, initialStateReducer: store.getState().initialReducer })
      console.log("not hydrate");

      }
*/