import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import api from '../middleware/api';

const configureStore = preloadedState => {
  const store = createStore(rootReducer, preloadedState, compose(applyMiddleware(thunk, api)));

  return store;
};

export default configureStore;
