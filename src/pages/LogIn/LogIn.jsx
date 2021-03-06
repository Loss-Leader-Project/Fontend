import { Checkbox, Container, Divider, FormControlLabel, Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import styled from 'styled-components';
import { brandColor, gray, lightDark, lightGray } from 'styles/theme';
import LoginNaver from './LoginNaver';
import { KAKAO_AUTH_URL } from '../../utils/OAuth';
import { useDispatch } from 'react-redux';
import { loginCheckAction } from 'modules/reducers/loginReducer';
import { checkAccessToken } from 'utils/api';
import MuiInput from 'Components/MuiInput';
import MuiButton from 'Components/MuiButton';
import { checkBlankLogin, checkFlag } from 'utils/check';
import { ApiRq } from 'utils/apiConfig';
import { loginApiURL } from 'utils/apiUrl';

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

  const location = useLocation();

  const [token, setToken] = useState('');
  const [state, setState] = useState('');

  const getNaverToken = location => {
    if (location.hash) {
      setToken({ naver: location.hash.split('=')[1].split('&')[0] });
      setState(location.hash.split('=')[2].split('&')[0]);
    } else if (location.search) {
      setToken({ kakao: location.search.split('=')[1] });
    }
  };

  useEffect(() => {
    if (token !== '') {
      if ('naver' in token) {
        ApiRq('get', loginApiURL.LOCAL_GET_LOGIN_NAVER, {
          code: token.naver,
          state: state,
        }).then(res => {
          localStorage.setItem('access-token', res.headers.authorization.split(' ')[1]);
          history.push('/');
        });
      } else {
        ApiRq('get', loginApiURL.LOCAL_GET_LOGIN_KAKAO, { code: token.kakao }).then(res => {
          localStorage.setItem('access-token', res.headers.authorization.split(' ')[1]);
          history.push('/');
        });
      }
    } else {
      getNaverToken(location);
    }
  }, [location, token, history, state]);

  const dispatch = useDispatch();

  const PostLogin = async () => {
    if (await checkBlankLogin(loginFormData, flag, handleFlag)) return;

    if (await checkFlag(flag)) return;

    await ApiRq('post', loginApiURL.LOCAL_POST_LOGIN, null, {
      loginId: loginFormData.id,
      password: loginFormData.password,
    })
      .then(res => {
        localStorage.setItem('access-token', res.headers.authorization.split(' ')[1]);
        history.push('/');
      })
      .catch(error => {
        alert('????????? ????????? ???????????????. ?????? ??????????????????.');
      });

    dispatch(loginCheckAction(checkAccessToken()));
  };

  return (
    <>
      <Container maxWidth='sm' style={{ marginTop: '80px' }}>
        <Grid container direction='row' justifyContent='space-between'>
          <Grid item sm={8.5} xs={8.5}>
            <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
              <MuiInput
                name='id'
                label='?????????'
                flag={flag.id}
                value={loginFormData.id}
                onChange={handleValue}
                helperText='???????????? ??????????????????'
                onKeyUp={PostLogin}
              />
              <MuiInput
                name='password'
                label='????????????'
                type='password'
                autoComplete='current-password'
                value={loginFormData.password}
                flag={flag.password}
                onChange={handleValue}
                helperText='??????????????? ??????????????????'
                onKeyUp={PostLogin}
              />
            </Stack>
          </Grid>
          <Grid item sm={3} xs={3}>
            <MuiButton sx={{ height: '8rem' }} content='?????????' onClick={PostLogin} />
          </Grid>
        </Grid>
        <Grid container direction='row' alignItems='center'>
          <CheckID control={<CheckBox checked={checked} onChange={handleChange} />} label='????????? ??????' />
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
          <LoginNaver />
          <KakaoBtn href={KAKAO_AUTH_URL}>
            <img src={`${process.env.PUBLIC_URL}/images/kakao_login_large_narrow.png`} alt='kakaoLogin' />
          </KakaoBtn>
        </Stack>
        <SignUp>
          <div className='bigFont'>
            <p>???????????? ??????</p>
            <p>3,000??? ?????? ??????!</p>
          </div>

          <div className='stack'>
            <Pointer
              className='left'
              onClick={() => {
                history.push('/signup');
              }}
            >
              ???????????? ???
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
                ????????? ??????
              </Pointer>
              <Pointer
                onClick={() => {
                  history.push('/login/searchPW');
                }}
              >
                ???????????? ??????
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

const KakaoBtn = styled('a')`
  display: block;
  width: 17.3125rem;
  height: 3.75rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const SignUp = styled('div')`
  margin-top: 5rem;
  margin-bottom: 5rem;
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

const Pointer = styled.div`
  cursor: pointer;
`;

export default LogIn;
