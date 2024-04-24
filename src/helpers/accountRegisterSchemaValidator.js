/**
 * Validates the account registration schema and returns an error holder with error messages, if any.
 *
 * @param {Object} params - The parameters to be validated.
 * @param {Object} [options] - Optional settings for the validation.
 * @returns {Object} An error holder with error messages, if any.
 */
export function accountRegisterSchemaValidator(params = {}, options = {}) {
    let { accountRegisterDatas } = params;

    // Define an error holder object with initial status 200 and empty error messages
    let errorHolder = {
        status: 200,
        accountRegisterDatas: {
            applicantForCreditAccount: {
                companyName: "",
                natureOfBusiness: "",
                address: "",
                registrationNo: "",
            },
            contactDetails: {
                contactName: "",
                jobTitle: "",
                email: "",
                telephoneNo: "",
            },
            operationNotes: {
                urgentSituationStatus: "",
                accountPassengerStatus: "",
                anyOtherOperationComments: "",
                urgentSituationNumber: ""
            }
        },
    };

    // Loop through each key in the accountRegisterDatas object
    for (let key in accountRegisterDatas) {

     
        // Check if the key is "contactDetails"
        // else
        if (key === "contactDetails") {
            // If yes, loop through each key in the contactDetails object
            for (let contactKey in accountRegisterDatas.contactDetails) {
                // Check if the key is "email"
                if (contactKey === "email") {
                    // If yes, check if the email value is empty or invalid
                    if (!accountRegisterDatas.contactDetails.email) {
                        // If empty, set the error status to 400 and add a "required" message to the error holder
                        errorHolder.status = 400;
                        errorHolder.accountRegisterDatas.contactDetails.email = "required";
                    } else if (!validateEmail(accountRegisterDatas.contactDetails.email)) {
                        // If invalid, set the error status to 400 and add an "invalid email address" message to the error holder
                        errorHolder.status = 400;
                        errorHolder.accountRegisterDatas.contactDetails.email = "required";
                    }
                } else {
                    // For all other keys in the contactDetails object, check if the value is empty
                    if (!accountRegisterDatas.contactDetails[contactKey]) {
                        // If empty, set the error status to 400 and add a "required" message to the error holder
                        errorHolder.status = 400;
                        errorHolder.accountRegisterDatas.contactDetails[contactKey] = "required";
                    }
                }
            }
        } else if (key === "operationNotes") {
            for (let operationNoteKey in accountRegisterDatas.operationNotes) {
                if (operationNoteKey === 'urgentSituationStatus' && accountRegisterDatas.operationNotes.urgentSituationStatus === 'Yes' &&  !accountRegisterDatas.operationNotes["urgentSituationNumber"] ) {
                    errorHolder.status = 400;
                    errorHolder.accountRegisterDatas.operationNotes["urgentSituationNumber"] = "required";
                } else if ( operationNoteKey === 'urgentSituationStatus' &&accountRegisterDatas.operationNotes.urgentSituationStatus === 'No'  ) {
                    errorHolder.accountRegisterDatas.operationNotes["urgentSituationNumber"] = "";
                }


                if (operationNoteKey !== "urgentSituationNumber") {
                    if (!accountRegisterDatas.operationNotes[operationNoteKey]) {
                        errorHolder.status = 400;
                        errorHolder.accountRegisterDatas.operationNotes[operationNoteKey] = "required";
                    }
                }


            }
        }
        else {
            // For all other keys in the accountRegisterDatas object (i.e. applicantForCreditAccount), loop through each key
            for (let applicantKey in accountRegisterDatas.applicantForCreditAccount) {
                // Check if the key is not "registrationNo"
                if (applicantKey !== 'registrationNo') {
                    // If yes, check if the value is empty
                    if (!accountRegisterDatas.applicantForCreditAccount[applicantKey]) {
                        // If empty, set the error status to 400 and add a "required" message to the error holder
                        errorHolder.status = 400;
                        errorHolder.accountRegisterDatas.applicantForCreditAccount[applicantKey] = "required";
                    }
                }
            }
        }
    }

    return errorHolder;
}



export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
// export const validRegister = (userRegister) => {
//     const { name, account, password, cf_password } = userRegister;
//     const errors = [];

//     if (!name) {
//         errors.push("Please add your name.")
//     } else if (name.length > 20) {
//         errors.push("Your name is up to 20 chars long.")
//     }

//     if (!account) {
//         errors.push("Please add your email or phone number.")
//     } else if (!validPhone(account) && !validateEmail(account)) {
//         errors.push("Email or phone number format is incorrect.")
//     }

//     if (password.length < 6) {
//         errors.push("Password must be at least 6 chars.")
//     } else if (password !== cf_password) {
//         errors.push("Confirm password did not match.")
//     }

//     return {
//         errMsg: errors,
//         errLength: errors.length
//     }
// }

// export function validPhone(phone) {
//     const re = /^[+]/g
//     return re.test(phone)
// }