import { Button, Container, Grid, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const LoginSearchPW = () => {
  const [SearchFromData, SetSearchFromData] = useState({
    id: '',
  });

  const handleValue = e => {
    const { name, value } = e.target;

    SetSearchFromData(previousState => {
      return { ...previousState, [name]: value };
    });
  };

  const [flag, SetFlag] = useState({
    id: false,
  });

  const handleFlag = (key, boolean) => {
    SetFlag(previousState => {
      return { ...previousState, [key]: boolean };
    });
  };

  const checkBlank = () => {
    for (let [key, value] of Object.entries(SearchFromData)) {
      if (value === '') handleFlag(key, true);
      else handleFlag(key, false);
    }
  };

  const history = useHistory();

  return (
    <div>
      <CustomContainer maxWidth='sm'>
        <Title>비밀번호 찾기</Title>
        <SubTitle>아이디 입력</SubTitle>
        <Grid container direction='row' justifyContent='space-between'>
          <Grid item sm={8.5} xs={8.5}>
            <TextField
              name='id'
              label='비밀번호를 찾고자 하는 아이디를 입력해주세요'
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
          </Grid>
          <Grid item sm={3} xs={3}>
            <SearchButton
              variant='contained'
              onClick={() => {
                checkBlank();
              }}
            >
              비밀번호 찾기
            </SearchButton>
          </Grid>
        </Grid>
        <CustomStack2 direction='row' justifyContent='center' spacing={2}>
          <Button
            className='leftBtn'
            onClick={() => {
              history.push('/login/searchID');
            }}
          >
            아이디 찾기
          </Button>
          <Button
            className='rightBtn'
            onClick={() => {
              history.push('/login');
            }}
          >
            로그인 하기
          </Button>
        </CustomStack2>
      </CustomContainer>
    </div>
  );
};

const CustomContainer = styled(Container)`
  margin-top: 5rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
  padding: 0.625rem 0;
  color: ${({ theme }) => theme.colors.gray};
`;

const SubTitle = styled.div`
  padding: 0.625rem 0;
  color: ${({ theme }) => theme.colors.gray};
`;

const CustomStack2 = styled(Stack)`
  width: 100%;
  margin-top: 1.25rem;

  Button {
    width: 100%;
    height: 3.75rem;
  }

  .leftBtn {
    border: 1px solid ${({ theme }) => theme.colors.lightGray};
    color: ${({ theme }) => theme.colors.gray};
  }

  .rightBtn {
    background-color: ${({ theme }) => theme.colors.brandColor};
    color: white;
  }

  .rightBtn:hover {
    background-color: ${({ theme }) => theme.colors.brandColor};
  }
`;

const SearchButton = styled(Button)`
  &&& {
    height: 3.5rem;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.gray};
  }
`;

export default LoginSearchPW;
