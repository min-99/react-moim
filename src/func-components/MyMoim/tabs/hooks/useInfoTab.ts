import { GetMyMoimResponseType, getMyMoimUrlWithQuery } from '@/api/myMoim';
import useSWR from 'swr';

interface useInfoTabPropsType {
  moimId: number;
}

function useInfoTab(moimId: useInfoTabPropsType) {
  const { data: moimDetailApiResponse, isValidating: isValidatingMoimDetail } =
    useSWR<GetMyMoimResponseType>(getMyMoimUrlWithQuery(moimId));

  return {
    moimDetailApiResponse: moimDetailApiResponse?.data,
    isValidatingMoimDetail,
  };
}

export default useInfoTab;
