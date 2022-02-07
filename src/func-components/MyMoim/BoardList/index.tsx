import React from 'react';
import Item from './Item';
import RequireItem from './RequireItem';

interface BoardListPropsType {
  moimId: number;
}

const index = ({ moimId }: BoardListPropsType) => {
  return (
    <div>
      <RequireItem />
      <RequireItem />
      <Item />
      <Item />
    </div>
  );
};

export default index;
