import React from 'react'
import { useSelector } from 'react-redux'
import styles from "./styles.module.scss"
const LinkNameDescription = (props) => {
    let { bggray = false, pageContent } = props
    const state = useSelector(state => state.pickUpDropOffActions)
    let { params: { direction, } } = state;
    const createMarkup = (htmlString) => { return { __html: htmlString } };
    return (
        <div className={`${styles.linkname_description_section} ${direction} page`} bggray={String(bggray === "true")}>
            <div className={`${styles.linkname_description_section_section} page_section`}>
                <div className={`${styles.linkname_description_section_section_container} page_section_container`}>
                    <div className={styles.content} dangerouslySetInnerHTML={createMarkup(pageContent)} />
                </div>
            </div>
        </div>
    )
}

export default LinkNameDescription