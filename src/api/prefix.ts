const BASE_URL = 'https://f01447c7-0a23-4b3e-96a2-a20775559c98.mock.pstmn.io';

const SERVICE_PREFIX = {
    login: 'login',
  };
  export const API_PREFIX = {
    login: {
      v1: `${BASE_URL}/${SERVICE_PREFIX.login}`,
    },
  };
  
  export type ApiPrefixType = typeof API_PREFIX;