import React, { useEffect } from 'react';
import { Container, Grid, Stack } from '@mui/material';
import styled from 'styled-components';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { mobile, pc, tab } from 'styles/theme';
import { useDispatch, useSelector } from 'react-redux';
import { loginCheckAction } from 'modules/reducers/loginReducer';
import { checkAccessToken } from 'utils/api';
import { ApiRq } from 'utils/apiConfig';
import { loginApiURL } from 'utils/apiUrl';
import { useHistory } from 'react-router';

const Header = ({ menuopen, setMenuOpen }) => {
  const handleMenuOpenToggle = () => {
    if (menuopen === 'none') {
      setMenuOpen('active');
    } else {
      setMenuOpen('none');
    }
  };

  const checkLogin = useSelector(state => state.loginReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginCheckAction(checkAccessToken()));
  });

  const localClear = async () => {
    await localStorage.clear();
    await dispatch(loginCheckAction(checkAccessToken()));
  };

  const history = useHistory();

  return (
    <CustomContainer>
      <Grid container direction='row' justifyContent='center' alignItems='center'>
        <Grid item lg={2} md={2} sm={3} xs={2} onClick={handleMenuOpenToggle}>
          <FontAwesomeIcon icon={faBars} size='2x' />
        </Grid>
        <CustomLogoGrid item lg={8} md={8} sm={6} xs={10}>
          <Link to='/'>
            <Logo src={`${process.env.PUBLIC_URL}/images/LossLeader_logo_pc.png`} alt='logo'></Logo>
          </Link>
        </CustomLogoGrid>
        <User item lg={2} md={2} sm={3}>
          <Stack direction='row' justifyContent='center' alignItems='center' spacing={2}>
            <Link to={checkLogin ? '/my' : '/login'}>{checkLogin ? '마이페이지' : '로그인'}</Link>
            {checkLogin ? (
              <LogoutText
                onClick={async () => {
                  await ApiRq('get', loginApiURL.LOCAL_GET_LOGIN_LOGOUT, null, null, {
                    Authorization: localStorage.getItem('access-token'),
                  });
                  localClear();
                  history.push('/login');
                }}
              >
                로그아웃
              </LogoutText>
            ) : (
              <Link to='/signup'>회원가입</Link>
            )}
          </Stack>
        </User>
      </Grid>
    </CustomContainer>
  );
};

const LogoutText = styled.p`
  cursor: pointer;
`;

const Logo = styled('img')`
  display: block;
  margin-left: -2.5rem;
  ${pc} {
    width: 18.75rem;
  }
  ${tab} {
    width: 12.5rem;
    margin-left: 0px;
  }
`;

const User = styled(Grid)`
  ${mobile} {
    display: none;
  }
`;

const CustomContainer = styled(Container)`
  margin: 2rem 0 3rem;

  svg {
    cursor: pointer;
    transition: all 0.5s;
  }
  svg:hover {
    opacity: 0.7;
  }
`;

const CustomLogoGrid = styled(Grid)`
  display: flex;
  justify-content: center;

  ${mobile} {
    justify-content: flex-end;
  }
`;

export default Header;
