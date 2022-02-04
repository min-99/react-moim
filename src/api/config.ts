/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';
import { Store } from 'redux';
import { RootStateType } from '@/redux/reducers/index';
import { loginRequestAction, logoutRequestAction } from '@/redux/reducers/auth';
import { isClient } from '@/utils';
import { replayRefreshToken } from '@/api';
import Router from 'next/router';
import { ApiPrefixType, API_PREFIX } from './prefix';
import {
  API_CODE_NOT_FOUND,
  API_CODE_SHUTDOWN,
  API_CODE_UNAUTHORIZED,
} from '@/constants';
import { getLoginPageUrlWithRedirect } from '@/service/authService';

const createInstance = (config?: AxiosRequestConfig) => {
  const defaultTimeoutMillSec = 60 * 1000; // 60초
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: defaultTimeoutMillSec,
    ...config,
  });
};

interface SetupAxiosType {
  instance: AxiosInstance;
  instanceKey: string;
  store: Store;
}

interface CustomInterceptorRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export const defaultInstance = createInstance();

export const relayInstance = createInstance({
  baseURL: '/api',
});

export const refreshInstance = createInstance();

const requestInterceptorSeqStorage: { [key: string]: number } = {};

const responseInterceptorSeqStorage: { [key: string]: number } = {};
export const setupAxios = ({
  instance,
  instanceKey,
  store,
}: SetupAxiosType) => {
  instance.interceptors.request.eject(
    requestInterceptorSeqStorage[instanceKey],
  );
  instance.interceptors.response.eject(
    responseInterceptorSeqStorage[instanceKey],
  );

  const requestInterceptor =
    (store: Store) => (config: CustomInterceptorRequestConfig) => {
      // tracking 정보 추가
      config.headers = {
        ...config.headers,
      };

      const auth = (store.getState() as RootStateType).auth;
      // 인증처리
      if (auth.isLogged && auth.authInfo?.accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${auth.authInfo?.accessToken}`,
        };
      }

      return config;
    };

  requestInterceptorSeqStorage[instanceKey] = instance.interceptors.request.use(
    requestInterceptor(store),
    (error) => {
      return Promise.reject(error);
    },
  );
  const loggingForResponse = (response: AxiosResponse) => {
    const originalRequest = response.config as CustomInterceptorRequestConfig;
    console.log(`[AXIOS RESPONSE URL : ${originalRequest?.url}]`);
    console.log(' 1. ORIGINAL REQUEST');
    console.table(originalRequest);
    console.log(' 2. RESPONSE');
    console.table(response, [
      'code',
      'content-type',
      'url',
      'baseUrl',
      'method',
    ]);
    console.log(' 3. RESPONSE BODY DATA');
    console.table(response?.data?.data);
  };
  const responseInterceptor =
    (store: Store) =>
    async (response: AxiosResponse): Promise<AxiosResponse> => {
      const originalRequest = response.config as CustomInterceptorRequestConfig;
      loggingForResponse(response);

      const isRetry =
        isExpireTokenByStatusCode(response?.data?.code) &&
        isClient() &&
        !originalRequest._retry;
      if (isRetry) {
        originalRequest._retry = true;
        const isSuccess = await refreshTokenForClientProc({ store });
        console.log('client token refresh : ', isSuccess);
        if (isSuccess) return instance?.({ ...originalRequest });
      }

      if (isClient()) {
        const isShutdown = response?.data?.code === API_CODE_SHUTDOWN;
        const isNotFound =
          API_CODE_NOT_FOUND.indexOf(response?.data?.code) >= 0;
        const isUnauthorized =
          API_CODE_UNAUTHORIZED.indexOf(response?.data?.code) >= 0;
        if (isShutdown) {
          Router.replace('/standby/inspection');
        } else if (isNotFound) {
          Router.replace('/not-found');
        } else if (isUnauthorized) {
          Router.replace('/unauthorized');
        }
      }

      return response;
    };

  responseInterceptorSeqStorage[instanceKey] =
    instance.interceptors.response.use(responseInterceptor(store), (error) => {
      return Promise.reject(error);
    });
};

export const isExpireTokenByStatusCode = (code: number) => {
  return code === 16001 || code === 16002;
};
export const refreshTokenForClientProc = async ({
  store,
}: {
  store: Store;
}): Promise<boolean> => {
  const { data } = await replayRefreshToken();
  if (data.accessToken) {
    store.dispatch(
      loginRequestAction({
        accessToken: data?.data?.accessToken as string,
      }),
    );
    return true;
  }
  store.dispatch(logoutRequestAction(0));
  Router.push(getLoginPageUrlWithRedirect(Router.asPath));
  return false;
};

export interface CallApiType {
  url: string;
  method: Method;
  data?: any;
  contentType?: HttpContentType;
  config?: AxiosRequestConfig;
  instanceType?: InstanceType;
}

type InstanceType = 'Default' | 'Relay' | 'Refresh';

export type HttpContentType =
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'
  | 'form-data';

export const callApi = ({
  url,
  method,
  data,
  contentType = 'application/json',
  config,
  instanceType = 'Default',
}: CallApiType) => {
  const getInstance = (instanceType: InstanceType) => {
    switch (instanceType) {
      case 'Relay':
        return relayInstance;
      case 'Refresh':
        return refreshInstance;
      default:
        return defaultInstance;
    }
  };

  return getInstance(instanceType)({
    method: method,
    url: url,
    data: data || {},
    params: method === 'GET' || method === 'get' ? data : {},
    headers: {
      'Content-Type': contentType,
    },
    ...config,
  }).catch((error) => {
    console.error(
      `api error status: ${error.status}, message: ${error.message}`,
    );
    return (
      error.response || {
        data: {
          code: error.status,
          message: error.message,
        },
      }
    );
  });
};

export const swrFetcher = (url: string) =>
  callApi({
    url,
    method: 'GET',
  }).then((res) => res.data);

export const ApiPrefix: ApiPrefixType = API_PREFIX;
