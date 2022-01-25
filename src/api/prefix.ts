const SERVICE_PREFIX = {
  auth: 'auth',
  myMoim: 'myMoim',
};
export const API_PREFIX = {
  auth: {
    login: `${SERVICE_PREFIX.auth}/login`,
    refresh: `${SERVICE_PREFIX.auth}/refresh`,
  },
  myMoim: {
    v1: `/${SERVICE_PREFIX.myMoim}`,
  },
};

export type ApiPrefixType = typeof API_PREFIX;

export const AUTH_SERVER_BASE_URL = 'http://localhost:3001';
