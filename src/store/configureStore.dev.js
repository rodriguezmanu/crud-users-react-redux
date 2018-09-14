import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import rootReducer from '../reducers';
import api from '../middleware/api';
import history from '../history';

const configureStore = preloadedState => {
  const store = createStore(
    connectRouter(history)(rootReducer),
    preloadedState,
    composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk, api, logger))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};

export default configureStore;
