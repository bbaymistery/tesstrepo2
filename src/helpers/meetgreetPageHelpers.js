export const buttonLabelsNames = ['Arrival', 'Departure', 'Connecting'];
export const stepsNames = ['Passengers', 'Flight', 'Payment', 'Confirmation'];

export const dropdownAirlineLabels = [
    { id: "-- Select Airline --", value: "-- Select Airline --", },
    { id: "1", value: "1", },
    { id: "3", value: "3", },
    { id: "4", value: "4", },
    { id: "5", value: "5", }
];
export const dropdownFlightClass = [
    { id: "-- Select Airline --", value: "-- Select Airline --", },
    { id: "Economy", value: "Economy", },
    { id: "Business", value: "Business", },
    { id: "First", value: "First", },
];


//FOR STEP _1
export const passengerDetailsError = (passengersForm) => {
    const errors = [];
    for (const passenger of passengersForm) {
        const error = { statusCode: 200, errorMessage: "" };
        if (passenger.firstname === "") {
            error.statusCode = 400;
            error.errorMessage = "required";
        } else if (passenger.lastname === "") {
            error.statusCode = 400;
            error.errorMessage = "required";
        }
        errors.push(error);
    }
    return errors;
};
//FOR STEP _2
export const flightDetailsError = (flightDetails) => {
    const errors = {};

    if (flightDetails.airline === "-- Select Airline --") {
        errors.airline = { statusCode: 400, errorMessage: "required", };
    }

    if (flightDetails.flightNumber.trim() === "") {
        errors.flightNumber = { statusCode: 400, errorMessage: "required", };
    }

    if (flightDetails.flightClass === "-- Select Class --") {
        errors.flightClass = { statusCode: 400, errorMessage: "required", };
    }

    if (flightDetails.noOfLuggageBags.trim() === "") {
        errors.noOfLuggageBags = { statusCode: 400, errorMessage: "required", };
    }

    return errors;
};

export const bookersDetailsError = (bookerDetails) => {
    const errors = {};

    if (bookerDetails.firstname.trim() === "") {
        errors.firstname = { statusCode: 400, errorMessage: "required", };
    }
    if (bookerDetails.lastname.trim() === "") {
        errors.lastname = { statusCode: 400, errorMessage: "required", };
    }
    if (bookerDetails.mobileNumber.trim() === "") {
        errors.mobileNumber = { statusCode: 400, errorMessage: "required", };
    }
    if (bookerDetails.email.trim() === "") {
        errors.email = { statusCode: 400, errorMessage: "required", };
    }

    return errors;
}
// 2023-07-29=> to => Sat, Jul 29, 2023
export const formatDate = (dateString) => {
    var date = new Date(dateString);
    var options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
    var formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
}