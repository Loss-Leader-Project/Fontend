import React from 'react';
import SignUpEmail from './SignUpEmail';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Stack, TextField } from '@mui/material';
import styled from 'styled-components';

const SignUpEmailLayout = props => {
  return (
    <CustomGridContainer>
      <MustItem item lg={3}>
        <ColorMustIcon>
          <FontAwesomeIcon icon={faDotCircle} size='xs' />
        </ColorMustIcon>
        <MustItemText>이메일</MustItemText>
      </MustItem>
      <Grid item lg={9}>
        <CustomStack direction='row' justifyContent='center' spacing={2}>
          <TextField
            name='mailId'
            label='가입한메일아이디'
            variant='outlined'
            fullWidth
            size='small'
            InputLabelProps={{
              style: { color: '#B9B9B9' },
            }}
            {...(props.flag.mailId ? { helperText: '아이디를 입력하세요', error: true } : {})}
            onChange={props.handleValue}
          />
          <SignUpEmail {...props} />
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
  color: ${({ theme }) => theme.colors.gray};
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
`;

const CustomStack = styled(Stack)`
  width: 100%;
`;
