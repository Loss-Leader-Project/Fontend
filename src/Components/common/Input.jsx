import { TextField } from '@mui/material';
import React, { memo } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
const Input = ({ minLength, maxLength, width = '100%', height, ...rest }) => {
  return (
    <CustomField
      inputProps={{
        minLength,
        maxLength,
      }}
      style={{ width, height, ...rest }}
      {...rest}
    />
  );
};

const CustomField = styled(TextField)`
  .Mui-disabled {
    -webkit-text-fill-color: #000 !important;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      .MuiOutlinedInput-notchedOutline {
        border: none !important;
      }
    `}
`;
export default memo(Input);
