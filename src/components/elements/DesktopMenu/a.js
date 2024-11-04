import React, { useState } from 'react';
import { navigator } from '../../../constants/navigatior';
import { useDispatch } from 'react-redux';
import styles from "./styles.module.scss";
import { useRouter } from 'next/router';

const DesktopMenu = ({ language, journeyType, appData }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [openDropdown, setOpenDropdown] = useState(null);

    const handleItemClick = (path, hasTaxiDeals) => {
        dispatch({ type: "SET_NAVBAR_TAXI_DEALS", data: { hasTaxiDeals } });
        dispatch({ type: "RESET_SELECTED_POINTS", data: { journeyType } });
        router.push(`${language === 'en' ? `${path}` : `/${language}${path}`}`);
        setOpenDropdown(null); // Close dropdown after clicking
    };

    const toggleDropdown = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    return (
        <div className={styles.header_menu_content}>
            <ul>
                {navigator.map((item, index) => {
                    const { path, innerText, list, type, title, strInnerText } = item;
                    const isListType = type === "list";
                    const isOpen = openDropdown === index;

                    return (
                        <li
                            key={innerText}
                            className={`${styles.li_item} ${isListType ? styles.has_children : ""}`}
                            onClick={() =>  toggleDropdown(index)}
                        >
                            <a
                                href={language === 'en' ? path : `/${language}${path}`}
                                title={appData?.words[title]}
                                className={`${path.length ? styles.nocursor : ""}`}
                            >
                                <span>{appData?.words[strInnerText]}</span>
                                {isListType && <i className="fa-solid fa-angle-down"></i>}
                            </a>

                            {isListType && (
                                <ul
                                    className={`${styles.hoverUl} ${isOpen ? styles.visible : ""}`}
                                >
                                    {list.map((subItem) => {
                                        const { path: listPath, innerText: listInnerText, title: listTitle, hasTaxiDeals, strInnerText } = subItem;

                                        return (
                                            <li
                                                key={strInnerText}
                                                className={styles.li_item}
                                                onClick={() => handleItemClick(listPath, hasTaxiDeals)}
                                            >
                                                <p title={appData?.words[listTitle]}>
                                                    <span>{appData?.words[strInnerText]}</span>
                                                </p>
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
    );
};

export default DesktopMenu;
