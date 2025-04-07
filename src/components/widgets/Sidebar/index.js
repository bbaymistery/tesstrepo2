import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { sidebarLinks } from "../../../constants/sidebar";
import { getWindowDimensions } from "../../../helpers/windowDimension";
import { ActiveLinkId, ToggleSideBar } from "../../../store/showFieldReducer/showFieldSelectors";
import { SET_ACTIVELINK_ID, TOGGLE_SIDE_BAR } from "../../../store/showFieldReducer/showFieldTypes";
const Sidebar = ({ pageUrl }) => {
  const dispatch = useDispatch();
  const selectActiveLinkId = useSelector(ActiveLinkId);
  const selectToggleSideBar = useSelector(ToggleSideBar);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    //half menu will be activated when the page url equal as below
    if (windowDimensions.width > 990 && (pageUrl === "/my-bookings" || pageUrl === "/account-users")) {
      dispatch({ type: TOGGLE_SIDE_BAR, payload: true });
    }
  }, [pageUrl, dispatch, windowDimensions.width]);

  const isSpecialPage = pageUrl === '/my-bookings' || pageUrl === "/account-users" || pageUrl === "/quotation" || pageUrl === "/transfer-details" || pageUrl === "/payment";
  const isMobile = windowDimensions.width < 990;


  const changeActiveLink = (id) => {
    if (id !== 9) {
      dispatch({ type: SET_ACTIVELINK_ID, payload: id === 8 ? selectActiveLinkId : id });
    }
  };

  const chancgeAndClose = (id) => {
    changeActiveLink(id);
    dispatch({ type: TOGGLE_SIDE_BAR, payload: !selectToggleSideBar });
  };

  const renderLinkContent = (link, index) => {
    const animationDelay = `${0.1 * (index + 1)}s`;
    const isTargetBlank = link.name === "Account Bookings" ? "_blank" : "_self";
    return (
      //target={link.name === "Contact Us" ? "_blank" : "_self"}
      <a target={isTargetBlank} style={{ animationDelay }} className={`${selectToggleSideBar ? "bottom_to_top_animation2" : "bottom_to_top_animation2"}`} href={link.url} rel="noreferrer">
        <span>
          {link.icon}
          <span>{link.name}</span>
        </span>
        {isSpecialPage && selectToggleSideBar ? <span style={{ animationDelay }} className="bottom_to_top_animation1" data-tooltip={link.name}> {link.icon}   </span> : <></>}

      </a>
    );
  };

  const renderLinkList = (onClickHandler) => (
    <ul className={`${styles.ul_menu}`}>
      <li className={`${styles.menu_title}`}>
        <span>Menu</span>
        {isSpecialPage && !isMobile && <i onClick={() => dispatch({ type: TOGGLE_SIDE_BAR, payload: !selectToggleSideBar })} className={`fa-sharp fa-solid fa-arrow-${selectToggleSideBar ? "right" : "left"}`}></i>}
      </li>
      {sidebarLinks.map((link, index) => {
        const animationDelay = `${`${index === 0 ? 0.2 : 0.1}` * (index + 1)}s`;
        return <li style={{ animationDelay }} key={index} className={`${selectToggleSideBar ? "" : "bottom_to_top_animation2"} ${link.id === selectActiveLinkId ? styles.active : ""}`} onClick={() => onClickHandler(link.id)} >
          {renderLinkContent(link, index)}
        </li>
      })}
    </ul>
  );

  return (
    <div className={`${styles.sidebar} ${isSpecialPage && selectToggleSideBar ? styles.closeHalf : ""} ${isMobile && selectToggleSideBar && !isSpecialPage ? styles.closeSideBar : ""}`}>
      {isMobile ? renderLinkList(chancgeAndClose) : renderLinkList(changeActiveLink)}
    </div>
  );
};

export default Sidebar;
