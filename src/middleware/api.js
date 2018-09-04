export const CALL_API = 'Call API';

/**
 * Handle communication with web service
 *
 * @param {Object} callAPI
 * @param {Object} next
 * @param {Object} actionWith
 * @param {Object} store
 */
export const api = async (callAPI, next, actionWith, store) => {
  const [requestType, successType, failureType, nextType] = callAPI.types;

  try {
    const res = await fetch(callAPI.endpoint, {
      method: callAPI.method,
      headers: getHeaders(store),
      body: JSON.stringify(callAPI.payload),
    });
    const data = await res.json();
    if (res.ok) {
      next(
        actionWith({
          data,
          type: successType,
        })
      );
      if (nextType) {
        if (nextType.type === 'login') {
          store.dispatch(nextType.action(data.email, data.password));
        }
      }
    } else {
      next(
        actionWith({
          data,
          type: failureType,
        })
      );
    }
  } catch (e) {
    next(
      actionWith({
        type: failureType,
        error: e.message || 'error',
      })
    );
  }
};
/**
 * Get headers
 * @return {Object} store
 */
const getHeaders = store => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token && store.getStore().isAuth) {
    const tokenParsed = JSON.parse(token);
    headers.Authentication = `Bearer ${tokenParsed.jwt}`;
  }

  return headers;
};

// Default middleware
export default store => next => action => {
  const callAPI = action[CALL_API];

  if (callAPI) {
    const { types } = callAPI;
    const [requestType] = types;
    const actionWith = data => {
      const finalAction = Object.assign({}, action, data);
      delete finalAction[CALL_API];
      return finalAction;
    };

    next(actionWith({ type: requestType }));

    api(callAPI, next, actionWith, store);
  } else {
    return next(action);
  }
};
