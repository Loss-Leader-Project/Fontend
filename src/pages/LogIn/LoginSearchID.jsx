import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const LoginSearchID = () => {
  const [email, setEmail] = useState('');

  const mailHandleChange = event => {
    setEmail(event.target.value);
  };

  const [SearchFromData, SetSearchFromData] = useState({
    name: '',
    mailId: '',
    email: '',
  });

  const handleValue = e => {
    const { name, value } = e.target;

    SetSearchFromData(previousState => {
      return { ...previousState, [name]: value };
    });
  };

  const [flag, SetFlag] = useState({
    name: false,
    mailId: false,
    email: false,
  });

  const handleFlag = (key, boolean) => {
    SetFlag(previousState => {
      return { ...previousState, [key]: boolean };
    });
  };

  const checkBlank = () => {
    for (let [key, value] of Object.entries(SearchFromData)) {
      if (value === '') handleFlag(key, true);
      else if (value === '직접입력') handleFlag(key, true);
      else handleFlag(key, false);
    }
  };

  const history = useHistory();

  return (
    <div>
      <CustomContainer maxWidth='sm'>
        <Title>아이디 찾기</Title>
        <Grid container direction='row' justifyContent='space-between'>
          <Grid item sm={8.5} xs={8.5}>
            <Stack
              direction='column'
              justifyContent='center'
              alignItems='center'
              spacing={2}
            >
              <TextField
                name='name'
                label='이름'
                variant='outlined'
                fullWidth
                InputLabelProps={{
                  style: { color: '#B9B9B9' },
                }}
                {...(flag.name
                  ? { helperText: '이름을 입력하세요', error: true }
                  : {})}
                onChange={handleValue}
              />
              <CustomStack direction='row' justifyContent='center' spacing={2}>
                <TextField
                  name='mailId'
                  label='가입한메일아이디'
                  variant='outlined'
                  fullWidth
                  InputLabelProps={{
                    style: { color: '#B9B9B9' },
                  }}
                  {...(flag.mailId
                    ? { helperText: '아이디를 입력하세요', error: true }
                    : {})}
                  onChange={handleValue}
                />
                {email === '직접입력' ? (
                  <TextField
                    name='email'
                    label='직접입력'
                    variant='outlined'
                    fullWidth
                    InputLabelProps={{
                      style: { color: '#B9B9B9' },
                    }}
                    {...(flag.email
                      ? { helperText: '메일 주소를 입력하세요', error: true }
                      : {})}
                    onChange={handleValue}
                  />
                ) : (
                  <FormControl
                    fullWidth
                    {...(flag.email ? { error: true } : {})}
                  >
                    <InputLabel id='demo-simple-select-label'>
                      가입메일주소
                    </InputLabel>
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
                    {flag.email && (
                      <FormHelperText>메일주소를 선택해주세요</FormHelperText>
                    )}
                  </FormControl>
                )}
              </CustomStack>
            </Stack>
          </Grid>
          <Grid item sm={3} xs={3}>
            <SearchButton
              variant='contained'
              onClick={() => {
                checkBlank();
              }}
            >
              아이디 찾기
            </SearchButton>
          </Grid>
        </Grid>
        <CustomStack2 direction='row' justifyContent='center' spacing={2}>
          <Button
            className='leftBtn'
            onClick={() => {
              history.push('/login/searchPW');
            }}
          >
            비밀번호 찾기
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

const SearchButton = styled(Button)`
  &&& {
    height: 8rem;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.gray};
  }
`;

const CustomStack = styled(Stack)`
  width: 100%;
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

const Title = styled.div`
  font-size: 1.5rem;
  padding: 0.625rem 0;
  color: ${({ theme }) => theme.colors.gray};
`;

const CustomContainer = styled(Container)`
  margin-top: 5rem;
`;

export default LoginSearchID;
