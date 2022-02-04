import { Avatar, Typography } from '@mui/material';
import React from 'react';
import style from 'styled-components';

const Item = () => {
  return (
    <SMemberItemLayout>
      <div className="container_left">
        <Avatar
          alt="profile"
          src="https://newsimg.hankookilbo.com/cms/articlerelease/2021/07/31/8f8a6f47-ad4a-468e-9fd1-cb4f89a03ddd.jpg"
        />
      </div>
      <div className="container_center">
        <div className="name">
          <Typography variant="h6">탁민주</Typography>
        </div>
        <div className="greeting">
          <Typography variant="h6">안녕하세요</Typography>
        </div>
      </div>
      <div className="container_right">
        <div className="role">
          <Typography variant="h6" style={{ color: 'skyblue' }}>
            모임장
          </Typography>
        </div>
      </div>
    </SMemberItemLayout>
  );
};

const SMemberItemLayout = style.div`
    display: flex;

    & .container_center {
        flex: 1;
        margin-left: 10px;
    }
    & + & {
        margin-top: 7px;
    }
`;

export default Item;
