import React from 'react';
import styles from './TimePicker.module.scss'; // Adjust the path as needed
// Label text for the picker
// Initially selected hour
// Initially selected minute
// Array of hour options
// Array of minute options
// Function to call when the time changes
// Text direction
const TimePicker = (props) => {
    let { label, splitedHour, splitedMinute, hours, minutes, onChangeSetDateTime = () => { }, direction = "ltr",headingStyle = {}, } = props
    const onChangeHandler = (e, hourOrMinute) => {
        // onChangeSetDateTime({ value: e.target.value, hourOrMinute, journeyType: 0 }); // Assuming journeyType is needed and set to 0 for simplicity
    };

    return (
        <div className={`${styles.search_menu}`}>
            <p className={direction} style={headingStyle} >{label}</p>
            <div className={`${styles.select_time_div} ${direction}`}>
                {Array.from(new Array(2)).map((_, i) => (
                    <div key={i} className={styles.booking_form_hour_minute_wrapper}>
                        <i className={`fa-sharp fa-solid fa-angle-down ${direction === "rtl" ? styles.left : ""}`}></i>
                        <select defaultValue={i === 0 ? splitedHour : splitedMinute} onChange={(e) => onChangeHandler(e, i === 0 ? "hour" : "minute")}      >
                            {i === 0
                                ? hours.map((hour) => (<option key={hour.id} id={hour.id} value={hour.value}>{hour.value}</option>))
                                : minutes.map((minute) => (<option key={minute.id} id={minute.id} value={minute.value}>{minute.value}</option>))}
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimePicker;
