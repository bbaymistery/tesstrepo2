import React, { useEffect, useRef, useState } from "react";
import {
  headerLinkNames,
  heathrowTransferDealsLinkNames,
} from "../../../constants/headerLinkNames/index.js";
import styles from "./styles.module.scss";
import { selectActiveLink } from "../../../store/pickUpDropOffReducer/pickUpDropSelectors.js";
import { useSelector } from "react-redux";
import { useRouter } from "next/router.js";
const Header = () => {
  const navRef = useRef(null);
  const activeLinkSelected = useSelector(selectActiveLink);
  const router = useRouter()

  const menuRef = useRef(null);
  const [activeClass, setActiveClass] = useState(false);
  const [animationDrop, setAnimationDrop] = useState(false);
  //
  const toggleMenu = () => {
    setActiveClass(!activeClass);
    setAnimationDrop(false);
    navRef.current.style.setProperty(
      "--childenNumber",
      `${animationDrop
        ? navRef.current.children.length + 2
        : navRef.current.children.length
      }`
    );
    menuRef.current.classList.toggle(`${styles.menuActive}`);
  };

  const openOrCloseDropDown = (e) => {
    setAnimationDrop((prev) => !prev);
  };

  useEffect(() => {
    if (window.width < 990) {
      navRef.current.style.setProperty(
        "--childenNumber",
        `${animationDrop
          ? navRef.current.children.length + 3.6
          : navRef.current.children.length
        }`
      );
    }
  }, [animationDrop]);



  return (
    <div className={styles.nav_container} id="navbar_container">
      <nav className={styles.nav}>
        <div className={styles.logoDiv}>
          <a href="/">
            <p className={styles.logo}>Menu</p>
          </a>
        </div>
        <div className={`${styles.ulDiv} ${styles.ulDiv_desktop}`}>
          <ul id="nav" className={`${styles.ul} `} >
            {/* position absolute olan sagda bakground oran olan icon */}
            <i
              onClick={openOrCloseDropDown}
              className={`fa-solid fa-angle-down ${styles.fa_icon} ${animationDrop && styles.rotatedIcon
                } `}
            ></i>
            {headerLinkNames?.map((item, i) => {
              return (
                <li key={item.id} className={`${styles.li_item} ${item.linkUrl === router.pathname && styles.active} ${i === 1 ? styles.hoverlayItem : ""}`} >
                  <a href={item.linkUrl} id={`linkUrl_${i}`} className={`${styles.firstItem} ${styles.item} ${item.id === 6 ? "manage-booking-a" : ""}`}   >
                    {item.linkName}
                  </a>
                  {/* burda idi faicon */}
                  {i === 1 &&
                    <i
                      onClick={openOrCloseDropDown}
                      className={`
                      fa-solid fa-angle-down
                      ${styles.fa_icon_for_desktop}
                      ${animationDrop && styles.rotatedIcon}
                      ${activeLinkSelected === "heathrow transfer deals"
                          ? "text_white"
                          : ""
                        }
                         `}
                    ></i>
                  }

                  {i === 1 && (
                    <ul className={styles.hoverUl}>
                      {heathrowTransferDealsLinkNames?.map((item) => {
                        return (
                          <li className={`   ${item.linkName === activeLinkSelected && styles.active}`} key={item.id}    >
                            <a href={item.linkUrl}>  {` ${item.linkName.split(" ")[0]}  ${item.linkName.split(" ")[1]} `}  <br />  {`${item.linkName.split(" ")[2]}`}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {i === 1 && (
                    <ul style={{ height: `${animationDrop ? "140px" : "0px"}`, visibility: `${animationDrop ? "visible" : "hidden"}`, opacity: `${animationDrop ? 1 : 0}`, display: `${!animationDrop ? "none" : "block"}`, }} className={` ${styles.forMobileHover}`}   >
                      {heathrowTransferDealsLinkNames.map((item) => {
                        return (
                          <li className={` ${item.linkName === activeLinkSelected && styles.active}`} key={item.id}   >
                            <a href={item.linkUrl}>{item.linkName}</a>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={`${styles.ulDiv}  ${styles.ulDiv_mobile}`}>
          <ul id="nav" className={`${styles.ul} ${activeClass ? styles.ulActive : "false"}`} style={{ borderBottom: `${activeClass ? "2px solid #ed8323" : "none"}`, }} ref={navRef}   >
            {/* position absolute olan sagda bakground oran olan icon */}
            {activeClass ? <i
              onClick={openOrCloseDropDown}
              className={`fa-solid fa-angle-down ${styles.fa_icon} ${animationDrop && styles.rotatedIcon
                } `}
            ></i> : <></>}
            {
              activeClass ?
                headerLinkNames?.map((item, i) => {
                  return (
                    <li key={item.id} className={`${styles.li_item} ${item.linkUrl === router.pathname && styles.active} ${i === 1 ? styles.hoverlayItem : ""}`} >
                      <a href={item.linkUrl} id={`linkUrl_${i}`} className={`${styles.firstItem} ${styles.item} ${item.id === 6 ? "manage-booking-a" : ""}`}   >
                        {item.linkName}
                      </a>
                      {/* burda idi faicon */}
                      {i === 1 && (
                        <i
                          onClick={openOrCloseDropDown}
                          className={`
                      fa-solid fa-angle-down
                      ${styles.fa_icon_for_desktop}
                      ${animationDrop && styles.rotatedIcon}
                      ${activeLinkSelected === "heathrow transfer deals"
                              ? "text_white"
                              : ""
                            }
                         `}
                        ></i>
                      )}

                      {i === 1 && (
                        <ul className={styles.hoverUl}>
                          {heathrowTransferDealsLinkNames?.map((item) => {
                            return (
                              <li className={`   ${item.linkName === activeLinkSelected && styles.active}`} key={item.id}    >
                                <a href={item.linkUrl}>  {` ${item.linkName.split(" ")[0]}  ${item.linkName.split(" ")[1]} `}  <br />  {`${item.linkName.split(" ")[2]}`}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                      {i === 1 && (
                        <ul style={{ height: `${animationDrop ? "140px" : "0px"}`, visibility: `${animationDrop ? "visible" : "hidden"}`, opacity: `${animationDrop ? 1 : 0}`, display: `${!animationDrop ? "none" : "block"}`, }} className={` ${styles.forMobileHover}`}   >
                          {heathrowTransferDealsLinkNames.map((item) => {
                            return (
                              <li className={` ${item.linkName === activeLinkSelected && styles.active}`} key={item.id}   >
                                <a href={item.linkUrl}>{item.linkName}</a>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })
                : <></>
            }
          </ul>
        </div>



        <div onClick={toggleMenu} ref={menuRef} className={styles.menu} id="menu">
          <span className={styles.line}></span>
          <span className={styles.line}></span>
          <span className={styles.line}></span>
        </div>
      </nav>
    </div>
  );
};

export default Header;
