import {
  GetMemberListItemResponseType,
  GetMemberListResponseType,
  getMemberListUrlWithQuery,
} from '@/api/myMoim';
import { useMemo } from 'react';
import useSWR from 'swr';

interface useMemberListPropsType {
  moimId: number;
}

function useMemberList({ moimId }: useMemberListPropsType) {
  const { data: memberListApiResponse, isValidating: isValidatingMemberList } =
    useSWR<GetMemberListResponseType>(
      getMemberListUrlWithQuery({ moimId, page: 1, size: 20 }),
    );

  const memberList = useMemo(() => {
    return (memberListApiResponse?.data?.items ??
      []) as Array<GetMemberListItemResponseType>;
  }, [memberListApiResponse]);

  return {
    memberList,
    totalMemberCount: memberListApiResponse?.data?.totalCount,
    isValidatingMemberList,
  };
}

export default useMemberList;
