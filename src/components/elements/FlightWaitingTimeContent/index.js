import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../elements/Select/styles.module.scss"
const FlightWaitingTimeContent = () => {

    const { appData } = useSelector(state => state.initialReducer)


    //cartypes object for card item as {1:{image:'sds, name:Economy}}
    const [content, setContent] = useState("")

    useEffect(() => {
        if (localStorage?.getItem("language")) {
            let langKey = JSON.parse(localStorage.getItem("language"));
            let foundMatch = false;
            JSON.parse(appData?.words["seBookingNotes"]).forEach((item, index) => {
                let { value, language } = item;

                if (langKey === language) {
                    setContent(value);
                    foundMatch = true;
                }
            });

            if (!foundMatch) {
                setContent("");
            }
        }
    }, [appData])

    return (
        <div className={styles.content_div}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    )
}

export default FlightWaitingTimeContent