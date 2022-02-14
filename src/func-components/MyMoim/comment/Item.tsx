import { Avatar, Typography } from '@mui/material';
import React from 'react';
import style from 'styled-components';

const Item = () => {
  return (
    <SCommentLayout>
      <div className="commentContainer_top">
        <Avatar
          alt="image"
          src="https://img.khan.co.kr/news/2019/11/29/l_2019112901003607500286631.jpg"
          style={{ display: 'inline-block' }}
        />
      </div>
      <div className="commentContainer_middle">
        <div className="comment_layout">
          <div className="comment_layout_top">
            <Typography
              variant="h6"
              style={{
                display: 'inline-block',
                verticalAlign: 'super',
                paddingLeft: '8px',
              }}
            >
              김길동
            </Typography>
            <Typography
              variant="h6"
              style={{
                display: 'inline-block',
                verticalAlign: 'super',
                paddingLeft: '4px',
              }}
              color="blue"
            >
              모임장
            </Typography>
            <Typography
              variant="subtitle1"
              style={{
                display: 'inline-block',
                verticalAlign: 'super',
                float: 'right',
              }}
            >
              2월 6일 오후 10시 50분
            </Typography>
          </div>
          <div className="comment_layout_bottom">
            <Typography
              variant="h6"
              style={{
                display: 'inline-block',
                verticalAlign: 'super',
                paddingLeft: '8px',
              }}
            >
              안녕하세요! 앞으로 잘 부탁드려요!
            </Typography>
          </div>
        </div>
      </div>
      <div className="commentContainer_bottom"></div>
    </SCommentLayout>
  );
};

const SCommentLayout = style.div`
    display: flex;
    padding: 10px;

    & .commentContainer_middle {
        flex: 1;
        & .comment_layout {
            background-color: lightgray;
            position:relative;
            border-radius: 5px;
            margin: 4px 0px 0px 16px;
            padding: 5px;
            &::after {
                border-top:15px solid lightgray;
                border-left: 15px solid transparent;
                border-right: 0px solid transparent;
                border-bottom: 0px solid transparent;
                content:"";
                position:absolute;
                top:6px;
                left:-9px;
            }
        }
    }
`;

export default Item;
