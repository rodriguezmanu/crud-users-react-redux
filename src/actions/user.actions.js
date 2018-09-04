import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_FAILURE,
  LOGOUT_SUCCESS,
  ME_SUCCESS,
} from '../constants/actionTypes';
import { API } from '../constants/endpoints';
import { CALL_API } from '../middleware/api';

/**
 * Signup API handler
 * @param {String} name
 * @param {String} email
 * @param {String} password
 */
export const signup = (name, email, password, role) => ({
  [CALL_API]: {
    payload: { name, email, password, role },
    method: 'post',
    types: [SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, { type: 'login', action: login }],
    endpoint: API.URL + API.USERS.AUTH.SIGNUP,
  },
});

/**
 * Login API handler
 * @param {String} email
 * @param {String} password
 */
export const login = (email, password) => ({
  [CALL_API]: {
    payload: { email, password },
    method: 'post',
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
    endpoint: API.URL + API.USERS.AUTH.LOGIN,
  },
});

/**
 * Logout handler
 */
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT_SUCCESS });
};

/**
 * Me handler
 * @param {Object} user
 */
export const me = user => dispatch => {
  dispatch({ type: ME_SUCCESS, user });
};
