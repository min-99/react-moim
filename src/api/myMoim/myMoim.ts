import { ApiResponseType } from '@/types';
import { ApiPrefix } from '..';
import querystring from 'query-string';
import { RoleType } from '@/types/myMoim';

export interface GetMyMoimListRequestType {
  page: number;
  size: number;
  sort: string;
}

export interface GetMyMoimListResponseType extends ApiResponseType {
  data?: GetMyMoimListResponseDataType;
}

export interface GetMyMoimListResponseDataType {
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

export const getMyMoimListUrlWithQuery = (req: GetMyMoimListRequestType) => {
  const query = querystring.stringify(req);
  return `${process.env.NEXT_PUBLIC_BASE_API_URL}${ApiPrefix.myMoim.v1}s?${query}`;
};

// 모임 상세 API

export interface GetMyMoimRequestType {
  moimId: number;
}

export interface GetMyMoimResponseType {
  data?: GetMyMoimResponseDataType;
}

export interface GetMyMoimResponseDataType {
  image: string;
  moimName: string;
  moimDetail: string;
}

export const getMyMoimUrlWithQuery = (req: GetMyMoimRequestType) => {
  return `${process.env.NEXT_PUBLIC_BASE_API_URL}${ApiPrefix.myMoim.v1}/${req.moimId}`;
};

// 정모 리스트 API

export interface GetMeeingListRequestType {
  moimId: number;
  page: number;
  size: number;
}

export interface GetMeeingListResponseType {
  data?: GetMeeingListResponseDataType;
}

export interface GetMeeingListResponseDataType {
  totalCount: number;
  hasMore: boolean;
  items: GetMeeingListItemResponseType[];
}

export interface GetMeeingListItemResponseType {
  name: string;
  meeting: Date;
  place: string;
  price: string;
  limitMemberCount: number;
  attendMemberCount: number;
}

export const getMeeingListUrlWithQuery = (req: GetMeeingListRequestType) => {
  const query = querystring.stringify(req);
  return `${process.env.NEXT_PUBLIC_BASE_API_URL}${ApiPrefix.myMoim.v1}/meeting/${req.moimId}?${query}`;
};

// 멤버 리스트 API
export interface GetMemberListRequestType {
  moimId: number;
  page: number;
  size: number;
}

export interface GetMemberListResponseType {
  data?: GetMemberListResponseDataType;
}

export interface GetMemberListResponseDataType {
  totalCount: number;
  hasMore: boolean;
  items: GetMemberListItemResponseType[];
}

export interface GetMemberListItemResponseType {
  image: string;
  name: string;
  greeting: string;
  role: RoleType;
}

export const getMemberListUrlWithQuery = (req: GetMemberListRequestType) => {
  const query = querystring.stringify(req);
  return `${process.env.NEXT_PUBLIC_BASE_API_URL}${ApiPrefix.myMoim.v1}/member/${req.moimId}?${query}`;
};
