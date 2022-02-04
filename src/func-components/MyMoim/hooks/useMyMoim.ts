import { useCallback, useEffect, useMemo } from 'react';
import { getMyMoimListUrlWithQuery, GetMyMoimResponseType } from '@/api/myMoim';
import { KeyLoader } from 'swr';
import useSWRInfinite from 'swr/infinite';
import axios from 'axios';
import { shallowEqual, useSelector } from 'react-redux';
import { RootStateType } from '@/redux/reducers';

function useMyMoim() {
  const getKey: KeyLoader = (pageIndex) => {
    return getMyMoimListUrlWithQuery({
      page: pageIndex + 1,
      size: 20,
      sort: 'id,desc',
    });
  };

  const { authInfo } = useSelector(
    ({ auth: { authInfo } }: RootStateType) => ({
      authInfo,
    }),
    shallowEqual,
  );

  const fetcher = async (url: string) => {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${authInfo?.accessToken ?? ''}`,
      },
    });
    return response.data;
  };

  const {
    data: apiMyMoimListResponse,
    size: apiMyMoimListSize,
    setSize: setApiMyMoimListSize,
    isValidating: isLoadingMyMoimList,
  } = useSWRInfinite<GetMyMoimResponseType>(getKey, fetcher);

  const myMoimList = useMemo(() => {
    const response = apiMyMoimListResponse?.map((response) => {
      return (response as GetMyMoimResponseType).data?.items;
    });
    return (
      response?.reduce((prev = [], accumulator = []) =>
        prev?.concat(accumulator),
      ) || []
    );
  }, [apiMyMoimListResponse]);

  // 무한 스크롤
  const handleScroll = useCallback((): void => {
    const { innerHeight } = window; // 브라우저창 내용의 크기 (스크롤을 포함하지 않음)

    const { scrollHeight } = document.body; // 브라우저 총 내용의 크기 (스크롤을 포함한다)

    const { scrollTop } = document.documentElement; // 현재 스크롤바의 위치

    if (Math.round(scrollTop + innerHeight) >= scrollHeight) {
      // scrollTop과 innerHeight를 더한 값이 scrollHeight보다 크다면, 가장 아래에 도달했다는 의미이다.

      console.log('스크롤 이벤트 발생');
      setApiMyMoimListSize(apiMyMoimListSize + 1);
    }
  }, [apiMyMoimListSize, setApiMyMoimListSize]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleScroll]);

  return {
    myMoimList,
    isLoadingMyMoimList,
    hasMore: true,
  };
}

export default useMyMoim;
