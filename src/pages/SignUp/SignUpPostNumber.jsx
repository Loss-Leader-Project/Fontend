import { Grid, Stack } from '@mui/material';
import MuiButton from 'Components/MuiButton';
import MuiInput from 'Components/MuiInput';
import React from 'react';

const SignUpPostNumber = ({ SignupFormData, flag, handleValue, setSignupFormData, value }) => {
  const { daum } = window;

  return (
    <Grid item lg={9} md={9} sm={9} xs={9}>
      <Stack direction='row' spacing={1}>
        <MuiInput
          name='postNumber'
          label='우편번호를 입력하세요'
          size='small'
          value={value}
          flag={flag}
          helperText='우편번호를 입력하세요'
          onChange={handleValue}
        />
        <MuiButton
          content='우편번호'
          sx={{ fontSize: '0.75rem', height: '2.5rem', width: 'auto', padding: '5px' }}
          onClick={() => {
            new daum.Postcode({
              oncomplete: function (data) {
                setSignupFormData(previousState => {
                  return {
                    ...previousState,
                    postNumber: data.zonecode,
                    address: data.address,
                  };
                });
              },
            }).open();
          }}
        />
      </Stack>
    </Grid>
  );
};

export default SignUpPostNumber;
