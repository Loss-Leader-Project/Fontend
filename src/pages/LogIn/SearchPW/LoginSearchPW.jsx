import { Container, Grid, Stack } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import theme, { gray, lightGray } from 'styles/theme';
import { checkBlank, checkFlag } from 'pages/LogIn/check';
import { getPassword } from '../api';
import LoginEmailLayout from '../LoginEmailLayout';
import BasicModal from 'Components/BasicModal';
import FindPasswordModalBody from './FindPasswordModalBody';
import { regExpCheck } from 'pages/SignUp/check';
import MuiInput from 'Components/MuiInput';
import MuiButton from 'Components/MuiButton';

const LoginSearchPW = () => {
  const [email, setEmail] = useState('');

  const mailHandleChange = event => {
    setEmail(event.target.value);
  };

  const [SearchFromData, SetSearchFromData] = useState({
    id: '',
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
    id: false,
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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [vaild, setVaild] = useState('');
  const [helpTextBirthday, sethelpTextBirthday] = useState('주민번호를 앞에서부터 7자 입력하세요');

  const FindPasswordAPI = (id, birthday, email) => {
    getPassword(id, birthday, email).then(res => {
      if (res.data.status) {
        setVaild(false);
      } else {
        setVaild(true);
      }
    });
  };

  return (
    <div>
      <CustomContainer maxWidth='sm'>
        <Title>비밀번호 찾기</Title>
        <Grid container direction='row' justifyContent='space-between'>
          <Grid item sm={8.5} xs={8.5}>
            <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
              <MuiInput
                name='id'
                label='비밀번호를 찾고자 하는 아이디를 입력하세요'
                value={SearchFromData.id}
                flag={flag.id}
                onChange={handleValue}
                helperText='아이디를 입력하세요'
              />
              <MuiInput
                name='birthday'
                label='주민번호 앞6자리 및 뒤1자리(9110101)'
                value={SearchFromData.birthday}
                flag={flag.birthday}
                onChange={handleValue}
                helperText={helpTextBirthday}
              />
              <LoginEmailLayout
                email={email}
                flag={flag}
                value={{ mailId: SearchFromData.mailId, email: SearchFromData.email }}
                handleValue={handleValue}
                mailHandleChange={mailHandleChange}
              />
            </Stack>
          </Grid>
          <Grid item sm={3} xs={3}>
            <MuiButton
              sx={{
                height: '12.5rem',
                bgcolor: `${theme.colors.gray}`,
                '&:hover': { bgcolor: `${theme.colors.gray}` },
              }}
              content='비밀번호 찾기'
              onClick={async () => {
                if (await checkBlank(SearchFromData, flag, handleFlag)) return;
                if (await regExpCheck('birthday', SearchFromData.birthday, handleFlag, sethelpTextBirthday)) return;
                if (await checkFlag(flag)) return;

                await FindPasswordAPI(
                  SearchFromData.id,
                  SearchFromData.birthday,
                  `${SearchFromData.mailId}@${SearchFromData.email}`
                );

                handleOpen();
              }}
            />
          </Grid>
        </Grid>
        <CustomStack2 direction='row' justifyContent='center' spacing={2}>
          <MuiButton
            className='leftBtn'
            content='아이디 찾기'
            onClick={() => {
              history.push('/login/searchID');
            }}
          />

          <MuiButton
            className='rightBtn'
            content='로그인 하기'
            onClick={() => {
              history.push('/login');
            }}
          />
        </CustomStack2>
      </CustomContainer>
      <BasicModal
        open={open}
        handleClose={handleClose}
        title={'비밀번호 찾기 결과'}
        content={<FindPasswordModalBody handleClose={handleClose} vaild={vaild} />}
      />
    </div>
  );
};

const CustomContainer = styled(Container)`
  margin-top: 5rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
  padding: 0.625rem 0;
  color: ${gray};
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
    background-color: white;
  }

  .leftBtn:hover {
    background-color: white;
  }
`;

export default LoginSearchPW;
