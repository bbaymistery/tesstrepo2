export function tourSchemaValidator(params = {}, options = {}) {
    let { passengerDetails, pickupPoint } = params;

    let errorHolder = {
        status: 200, // Initial status
        passengerDetails: {
            firstname: "",
            email: "",
            phone: "",
        },
        pickupPoint: {
            address: "Any London Address (Full address will be requested on the following page)",
            pickupadress: "",
        },
    };

    // Validate passengerDetails
    for (let key in passengerDetails) {
        if (key === "email") {
            if (!passengerDetails.email) {
                errorHolder.status = 400;
                errorHolder.passengerDetails.email = "required";
            } else if (!validateEmail(passengerDetails.email)) {
                errorHolder.status = 400;
                errorHolder.passengerDetails.email = "invalid email address";
            }
        } else {
            if (!passengerDetails[key]) {
                errorHolder.status = 400;
                errorHolder.passengerDetails[key] = "required";
            }
        }
    }

    // Validate pickupPoint
    if (!pickupPoint.pickupadress) {
        errorHolder.status = 400;
        errorHolder.pickupPoint.pickupadress = "required";
    }

    return errorHolder;
}

export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}