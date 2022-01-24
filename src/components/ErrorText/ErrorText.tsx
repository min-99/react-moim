import React from 'react';
import Typography from '@mui/material/Typography';

interface ErrorTextProps {
  message: string;
}

export default function ErrorText({ message, ...props }: ErrorTextProps) {
  return (
    <Typography variant="error" {...(props as any)}>
      {message}
    </Typography>
  );
}
