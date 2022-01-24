import { ApiResponseType } from '.';

/**
 * 헤더 네비게이션 타입
 */
export interface NavType {
  name: string;
  subNavList?: SubNavType[];
  link?: string;
  comingSoonMessage?: string;
}

/**
 * 헤더 서브 네비게이션 타입
 */
export interface SubNavType {
  name: string;
  path: string;
  as: string;
}
