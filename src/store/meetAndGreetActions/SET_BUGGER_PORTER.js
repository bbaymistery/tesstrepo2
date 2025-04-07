const updatePriceBuggerLists = (newBuggerLists) => {
    const pricesBuggerLists = newBuggerLists.map(item => item.minNum * item.price);
    const newbuggerListsTotalPrice = pricesBuggerLists.reduce((sum, price) => sum + price, 0);
    return { newbuggerListsTotalPrice };
};
function SET_BUGGER_PORTER(params = {}) {
    let { state, action } = params;
    let { data: { idx, incordec, } } = action;

    let newState = JSON.parse(JSON.stringify(state))
    let newBuggerLists = [...newState.buggerLists]
    let seatlistPrice = newState.seatListPrice
    let vat=newState.vat

    if (incordec === 'inc') newBuggerLists[idx].minNum += 1;


    if (incordec === 'dec')  newBuggerLists[idx].minNum -= 1;
    


    let { newbuggerListsTotalPrice, } = updatePriceBuggerLists(newBuggerLists);

    newState.buggerLists = newBuggerLists
    newState.totalPrice = newbuggerListsTotalPrice + seatlistPrice+vat
    newState.buggerListTotalPrice = newbuggerListsTotalPrice
    return newState;
}

export default SET_BUGGER_PORTER

