import { Typography } from '@mui/material';
import React from 'react';
import style from 'styled-components';

const RequireItem = () => {
  return (
    <SRequireItem>
      <div className="require_icon">
        <Typography variant="h6" noWrap color="blue">
          [필독]
        </Typography>
      </div>
      <div className="require_content">
        <Typography variant="h6" noWrap>
          가입자 자기소개서 양식
        </Typography>
      </div>
    </SRequireItem>
  );
};

const SRequireItem = style.div`
padding: 7px 0px;
margin: 0px 15px;
line-height: 11px;

  & .require_icon {
      display: inline-block;
  }

  & .require_content {
    display: inline-block;
    margin-left: 5px;
  }

  & + & {
    border-top: 1px solid lightgray;
  }

  &:last-child {
    border-bottom: 1px solid lightgray;
  }
`;

export default RequireItem;
