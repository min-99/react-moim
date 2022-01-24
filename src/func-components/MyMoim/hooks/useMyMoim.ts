import { useCallback, useMemo, useState } from 'react';
import { getMyMoimListUrlWithQuery, GetMyMoimResponseType } from '@/api/myMoim';
import useSWR from 'swr';

function useMyMoim() {
  const [page, setPage] = useState(1);

  const { data: apiMyMoimListResponse, isValidating: isLoadingMyMoimList } =
    useSWR<GetMyMoimResponseType>(getMyMoimListUrlWithQuery({ page }));

  const nextMyMoimList = useCallback(() => {
    console.log('실행');
    setPage((prevState) => prevState + 1);
  }, []);

  const myMoimList = useMemo(() => {
    return apiMyMoimListResponse?.data ?? [];
  }, [apiMyMoimListResponse]);

  return {
    myMoimList,
    isLoadingMyMoimList,
    nextMyMoimList,
    hasMore: true,
  };
}

export default useMyMoim;
