import { TabType } from '@/types/myMoim';
import React from 'react';
import BoardTab from './tabs/BoardTab';
import DetailHeader from './DetailHeader';
import InfoTab from './tabs/InfoTab';
import PictureTab from './tabs/PictureTab';
import ChattingTab from './tabs/ChattingTab';

export interface MyMoimDetailPropsType {
  moimId?: number;
}

const Detail = (props: MyMoimDetailPropsType) => {
  const [selectTab, setSelectTab] = React.useState<TabType>('info');

  const handleChange = (event: React.SyntheticEvent, newValue: TabType) => {
    setSelectTab(newValue);
  };
  return (
    <div>
      <DetailHeader
        selectTab={selectTab}
        handleChange={handleChange}
      ></DetailHeader>
      {selectTab === 'info' && <InfoTab />}
      {selectTab === 'board' && <BoardTab />}
      {selectTab === 'picture' && <PictureTab />}
      {selectTab === 'chatting' && <ChattingTab />}
    </div>
  );
};

export default Detail;
