import { ApiResponseType } from '@/types';
import { ApiPrefix } from '..';
import querystring from 'query-string';

export interface GetCategoryListRequestType {}

export interface GetCategoryListResponseType extends ApiResponseType {
  data?: GetCategoryListResponseDataType[];
}

export interface GetCategoryListResponseDataType {
  id: number;
  name: string;
}

export const getCategoryListUrlWithQuery = (
  req: GetCategoryListRequestType,
) => {
  const query = querystring.stringify(req);
  return `${process.env.NEXT_PUBLIC_BASE_API_URL}${ApiPrefix.board.v1}/categoryList?${query}`;
};
