import { GetRequireBoardListResponseDataType } from '@/api/myMoim/board';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import style from 'styled-components';

const RequireItem = ({
  moimId,
  boardId,
  title,
}: GetRequireBoardListResponseDataType & { moimId: number }) => {
  const router = useRouter();
  return (
    <SRequireItem
      data-id={boardId}
      onClick={() => {
        router.push(`/myMoim/${moimId}/board/${boardId}`);
      }}
    >
      <div className="require_icon">
        <Typography variant="h6" noWrap color="blue">
          [필독]
        </Typography>
      </div>
      <div className="require_content">
        <Typography variant="h6" noWrap>
          {title}
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
