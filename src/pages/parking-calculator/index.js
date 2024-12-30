import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from "./styles.module.scss"
import GlobalLayout from '../../components/layouts/GlobalLayout'
import DropDown from '../../components/elements/Dropdown/dropdown'

let description = ""
let title = ""
let keywords = ""
const tableDataInitial = [
    { duration: "0 - 15 minutes", charge: "£10.00" },
    { duration: "16 - 30 minutes", charge: "£15.00" },
    { duration: "31 - 45 minutes", charge: "£20.00" },
    { duration: "46 - 60 minutes", charge: "£25.00" },
    { duration: "61 - 90 minutes", charge: "£35.00" },
    { duration: "91 - 120 minutes", charge: "£45.00" },
];
// Array of hour values from 01 to 24 with "Select-hour" at index 0
const hours = ["Select-hour", ...Array.from({ length: 23 }, (_, index) => {
    const formattedHour = (index + 1).toString().padStart(2, '0');
    return formattedHour;
})];

// Array of minute values from 00 to 59 with "Select-minute" at index 0
const minutes = ["Select-minute", ...Array.from({ length: 60 }, (_, index) => {
    const formattedMinute = index.toString().padStart(2, '0');
    return formattedMinute;
})];

// Function to calculate the difference in minutes between two time values
const getDifferenceInMinutes = (time1, time2) => {
    const [hour1, minute1] = time1.split(':').map((val) => parseInt(val));
    const [hour2, minute2] = time2.split(':').map((val) => parseInt(val));

    const totalMinutes1 = hour1 * 60 + minute1;
    const totalMinutes2 = hour2 * 60 + minute2;
    const difference = totalMinutes1 - totalMinutes2;


    if (difference >= 0) {
        return difference;
    } else {
        return "";
    }
};

// Function to add minutes to a given time string (hh:mm)
const addMinutesToTime = (time, minutesToAdd) => {
    const [hour, minute] = time.split(':');
    const parsedHour = parseInt(hour);
    const parsedMinute = parseInt(minute);
    const totalMinutes = parsedHour * 60 + parsedMinute + minutesToAdd;
    const newHour = Math.floor(totalMinutes / 60) % 24; // Use modulo operator to handle exceeding 23:59
    const newMinute = totalMinutes % 60;
    const formattedHour = newHour.toString().padStart(2, '0');
    const formattedMinute = newMinute.toString().padStart(2, '0');
    return `${formattedHour}:${formattedMinute}`;
};

