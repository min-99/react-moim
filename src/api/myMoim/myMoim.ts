import { ApiResponseType } from '@/types';
import { AxiosPromise } from 'axios';
import { ApiPrefix, callApi } from '..';

export interface MyMoimRequestType {
  email: string;
  password: string;
}

export interface MyMoimResponseType extends ApiResponseType {
  data?: MyMoimResponseDataType;
}

export interface MyMoimResponseDataType {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  companyName: string;
}

export const myMoim = (
  req: MyMoimRequestType,
): AxiosPromise<MyMoimResponseType> => {
  return callApi({
    url: `${ApiPrefix.myMoim.v1}`,
    method: 'GET',
    data: req,
  });
};
