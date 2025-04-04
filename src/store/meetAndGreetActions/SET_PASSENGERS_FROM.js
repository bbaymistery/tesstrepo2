
function SET_PASSENGERS_FROM(params = {}) {
    let { state, action } = params;
    let { data: { name, value, index } } = action;

    let newState = JSON.parse(JSON.stringify(state))


    const updatedPassengersForm = [...newState.passengersForm];
    updatedPassengersForm[index] = { ...updatedPassengersForm[index], [name]: value };
    newState.passengersForm = updatedPassengersForm
    return newState;
}

export default SET_PASSENGERS_FROM