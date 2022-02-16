import { Button, Checkbox, Container, Divider, FormControlLabel, Grid, Stack } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { brandColor, gray, lightDark, lightGray } from 'styles/theme';
import { checkBlank, checkFlag } from 'pages/LogIn/check';
import LoginInput from './LoginInput';

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

    handleFlag(name, value === '');
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

  const history = useHistory();

  return (
    <>
      <Container maxWidth='sm' style={{ marginTop: '80px' }}>
        <Grid container direction='row' justifyContent='space-between'>
          <Grid item sm={8.5} xs={8.5}>
            <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
              <LoginInput name='id' label='아이디' flag={flag.id} onChange={handleValue} />
              <LoginInput
                name='password'
                label='비밀번호'
                type='password'
                autoComplete='current-password'
                flag={flag.password}
                onChange={handleValue}
              />
            </Stack>
          </Grid>
          <Grid item sm={3} xs={3}>
            <LoginButton
              variant='contained'
              onClick={async () => {
                if (await checkBlank(loginFormData, flag, handleFlag)) return;
                if (await checkFlag(flag)) return;
              }}
            >
              로그인
            </LoginButton>
          </Grid>
        </Grid>
        <Grid container direction='row' alignItems='center'>
          <CheckID control={<CheckBox checked={checked} onChange={handleChange} />} label='아이디 저장' />
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
            <Pointer
              className='left'
              onClick={() => {
                history.push('/signup');
              }}
            >
              회원가입 ▸
            </Pointer>
            <Stack
              direction='row'
              divider={<Divider orientation='vertical' sx={{ borderColor: '#4A4646' }} flexItem />}
              spacing={2}
            >
              <Pointer
                onClick={() => {
                  history.push('/login/searchID');
                }}
              >
                아이디 찾기
              </Pointer>
              <Pointer
                onClick={() => {
                  history.push('/login/searchPW');
                }}
              >
                비밀번호 찾기
              </Pointer>
            </Stack>
          </div>
        </SignUp>
      </Container>
    </>
  );
};

const CheckID = styled(FormControlLabel)`
  &&& {
    color: ${lightGray};
  }
`;

const CheckBox = styled(Checkbox)`
  &&& {
    color: ${({ checked }) => (checked ? brandColor : lightGray)};
    &:hover {
      color: ${brandColor};
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
  color: ${gray};
  height: 3.125rem;
`;

const SignUp = styled('div')`
  margin-top: 5rem;
  background-color: #eee;

  .bigFont {
    padding: 1.25rem;
    font-size: 1.5rem;
    color: ${lightDark};
  }

  .stack {
    display: flex;
    justify-content: space-between;
    padding: 1.25rem;
    font-size: 0.8rem;
    color: ${gray};
  }

  .left {
    color: ${lightDark};
  }
`;

const LoginButton = styled(Button)`
  &&& {
    height: 8rem;
    width: 100%;
    background-color: ${brandColor};
  }
`;

const Pointer = styled.div`
  cursor: pointer;
`;

export default LogIn;
