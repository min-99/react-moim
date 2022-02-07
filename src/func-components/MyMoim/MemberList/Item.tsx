import { GetMemberListItemResponseType } from '@/api/myMoim';
import { Avatar, Typography } from '@mui/material';
import React from 'react';
import style from 'styled-components';

const Item = ({
  image,
  name,
  greeting,
  role,
}: GetMemberListItemResponseType) => {
  return (
    <SMemberItemLayout>
      <div className="container_left">
        <Avatar alt={name} src={image} />
      </div>
      <div className="container_center">
        <div className="name">
          <Typography variant="h6">{name}</Typography>
        </div>
        <div className="greeting">
          <Typography variant="h6">{greeting}</Typography>
        </div>
      </div>
      <div className="container_right">
        <div className="role">
          <Typography variant="h6" style={{ color: 'skyblue' }}>
            {role}
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
