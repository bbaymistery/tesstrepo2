const ADULT_PRICE = 180;
const ADDITIONAL_GUEST_PRICE = 50;


const updatePrice = (newSeatLists, idx) => {
    const adultsNum = newSeatLists[0].minNum;
    const childrenNum = newSeatLists[1].minNum;
    //based on totalGuestSelected i am creating new passengers which is equal to that number
    //if totalGuestSelected=2=>it means =[{name:"",lastname:""},{name:"",lastname:""}]
    const totalGuestsSelected = adultsNum + childrenNum;
    let newTotalPrice = ADULT_PRICE + Math.max(0, totalGuestsSelected - 2) * ADDITIONAL_GUEST_PRICE;
    let newPassengersForm = Array.from({ length: idx === 0 ? adultsNum : childrenNum }, () => ({ firstname: "", lastname: "", ...(idx === 0 && { email: "", phone: "" }) }));

    return { newTotalPrice, newPassengersForm };
};

function SET_SEATLISTS(params = {}) {
    let { state, action } = params;
    let { data: { idx, incordec } } = action;

    let newState = { ...state };
    let newSeatLists = newState.seatLists.map((item, index) => index === idx ? { ...item, minNum: item.minNum + (incordec === 'inc' ? 1 : -1) } : item);

    if (idx === 0 && newSeatLists[0].minNum < 1) newSeatLists[0].minNum = 1;

    let { newTotalPrice, newPassengersForm } = updatePrice(newSeatLists, idx);

    newState.seatLists = newSeatLists;
    newState.totalPrice = newTotalPrice;
    newState.seatListPrice = newTotalPrice;
    newState[idx === 0 ? 'passengersFormAdults' : 'passengersFormChildren'] = newPassengersForm;

    return newState;
}

export default SET_SEATLISTS;



/*
uzun kod yerine  yuxardaki kimi simple yazdk
   if (incordec === 'inc') {
        newBuggerLists = newBuggerLists.map((item, index) => {
            if (index === idx) {
                return (item = { ...item, minNum: item.minNum + 1 });
            } else {
                return item;
            }
        });
    }

    if (incordec === 'dec') {
        newBuggerLists = newBuggerLists.map((item, index) => {
            if (index === idx) {
                if (idx === 0) {
                    return (item = { ...item, minNum: item.minNum === 1 ? item.minNum : item.minNum - 1 });
                } else {
                    return (item = { ...item, minNum: item.minNum === 0 ? item.minNum : item.minNum - 1 });
                }
            } else {
                return item;
            }
        });
    }

*/