import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import history from '../history';
import rootReducer from '../reducers';
import api from '../middleware/api';

const configureStore = preloadedState => {
  const store = createStore(
    connectRouter(history)(rootReducer),
    preloadedState,
    compose(applyMiddleware(routerMiddleware(history), thunk, api))
  );

  return store;
};

export default configureStore;
