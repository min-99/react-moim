import React from 'react';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { Typography } from '@mui/material';

interface LikeTextPropsType {
  isLike: boolean;
  title?: string;
  count: number;
}

const LikeText = ({ title = '좋아요', count }: LikeTextPropsType) => {
  return (
    <div className="like_container" style={{ display: 'inline-block' }}>
      <ThumbUpAltOutlinedIcon
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

export default LikeText;
