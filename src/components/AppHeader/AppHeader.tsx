import React from 'react';
import styled from 'styled-components';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Typography } from '@mui/material';

interface DetailHeaderPropsType {
  title: string;
}

const AppHeader = ({ title }: DetailHeaderPropsType) => {
  return (
    <SAppHeader>
      <div className="header">
        <ArrowBackIosNewRoundedIcon
          style={{ margin: '0px 2px', paddingTop: '8px', paddingLeft: '2px' }}
          sx={{ fontSize: 23 }}
        />
        <div className="header_title">
          <Typography variant="h4" style={{ padding: '4px 0px' }}>
            {title}
          </Typography>
        </div>
        <FavoriteBorderRoundedIcon
          style={{ margin: '0px 2px', paddingTop: '5px', paddingLeft: '2px' }}
        />
        <ShareOutlinedIcon
          style={{ margin: '0px 2px', paddingTop: '5px', paddingLeft: '2px' }}
        />
        <MoreVertOutlinedIcon
          style={{ margin: '0px 2px', paddingTop: '5px', paddingLeft: '2px' }}
        />
      </div>
    </SAppHeader>
  );
};

const SAppHeader = styled.div`
  & .header {
    flex-wrap: nowrap;
    display: flex;
  }

  & .header_title {
    flex: 1;
    padding-top: 4px;
    margin: 0px 5px;
    display: inline-block;
  }
`;

export default AppHeader;
