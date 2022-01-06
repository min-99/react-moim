const SERVICE_PREFIX = {
  login: 'login',
};
export const API_PREFIX = {
  login: {
    v1: `/${SERVICE_PREFIX.login}`,
  },
};

export type ApiPrefixType = typeof API_PREFIX;