const ParkingCalculator = (props) => {
    let { bggray } = props
    const state = useSelector(state => state.pickUpDropOffActions)
    let { params: { direction } } = state


    const howmanyMinutesRef = useRef(null)

    const [price, setPrice] = useState("")
    const [difference, setDifference] = useState("")
    const [pickUpTime, setPickUpTime] = useState("")
    const [freetimeEnds, setFreeTimeEnds] = useState("")
    const [tableData, setTableData] = useState(tableDataInitial)
    const [freeWaitingTime, setFreeWaitingTime] = useState(30)
    const [how_many_minutes, setHow_many_minutes] = useState("")
    const [landingHourSelection, setLandingHourSelection] = useState(hours[0])//LandingTimeHour
    const [landingMinuteSelection, setLandingMinuteSelection] = useState(minutes[0])//landingTimeMinute
    const [driverActualPickupHourSelection, setdriverActualPickupHourSelection] = useState(hours[0])
    const [driverActualPickUpMinuteSelection, setdriverActualPickUpMinuteSelection] = useState(minutes[0])


    const handleHowManyMinutes = (event) => {
        const input = event.target.value;
        const regex = /^[0-9]*$/; // Regular expression to match only digits

        if (input.match(regex)) {
            const minutesToAdd = parseInt(input);

            if (minutesToAdd <= 360) {
                setHow_many_minutes(input);
            } else {
                alert('Maximum adding minutes is 360');
            }
        }
    };
    const handleCheckboxChange = (event) => {
        if (event.target.id === 'check2') {
            setFreeWaitingTime(45);
        } else {
            setFreeWaitingTime(30);
        }
    };
    // Function to add minutes to a given time string (hh:mm)
    useEffect(() => {
        //show the howmanyDivInputs when minute hour is selected
        if (landingHourSelection !== 'Select-hour' && landingMinuteSelection !== 'Select-minute') {
            howmanyMinutesRef?.current.focus()
        } else {
            setdriverActualPickUpMinuteSelection(minutes[0])
            setdriverActualPickupHourSelection(hours[0])
        }

        if (landingHourSelection !== 'Select-hour' && landingMinuteSelection !== 'Select-minute' && how_many_minutes !== '') {
            const selectedTime = `${landingHourSelection}:${landingMinuteSelection}`;
            const minutesToAdd = parseInt(how_many_minutes);
            const updatedPickUpTime = addMinutesToTime(selectedTime, minutesToAdd);
            setPickUpTime(updatedPickUpTime);
        } else {
            setPickUpTime('');
        }
    }, [landingHourSelection, landingMinuteSelection, how_many_minutes]);
    // Function to calculate the free time ends by adding freeWaitingTime to the pickUpTime
    useEffect(() => {
        if (pickUpTime !== '' && freeWaitingTime !== '') {
            const minutesToAdd = parseInt(freeWaitingTime);
            const updatedFreeTimeEnds = addMinutesToTime(pickUpTime, minutesToAdd);
            setFreeTimeEnds(updatedFreeTimeEnds);
        } else {
            setFreeTimeEnds('');
        }
    }, [pickUpTime, freeWaitingTime]);

    useEffect(() => {
        let matchedRange = {};
        if (driverActualPickupHourSelection !== 'Select-hour' && driverActualPickUpMinuteSelection !== 'Select-minute') {

            // Calculate the new time by combining the selected hour and minute
            const newTime = `${driverActualPickupHourSelection}:${driverActualPickUpMinuteSelection}`;

            // Calculate the difference between the new time and freetimeEnds
            const differenceInMinutes = getDifferenceInMinutes(newTime, freetimeEnds);

            // Set the difference in the state
            if (differenceInMinutes) {
                setDifference(differenceInMinutes.toString());

                // Find the matching range in the tableData
                matchedRange = tableData.find((item) => {
                    const [start, end] = item.duration.split(' - ');
                    const parsedEnd = parseInt(end);
                    if (isNaN(parsedEnd)) {
                        // Handle the case where the range has a non-numeric end value (e.g., "120+")
                        return differenceInMinutes >= parseInt(start);
                    } else {
                        return differenceInMinutes >= parseInt(start) && differenceInMinutes <= parsedEnd;
                    }
                });

                // If no exact match found, consider it within the "91-120 minutes" range
                if (!matchedRange && differenceInMinutes > 120) {
                    matchedRange = tableData.find((item) => {
                        const [start, end] = item.duration.split(' - ');
                        return start === "91" && end === "120 minutes";
                    });


                }
            } else {
                setDifference("");
                setPrice("");
            }

            // Set the selected property to true for the "91-120 minutes" range
            if (matchedRange.duration) {
                matchedRange.selected = true;
            }
            // Update the selected property of the matched range
            if (matchedRange && landingHourSelection !== 'Select-hour' && landingMinuteSelection !== 'Select-minute') {
                const updatedTableData = tableData.map((item) => {
                    return {
                        ...item,
                        selected: item === matchedRange,
                    };
                });
                setTableData(updatedTableData);

                // Set the price based on the selected range
                if (matchedRange.selected) {
                    setPrice(matchedRange.charge);
                }
            }
        } else {
            setDifference('');
            setTableData(tableDataInitial);
        }
    }, [driverActualPickupHourSelection, driverActualPickUpMinuteSelection, freetimeEnds]);

    return (
        <GlobalLayout footerbggray={true} keywords={keywords} title={title} description={description}>
            <div className={`${styles.parking} ${direction} page`} bggray={String(bggray === "true")}>
                <div className={`${styles.parking_section} page_section`}>
                    <div className={`${styles.parking_section_container} page_section_container`}>
                        <div className={styles.heading}>

                            <h1>  APL Parking calculator</h1>
                            <span className={styles.radio_button_div}>
                                <input type="radio" id="check1" checked={freeWaitingTime === 30} onChange={handleCheckboxChange} />
                                <label htmlFor="check1">APL</label>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="radio" id="check2" checked={freeWaitingTime === 45} onChange={handleCheckboxChange} />
                                <label htmlFor="check2">Booking.com</label>
                            </span>
                        </div>
                        <div className={styles.content}>
                            <div className={styles.waiting_table_div}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Duration</th>
                                            <th>Charge</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData?.map((item, index) => (
                                            <tr key={index} selecteditem={String(item.selected)} style={{ background: `${item.selected ? "#cfffdc" : ""}` }}>
                                                <td>{item.duration}</td>
                                                <td>{item.charge}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                            <span className={styles.radio_button_div}>
                                <input type="radio" id="check1" checked={freeWaitingTime === 30} onChange={handleCheckboxChange} />
                                <label htmlFor="check1">APL</label>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="radio" id="check2" checked={freeWaitingTime === 45} onChange={handleCheckboxChange} />
                                <label htmlFor="check2">Booking.com</label>
                            </span>

                            <div className={styles.input_informations_div}>
                                <div className={styles.landing_time_div}>
                                    <p>Landing time</p>
                                    <div className={styles.dropdowns_div}>
                                        <DropDown options={hours} selectedOption={landingHourSelection} setSelectedOption={setLandingHourSelection} />
                                        <DropDown options={minutes} selectedOption={landingMinuteSelection} setSelectedOption={setLandingMinuteSelection} />
                                    </div>
                                </div>
                                <div className={styles.how_many_minutes} >
                                    <div className={styles.form_group}>
                                        <label htmlFor="How many minutes"> How many minutes </label>
                                        <input
                                            type="text"
                                            id="How many minutes"
                                            ref={howmanyMinutesRef}
                                            value={how_many_minutes}
                                            className={styles.form_control}
                                            onChange={handleHowManyMinutes}
                                            placeholder="Enter  How many minutes"
                                            disabled={(landingHourSelection === 'Select-hour' || landingMinuteSelection === 'Select-minute') ? true : false}
                                        />
                                    </div>
                                </div>
                                {/*  readonlye*/}
                                <div className={styles.pickup_time_div}>
                                    <div className={styles.form_group}>
                                        <label htmlFor="Pick up time"> Pick up time</label>
                                        <input value={pickUpTime} type="text" className={styles.form_control} id="Pick up time" disabled={true} />
                                    </div>
                                </div>
                                {/*  readonlye*/}
                                <div className={styles.free_waitingtime_div}>
                                    <div className={styles.form_group}>
                                        <label htmlFor="Free waiting time"> Free waiting time</label>
                                        <input value={freeWaitingTime} type="text" className={styles.form_control} id="Free waiting time" disabled={true} />
                                    </div>
                                </div>
                                {/*  readonlye*/}
                                <div className={styles.free_timeends_div}>
                                    <div className={styles.form_group}>
                                        <label htmlFor="Free time ends"> Free time ends</label>
                                        <input value={freetimeEnds} type="text" className={styles.form_control} id="Free time ends" disabled={true} />
                                    </div>
                                </div>
                                <div className={styles.driver_pickup_div}>
                                    <p>Driver actual pick up</p>
                                    <div className={styles.dropdowns_div}>
                                        <DropDown disable={how_many_minutes && freetimeEnds ? false : true} options={hours} selectedOption={driverActualPickupHourSelection} setSelectedOption={setdriverActualPickupHourSelection} />
                                        <DropDown disable={how_many_minutes && freetimeEnds ? false : true} options={minutes} selectedOption={driverActualPickUpMinuteSelection} setSelectedOption={setdriverActualPickUpMinuteSelection} />
                                    </div>
                                </div>
                                <div className={styles.difference_time_div}>
                                    <div className={styles.form_group}>
                                        <label htmlFor="Diffrenece"> Diffrenece</label>
                                        <input value={difference} type="text" className={styles.form_control} id="Diffrenece" disabled={true} />
                                    </div>
                                </div>
                                <div className={styles.price_div}>
                                    <div className={styles.form_group}>
                                        <label htmlFor="Price"> Price</label>
                                        <input value={price} type="text" className={styles.form_control} id="Price" disabled={true} />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.parking_section_container} page_section_container`}>
                        <ul className={styles.description}>
                            <li> 1-  Please ask the driver to send you his parking ticket to verify his entry time at the terminal. Most drivers arrive late and still request additional money.</li>
                            <li>  2-    Please DO NOT charge the customer for up to 5 minutes. Drivers pay £6 for up to 44 minutes. </li>
                        </ul>

                    </div>
                </div>
            </div>
        </GlobalLayout>
    )
}

export default ParkingCalculator

//!How many minutes 360 i gecmesin