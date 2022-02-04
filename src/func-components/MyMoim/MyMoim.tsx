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
        <List sx={{ width: '100%' }}>
          {isLoadingMyMoimList ? (
            <>
              <Skeleton height="70px" />
              <Skeleton height="70px" />
              <Skeleton height="70px" />
            </>
          ) : (
            myMoimList.map((obj) => {
              return (
                <MoimListItem
                  key={obj.id}
                  moimId={obj.id}
                  moimImage={obj.image}
                  area={obj.area}
                  moimLoction={obj.area}
                  moimName={obj.moimName}
                  moimMemberCount={obj.moimMemberCount}
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
