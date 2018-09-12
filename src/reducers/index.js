import { combineReducers } from 'redux';

import auth from './auth.reducer';
import users from './users.reducer';

const rootReducer = combineReducers({
  auth,
  users,
});

export default rootReducer;
