import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../elements/Select/styles.module.scss"
const FlightWaitingTimeContent = () => {

    const { appData } = useSelector(state => state.pickUpDropOffActions)
    //cartypes object for card item as {1:{image:'sds, name:Economy}}
    const [content, setContent] = useState("")
    useEffect(() => {
        let foundMatch = false;

        console.log({ a: appData?.words["seParkingNote"] });

        if (appData?.words["seParkingNote"]) {
            setContent(appData?.words["seParkingNote"]);
            foundMatch = true;
        }

        if (!foundMatch) setContent("");

    }, [appData])

    return content ?
        <div className={styles.content_div}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div> : <></>

}

export default FlightWaitingTimeContent