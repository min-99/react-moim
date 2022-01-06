import { callApi } from '@/api';
import { ApiResponseType } from '@/types';
import { AxiosPromise } from 'axios';
import { ApiPrefix } from '../config';

export interface LoginRequestType {
  id: string;
  password: string;
}

export interface LoginResponseType extends ApiResponseType {
  data?: LoginResponseDataType;
}

export interface LoginResponseDataType {
  code: number;
  memberId: number;
  name: string;
  birthday: string;
  gender: string;
  tel: string;
  joinDate: string;
}

export const login = (
  req: LoginRequestType,
): AxiosPromise<LoginResponseType> => {
  return callApi({
    url: `${ApiPrefix.login}`,
    method: 'GET',
    data: req,
  });
};
