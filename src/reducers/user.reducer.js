import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../constants/actionTypes';

const user = (state = { isFetching: false }, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isFetching: true,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: action.data,
        isAuth: true,
        isFetching: false
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuth: false,
        isFetching: false
      };
    case LOGOUT_SUCCESS:
      return {};
    case LOGOUT_FAILURE:
      return {
        ...state,
        isAuth: true,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default user;
