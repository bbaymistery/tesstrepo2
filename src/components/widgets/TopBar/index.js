/* eslint-disable @next/next/no-html-link-for-pages */
import styles from "./styles.module.scss";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToggleSideBar } from "../../../store/showFieldReducer/showFieldSelectors";
import { SET_ACTIVELINK_ID, TOGGLE_SIDE_BAR } from "../../../store/showFieldReducer/showFieldTypes";
import { useRouter } from "next/router";
import { logoutuser } from "../../../store/authReducer/authAction";
import { getWindowDimensions } from "../../../helpers/windowDimension";
import Image from "next/image";
import logoImage1 from '../../../../public/logos/noBgLogo.png';

const TopBar = ({ pageUrl }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectToggleSideBar = useSelector(ToggleSideBar);

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const menuRef = useRef(null);

  const isSpecialPage = ['/account-users', '/my-bookings', '/quotation', '/transfer-details', "/payment"].includes(pageUrl);
  const isMobile = windowDimensions.width < 990;

  const toggleSideBar = () => {
    menuRef.current.classList.toggle(styles.menuActive);
    dispatch({ type: TOGGLE_SIDE_BAR, payload: !selectToggleSideBar });
  };

  const logout = () => dispatch(logoutuser(router));
  const changeActiveLink = () => dispatch({ type: SET_ACTIVELINK_ID, payload: 1 });

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderAPLLogo = () => (
    <picture className={styles.picture_desktop}>
      <source srcSet="/images/aplLogo.png" type="image/png" />
      <img src="/images/aplLogo.png" alt="APL logo" />
    </picture>
  );

  const renderLogoText = () => (
    <p>
      <span>Airport Pickups London</span>
      <span>Agency Login</span>
    </p>
  );

  const renderFullLogo = (width = 290) => (
    <Image src={logoImage1} alt="Airport-pickups-london Logo" width={width} height={30} priority />
  );

  const renderLeftLogo = () => {
    if (isMobile) {
      // ✅ Step 1: Mobile + Sidebar Closed
      if (selectToggleSideBar) {
        return (
          <div className={styles.close_navbar_brand_box} data="step1">
            <a href="/new-booking" onClick={changeActiveLink}>
              {renderAPLLogo()}
            </a>
          </div>
        );
      }
      // ✅ Step 2: Mobile + Sidebar Opened
      return (
        <div className={styles.navbar_brand_box} data="step2">
          <a href="/new-booking" onClick={changeActiveLink}>
            <span className={styles.logo_tag}>{renderFullLogo(280)}</span>
          </a>
        </div>
      );
    }

    // Desktop Mode
    if (!selectToggleSideBar) {
      // ✅ Step 3: Desktop + Sidebar Opened
      return (
        <div className={styles.navbar_brand_box} data="step3">
          <a href="/new-booking" onClick={changeActiveLink}>
            {isSpecialPage ? (
              <span className={`${styles.logo_tag} cursor_pointer`}>
                {renderFullLogo()}
              </span>
            ) : (
              <>
                {renderAPLLogo()}
                {renderLogoText()}
              </>
            )}
          </a>
        </div>
      );
    }

    // ✅ Step 4: Desktop + Sidebar Closed
    return (
      <div className={styles.navbar_brand_box} data="step4">
        <a href="/new-booking" onClick={changeActiveLink}>
          <span className={`${styles.logo_tag} cursor_pointer`}>
            {renderFullLogo()}
          </span>
          {/* <span>Home</span> */}
        </a>
      </div>
    );
  };

  return (
    <div className={styles.topbar}>
      <div className={styles.navbar_header} id="navbar_container">
        <div className={styles.left}>
          {renderLeftLogo()}
          {isMobile && (
            <button type="button" id="vertical-menu-btn" onClick={toggleSideBar} className={`btn ${styles.visible_btn}`}   >
              <div ref={menuRef} className={styles.menu}>
                <span className={styles.line}></span>
                <span className={styles.line}></span>
                <span className={styles.line}></span>
              </div>
            </button>
          )}
        </div>

        {(!isMobile || selectToggleSideBar) && (
          <div className={styles.right}>
            <button className={`${styles.logout_button} btn`} onClick={logout}>
              <span>Logout</span>
              <i className="fa-solid fa-chevron-down"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
