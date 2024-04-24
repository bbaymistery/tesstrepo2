
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { composeWithDevTools } from "redux-devtools-extension";
import { pickUpDropOffActions } from "./pickUpDropOffActions";
import { alertReducer } from './alertReducer';
import GET_APP_DATA from './pickUpDropOffActions/GET_APP_DATA';

// Initial Reducer
const initialReducer = (state = {}, action) => {
    switch (action.type) {
        case HYDRATE:
            if (typeof window !== 'undefined') {
                if (localStorage.getItem("appData")) {
                    action.payload.initialReducer = { ...action.payload.initialReducer, appData: { ...JSON.parse(localStorage.getItem("appData")) } };
                }
            }
            return { ...state.initialReducer, ...action.payload.initialReducer };
        case 'GET_APP_DATA':
            return GET_APP_DATA({ state, action });
        default:
            return state;
    }
};

// Combine initial reducers
const staticReducers = {
    pickUpDropOffActions,
    initialReducer,
    alertReducer,
};

// Create store with initial reducers
const store = createStore(combineReducers(staticReducers), composeWithDevTools(applyMiddleware()));

// Function for injecting new reducer
store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(combineReducers({
        ...staticReducers,
        ...store.asyncReducers
    }));
};

// Initialize asyncReducers object
store.asyncReducers = {};

export default store;
