
import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import styles from "./styles.module.scss";

const PointsModal = ({ points, title }) => {
    const wrapperRef = useRef();
    const dispatch = useDispatch()
    const { appData } = useSelector(state => state.initialReducer)
    let clickedOutside = useOutsideClick(wrapperRef);

    const setToFalse = () => {
        dispatch({ type: "SET_POINTS_MODAL", data: { trueOrFalse: false } });
        document.body.style.overflow = "unset";
    };
    const observerCallback = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("loaded");
                entry.target.classList.remove("loadinUp");
            }
            else {
                // to fade out images out of the viewport
                entry.target.classList.add("loadinUp");
                entry.target.classList.remove("loaded");
            }
        });
    }
    // Load More
    useEffect(() => {
        const allList = document.querySelectorAll(".li_item");
        allList.forEach((el) => { el.classList.add("loadin") });
        const observerOptions = { root: null, rootMargin: "10px", threshold: 0 };
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        allList.forEach((el) => observer.observe(el));
    }, [])
    useEffect(() => {
        if (clickedOutside) {
            dispatch({ type: "SET_POINTS_MODAL", data: { trueOrFalse: false } });
            document.body.style.overflow = "unset";
        }
    }, [clickedOutside])


    return (
        <div className={styles.modal}>
            <div className={styles.main_container} ref={wrapperRef}>
                <div>
                    <i onClick={() => setToFalse()} className={`fa-sharp fa-solid fa-xmark ${styles.icon}`}></i>
                </div>
                <h3>
                    {title}
                </h3>
                <ul>
                    {points?.map((point, index) => {
                        return <a href={point.pathname} key={index}>
                            <li className='li_item' >
                                <span className={styles.title}>{point?.translatedPageTitle ? point?.translatedPageTitle : point?.title}</span>
                                <span className={styles.start_from}>{appData.words["strStartFrom"]} <span className={styles.price}>{point.price}</span>  </span>
                            </li>
                        </a>
                    })}

                </ul>
            </div>
        </div>
    )
}

export default PointsModal