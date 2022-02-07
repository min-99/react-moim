import { GetMeeingListItemResponseType } from '@/api/myMoim';
import { Button, Typography } from '@mui/material';
import React from 'react';
import style from 'styled-components';

const Item = ({
  name,
  meeting,
  place,
  price,
  limitMemberCount,
  attendMemberCount,
}: GetMeeingListItemResponseType) => {
  return (
    <SItemLayout>
      <div className="title">
        <Typography variant="h6" style={{ color: 'skyblue' }}>
          {name}({attendMemberCount}/{limitMemberCount}명)
        </Typography>
      </div>
      <div className="content">
        <div className="container_left">
          <div className="date_container_top">
            <Typography variant="h6">금요일</Typography>
          </div>
          <div className="date_container_bottom">
            <Typography variant="h4">오늘</Typography>
          </div>
        </div>
        <div className="container_center">
          <div className="date">
            <Typography variant="h6" fontWeight={100}>
              {meeting}
            </Typography>
          </div>
          <div className="area">
            <Typography variant="h6" fontWeight={100}>
              {place}
            </Typography>
          </div>
          <div className="price">
            <Typography variant="h6" fontWeight={100}>
              {price}
            </Typography>
          </div>
        </div>
        <div className="container_right">
          <Button variant="outlined" size="small">
            참석
          </Button>
          <SShareUnberLineText>공유하기</SShareUnberLineText>
        </div>
      </div>
    </SItemLayout>
  );
};

const SItemLayout = style.div`
    & .title {
        margin-bottom: 5px;
    }
    & .content {
        display: flex;
        margin-bottom: 5px;
        & .container_left {
            border: 1px solid lightgray;
            padding: 4px 9px;
            border-radius: 9px;
            max-width: 55px;
            text-align: center;
            & .date_container_top {
               
            }
    
            & .date_container_bottom {
            }
        }

        & .container_center {
            flex: 1;
            padding: 0px 10px
        }
    }
    & + & {
      margin-top : 10px;
    }
`;

const SShareUnberLineText = style.div`
  font-size: 13px;
  font-weight: lighter;
  text-decoration: underline;
  padding: 10px;
`;

export default Item;
