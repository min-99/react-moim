import React, { useCallback } from 'react';
import SportsTennisOutlinedIcon from '@mui/icons-material/SportsTennisOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  Typography,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { useRouter } from 'next/router';

interface MoimListItemPropsType {
  moimId: number;
  moimImage: string;
  area: string;
  moimLoction: string;
  moimName: string;
  moimMemberCount: number;
}

function MoimListItem({
  moimId,
  moimImage,
  area,
  moimLoction,
  moimName,
  moimMemberCount,
}: MoimListItemPropsType) {
  const router = useRouter();
  const goToMyMoimDetail = useCallback((moimId: number) => {
    router.push(`/myMoim/${moimId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ListItem
      alignItems="flex-start"
      style={{ padding: '0', margin: 'auto' }}
      onClick={() => {
        goToMyMoimDetail(moimId);
      }}
    >
      <ListItemAvatar>
        <Avatar
          alt="dog-moim"
          variant="rounded"
          style={{ width: '50px', height: '50px' }}
          src={moimImage}
        />
      </ListItemAvatar>
      <Box style={{ flex: '1', margin: 'auto', paddingLeft: '10px' }}>
        <Box>
          <Avatar
            sx={{ bgcolor: blue[300] }}
            style={{
              width: '17px',
              height: '17px',
              display: 'inline-block',
            }}
          >
            <SportsTennisOutlinedIcon
              style={{ width: '12px', height: '12px' }}
            />
          </Avatar>
          <Typography component="span" variant="h6">
            &nbsp;{area}
          </Typography>
          <Typography component="span" variant="h6">
            {' '}
            <LocationOnOutlinedIcon
              style={{ width: '15px', height: '12px' }}
            ></LocationOnOutlinedIcon>
            {moimLoction}
          </Typography>
        </Box>
        <Box>
          <Typography component="span" variant="h5">
            {moimName}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography
          sx={{ display: 'inline', padding: '15px 10px' }}
          component="span"
          variant="body2"
          color="text.primary"
        >
          {moimMemberCount} 명
        </Typography>
      </Box>
    </ListItem>
  );
}
export default MoimListItem;
