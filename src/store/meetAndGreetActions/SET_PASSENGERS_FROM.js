
function SET_PASSENGERS_FROM(params = {}) {
    let { state, action } = params;
    let { data: { name, value, index, childOrAdult } } = action;

    let newState = JSON.parse(JSON.stringify(state))



    const uptadultsPassengersForm = [...newState.passengersFormAdults];
    const uptchildrenPassengersForm = [...newState.passengersFormChildren];
    if (childOrAdult === "children") {
        uptchildrenPassengersForm[index] = { ...uptchildrenPassengersForm[index], [name]: value };

    }
    if (childOrAdult === "adults") {
        uptadultsPassengersForm[index] = { ...uptadultsPassengersForm[index], [name]: value };
    }
    newState.passengersFormChildren = uptchildrenPassengersForm
    newState.passengersFormAdults = uptadultsPassengersForm
    return newState;
}

export default SET_PASSENGERS_FROM