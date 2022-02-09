import React from 'react';
import { withAuthPage } from '@/service/authService';
import { RootAppDefaultPagePropsType } from '@pages/_app';
import BoardDetail from '@/func-components/MyMoim/board/BoardDetail';

export interface BoardDetailPagePropsType extends RootAppDefaultPagePropsType {
  moimId: number;
  boardId: number;
}

function BoardDetailPage(props: BoardDetailPagePropsType) {
  return <BoardDetail {...props} />;
}

export default withAuthPage(BoardDetailPage);

export const getServerSideProps = withAuthPage.getServerSideProps(
  async ({
    context: {
      query: { moimId, boardId },
    },
  }) => {
    return {
      props: {
        moimId,
        boardId,
        hiddenFooter: true,
        hiddenHeader: true,
      },
    };
  },
);
