import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_FAILURE,
  LOGOUT_SUCCESS,
  ME_SUCCESS
} from '../constants/actionTypes';
import { API } from '../constants/endpoints';
import { post } from '../middleware/api';

/**
 * Signup API handler
 * @param {String} name
 * @param {String} email
 * @param {String} password
 */
export const signup = ({ name, email, password }) => (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  post({
    url: API.USERS.AUTH.SIGNUP,
    body: { name, email, password },
    success: SIGNUP_SUCCESS,
    failure: SIGNUP_FAILURE,
    dispatch,
  });
};

/**
 * Login API handler
 * @param {String} email
 * @param {String} password
 */
export const login = (email, password) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  post({
    url: API.URL + API.USERS.AUTH.LOGIN,
    body: { email, password },
    success: LOGIN_SUCCESS,
    failure: LOGIN_FAILURE,
    dispatch,
  });
};

/**
 * Logout handler
 */
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_SUCCESS });
};

/**
 * Me handler
 * @param {Object} user
 */
export const me = (user) => (dispatch) => {
  dispatch({ type: ME_SUCCESS, user });
};
