import { ApiResponseType } from '@/types';

export const API_DEFAULT_RESPONSE: ApiResponseType = {
  code: -1,
  message: '',
};

export const API_DEFAULT_ERROR_RESPONSE: ApiResponseType = {
  code: 500,
  message: '잠시후 다시 시도해 주시기 바랍니다',
};

export const API_REFRESH_FAILURE_ERROR_RESPONSE: ApiResponseType = {
  code: 16999,
  message: '리프레쉬 토큰 실패로 인한 API 호출 중단',
};

export const API_CODE_SHUTDOWN = 16000;
export const API_CODE_UNAUTHORIZED = [18004];
export const API_CODE_NOT_FOUND = [14102, 18002];
