import {
  GetMeeingListItemResponseType,
  GetMeeingListResponseType,
  getMeeingListUrlWithQuery,
} from '@/api/myMoim';
import { useMemo } from 'react';
import useSWR from 'swr';

interface useMeetingPropType {
  moimId: number;
}

function useMeeting({ moimId }: useMeetingPropType) {
  const {
    data: meetingListApiResponse,
    isValidating: isValidatingMeetingList,
  } = useSWR<GetMeeingListResponseType>(
    getMeeingListUrlWithQuery({ moimId, page: 1, size: 3 }),
  );

  // 모임리스트 뿌려주는 부분부터 확인필요
  const meetingList = useMemo(() => {
    return (meetingListApiResponse?.data?.items ??
      []) as Array<GetMeeingListItemResponseType>;
  }, [meetingListApiResponse]);

  return {
    meetingList,
    isValidatingMeetingList,
  };
}

export default useMeeting;
