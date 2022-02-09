import React from 'react';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { Typography } from '@mui/material';

interface CommentTextPropsType {
  title?: string;
  count: number;
}

const CommentText = ({ title = '댓글', count }: CommentTextPropsType) => {
  return (
    <div className="comment_container" style={{ display: 'inline-block' }}>
      <ModeCommentOutlinedIcon
        style={{ width: '18px', height: '15px', padding: '3px' }}
      />
      <Typography
        variant="subtitle1"
        component="div"
        style={{ display: 'inline-block', verticalAlign: 'super' }}
      >
        {title}
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
        {count}
      </Typography>
    </div>
  );
};

export default CommentText;
