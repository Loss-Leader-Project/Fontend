import { Button } from '@mui/material';
import React from 'react';
import theme from 'styles/theme';

const style = {
  width: '100%',
  bgcolor: theme.colors.brandColor,
  color: 'white',
  '&:hover': { bgcolor: theme.colors.brandColor },
};

const MuiButton = ({ className, content, sx, onClick }) => {
  return (
    <Button className={className} variant='contained' sx={sx ? { ...style, ...sx } : style} onClick={onClick}>
      {content}
    </Button>
  );
};

export default MuiButton;
