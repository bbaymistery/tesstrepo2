import {
  CLEAR_ERRORS,
  LOAD_USER_FAIL_CHECK_PERMIT,
  LOAD_USER_REQUEST_CHECK_PERMIT,
  LOAD_USER_SUCCESS_CHECK_PERMIT,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
} from "./authTypes";
const initialState = { user: {}, };
export const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOGIN_REQUEST: return { loading: true, isAuthenticated: false, };
    case LOGIN_SUCCESS: return { ...state, loading: false, isAuthenticated: true, user: action.payload, };
    case LOGIN_FAIL: return { ...state, loading: false, isAuthenticated: false, user: null, error: action.payload, };

    //
    case LOAD_USER_REQUEST_CHECK_PERMIT: return { ...state, loading: false, };
    case LOAD_USER_SUCCESS_CHECK_PERMIT: return { ...state, loading: false, isAuthenticated: action.payload.status === 200 ? true : false, };
    case LOAD_USER_FAIL_CHECK_PERMIT: return { loading: false, isAuthenticated: false, user: null, error: action.payload, };
    //

    case CLEAR_ERRORS: return { ...state, error: null, };
    case LOGOUT_FAIL: return { ...state, loading: false, error: action.payload, };
    case LOGOUT_SUCCESS: return { loading: false, user: null, isAuthenticated: false, };

    default:
      return state;
  }
};
