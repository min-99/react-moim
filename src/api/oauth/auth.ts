import { callApi } from '@/api';
import { ApiResponseType } from '@/types';
import { AxiosPromise } from 'axios';
import { ApiPrefix } from '../config';

export interface LoginRequestType {
  username: string;
  password: string;
}

export interface LoginResponseType {
  accessToken: string;
  refreshToken: string;
}

export const login = (
  req: LoginRequestType,
): AxiosPromise<LoginResponseType> => {
  return callApi({
    url: `/${ApiPrefix.auth.login}`,
    method: 'POST',
    data: req,
  });
};

export const relayLogin = (
  req: LoginRequestType,
): AxiosPromise<LoginResponseType> => {
  return callApi({
    url: '/login',
    method: 'POST',
    data: req,
    instanceType: 'Relay',
  });
};

export const relayLogout = () => {
  return callApi({
    url: '/logout',
    method: 'POST',
    instanceType: 'Relay',
  });
};

export interface RefreshTokenRequestType {
  token: string;
}
export interface RefreshTokenResponseType extends ApiResponseType {
  accessToken: string;
  refreshToken: string;
}

export const refreshToken = (
  req: RefreshTokenRequestType,
): AxiosPromise<RefreshTokenResponseType> => {
  return callApi({
    url: `/${ApiPrefix.auth.refresh}`,
    method: 'GET',
    instanceType: 'Refresh',
    data: req,
  });
};

export const replayRefreshToken =
  (): AxiosPromise<RefreshTokenResponseType> => {
    return callApi({
      url: '/token',
      method: 'POST',
      instanceType: 'Relay',
    });
  };
