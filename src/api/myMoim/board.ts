import { ApiResponseType } from '@/types';
import { ApiPrefix } from '..';
import querystring from 'query-string';
import { GetCategoryListResponseDataType } from '../common';

export interface GetRequireBoardListRequestType {
  moimId: number;
}

export interface GetRequireBoardListResponseType extends ApiResponseType {
  data?: GetRequireBoardListResponseDataType[];
}

export interface GetRequireBoardListResponseDataType {
  boardId: number;
  title: string;
}

export const getRequireBoardListUrlWithQuery = (
  req: GetRequireBoardListRequestType,
) => {
  const query = querystring.stringify(req);
  return `${process.env.NEXT_PUBLIC_BASE_API_URL}${ApiPrefix.myMoim.v1}/${req.moimId}/require/board/list?${query}`;
};
export interface GetBoardListRequestType {
  moimId: number;
  categoryId: number;
  page: number;
  size: number;
}

export interface GetBoardListResponseType extends ApiResponseType {
  data?: GetBoardListResponseDataType;
}

export interface GetBoardListResponseDataType {
  totalCount: number;
  hasMore: boolean;
  items: GetBoardItemResponseDataType[];
}

export interface GetBoardItemResponseDataType {
  profileImage: string;
  memberName: string;
  title: string;
  createDate: Date;
  updateDate: Date;
  boardImage: string;
  likeCount: number;
  boardCategory: GetCategoryListResponseDataType;
}

export const getBoardListUrlWithQuery = (req: GetBoardListRequestType) => {
  const query = querystring.stringify(req);
  return `${process.env.NEXT_PUBLIC_BASE_API_URL}${ApiPrefix.myMoim.v1}/${req.moimId}/board/list?${query}`;
};
