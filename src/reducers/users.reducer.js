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
} from '../constants/actionTypes';

const initialState = {
  isFetching: false,
};

const users = (state = initialState, action) => {
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
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        errors: action.errors,
        isFetching: false,
      };
    case FILTER_USER_SUCCESS:
      return {
        ...state,
        filtered: state.data.filter(val =>
          val.name.toLowerCase().includes(action.name.toLowerCase())
        ),
        isFetching: false,
      };
    default:
      return state;
  }
};

export default users;
