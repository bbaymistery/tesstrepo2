import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { showFieldReducer } from "./showFieldReducer";
import { authReducer } from "./authReducer";
import { pickUpDropOffActions } from "./pickUpDropOffActions/index";
import { meetAndGreetActions } from './meetAndGreetActions';

const reducer = combineReducers({

  showFieldReducer,
  authReducer,
  meetAndGreetActions,
  pickUpDropOffActions
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  // rootReducer,
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
