import { Button, Grid, Stack, TextField } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { brandColor, gray, mobile } from 'styles/theme';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CheckIdSame } from './api';

const SignUpIDLayout = props => {
  return (
    <CustomGridContainer>
      <MustItem item lg={3} md={3} sm={3} xs={3}>
        <ColorMustIcon {...(props.NotMust && { NotMust: true })}>
          <FontAwesomeIcon icon={faDotCircle} size='xs' />
        </ColorMustIcon>
        <MustItemText>{props.itemText}</MustItemText>
      </MustItem>
      <Grid item lg={9} md={9} sm={9} xs={9}>
        <CustomStack direction='row' justifyContent='center' spacing={2}>
          <CustomTextfield
            name={props.name}
            label={props.label}
            variant='outlined'
            type={props.password && 'password'}
            autoComplete={props.autoComplete && 'current-password'}
            size='small'
            InputLabelProps={{
              style: { color: '#B9B9B9' },
            }}
            {...(props.flag ? { helperText: `${props.helperText}`, error: true } : {})}
            onChange={props.handleValue}
          />
          <IdSubmitButton
            onClick={() => {
              CheckIdSame(props.value).then(res => {
                if (res.data.status) {
                  props.handleFlag('id', true);
                  props.sethelpText(res.data.message);
                }
              });
            }}
          >
            중복확인
          </IdSubmitButton>
        </CustomStack>
      </Grid>
    </CustomGridContainer>
  );
};

export default SignUpIDLayout;

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

const CustomStack = styled(Stack)`
  width: 100%;
`;

const IdSubmitButton = styled(Button)`
  &&& {
    background-color: ${brandColor};
    color: white;
    font-size: 0.75rem;
    height: 2.5rem;
  }
`;

const CustomTextfield = styled(TextField)`
  width: 100%;
`;
