import React, { useState } from 'react'
import { navigator } from '../../../constants/navigatior'
import { useDispatch } from 'react-redux'
import styles from "./styles.module.scss";
import { useRouter } from 'next/router';
const DesktopMenu = ({ language, journeyType, appData, expandedMenu }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [openDropdown, setOpenDropdown] = useState(null);
    const toggleDropdown = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    const onMouseEnter = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };
    const onMouseLeave = () => {
        setOpenDropdown(null);
    }
    return (
        <div className={styles.header_menu_content}>
            <ul>
                {(expandedMenu ? navigator.slice(0, 3) : navigator).map((item, index) => {
                    let { path, innerText, list, type, title, strInnerText } = item
                    return (
                        // as={`${path==='/'?"/":""}`}
                        <li onMouseEnter={() => onMouseEnter(index)} onMouseLeave={() => onMouseLeave(index)} onClick={() => toggleDropdown(index)} key={innerText} className={`${styles.li_item} ${type === "list" ? styles.has_children : ""}`}>
                            {index === 0 ?
                                <a href={language === 'en' ? '/' : `/${language}`} title={appData?.words[title]} className={`${path.length ? styles.nocursor : ""}`} >
                                    <span>{appData?.words[strInnerText]}</span>
                                </a>
                                :
                                <a href={`${language === 'en' ? `${path}` : `/${language}${path}`}`} title={appData?.words[title]} className={`${path.length ? styles.nocursor : ""}`}>
                                    <span>{appData?.words[strInnerText]}</span>
                                    {type === "list" ? <i className="fa-solid fa-angle-down"></i> : ""}
                                </a>
                            }

                            {type === "list" ?
                                <ul className={`${styles.hoverUl} ${openDropdown === index ? styles.visible : onMouseLeave}`} >
                                    {list.map((item) => {
                                        //hasTaxideals setting taxiDealsName to redux
                                        let { path: listPath, innerText: listInnerText, title: listTitle, hasTaxiDeals, strInnerText } = item
                                        //!

                                        return (
                                            <li key={strInnerText} className={`${styles.li_item}`} onClick={
                                                () => {

                                                    dispatch({ type: "SET_NAVBAR_TAXI_DEALS", data: { hasTaxiDeals } });
                                                    dispatch({ type: "RESET_SELECTED_POINTS", data: { journeyType } });
                                                    router.push(`${language === 'en' ? `${listPath}` : `/${language}${listPath}`}`)
                                                }}>
                                                <p

                                                    title={appData?.words[listTitle]}>
                                                    <span>{appData?.words[strInnerText]}</span>
                                                </p>
                                            </li>
                                        )
                                    })
                                    }
                                </ul> : <></>}
                        </li>)
                })}
            </ul>
        </div>
    )
}

export default DesktopMenu