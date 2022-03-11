import { Grid, TextField } from '@mui/material';
import React from 'react';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { brandColor, gray } from 'styles/theme';

const ApplyInput = ({ NotMust, itemText, name, label, password, autoComplete, flag, helperText, handleValue }) => {
  return (
    <CustomGridContainer>
      <MustItem item lg={3}>
        <ColorMustIcon {...(NotMust && { NotMust: true })}>
          <FontAwesomeIcon icon={faDotCircle} size='xs' />
        </ColorMustIcon>
        <MustItemText>{itemText}</MustItemText>
      </MustItem>
      <Grid item lg={9}>
        <TextField
          name={name}
          label={label}
          variant='outlined'
          fullWidth
          type={password && 'password'}
          autoComplete={autoComplete && 'current-password'}
          size='small'
          InputLabelProps={{
            style: { color: '#B9B9B9' },
          }}
          {...(flag ? { helperText: `${helperText}`, error: true } : {})}
          onChange={handleValue}
        />
      </Grid>
    </CustomGridContainer>
  );
};

export default ApplyInput;

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
`;

const ColorMustIcon = styled.span`
  color: ${brandColor};
  opacity: ${({ NotMust }) => (NotMust ? 0 : 1)};
`;
