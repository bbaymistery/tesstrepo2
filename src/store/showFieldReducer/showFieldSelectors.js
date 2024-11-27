//*initialShowResultBoxStates selectors
export const onewayShowInputPickField = (state) =>
  state.showFieldReducer.initialShowResultBoxStates[0]
    .showInputFieldPickUpOneWay;
export const onewayShowInputDropField = (state) =>
  state.showFieldReducer.initialShowResultBoxStates[0]
    .showInputFieldDroppOffOneWay;

export const returnShowInputPickField = (state) =>
  state.showFieldReducer.initialShowResultBoxStates[1]
    .showInputFieldPickUpReturn;
export const returnShowInputDropField = (state) =>
  state.showFieldReducer.initialShowResultBoxStates[1]
    .showInputFieldDroppOffReturn;

export const showTimePicker = (state) => state.showFieldReducer.showTimePicker;
export const showReturnTimePicker = (state) =>
  state.showFieldReducer.returnShowTimePicker;

export const modalInfo = (state) => state?.showFieldReducer?.modalInfo;
export const waitingModalInfo = (state) =>
  state?.showFieldReducer?.waitingPickkModalInfo;
export const selectCrumbs = (state) => state?.showFieldReducer?.crumbs;
