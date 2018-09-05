import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
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
        error: action.data,
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
