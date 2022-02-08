import {
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../Components/Header';

let LoginButton = styled(Button)`
  &&& {
    height: 128px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors[1]};
  }
`;

let CheckID = styled(FormControlLabel)`
  &&& {
    color: ${({ theme }) => theme.colors[2]};
  }
`;

let CheckBox = styled(Checkbox)`
  &&& {
    color: ${({ theme, checked }) =>
      checked ? theme.colors[1] : theme.colors[2]};
    &:hover {
      color: ${({ theme }) => theme.colors[1]};
    }
  }
`;

let NaverBar = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #19ce60;
  width: 100%;
  color: white;
  height: 50px;
  text-align: center;
`;

let KakaoBar = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fee102;
  width: 100%;
  color: ${({ theme }) => theme.colors[0]};
  height: 50px;
`;

let SignUp = styled('div')`
  margin-top: 80px;
  background-color: #eee;
`;

const LogIn = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = event => {
    setChecked(event.target.checked);
  };

  let inputData = {
    id: '',
    password: '',
    idCheck: false,
  };

  let [idFlag, SetidFlag] = useState(false);
  let [pwFlag, SetpwFlag] = useState(false);

  return (
    <>
      <Header />
      <Container maxWidth='sm' style={{ marginTop: '80px' }}>
        <Grid container direction='row' justifyContent='space-between'>
          <Grid item sm={8.5} xs={8.5}>
            <Stack
              direction='column'
              justifyContent='center'
              alignItems='center'
              spacing={2}
            >
              <TextField
                id='id'
                label='아이디'
                variant='outlined'
                fullWidth
                InputLabelProps={{
                  style: { color: '#B9B9B9' },
                }}
                {...(idFlag
                  ? { helperText: '아이디를 입력하세요', error: true }
                  : {})}
              />
              <TextField
                id='password'
                label='비밀번호'
                type='password'
                autoComplete='current-password'
                fullWidth
                InputLabelProps={{
                  style: { color: '#B9B9B9' },
                }}
                {...(pwFlag
                  ? { helperText: '비밀번호를 입력하세요', error: true }
                  : {})}
              />
            </Stack>
          </Grid>
          <Grid item sm={3} xs={3}>
            <LoginButton
              variant='contained'
              onClick={() => {
                let id = document.getElementById('id');
                let password = document.getElementById('password');

                if (id.value === '') {
                  SetidFlag(true);
                  return;
                } else {
                  SetidFlag(false);
                }
                if (password.value === '') {
                  SetpwFlag(true);
                  return;
                } else {
                  SetpwFlag(false);
                }
              }}
            >
              로그인
            </LoginButton>
          </Grid>
        </Grid>
        <Grid container direction='row' alignItems='center'>
          <CheckID
            control={<CheckBox checked={checked} onChange={handleChange} />}
            label='아이디 저장'
          />
        </Grid>
        <Stack
          direction='column'
          justifyContent='center'
          alignItems='center'
          spacing={2}
          style={{
            marginTop: '80px',
          }}
        >
          <NaverBar>
            <span>네이버 아이디로 로그인</span>
          </NaverBar>
          <KakaoBar>
            <span>카카오 아이디로 로그인</span>
          </KakaoBar>
        </Stack>
        <SignUp>
          <div
            style={{ padding: '20px', fontSize: '1.5rem', color: '#4A4646' }}
          >
            <p>회원가입 하면</p>
            <p>1,000원 즉시 지급!</p>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '20px',
              fontSize: '0.8rem',
            }}
          >
            <div style={{ color: '#4A4646' }}>회원가입 ▸</div>
            <Stack
              direction='row'
              divider={
                <Divider
                  orientation='vertical'
                  sx={{ borderColor: '#4A4646' }}
                  flexItem
                />
              }
              spacing={2}
              style={{ color: '#707070' }}
            >
              <div>아이디 찾기</div>
              <div>비밀번호 찾기</div>
            </Stack>
          </div>
        </SignUp>
      </Container>
    </>
  );
};

export default LogIn;
