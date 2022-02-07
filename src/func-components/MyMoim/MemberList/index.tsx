import { Typography } from '@mui/material';
import React from 'react';
import useMemberList from './hook/useMemberList';
import Item from './Item';

interface MemberListPropsType {
  moimId: number;
}

const MemberList = ({ moimId }: MemberListPropsType) => {
  const { memberList, totalMemberCount } = useMemberList({ moimId });
  return (
    <>
      <div style={{ marginTop: '30px', marginBottom: '15px' }}>
        <Typography variant="h4" style={{ padding: '4px 0px' }}>
          모임 멤버({totalMemberCount}명)
        </Typography>
      </div>
      {memberList.map((obj, index) => (
        <Item
          key={index}
          image={obj.image}
          name={obj.name}
          greeting={obj.greeting}
          role={obj.role}
        />
      ))}
    </>
  );
};

export default MemberList;
