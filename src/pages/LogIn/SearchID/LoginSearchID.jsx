import { Button, Container, Grid, Stack } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { checkBlank, checkFlag } from 'pages/LogIn/check';
import { brandColor, gray, lightGray } from 'styles/theme';
import LoginInput from '../LoginInput';
import FindIdModalBody from './FindIdModalBody';
import { postFindId } from '../api';
import BasicModal from 'Components/BasicModal';
import LoginEmailLayout from '../LoginEmailLayout';
import { regExpCheck } from 'pages/SignUp/check';

const LoginSearchID = () => {
  const [email, setEmail] = useState('');

  const mailHandleChange = event => {
    setEmail(event.target.value);
  };

  const [SearchFromData, SetSearchFromData] = useState({
    name: '',
    birthday: '',
    mailId: '',
    email: '',
  });

  const handleValue = e => {
    const { name, value } = e.target;

    SetSearchFromData(previousState => {
      return { ...previousState, [name]: value };
    });

    handleFlag(name, value === '');
  };

  const [flag, SetFlag] = useState({
    name: false,
    birthday: false,
    mailId: false,
    email: false,
  });

  const handleFlag = (key, boolean) => {
    SetFlag(previousState => {
      return { ...previousState, [key]: boolean };
    });
  };

  const history = useHistory();

  const [findId, setFindId] = useState('');

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [helpTextBirthday, sethelpTextBirthday] = useState('주민번호를 앞에서부터 7자 입력하세요');

  const FindIdAPI = data => {
    postFindId({ ...data }).then(res => {
      if (res.data.loginId) {
        setFindId(<FindIdModalBody id={res.data.loginId} valid={true} />);
      } else if (res.data.status === 404) {
        setFindId(<FindIdModalBody valid={false} />);
      }
    });
  };

  return (
    <div>
      <CustomContainer maxWidth='sm'>
        <Title>아이디 찾기</Title>
        <Grid container direction='row' justifyContent='space-between'>
          <Grid item sm={8.5} xs={8.5}>
            <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
              <LoginInput
                name='name'
                label='이름'
                flag={flag.name}
                handleValue={handleValue}
                helperText='아이디를 입력하세요'
              />
              <LoginInput
                name='birthday'
                label='주민번호 앞6자리 및 뒤1자리(9110101)'
                flag={flag.birthday}
                handleValue={handleValue}
                helperText={helpTextBirthday}
              />
              <LoginEmailLayout
                email={email}
                flag={flag}
                handleValue={handleValue}
                mailHandleChange={mailHandleChange}
              />
            </Stack>
          </Grid>
          <Grid item sm={3} xs={3}>
            <SearchButton
              variant='contained'
              onClick={async () => {
                if (await checkBlank(SearchFromData, flag, handleFlag)) return;

                if (await regExpCheck('birthday', SearchFromData.birthday, handleFlag)) return;

                if (await regExpCheck('birthday', SearchFromData.birthday, handleFlag, sethelpTextBirthday)) return;

                if (await checkFlag(flag)) return;

                await FindIdAPI(SearchFromData);

                handleOpen();
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
      <BasicModal open={open} handleClose={handleClose} title={'아이디 찾기 결과'} content={findId} />
    </div>
  );
};

const SearchButton = styled(Button)`
  &&& {
    height: 12.5rem;
    width: 100%;
    background-color: ${gray};
  }
`;

const CustomStack2 = styled(Stack)`
  width: 100%;
  margin-top: 1.25rem;

  Button {
    width: 100%;
    height: 3.75rem;
  }

  .leftBtn {
    border: 1px solid ${lightGray};
    color: ${gray};
  }

  .rightBtn {
    background-color: ${brandColor};
    color: white;
  }

  .rightBtn:hover {
    background-color: ${brandColor};
  }
`;

const Title = styled.div`
  font-size: 1.5rem;
  padding: 0.625rem 0;
  color: ${gray};
`;

const CustomContainer = styled(Container)`
  margin-top: 5rem;
`;

export default LoginSearchID;
