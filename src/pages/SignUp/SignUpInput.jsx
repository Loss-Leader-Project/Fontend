import { Grid } from '@mui/material';
import React from 'react';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { brandColor, gray, mobile } from 'styles/theme';
import MuiInput from 'Components/MuiInput';

const SignUpInput = props => {
  return (
    <CustomGridContainer>
      <MustItem item lg={3} md={3} sm={3} xs={3}>
        <ColorMustIcon {...(props.NotMust && { NotMust: true })}>
          <FontAwesomeIcon icon={faDotCircle} size='xs' />
        </ColorMustIcon>
        <MustItemText>{props.itemText}</MustItemText>
      </MustItem>
      <Grid item lg={9} md={9} sm={9} xs={9}>
        <MuiInput
          name={props.name}
          label={props.label}
          type={props.type}
          autoComplete={props.autoComplete}
          size='small'
          value={props.value}
          flag={props.flag}
          helperText={props.helperText}
          onChange={props.handleValue}
        />
      </Grid>
    </CustomGridContainer>
  );
};

export default SignUpInput;

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
  ${mobile} {
    font-size: 0.625rem;
  }
`;

const ColorMustIcon = styled.span`
  color: ${brandColor};
  opacity: ${({ NotMust }) => (NotMust ? 0 : 1)};
`;
