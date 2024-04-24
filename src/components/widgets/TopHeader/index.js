import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import logoImage from '../../../../public/logos/square_dark_blue.webp'
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import env from "../../../resources/env";
import store from "../../../store/store";
import { useRouter } from "next/router";
import { extractLanguage } from "../../../helpers/extractLanguage";
import OutsideClickAlert from "../../elements/OutsideClickAlert";
import { useWindowSize } from "../../../hooks/useWindowSize";
import dynamic from 'next/dynamic'
import { setCookie } from "../../../helpers/cokieesFunc";
const TopHeaderWhiteLeftButtons = dynamic(() => import('../../elements/TopHeaderWhiteLeftButtons'),);
const DropDownAllLanguages = dynamic(() => import('../../elements/DropDownAllLanguages'),);
const MobileMenu = dynamic(() => import('../../elements/MobileMenu'),);
const DesktopMenu = dynamic(() => import('../../elements/DesktopMenu'),);
const Header = () => {

  const router = useRouter()
  const dispatch = useDispatch()
  const { appData } = useSelector(state => state.initialReducer)
  const { params: { language, langIndex: reducerLangIndex, journeyType } } = useSelector(state => state.pickUpDropOffActions)
  const [langFlag, setLangFlag] = useState(language)
  const [langIndex, setLangIndex] = useState(reducerLangIndex)

  const [openMenu, setOpenMenu] = useState(false) //mobile
  const [languageStatus, setLanguageStatus] = useState(false)

  const handleLanguage = async (params = {}) => {
    let { e, text, key, direction, index } = params
    setCookie("lang", key, 7);
    setLangFlag(key)
    setLangIndex(index)
    //set language and dicertion  to localstorage
    localStorage.setItem("language", JSON.stringify(key));
    localStorage.setItem("direction", JSON.stringify(direction));
    localStorage.setItem("langIndex", JSON.stringify(index));
    try {
      let response = await fetch(`${env.apiDomain}/app/${key}`)
      let data = await response.json()
      if (data.status === 200) {
        dispatch({ type: "SET_NEW_LANGUAGE", data: { languageKey: key, direction, langIndex: index } })
        //passing inital state in order make update in store js when language changing
        dispatch({ type: "SET_NEW_APPDATA", data, initialStateReducer: store.getState().initialReducer })
      } else {
        //if sth wrong it means we can use en for dont crush our website
        let response = await fetch(`${env.apiDomain}/app/en`)
        let data = await response.json()
        dispatch({ type: "SET_NEW_LANGUAGE", data: { languageKey: key, direction, langIndex: index } })
        //passing inital state in order make update in store js when language changing
        dispatch({ type: "SET_NEW_APPDATA", data, initialStateReducer: store.getState().initialReducer })
      }
    } catch (error) {
      let message = "AIRPORT-PICK-UP-LONDON  handleLanguage function Top HeaderComponent"
      window.handelErrorLogs(error, message, { url: `${env.apiDomain}/app/${key}` })
    }
    //url configuration based on language we select
    let checkTheUrlIfLangExist = extractLanguage(router.asPath) //tr es or it
    //to be sure that selected language is exist among languages or not
    let hasEn = appData?.languages.some((language) => language.value === checkTheUrlIfLangExist);
    if (checkTheUrlIfLangExist && hasEn) {
      //if length is 3 it means we r in the taxi deaals
      let replacedString = `${key === "en" ? "" : key}${router.asPath.length === 3 ? "" : "/"}`

      let url = router.asPath.replace(/^\/([a-z]{2})\/?/i, replacedString)
      //tr|it|sp/transfer-details...  replacing withh
      url = `/${url}`
      router.push(url);
    }
    else {
      //then when ever i change language i will add tr it ar
      //if it is english then  we dont need lang atrribute=>>>>>     /transfer-details...
      let url = `/${key === "en" ? "" : key}${router.asPath}`
      router.push(url);
    }
    //make hidden language dropdown in mobile menu After clicking
    setLanguageStatus(!languageStatus)
  }

  const toggleMenu = () => {
    // menuRef.current.classList.toggle(`${styles.menuActive}`);
    // mobileMenu?.current?.classList.toggle(`${styles.active_header_content_menu_mobile}`);

    setOpenMenu(!openMenu)
    // let positionOfBody = getComputedStyle(document.body).position
    // if (positionOfBody === "relative") {
    //   document.body.style.position = "fixed"
    // } else {
    //   document.body.style.position = "relative"
    // }

    const navLinks = document.querySelectorAll('#navLink');

    // setTimeout(() => {
    //   //Animate Links
    //   navLinks.forEach((link, index) => {
    //     if (link.style.animation) {
    //       link.style.animation = ''
    //     } else {
    //       link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 1.3}s`;
    //     }
    //   });
    // }, 1000);
  }
  //!bu fonksyonu yazmayada bilersen Asagidaki degisdirildi yazilan yeri oxu A tagi icinde yazila biler
  // const gotoHomePage = (index) => {
  //   if (index === 0) {
  //     if (language === 'en') {
  //       router.push(`/`).then(() => { window.location.reload() });
  //     } else {
  //       router.push(`/${language}`).then(() => { window.location.reload() });
  //     }
  //   }
  // }
  //for language dropdown
  const outsideClickDropDown = useCallback((e) => {
    setLanguageStatus(!languageStatus);
  }, [languageStatus]);

  //when we click lang text it opens dropdown
  const setOpenLanguageDropdown = (e) => {

    // prevent to open dropdown
    if (router.asPath === "/drivers-wanted") return


    setLanguageStatus(!languageStatus)

  }

  const handleClickNavLinkMobileMenuList = useCallback((params = {}) => {
    let { hasTaxiDeals = 'heathrow' } = params;
    if (hasTaxiDeals) {
      dispatch({ type: "SET_NAVBAR_TAXI_DEALS", data: { hasTaxiDeals } });
    }
    // dispatch({ type: "RESET_SELECTED_POINTS", data: { journeyType } })
    toggleMenu();
  }, [dispatch, journeyType, toggleMenu]);

  const handleClickNavLinkMobileMenuNotList = useCallback(({ index }) => {
    if (index === 0) {
      dispatch({ type: "RESET_SELECTED_POINTS", data: { journeyType } });
      dispatch({ type: "SET_NAVBAR_TAXI_DEALS", data: { hasTaxiDeals: "heathrow" } });
    }
    toggleMenu();
  }, [dispatch, journeyType, toggleMenu]);


  let size = useWindowSize();
  let { width } = size

  useEffect(() => {
    if ((localStorage?.getItem("language"))) {
      let langKey = JSON.parse(localStorage.getItem("language"))
      appData?.languages.map((item, index) => {
        let { value: key, } = item
        if (langKey === key) {
          setLangFlag(key)
          setLangIndex(index)
        }
      })
    }
  }, [language])

  return (
    <header className={styles.header} id="navbar_container" >
      <div className={styles.header_container}>
        <div className={styles.header_flex_div}>
          <div className={styles.left_items}>
            <div className={styles.left_items_flex_div}>
              <a href={language === 'en' ? '/' : `/${language}`} className={`${styles.logo_tag}`}  >
                <Image src={logoImage} alt="Airport-pickups-london Logo" width={30} height={30} priority />
                <span>Airport Pickups London</span>
              </a>
              {width > 1200 ? <DesktopMenu appData={appData} journeyType={journeyType} language={language} /> : <></>}
              {/* mobile  */}
              {openMenu ?
                <MobileMenu openMenu={openMenu} handleClickNavLinkMobileMenuNotList={handleClickNavLinkMobileMenuNotList} language={language} handleClickNavLinkMobileMenuList={handleClickNavLinkMobileMenuList} appData={appData} />
                : <></>}
            </div>
          </div>

          <div className={styles.right_items}>
            {/* eliminate cursor  */}
            <div className={`${styles.language_dropdown}`} style={{ cursor: `${router.asPath === "/drivers-wanted" ? " default" : ""}` }}>
              <div className={styles.top} >
                <div className={styles.img_div} onClick={setOpenLanguageDropdown} data-name="language">
                  <Image src={`/languages/${langFlag}.gif`} width={20} height={11} priority alt={langFlag} data-name="language" />
                </div>
                <span data-name="language" onClick={setOpenLanguageDropdown} className={styles.lang_text}>
                  {appData?.languages[langIndex]?.innerText}
                  {router.asPath === "/drivers-wanted" ? <></> : <i className="fa-solid fa-angle-down"></i>}
                </span>
                {languageStatus ?
                  <OutsideClickAlert onOutsideClick={outsideClickDropDown}>
                    <DropDownAllLanguages languageStatus={languageStatus} handleLanguage={handleLanguage} />
                  </OutsideClickAlert> : <></>}
              </div>
            </div>

            {width > 1200 ? <TopHeaderWhiteLeftButtons language={language} appData={appData} /> : <></>}
            <div onClick={toggleMenu} className={`${styles.menu}`} id="menu"   >
              {!openMenu ? <i className="fa-solid fa-bars"></i> : <i className="fa-solid fa-xmark"></i>}
            </div>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;
