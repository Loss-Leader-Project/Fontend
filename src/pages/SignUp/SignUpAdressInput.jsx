import { Grid, TextField } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { gray } from 'styles/theme';
import SignUpInput from './SignUpInput';

const SignUpAdressInput = ({ SignupFormData, flag, handleValue }) => {
  return (
    <>
      {SignupFormData.address === '' ? (
        <SignUpInput
          name='address'
          label='주소를 입력하세요'
          flag={flag}
          handleValue={handleValue}
          helperText='주소를 입력하세요'
          NotMust
        />
      ) : (
        <CustomGridContainer>
          <Grid item lg={3}></Grid>
          <Grid item lg={9}>
            <ColoredTextField
              name='address'
              label='주소를 입력하세요'
              variant='outlined'
              fullWidth
              size='small'
              value={SignupFormData.address}
              InputLabelProps={{
                style: { color: '#B9B9B9' },
                shrink: true,
              }}
              {...(flag.address ? { helperText: '주소를 입력하세요', error: true } : {})}
              onChange={handleValue}
            />
          </Grid>
        </CustomGridContainer>
      )}
    </>
  );
};

export default SignUpAdressInput;

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

const ColoredTextField = styled(TextField)`
  &&& {
    input {
      color: black;
    }
  }
`;
