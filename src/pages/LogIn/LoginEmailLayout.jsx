import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import LoginInput from './LoginInput';

const LoginEmailLayout = ({ flag, handleValue, email, mailHandleChange }) => {
  return (
    <CustomStack direction='row' justifyContent='center' spacing={2}>
      <LoginInput
        name='mailId'
        label='가입한메일아이디'
        flag={flag.mailId}
        handleValue={handleValue}
        helperText='메일아이디를 입력하세요'
      />
      {email === '직접입력' ? (
        <LoginInput
          name='email'
          label='직접입력'
          flag={flag.email}
          handleValue={handleValue}
          helperText='메일주소를 입력하세요'
        />
      ) : (
        <FormControl fullWidth {...(flag.email ? { error: true } : {})}>
          <InputLabel id='demo-simple-select-label'>가입메일주소</InputLabel>
          <Select
            name='email'
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={email}
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
    </CustomStack>
  );
};

export default LoginEmailLayout;

const CustomStack = styled(Stack)`
  width: 100%;
`;
