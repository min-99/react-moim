import React from 'react';
import { Box } from '@mui/system';
import { List, Typography } from '@mui/material';
import MoimListItem from './MoimListItem';

function MyMoim() {
  return (
    <Box padding="15px 19px" width="100%">
      <Typography variant="h2">내 모임</Typography>
      <Box>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          <MoimListItem
            moimImage="https://img.khan.co.kr/news/2019/11/29/l_2019112901003607500286631.jpg"
            area="관악구"
            moimLoction="미성체육관"
            moimName="포텐셜"
            moimMemberCount={120}
          />
        </List>
      </Box>
    </Box>
  );
}

export default MyMoim;
