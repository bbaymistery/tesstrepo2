function SET_PAYMENT_TYPE_AND_TOKEN(params = {}) {
  let { state, action } = params
  let { data: { token, paymentType } } = action

  let newState = JSON.parse(JSON.stringify(state))

  newState.reservations.map((obj, index) => {
    return newState.reservations[index].paymentDetails = { ...newState.reservations[index].paymentDetails, token, paymentType }
  })
  return newState;
}
export default SET_PAYMENT_TYPE_AND_TOKEN
