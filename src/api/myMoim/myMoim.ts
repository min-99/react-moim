import { ApiResponseType } from '@/types';
import { ApiPrefix } from '..';
import querystring from 'query-string';

export interface GetMyMoimRequestType {
  page: number;
}

export interface GetMyMoimResponseType extends ApiResponseType {
  data?: Array<GetMyMoimResponseDataType>;
}

export interface GetMyMoimResponseDataType {
  id: number;
  image: string;
  area: string;
  moimLoction: string;
  moimName: string;
  moimMemberCount: number;
}

export const getMyMoimListUrlWithQuery = (req: GetMyMoimRequestType) => {
  const query = querystring.stringify(req);
  return `${ApiPrefix.myMoim.v1}?${query}`;
};
