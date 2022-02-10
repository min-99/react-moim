import { Avatar, Typography } from '@mui/material';
import React from 'react';
import style from 'styled-components';

import { useRouter } from 'next/router';
import LikeText from '@/components/LikeText';
import CommentText from '@/components/CommentText';
import { GetBoardItemResponseDataType } from '@/api/myMoim/board';

const Item = ({
  moimId,
  profileImage,
  memberName,
  title,
  createDate,
  updateDate,
  boardCategory,
  boardImage,
  likeCount,
}: GetBoardItemResponseDataType & { moimId: number }) => {
  const router = useRouter();
  return (
    <SItem
      onClick={() => {
        router.push(`/myMoim/${moimId}/board/1`);
      }}
    >
      <div className="boardList_top">
        <Avatar
          alt={memberName}
          src={profileImage}
          sx={{ width: 24, height: 24 }}
          style={{ display: 'inline-block' }}
        />
        <Typography
          variant="h6"
          style={{
            display: 'inline-block',
            verticalAlign: 'super',
            paddingLeft: '8px',
          }}
        >
          {memberName}
        </Typography>
        <Typography
          variant="h6"
          style={{
            display: 'inline-block',
            verticalAlign: 'super',
            float: 'right',
          }}
        >
          {updateDate}
        </Typography>
      </div>
      <div className="boardList_middle">
        <Typography variant="h6" className="boardList_title">
          {title}
        </Typography>
        <Typography variant="h6" className="boardList_content">
          (내용 줄여서 보여줄 예정)
        </Typography>
      </div>
      <div className="boardList_bottom">
        <LikeText isLike={false} count={likeCount} />
        <CommentText count={0} />
        <Typography
          variant="subtitle1"
          component="div"
          style={{
            display: 'inline-block',
            verticalAlign: 'super',
            float: 'right',
            marginRight: '10px',
          }}
        >
          {boardCategory.name}
        </Typography>
      </div>
    </SItem>
  );
};

const SItem = style.div`
    margin : 0px 15px;
 
    & .boardList_bottom {
        border-top: 1px solid aliceblue;
        padding: 4px 0px;
        margin-top: 10px;
    }

    & + & {
        border-top: 1px solid lightgray;
        margin-top: 10px;
        padding-top : 11px;
        
    }

    &:last-child {
        border-bottom: 1px solid lightgray;
    }
`;

export default Item;
