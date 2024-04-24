import React from 'react';
import styles from "./styles.module.scss";
const TaxiDealsContents = (props) => {
        const { pageContent, isVisible } = props;
        return (isVisible ? <div className={styles.description}>  <div dangerouslySetInnerHTML={{ __html: pageContent }}></div></div> : <></>);
};

export default TaxiDealsContents;
