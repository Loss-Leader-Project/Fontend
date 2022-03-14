import React from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';

function MuiCheckbox({ handleValue, label, name }) {
  return <FormControlLabel control={<Checkbox name={name} onChange={handleValue} />} label={label} />;
}

export default MuiCheckbox;
