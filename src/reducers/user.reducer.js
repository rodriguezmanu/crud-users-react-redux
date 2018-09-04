import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  ME_SUCCESS,
} from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  isAuth: false,
};

const user = (state = initialState, action) => {
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
        isFetching: false,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', JSON.stringify(action.data.access_token));
      return {
        ...state,
        data: action.data,
        isAuth: true,
        isFetching: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuth: false,
        error: action.data,
        isFetching: false,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return {};
    case ME_SUCCESS:
      return {
        ...state,
        data: action.user,
        isAuth: true,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default user;
