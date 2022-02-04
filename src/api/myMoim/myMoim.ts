import { ApiResponseType } from '@/types';
import { ApiPrefix } from '..';
import querystring from 'query-string';

export interface GetMyMoimRequestType {
  page: number;
  size: number;
  sort: string;
}

export interface GetMyMoimResponseType extends ApiResponseType {
  data?: GetMyMoimResponseDataType;
}

export interface GetMyMoimResponseDataType {
  totalCount: number;
  hasMore: boolean;
  items: GetMyMoimItemResponseType[];
}

export interface GetMyMoimItemResponseType {
  id: number;
  image: string;
  moimName: string;
  area: string;
  moimMemberCount: number;
}

export const getMyMoimListUrlWithQuery = (req: GetMyMoimRequestType) => {
  const query = querystring.stringify(req);
  return `${process.env.NEXT_PUBLIC_BASE_API_URL}${ApiPrefix.myMoim.v1}?${query}`;
};
