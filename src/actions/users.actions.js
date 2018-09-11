import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  FILTER_USER_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from '../constants/actionTypes';
import { API } from '../constants/endpoints';
import { CALL_API } from '../constants/variables';
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
 * Get single API handler
 * @param {Number} id
 */
export const getUser = id => ({
  [CALL_API]: {
    method: 'get',
    types: [GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE],
    endpoint: API.URL + API.USERS.GET + id,
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

/**
 * Update User API handler
 * @param {Number} id
 * @param {String} name
 * @param {String} email
 * @param {String} password
 * @param {Boolean} isCurrentUserRoleChange
 */
export const updateUser = (id, name, email, password, role, isCurrentUserRoleChange) => {
  const actions = [UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE];
  if (isCurrentUserRoleChange) {
    actions.push({ type: 'logout', action: logout });
  }

  return {
    [CALL_API]: {
      payload: { id, name, email, password, role },
      method: 'put',
      types: actions,
      endpoint: API.URL + API.USERS.UPDATE + id,
      validate: true,
    },
  };
};
