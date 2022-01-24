const SERVICE_PREFIX = {
  login: 'login',
  myMoim: 'myMoim',
};
export const API_PREFIX = {
  login: {
    v1: `/${SERVICE_PREFIX.login}`,
  },
  myMoim: {
    v1: `/${SERVICE_PREFIX.myMoim}`,
  },
};

export type ApiPrefixType = typeof API_PREFIX;
