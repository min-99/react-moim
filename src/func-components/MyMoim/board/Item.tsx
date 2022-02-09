import { Avatar, Typography } from '@mui/material';
import React from 'react';
import style from 'styled-components';

import { useRouter } from 'next/router';
import LikeText from '@/components/LikeText';
import CommentText from '@/components/CommentText';

const Item = () => {
  const router = useRouter();
  return (
    <SItem
      onClick={() => {
        router.push('/myMoim/1/board/1');
      }}
    >
      <div className="boardList_top">
        <Avatar
          alt="image"
          src="https://img.khan.co.kr/news/2019/11/29/l_2019112901003607500286631.jpg"
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
          탁민주
        </Typography>
        <Typography
          variant="h6"
          style={{
            display: 'inline-block',
            verticalAlign: 'super',
            float: 'right',
          }}
        >
          2월 6일 오후 10시 50분
        </Typography>
      </div>
      <div className="boardList_middle">
        <Typography variant="h6" className="boardList_title">
          안녕하세요 :)
        </Typography>
        <Typography variant="h6" className="boardList_content">
          - 이름 : 탁민주
        </Typography>
      </div>
      <div className="boardList_bottom">
        <LikeText isLike={false} count={0} />
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
          자유글
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
