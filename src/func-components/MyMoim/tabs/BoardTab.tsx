import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import BoardList from '../board/BoardList';
import style from 'styled-components';
import useBoardTab from './hooks/useBoardTab';

interface BoardTabPropsType {
  moimId: number;
}

const BoardTab = ({ moimId }: BoardTabPropsType) => {
  const { categoryListApiResponse, categoryId, handleChange } = useBoardTab({
    moimId,
  });

  return (
    <SBoardTab>
      <div className="boardTab_top">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">전체보기</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={categoryId}
            label="category"
            onChange={handleChange}
          >
            {categoryListApiResponse?.map((obj) => (
              <MenuItem key={obj.id} value={obj.id}>
                {obj.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="boardList_content">
        <BoardList moimId={moimId} categoryId={Number(categoryId)}></BoardList>
      </div>
    </SBoardTab>
  );
};

const SBoardTab = style.div`
  & .boardTab_top {
    padding: 10px 15px;
  }
`;

export default BoardTab;
