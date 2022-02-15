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

const LogIn = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = event => {
    setChecked(event.target.checked);
    setLoginFormData(previousState => {
      return { ...previousState, idStore: event.target.checked };
    });
  };

  const [loginFormData, setLoginFormData] = useState({
    id: '',
    password: '',
    idStore: false,
  });

  const handleValue = e => {
    const { name, value } = e.target;
    setLoginFormData(previousState => {
      return { ...previousState, [name]: value };
    });
  };

  const [flag, SetFlag] = useState({
    id: false,
    password: false,
  });

  const handleFlag = (key, boolean) => {
    SetFlag(previousState => {
      return { ...previousState, [key]: boolean };
    });
  };

  const checkBlank = () => {
    for (let [key, value] of Object.entries(loginFormData)) {
      if (value === '') handleFlag(key, true);
      else handleFlag(key, false);
    }
  };

  return (
    <>
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
                name='id'
                label='아이디'
                variant='outlined'
                fullWidth
                InputLabelProps={{
                  style: { color: '#B9B9B9' },
                }}
                {...(flag.id
                  ? { helperText: '아이디를 입력하세요', error: true }
                  : {})}
                onChange={handleValue}
              />
              <TextField
                name='password'
                label='비밀번호'
                type='password'
                autoComplete='current-password'
                fullWidth
                InputLabelProps={{
                  style: { color: '#B9B9B9' },
                }}
                {...(flag.password
                  ? { helperText: '비밀번호를 입력하세요', error: true }
                  : {})}
                onChange={handleValue}
              />
            </Stack>
          </Grid>
          <Grid item sm={3} xs={3}>
            <LoginButton
              variant='contained'
              onClick={async () => {
                await checkBlank();
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
          <div className='bigFont'>
            <p>회원가입 하면</p>
            <p>3,000원 즉시 지급!</p>
          </div>

          <div className='stack'>
            <div className='left'>회원가입 ▸</div>
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

const CheckID = styled(FormControlLabel)`
  &&& {
    color: ${({ theme }) => theme.colors.lightGray};
  }
`;

const CheckBox = styled(Checkbox)`
  &&& {
    color: ${({ theme, checked }) =>
      checked ? theme.colors.brandColor : theme.colors.lightGray};
    &:hover {
      color: ${({ theme }) => theme.colors.brandColor};
    }
  }
`;

const NaverBar = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #19ce60;
  width: 100%;
  color: white;
  height: 3.125rem;
  text-align: center;
`;

const KakaoBar = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fee102;
  width: 100%;
  color: ${({ theme }) => theme.colors.gray};
  height: 3.125rem;
`;

const SignUp = styled('div')`
  margin-top: 5rem;
  background-color: #eee;

  .bigFont {
    padding: 1.25rem;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.lightDark};
  }

  .stack {
    display: flex;
    justify-content: space-between;
    padding: 1.25rem;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.gray};
  }

  .left {
    color: ${({ theme }) => theme.colors.lightDark};
  }
`;

const LoginButton = styled(Button)`
  &&& {
    height: 8rem;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.brandColor};
  }
`;

export default LogIn;
