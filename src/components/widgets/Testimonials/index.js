import React from 'react'
import { useSelector } from 'react-redux'
import styles from "./styles.module.scss"
const Testimonials = (props) => {
    let { bggray, pageContent } = props
    const state = useSelector(state => state.pickUpDropOffActions)
    let { params: { direction } } = state
    const createMarkup = (htmlString) => { return { __html: htmlString } };
    return (
        <div className={`${styles.testimonials} ${direction} page`} bggray={String(bggray)} style={{ backgroundColor: `${String(bggray) === "true" ? "#f5f5f5" : "white"}` }}>
            <div className={`${styles.testimonials_section} page_section`}>
                <div className={`${styles.testimonials_section_container} page_section_container`}>
                    <div className={styles.dangerous_div} dangerouslySetInnerHTML={createMarkup(pageContent)} />
                </div>
            </div>
        </div>
    )
}

export default Testimonials