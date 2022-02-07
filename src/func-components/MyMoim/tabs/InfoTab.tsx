import React from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import MemberList from '../MemberList';
import useInfoTab from './hooks/useInfoTab';
import MeetingList from '../MeetingList';

interface InfoTabPropsType {
  moimId: number;
}

const InfoTab = ({ moimId }: InfoTabPropsType) => {
  const { moimDetailApiResponse, isValidatingMoimDetail } = useInfoTab({
    moimId,
  });
  return (
    <div>
      <img
        src={moimDetailApiResponse?.image}
        alt={moimDetailApiResponse?.moimName}
        style={{ maxHeight: '50%' }}
      />
      <SInfoContentLayout>
        <Typography variant="h4">{moimDetailApiResponse?.moimName}</Typography>
        <Typography
          variant="h6"
          fontWeight={100}
          style={{ paddingTop: '9px', paddingBottom: '30px' }}
        >
          {moimDetailApiResponse?.moimDetail}
        </Typography>
        <div>
          <Typography variant="h4" style={{ padding: '4px 0px' }}>
            모임 정모
          </Typography>
        </div>
        <MeetingList moimId={moimId} />
        <MemberList moimId={moimId} />
      </SInfoContentLayout>
    </div>
  );
};

const SInfoContentLayout = styled.div`
  padding: 17px;
`;

export default InfoTab;
