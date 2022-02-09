import React from 'react';
import styled from 'styled-components';
import { Tab, Tabs } from '@mui/material';
import { TabType } from '@/types/myMoim';
import AppHeader from '@/components/AppHeader/AppHeader';

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
      <AppHeader title={moimName} />
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
  & .MuiTabs-flexContainer {
    justify-content: 'space-between';
  }
`;

export default DetailHeader;
