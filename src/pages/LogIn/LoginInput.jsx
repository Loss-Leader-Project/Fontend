import { TextField } from '@mui/material';
import React from 'react';

const LoginInput = props => {
  return (
    <>
      <TextField
        name={props.name}
        label={props.label}
        type={props.type}
        variant='outlined'
        autoComplete={props.autoComplete}
        fullWidth
        InputLabelProps={{
          style: { color: '#B9B9B9' },
        }}
        {...(props.flag ? { helperText: '비밀번호를 입력하세요', error: true } : {})}
        onChange={props.handleValue}
      />
    </>
  );
};

export default LoginInput;
