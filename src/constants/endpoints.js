export const API = {
  URL: process.env.NODE_ENV === 'production' ? 'https://crud-users.herokuapp.com' : 'http://localhost:3004',
  USERS: {
    AUTH: {
      LOGIN: '/auth/login',
      SIGNUP: '/auth/signup',
    },
    CREATE: '/users',
    DELETE: '/users/',
    UPDATE: '/users/',
    GET: '/users/',
  },
};

export default API;
