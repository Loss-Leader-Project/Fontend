import { TextField } from '@mui/material';
import React from 'react';

const MuiInput = props => {
  return (
    <TextField
      name={props.name}
      label={props.label}
      variant='outlined'
      fullWidth
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

export default MuiInput;
