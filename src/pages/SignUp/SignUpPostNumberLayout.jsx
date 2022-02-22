import React from 'react';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SignUpPostNumber from './SignUpPostNumber';
import styled from 'styled-components';
import { Grid } from '@mui/material';
import { gray } from 'styles/theme';

const SignUpPostNumberLayout = props => {
  return (
    <CustomGridContainer>
      <MustItem item lg={3} md={3} sm={3}>
        <ColorMustIcon {...(props.NotMust && { NotMust: true })}>
          <FontAwesomeIcon icon={faDotCircle} size='xs' />
        </ColorMustIcon>
        <MustItemText>주소</MustItemText>
      </MustItem>
      <SignUpPostNumber {...props} />
    </CustomGridContainer>
  );
};

export default SignUpPostNumberLayout;

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

const ColorMustIcon = styled.span`
  color: ${({ theme }) => theme.colors.brandColor};
  opacity: ${({ NotMust }) => (NotMust ? 0 : 1)};
`;

const MustItemText = styled.div`
  font-size: 1rem;
  margin-left: 0.625rem;
`;
