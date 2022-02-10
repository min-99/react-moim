import {
  GetBoardListResponseType,
  getBoardListUrlWithQuery,
  GetRequireBoardListResponseType,
  getRequireBoardListUrlWithQuery,
} from '@/api/myMoim/board';
import useSWR from 'swr';

interface useBoardListPropsType {
  moimId: number;
  categoryId: number;
}

function useBoardList({ moimId, categoryId }: useBoardListPropsType) {
  // 필독 게시판
  const { data: requireBoardListApiResponse } =
    useSWR<GetRequireBoardListResponseType>(
      getRequireBoardListUrlWithQuery({ moimId }),
    );

  // (일반) 게시판
  const { data: boardListApiResponse } = useSWR<GetBoardListResponseType>(
    getBoardListUrlWithQuery({ moimId, page: 1, size: 10, categoryId }),
  );
  return {
    requireBoardListApiResponse: requireBoardListApiResponse?.data,
    boardListApiResponse: boardListApiResponse?.data,
  };
}

export default useBoardList;
