import { TextField } from '@mui/material';
import React from 'react';
import styled, { css } from 'styled-components';

const MuiInput = props => {
  return (
    <CustomField
      disabled={props.disabled}
      id={props.id}
      name={props.name}
      label={props.label}
      variant='outlined'
      fullWidth
      placeholder={props.placeholder}
      type={props.type}
      autoComplete={props.autoComplete}
      size={props.size === 'small' ? 'small' : 'medium'}
      value={props.value}
      inputProps={props.inputProps ? props.inputProps : {}}
      InputLabelProps={
        props.InputLabelProps
          ? props.InputLabelProps
          : {
              style: { color: '#B9B9B9' },
            }
      }
      {...(props.flag ? { helperText: `${props.helperText}`, error: true } : {})}
      onChange={props.onChange}
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

  .MuiOutlinedInput-root {
    height: 2.5rem;
    & fieldset,
    &.Mui-focused fieldset,
    &:hover fieldset {
      border-color: #8a8a8a;
    }
  }
`;

export default MuiInput;
