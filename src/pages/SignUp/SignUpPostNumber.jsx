import { Button, Grid, Stack, TextField } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { brandColor } from 'styles/theme';

const SignUpPostNumber = ({ SignupFormData, flag, handleValue, setSignupFormData }) => {
  const { daum } = window;

  return (
    <Grid item lg={9}>
      <Stack direction='row' spacing={1}>
        {SignupFormData.postNumber === '' ? (
          <TextField
            name='postNumber'
            label='우편번호를 입력하세요'
            variant='outlined'
            fullWidth
            size='small'
            InputLabelProps={{
              style: { color: '#B9B9B9' },
            }}
            {...(flag ? { helperText: '우편번호를 입력하세요', error: true } : {})}
            onChange={handleValue}
          />
        ) : (
          <ColoredTextField
            name='postNumber'
            label='우편번호를 입력하세요'
            variant='outlined'
            fullWidth
            size='small'
            value={SignupFormData.postNumber}
            InputLabelProps={{
              style: { color: '#B9B9B9' },
              shrink: true,
            }}
            {...(flag ? { helperText: '우편번호를 입력하세요', error: true } : {})}
            onChange={handleValue}
          />
        )}

        <PostNumButton
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
        >
          <span>우편번호</span>
        </PostNumButton>
      </Stack>
    </Grid>
  );
};

export default SignUpPostNumber;

const PostNumButton = styled(Button)`
  &&& {
    background-color: ${brandColor};
    color: white;
    font-size: 0.75rem;
    height: 2.5rem;
  }
`;

const ColoredTextField = styled(TextField)`
  &&& {
    input {
      color: black;
    }
  }
`;
