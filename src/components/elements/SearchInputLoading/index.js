import React from 'react'
import styles from "./styles.module.scss"
const SearchInputLoading = ({ position = "absolute", color1, color2, color3, color4 }) => {
    color1 = color1 || "#fadcce";
    color2 = color2 || "#f6baa0";
    color3 = color3 || "#f29871";
    color4 = color4 || "#ef885a";
    return (
        <div className={styles.lds_ellipsis}>
            <div style={{ backgroundColor: color1, position: position }}></div>
            <div style={{ backgroundColor: color2, position: position }}></div>
            <div style={{ backgroundColor: color3, position: position }}></div>
            <div style={{ backgroundColor: color4, position: position }}></div>
        </div>
    )
}

export default SearchInputLoading