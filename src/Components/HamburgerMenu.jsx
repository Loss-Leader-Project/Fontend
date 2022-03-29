import { Container, Grid } from '@mui/material';
import { loginCheckAction } from 'modules/reducers/loginReducer';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { gray, lightDark, mobile, tab } from 'styles/theme';
import { checkAccessToken } from 'utils/api';
import { ApiRq } from 'utils/apiConfig';
import { loginApiURL } from 'utils/apiUrl';

const HamburgerMenu = ({ menuopen, setMenuOpen }) => {
  const history = useHistory();

  const checkLogin = useSelector(state => state.loginReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginCheckAction(checkAccessToken()));
  });

  const historyMove = page => {
    history.push(page);
  };

  const localClear = async () => {
    await localStorage.clear();
    await dispatch(loginCheckAction(checkAccessToken()));
  };

  return (
    <CustomContainer
      onMouseLeave={() => {
        setMenuOpen('none');
      }}
    >
      <CustomGridContainer container className={menuopen}>
        <Box item>
          <GridText
            onClick={
              checkLogin
                ? () => {
                    historyMove('/my');
                  }
                : () => {
                    historyMove('/login');
                  }
            }
          >
            {checkLogin ? '마이페이지' : '로그인'}
          </GridText>
          <GridText
            onClick={
              checkLogin
                ? async () => {
                    await ApiRq('get', loginApiURL.LOCAL_GET_LOGIN_LOGOUT, null, null, {
                      Authorization: localStorage.getItem('access-token'),
                    });
                    localClear();
                    history.push('/login');
                  }
                : () => {
                    historyMove('/signup');
                  }
            }
          >
            {checkLogin ? '로그아웃' : '회원가입'}
          </GridText>
        </Box>

        <Grid item>
          <GridText>오늘은 뭐먹지</GridText>
          <CustomUl>
            <CustomLi>
              <span>골드</span> 매장할인 해드려요
            </CustomLi>
            <CustomLi>
              <span>실버</span> 매장상품 제공해드려요
            </CustomLi>
          </CustomUl>
        </Grid>
        <Grid item>
          <GridText>이용방법</GridText>
        </Grid>
        <Grid item>
          <GridText>FAQ</GridText>
        </Grid>
        <Grid item>
          <GridText>광고제휴/매장등록</GridText>
        </Grid>
        <Grid item>
          <GridText>문의하기</GridText>
        </Grid>
      </CustomGridContainer>
    </CustomContainer>
  );
};

export default HamburgerMenu;

const CustomContainer = styled(Container)`
  &&& {
    padding: 0;
    ${tab} {
      padding: 0 1.25rem;
    }

    ${mobile} {
      padding: 0 1.25rem;
    }
  }
`;

const CustomGridContainer = styled(Grid)`
  flex-direction: row;
  justify-content: flex-start;
  height: 0px;
  overflow: hidden;
  opacity: 0;
  transition: all 1s;

  .MuiGrid-item {
    width: 20%;
  }

  &.active {
    padding-top: 30px;
    height: 150px;
    opacity: 1;
  }

  &&& {
    ${tab} {
      flex-direction: column;
      justify-content: space-evenly;
      .MuiGrid-item {
        width: 100%;
      }
      &.active {
        height: 400px;
      }
    }
  }
`;

const CustomUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CustomLi = styled.li`
  font-size: 14px;
  color: ${gray};
  margin-bottom: 10px;
  span {
    color: ${lightDark};
    font-weight: bold;
  }
`;

const GridText = styled.p`
  color: ${lightDark};
  font-weight: bold;
  margin-bottom: 20px;
  cursor: pointer;
`;

const Box = styled(Grid)`
  display: none;

  ${mobile} {
    display: block;
  }
`;
