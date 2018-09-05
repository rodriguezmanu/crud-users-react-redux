import { GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE } from '../constants/actionTypes';

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
        isFetching: false,
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        error: action.data,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default users;
