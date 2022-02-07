import React from 'react';
import useMeeting from './hook/useMeeting';
import Item from './Item';

interface MeetingListPropsType {
  moimId: number;
}

const MeetingList = ({ moimId }: MeetingListPropsType) => {
  const { meetingList } = useMeeting({ moimId });
  return (
    <div>
      {meetingList.map((obj, index) => (
        <Item
          key={index}
          name={obj.name}
          meeting={obj.meeting}
          place={obj.place}
          price={obj.price}
          limitMemberCount={obj.limitMemberCount}
          attendMemberCount={obj.attendMemberCount}
        />
      ))}
    </div>
  );
};

export default MeetingList;
