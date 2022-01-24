import { callApi } from '@/api';
import { ApiResponseType } from '@/types';
import { AxiosPromise } from 'axios';
import { ApiPrefix } from '../config';

export interface LoginRequestType {
  email: string;
  password: string;
}

export interface LoginResponseType extends ApiResponseType {
  data?: LoginResponseDataType;
}

export interface LoginResponseDataType {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  companyName: string;
}

export const login = (
  req: LoginRequestType,
): AxiosPromise<LoginResponseType> => {
  return callApi({
    url: `${ApiPrefix.login.v1}`,
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
  data?: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

export const refreshToken = (
  req: RefreshTokenRequestType,
): AxiosPromise<RefreshTokenResponseType> => {
  return callApi({
    url: `/token/refresh`,
    method: 'GET',
    instanceType: 'Refresh',
    data: req,
    config: {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_BASIC_AUTH}`,
      },
    },
  });
};
