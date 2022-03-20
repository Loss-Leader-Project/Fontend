import { Grid, Stack } from '@mui/material';
import MuiButton from 'Components/MuiButton';
import MuiInput from 'Components/MuiInput';
import React from 'react';
import styled from 'styled-components';
import { gray } from 'styles/theme';
import { ApiRq } from 'utils/apiConfig';
import { signupApiURL } from 'utils/apiUrl';

const SignupEmailSubmit = props => {
  return (
    <CustomGridContainer>
      <MustItem item lg={3} md={3} sm={3} xs={3}></MustItem>
      <Grid item lg={9} md={9} sm={9} xs={9}>
        <CustomStack direction='row' justifyContent='center' spacing={2}>
          <MuiInput
            name='emailSubmit'
            label='인증번호를 입력해주세요'
            size='small'
            value={props.value}
            flag={props.flag}
            helperText={props.helpText}
            onChange={props.handleValue}
          />
          <MuiButton
            content='인증하기'
            sx={{ fontSize: '0.75rem', height: '2.5rem', width: 'auto', padding: '5px' }}
            onClick={() => {
              ApiRq(
                'post',
                signupApiURL.LOCAL_POST_SIGNUP_EMAILCHECK,
                null,
                { number: Number(props.value) },
                { emailverification: localStorage.getItem('email-token') }
              )
                .then(() => {
                  props.setEmailValidFlag(false);
                  props.handleFlag('emailSubmit', false);
                  localStorage.removeItem('email-token');
                })
                .catch(res => {
                  props.setEmailValidFlag(true);
                  props.handleFlag('emailSubmit', true);
                  props.sethelpText('이메일 인증 시간이 지났습니다. 다시 인증요청을 해주세요.');
                });
            }}
          />
        </CustomStack>
      </Grid>
    </CustomGridContainer>
  );
};

const CustomGridContainer = styled(Grid).attrs(props => ({
  container: true,
  direction: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}))`
  &&& {
    margin-top: 1rem;
  }
  color: ${gray};
`;

const MustItem = styled(Grid)`
  display: flex;
  flex-flow: row wrap;
  opacity: ${({ NotText }) => (NotText ? 0 : 1)};
`;

const CustomStack = styled(Stack)`
  width: 100%;
`;

export default SignupEmailSubmit;
