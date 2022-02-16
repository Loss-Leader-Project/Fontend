import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';

const SignUpEmail = ({ email, flag, handleValue, mailHandleChange, helpTextEmail }) => {
  return (
    <>
      {email === '직접입력' ? (
        <TextField
          name='email'
          label='직접입력'
          variant='outlined'
          fullWidth
          size='small'
          InputLabelProps={{
            style: { color: '#B9B9B9' },
          }}
          {...(flag ? { helperText: helpTextEmail, error: true } : {})}
          onChange={handleValue}
        />
      ) : (
        <FormControl fullWidth {...(flag ? { error: true } : {})}>
          <InputLabel id='demo-simple-select-label' sx={{ marginTop: '-0.4375rem' }}>
            주소를 선택하세요
          </InputLabel>
          <Select
            name='email'
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={email}
            size='small'
            label='가입메일주소'
            onChange={e => {
              mailHandleChange(e);
              handleValue(e);
            }}
          >
            <MenuItem value={'직접입력'}>직접입력</MenuItem>
            <MenuItem value={'naver.com'}>naver.com</MenuItem>
            <MenuItem value={'google.com'}>google.com</MenuItem>
            <MenuItem value={'daum.net'}>daum.net</MenuItem>
          </Select>
          {flag.email && <FormHelperText>메일주소를 선택해주세요</FormHelperText>}
        </FormControl>
      )}
    </>
  );
};

export default SignUpEmail;
