import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import logoImage from '../../../../public/logos/square_dark_blue.webp'
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { extractLanguage } from "../../../helpers/extractLanguage";
import OutsideClickAlert from "../../elements/OutsideClickAlert";
import { useWindowSize } from "../../../hooks/useWindowSize";
import dynamic from 'next/dynamic'
import { setCookie } from "../../../helpers/cokieesFunc";
import store from "../../../store/store";
const TopHeaderWhiteLeftButtons = dynamic(() => import('../../elements/TopHeaderWhiteLeftButtons'),);
const DropDownAllLanguages = dynamic(() => import('../../elements/DropDownAllLanguages'),);
const MobileMenu = dynamic(() => import('../../elements/MobileMenu'),);
const DesktopMenu = dynamic(() => import('../../elements/DesktopMenu'),);
const Header = () => {

  const router = useRouter()
  const dispatch = useDispatch()
  const { params: { language, journeyType, langIndex: reducerLangIndex, } } = useSelector(state => state.pickUpDropOffActions)


  const [openMenu, setOpenMenu] = useState(false) //mobile
  const [languageStatus, setLanguageStatus] = useState(false)
  const { appData } = useSelector(state => state.initialReducer)
  const [translatedAppData, setTranslatedAppData] = useState(appData)

  const handleLanguage = async (params = {}) => {
    let { e, text, key, direction, index } = params
    setCookie("lang", key, 7);
    //set language and dicertion  to localstorage
    localStorage.setItem("direction", JSON.stringify(direction));
    dispatch({ type: "SET_NEW_LANGUAGE", data: { languageKey: key, direction, langIndex: index } })


    let cahceAppData = (JSON.parse(sessionStorage.getItem('allAppDatas')));
    if (cahceAppData) {
      setTranslatedAppData(cahceAppData[key])
      dispatch({ type: "SET_NEW_APPDATA", data: cahceAppData[key], initialStateReducer: store.getState().initialReducer })
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
      url = key === 'en' ? `${url}` : `/${url}`

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

  const toggleMenu = () => setOpenMenu(!openMenu)

  //for language dropdown
  const outsideClickDropDown = useCallback((e) => { setLanguageStatus(!languageStatus); }, [languageStatus]);

  //when we click lang text it opens dropdown
  const setOpenLanguageDropdown = (e) => {
    // prevent to open dropdown
    if (router.asPath === "/drivers-wanted") return
    if (router.asPath === "/sitemap") return
    setLanguageStatus(!languageStatus)
  }

  const handleClickNavLinkMobileMenuList = useCallback((params = {}) => {
    let { hasTaxiDeals = 'heathrow' } = params;
    if (hasTaxiDeals) {
      dispatch({ type: "SET_NAVBAR_TAXI_DEALS", data: { hasTaxiDeals } });
    }
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
              {width > 1200 ? <DesktopMenu appData={translatedAppData} journeyType={journeyType} language={language} /> : <></>}
              {/* mobile  */}
            </div>
          </div>
          {openMenu ?
            <MobileMenu openMenu={openMenu} handleClickNavLinkMobileMenuNotList={handleClickNavLinkMobileMenuNotList} language={language} handleClickNavLinkMobileMenuList={handleClickNavLinkMobileMenuList} appData={translatedAppData} />
            : <></>}

          <div className={styles.right_items}>
            {/* eliminate cursor  */}
            <div className={`${styles.language_dropdown}`} style={{ cursor: `${(router.asPath === "/drivers-wanted" || router.asPath === "/sitemap") ? " default" : ""}` }}>
              <div className={styles.top} >
                <div className={styles.img_div} onClick={setOpenLanguageDropdown} data-name="language">
                  <Image src={`/languages/${language}.gif`} width={20} height={11} priority alt={language} data-name="language" />
                </div>
                <span data-name="language" onClick={setOpenLanguageDropdown} className={styles.lang_text}>
                  {appData?.languages[reducerLangIndex]?.innerText}
                  {(router.asPath === "/drivers-wanted" || router.asPath === "/sitemap") ? <></> : <i className="fa-solid fa-angle-down"></i>}
                </span>
                {languageStatus ?
                  <OutsideClickAlert onOutsideClick={outsideClickDropDown}>
                    <DropDownAllLanguages languageStatus={languageStatus} handleLanguage={handleLanguage} />
                  </OutsideClickAlert> : <></>}
              </div>
            </div>

            {width > 1200 ? <TopHeaderWhiteLeftButtons language={language} appData={translatedAppData} /> : <></>}
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
