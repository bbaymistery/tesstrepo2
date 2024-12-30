
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { composeWithDevTools } from "redux-devtools-extension";
import { pickUpDropOffActions } from "./pickUpDropOffActions";
import { alertReducer } from './alertReducer';
import GET_APP_DATA from './pickUpDropOffActions/GET_APP_DATA';

/*
Baslangicda en birinci 
*/
// Initial ReducerIn your Redux actions file
const initialReducer = (state = {}, action) => {
    switch (action.type) {
        case HYDRATE:
            if (typeof window !== 'undefined') {
                const storedAppData = localStorage?.getItem("appData");
                // Parse appData only if it's not "undefined"
                if (storedAppData && storedAppData !== "undefined") {
                    const parsedAppData = JSON.parse(storedAppData);
                    // Assign appData only if status is 200
                    if (parsedAppData?.status === 200) {
                        action.payload.initialReducer = {
                            ...action.payload.initialReducer,
                            appData: { ...parsedAppData },
                        };
                    }
                }
            }
            return {
                ...state.initialReducer,
                ...action.payload.initialReducer,
            };

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
