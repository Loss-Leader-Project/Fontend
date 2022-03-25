import { Grid, Stack } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { brandColor, gray, mobile } from 'styles/theme';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MuiInput from 'Components/MuiInput';
import MuiButton from 'Components/MuiButton';
import { ApiRq } from 'utils/apiConfig';
import { signupApiURL } from 'utils/apiUrl';

const SignUpIDLayout = props => {
  const PostIdSame = () => {
    if (props.value === '') {
      props.handleFlag('id', true);
      return;
    }

    ApiRq('get', signupApiURL.LOCAL_GET_SIGNUP_IDCHECK, { loginId: props.value })
      .then(() => {
        alert('사용가능한 아이디입니다.');
      })
      .then(props.handleFlag('id', false))
      .catch(res => {
        if (res.data.status) {
          props.handleFlag('id', true);
          props.sethelpText(res.data.message);
        }
      });
  };

  return (
    <CustomGridContainer>
      <MustItem item lg={3} md={3} sm={3} xs={3}>
        <ColorMustIcon {...(props.NotMust && { NotMust: true })}>
          <FontAwesomeIcon icon={faDotCircle} size='xs' />
        </ColorMustIcon>
        <MustItemText>{props.itemText}</MustItemText>
      </MustItem>
      <Grid item lg={9} md={9} sm={9} xs={9}>
        <CustomStack direction='row' justifyContent='center' spacing={2}>
          <MuiInput
            name={props.name}
            label={props.label}
            size='small'
            value={props.value}
            flag={props.flag}
            helperText={props.helperText}
            onChange={props.handleValue}
            onKeyUp={props.onKeyUp}
          />
          <MuiButton
            content='중복확인'
            sx={{ fontSize: '0.75rem', height: '2.5rem', width: 'auto', padding: '5px' }}
            onClick={PostIdSame}
          />
        </CustomStack>
      </Grid>
    </CustomGridContainer>
  );
};

export default SignUpIDLayout;

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

const MustItemText = styled.div`
  font-size: 1rem;
  margin-left: 0.625rem;
  ${mobile} {
    font-size: 0.625rem;
  }
`;

const ColorMustIcon = styled.span`
  color: ${brandColor};
  opacity: ${({ NotMust }) => (NotMust ? 0 : 1)};
`;

const CustomStack = styled(Stack)`
  width: 100%;
`;
