import { splitDateTimeStringIntoDate, splitDateTimeStringIntoHourAndMinute } from "../../helpers/splitHelper"

function SET_TOUR_DATETIME(params = {}) {
    let { state, action } = params
    let { data: { hourOrMinute, value } } = action

    let newState = JSON.parse(JSON.stringify(state))


    //reaching to previous dateTimeString
    let DateTimeString = newState.transferDetails.transferDateTimeString
    //destructing one by one
    const [splitedHour, splitedMinute] = splitDateTimeStringIntoHourAndMinute(DateTimeString) || []
    const [splitedDate] = splitDateTimeStringIntoDate(DateTimeString) || []


    //setting hour || minute || date  to DateTimeString
    if (hourOrMinute === "hour") DateTimeString = `${splitedDate} ${value}:${splitedMinute}`;
    if (hourOrMinute === "minute") DateTimeString = `${splitedDate} ${splitedHour}:${value}`;

    if (hourOrMinute === "date") DateTimeString = `${value} ${splitedHour}:${splitedMinute}`;


    //saving DateTimeString by journeytpe
    newState.transferDetails.transferDateTimeString = DateTimeString
    return newState;
}
export default SET_TOUR_DATETIME