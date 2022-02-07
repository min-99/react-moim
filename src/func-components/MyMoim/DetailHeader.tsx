import React from 'react';
import styled from 'styled-components';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Tab, Tabs, Typography } from '@mui/material';
import { TabType } from '@/types/myMoim';

interface DetailHeaderPropsType {
  moimName: string;
  selectTab: TabType;
  handleChange: (event: React.SyntheticEvent, newValue: TabType) => void;
}

const DetailHeader = ({
  moimName,
  selectTab,
  handleChange,
}: DetailHeaderPropsType) => {
  return (
    <SDetailHeader>
      <div className="header">
        <ArrowBackIosNewRoundedIcon
          style={{ margin: '0px 2px', paddingTop: '8px', paddingLeft: '2px' }}
          sx={{ fontSize: 23 }}
        />
        <div className="header_title">
          <Typography variant="h4" style={{ padding: '4px 0px' }}>
            {moimName}
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
      <Tabs value={selectTab} onChange={handleChange}>
        <Tab
          value={'info' as TabType}
          label="정보"
          style={{ minWidth: 'auto' }}
        />
        <Tab
          value={'board' as TabType}
          label="게시판"
          style={{ minWidth: 'auto' }}
        />
        <Tab
          value={'picture' as TabType}
          label="사진첩"
          style={{ minWidth: 'auto' }}
        />
        <Tab
          value={'chatting' as TabType}
          label="채팅"
          style={{ minWidth: 'auto' }}
        />
      </Tabs>
    </SDetailHeader>
  );
};

const SDetailHeader = styled.div`
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

  & .MuiTabs-flexContainer {
    justify-content: 'space-between';
  }
`;

export default DetailHeader;
