import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCookie } from "../../../helpers/cokieesFunc";
const FlightWaitingTimeContent = () => {

    const { appData } = useSelector(state => state.initialReducer)
    const [content, setContent] = useState("")

    useEffect(() => {
        let langKey = getCookie("lang")
        if (langKey) {
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
        <div >
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    )
}

export default FlightWaitingTimeContent