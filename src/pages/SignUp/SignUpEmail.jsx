import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import MuiInput from 'Components/MuiInput';
import React from 'react';

const SignUpEmail = ({ email, flag, handleValue, mailHandleChange, helpTextEmail, value }) => {
  return (
    <>
      {email === '직접입력' ? (
        <MuiInput
          name='email'
          label='직접입력'
          size='small'
          value={value.email}
          flag={flag}
          helperText={helpTextEmail}
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
