import React from 'react';
import SignUpEmail from './SignUpEmail';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Stack } from '@mui/material';
import styled from 'styled-components';
import { gray, mobile } from 'styles/theme';
import { regExpCheck } from './check';
import { emailRequest } from './api';
import MuiInput from 'Components/MuiInput';
import MuiButton from 'Components/MuiButton';

const SignUpEmailLayout = props => {
  return (
    <CustomGridContainer>
      <MustItem item lg={3} md={3} sm={3} xs={3}>
        <ColorMustIcon>
          <FontAwesomeIcon icon={faDotCircle} size='xs' />
        </ColorMustIcon>
        <MustItemText>이메일</MustItemText>
      </MustItem>
      <Grid item lg={9} md={9} sm={9} xs={9}>
        <CustomStack direction='row' justifyContent='center' spacing={2}>
          <MuiInput
            name='mailId'
            label='가입한메일아이디'
            size='small'
            flag={props.flag}
            value={props.value.mailId}
            helperText={props.helpTextMailID}
            onChange={props.handleValue}
          />
          <SignUpEmail {...props} />
          <MuiButton
            content='인증요청'
            sx={{ fontSize: '0.75rem', height: '2.5rem', width: 'auto', padding: '5px' }}
            onClick={async () => {
              if (
                await regExpCheck(
                  'email',
                  props.userEmail,
                  props.handleFlag,
                  props.sethelpTextMailID,
                  props.sethelpTextEmail
                )
              )
                return;

              await emailRequest(props.userEmail);

              props.handleFlag('emailSubmit', true);
              props.sethelpTextEmailSubmit('인증유효기간 3분이내에 입력해주세요');
            }}
          />
        </CustomStack>
      </Grid>
    </CustomGridContainer>
  );
};

export default SignUpEmailLayout;

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

const ColorMustIcon = styled.span`
  color: ${({ theme }) => theme.colors.brandColor};
  opacity: ${({ NotMust }) => (NotMust ? 0 : 1)};
`;

const MustItemText = styled.div`
  font-size: 1rem;
  margin-left: 0.625rem;
  ${mobile} {
    font-size: 0.625rem;
  }
`;

const CustomStack = styled(Stack)`
  width: 100%;
`;
