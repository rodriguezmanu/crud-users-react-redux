import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  FILTER_USER_SUCCESS,
} from '../constants/actionTypes';
import { API } from '../constants/endpoints';
import { CALL_API } from '../middleware/api';
import { logout } from './user.actions';

/**
 * GetUsers API handler
 */
export const getUsers = () => ({
  [CALL_API]: {
    method: 'get',
    types: [GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE],
    endpoint: API.URL + API.USERS.GET,
  },
});

/**
 * GetUsers API handler
 * @params {Number} id
 * @params {Boolean} isCurrent
 */
export const deleteUser = (id, isCurrent) => {
  const action = isCurrent
    ? { type: 'logout', action: logout }
    : { type: 'getUsers', action: getUsers };

  return {
    [CALL_API]: {
      method: 'delete',
      types: [DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE, action],
      endpoint: API.URL + API.USERS.DELETE + id,
    },
  };
};

/**
 * Filter User handler handler
 * @param {String} name
 */
export const filterUser = name => dispatch => {
  dispatch({ type: FILTER_USER_SUCCESS, name });
};
