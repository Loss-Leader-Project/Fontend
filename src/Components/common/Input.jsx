import { TextField } from '@mui/material';
import React from 'react';

const Input = ({ width, height, ...rest }) => <TextField style={{ width, height, ...rest }} {...rest} />;
export default Input;
