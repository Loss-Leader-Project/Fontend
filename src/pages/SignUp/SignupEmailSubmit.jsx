import { Button, Grid, Stack, TextField } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { brandColor, gray } from 'styles/theme';
import { emailValidRequest } from './api';

const SignupEmailSubmit = props => {
  return (
    <CustomGridContainer>
      <MustItem item lg={3} md={3} sm={3} xs={3}></MustItem>
      <Grid item lg={9} md={9} sm={9} xs={9}>
        <CustomStack direction='row' justifyContent='center' spacing={2}>
          <TextField
            name='emailSubmit'
            fullWidth
            label='인증번호를 입력해주세요'
            variant='outlined'
            size='small'
            InputLabelProps={{
              style: { color: '#B9B9B9' },
            }}
            {...(props.flag ? { helperText: props.helpText, error: true } : {})}
            onChange={props.handleValue}
          />
          <EmailSubmitButton
            onClick={() => {
              emailValidRequest(props.value).then(res => {
                if (res.data === '인증성공') {
                  props.setEmailValidFlag(false);
                } else if (res.data.status) {
                  props.setEmailValidFlag(true);
                  props.handleFlag('emailSubmit', true);
                  props.sethelpText(res.data.message);
                }
              });
            }}
          >
            인증하기
          </EmailSubmitButton>
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

const EmailSubmitButton = styled(Button)`
  &&& {
    background-color: ${brandColor};
    color: white;
    font-size: 0.75rem;
    height: 2.5rem;
  }
`;

export default SignupEmailSubmit;
