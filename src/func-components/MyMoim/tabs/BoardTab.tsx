import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React from 'react';
import BoardList from '../board/BoardList';
import style from 'styled-components';

interface BoardTabPropsType {
  moimId: number;
}

const BoardTab = ({ moimId }: BoardTabPropsType) => {
  const [category, setCategory] = React.useState<string>('');

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  return (
    <SBoardTab>
      <div className="boardTab_top">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">전체보기</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="category"
            onChange={handleChange}
          >
            <MenuItem value={1}>자유글</MenuItem>
            <MenuItem value={2}>공지사항</MenuItem>
            <MenuItem value={3}>가입인사</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="boardList_content">
        <BoardList moimId={moimId}></BoardList>
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
