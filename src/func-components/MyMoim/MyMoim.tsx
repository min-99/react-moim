import React from 'react';
import { Box } from '@mui/system';
import { List, Skeleton, Typography } from '@mui/material';
import MoimListItem from './MoimListItem';
import useMyMoim from './hooks/useMyMoim';

function MyMoim() {
  const { myMoimList, isLoadingMyMoimList } = useMyMoim();

  return (
    <Box padding="15px 19px" width="100%">
      <Typography variant="h2">내 모임</Typography>
      <Box>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          {isLoadingMyMoimList ? (
            <>
              <Skeleton height="70px" />
              <Skeleton height="70px" />
              <Skeleton height="70px" />
            </>
          ) : (
            myMoimList.map((item) => {
              return (
                <MoimListItem
                  key={item.id}
                  moimImage={item.image}
                  area={item.area}
                  moimLoction={item.moimLoction}
                  moimName={item.moimName}
                  moimMemberCount={item.moimMemberCount}
                />
              );
            })
          )}
        </List>
      </Box>
    </Box>
  );
}

export default MyMoim;
