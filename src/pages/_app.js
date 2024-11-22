import { mobileAndTabletCheck } from '../helpers/mobileAndTabletCheck';
import { createWrapper } from "next-redux-wrapper";
import { Provider, useDispatch, } from "react-redux";
import React, { useCallback, useEffect } from "react";
import store from "../store/store";
import "../styles/global.scss";
import Error404 from './404/index'
import { useRouter } from 'next/router';
import { checkLanguageAttributeOntheUrl } from '../helpers/checkLanguageAttributeOntheUrl';
import localFont from '@next/font/local';
import { getCookie, setCookie } from '../helpers/cokieesFunc';
import { fetchAllLanguagesAppDatas } from '../helpers/fetchAllLanguagesAppDatas';
import { fetchConfig, } from '../resources/getEnvConfig';
const myFont = localFont({ src: '../../public/googleFonts/92zatBhPNqw73oTd4g.woff2' })

export const MyApp = ({ Component, pageProps }) => {

  const router = useRouter()
  //next js doesnt allow addd ? in the redirect or next config.js so i considered redirect here
  if (router.asPath === "/Search.asp?q=%7Bsearch_term_string%7D" || router.asPath === "/js/chat_widget.js?112") {
    router.push("/")
    window.location.replace("/");
  }

  //localhost:3500//test
  // Check if 'asPath' contains two or more consecutive slashes
  // If it does, return an error or handle it as needed
  if (/\/{2,}/.test(router.asPath)) return <Error404 />

  const dispatch = useDispatch()
  //it comes from index js serVerSide props
  const { store, props } = wrapper.useWrappedStore(pageProps);
  let { hasLanguage, appData } = props//has language used for when user comes it write lcalhost:3000/tr


  const setLanguage = useCallback(async (params = {}) => {
    let { language, } = params;


    let allAppDatas = JSON.parse(sessionStorage.getItem('allAppDatas'))

    if (language.length === 2 && allAppDatas) {
      dispatch({ type: "SET_NEW_APPDATA", data: allAppDatas?.[language] ? allAppDatas?.[language] : allAppDatas?.["en"], initialStateReducer: store.getState().initialReducer })
    } else {
      //ilk basda tek sefer calisicak sonra yukarisi calisir
      dispatch({ type: "SET_NEW_APPDATA", data: appData, initialStateReducer: store.getState().initialReducer })

    }
    let index
    appData?.languages.map((item, idx) => (language === item.value) ? index = idx : idx)
    let direction = language === 'ar' ? "rtl" : "ltr"
    localStorage?.setItem("direction", JSON.stringify(direction));
    const exists = appData?.languages?.some(lang => lang.value === language);

    dispatch({ type: "SET_NEW_LANGUAGE", data: { languageKey: exists ? language : "en", direction, langIndex: index } })

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


        if (!pageProps.env.websiteDomain.includes("localhost")) {
          try {
            fetch(`${!pageProps.env.apiDomain}/tools/add-error-logs`, requestOptions)
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
      localStorage.removeItem("appData"); // remove an item from local storage
      localStorage.removeItem("direction"); // remove an item from local storage
      localStorage.removeItem("path"); // remove an item from local storage

      // Dynamically inject the termsReducer when this component mounts

    };
    fetchAllLanguagesAppDatas()

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };

  }, [])


  //when we r on payment page and change lang twice then go back with browser then our content changes
  useEffect(() => {
    const language = getCookie("lang")
    //when cahnge on home page language then click browser back btn we update language vai  first condirtione
    if (language !== router.asPath.split("/")[1] && router.asPath.split("/")[1].length === 2) {
      setCookie("lang", router.asPath.split("/")[1], 7);
      setLanguage({ language: router.asPath.split("/")[1], hydrate: false })
    }
    else {
      setLanguage({ language: hasLanguage !== 'en' ? hasLanguage : language, hydrate: false })
    }

  }, [router.asPath])



  return (<Provider store={store}>
    <main style={{ fontFamily: myFont.style.fontFamily,}} id="general_main_container" >
      <Component {...pageProps} />
    </main>
  </Provider>);
}
const makestore = () => store;
const wrapper = createWrapper(makestore);



MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async ({ Component, ctx }) => {

  const env = await fetchConfig();

  let pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  //language congiguration based on the url (http://localhost:3500/it/gatwick-taxi-prices  if he pres enter we get lang)
  let lang = checkLanguageAttributeOntheUrl(ctx?.req?.url)
  let appDataInitial = store.getState().initialReducer?.appData
  let paymentTypesInitial = store.getState().initialReducer?.paymentTypes
  // Pathname kontrolü
  const excludePaths = ['/news', '/blog'];
  const isExcluded = excludePaths.some((path) => ctx?.req?.url.toLowerCase().startsWith(path));

  // Fetch app data and payment types
  if (ctx?.req?.url) {
    const paymentUrl = `${env.apiDomain}/api/v1/payment-types`;

    const appDataUrl = `${env.apiDomain}/app/${lang?.length === 2 ? lang : 'en'}`; // Use the preferred language if available, otherwise default to English
    const urls = [paymentUrl, appDataUrl];
    let response = await Promise.all(urls.map(async url => {
      let resp = await fetch(url);
      return resp.json();
    }));

    appDataInitial = response[1];
    paymentTypesInitial = response[0].data;

    if (isExcluded) {
      // Eğer rota /News veya /blog ile başlıyorsa verileri null yap
      store.dispatch({ type: "GET_APP_DATA", data: { appData: null, paymentTypes: null, } });
    } else {
      // Dispatch values to Redux store
      store.dispatch({ type: "GET_APP_DATA", data: { appData: appDataInitial, paymentTypes: paymentTypesInitial, } });
    }

  }

  if (isExcluded) {
    pageProps = { hasLanguage: "en", appData: null, paymentTypes: null, }
  } else {
    pageProps = { appData: appDataInitial, hasLanguage: lang || "en", env, }
  }
  return { pageProps: { ...pageProps, } };

});
export default wrapper.withRedux(MyApp);
