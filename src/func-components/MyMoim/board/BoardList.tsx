import React from 'react';
import useBoardList from './hooks/useBoardList';
import Item from './Item';
import RequireItem from './RequireItem';

interface BoardListPropsType {
  moimId: number;
  categoryId: number;
}

const BoardList = ({ moimId, categoryId }: BoardListPropsType) => {
  const { requireBoardListApiResponse, boardListApiResponse } = useBoardList({
    moimId,
    categoryId,
  });

  return (
    <div>
      {requireBoardListApiResponse?.map((obj) => (
        <RequireItem key={obj.boardId} moimId={moimId} {...obj} />
      ))}
      {boardListApiResponse?.items?.map((obj, index) => (
        <Item key={index} moimId={moimId} {...obj} />
      ))}
    </div>
  );
};

export default BoardList;
