import { Avatar, Typography } from '@mui/material';
import React from 'react';
import style from 'styled-components';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';

const Item = () => {
  return (
    <SItem>
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
        <div className="like_container">
          <ThumbUpAltOutlinedIcon
            style={{ width: '18px', height: '15px', padding: '3px' }}
          />
          <Typography
            variant="subtitle1"
            component="div"
            style={{ display: 'inline-block', verticalAlign: 'super' }}
          >
            좋아요
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            color="blue"
            style={{
              display: 'inline-block',
              verticalAlign: 'super',
              padding: '0px 3px',
            }}
          >
            6
          </Typography>
        </div>

        <div className="comment_container">
          <ModeCommentOutlinedIcon
            style={{ width: '18px', height: '15px', padding: '3px' }}
          />
          <Typography
            variant="subtitle1"
            component="div"
            style={{ display: 'inline-block', verticalAlign: 'super' }}
          >
            댓글
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            color="blue"
            style={{
              display: 'inline-block',
              verticalAlign: 'super',
              padding: '0px 3px',
            }}
          >
            1
          </Typography>
        </div>
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
        & .like_container {
            display: inline-block;
        }
        & .comment_container {
            display: inline-block;
        }
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
