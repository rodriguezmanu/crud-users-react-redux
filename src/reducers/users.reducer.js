import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  FILTER_USER_SUCCESS,
  GET_USERS_COUNT_REQUEST,
  GET_USERS_COUNT_SUCCESS,
  GET_USERS_COUNT_FAILURE,
} from '../constants/actionTypes';
import { limitUsers } from '../constants/variables';

const initialState = {
  isFetching: false,
};

const users = (state = initialState, action) => {
  let filtered;
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        data: action.data,
        filtered: action.data,
        isFetching: false,
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        errors: action.errors,
        isFetching: false,
      };
    case GET_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetching: false,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        errors: action.errors,
        isFetching: false,
      };
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetching: false,
        errors: null,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        errors: action.errors,
        isFetching: false,
      };
    case FILTER_USER_SUCCESS:
      filtered = state.data.filter(val =>
        val.name.toLowerCase().includes(action.name.toLowerCase())
      );

      return {
        ...state,
        filtered,
        countFiltered: Math.ceil(filtered.length / limitUsers),
        isFetching: false,
      };
    case GET_USERS_COUNT_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_USERS_COUNT_SUCCESS:
      return {
        ...state,
        count: Math.ceil(action.data.length / limitUsers),
        isFetching: false,
      };
    case GET_USERS_COUNT_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default users;
