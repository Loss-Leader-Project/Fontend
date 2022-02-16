import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { brandColor, gray, lightDark } from 'styles/theme';

const SignUpEmailCheck = props => {
  return (
    <CustomGridContainer>
      <Grid item lg={3}></Grid>
      <Grid item lg={9}>
        <CheckAgree
          name={props.name}
          control={<CheckBox checked={props.checkedAgree} onChange={props.handleChangeAgree} />}
          label={props.label}
        />
        {props.name === 'agreeMail' && <Text>※ 아이디 및 비밀번호 찾기에 활용되므로 정확하게 입력해주세요.</Text>}
      </Grid>
    </CustomGridContainer>
  );
};

export default SignUpEmailCheck;

const Text = styled.p`
  color: ${gray};
`;

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

const CheckAgree = styled(FormControlLabel)`
  &&& {
    color: ${lightDark};
  }

  span {
    font-weight: 600;
  }
`;

const CheckBox = styled(Checkbox)`
  &&& {
    color: ${({ theme, checked }) => (checked ? theme.colors.brandColor : theme.colors.lightGray)};
    &:hover {
      color: ${brandColor};
    }
  }
`;
