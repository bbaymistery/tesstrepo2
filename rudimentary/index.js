import React from 'react'
import { useSelector } from 'react-redux'
import styles from "./styles.module.scss"

const indexPage = (props) => {
    let { bggray } = props
    const state = useSelector(state => state.pickUpDropOffActions)
    let { params: { direction } } = state

    let description = ""
    let title = ""
    let keywords = ""

    return (
        <GlobalLayout keywords={keywords} title={title} description={description}>
            <div className={`${styles.indexx} ${direction} page`} bggray={String(bggray === "true")}>
                <div className={`${styles.indexx_section} page_section`}>
                    <div className={`${styles.indexx_section_container} page_section_container`}>
                        <div className={styles.title}>
                            <h1>Why Choose Us</h1>
                            <p>These popular destinations have a lot to offer</p>
                        </div>




                    </div>
                </div>
            </div>
        </GlobalLayout>
    )
}

export default indexPage