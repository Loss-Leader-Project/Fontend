import React from 'react';
import styled from 'styled-components';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid } from '@mui/material';
import { brandColor } from 'styles/theme';

function ColumnTitle({ title }) {
  return (
    <MustItem item lg={3} md={3} sm={3} xs={3}>
      <ColorMustIcon>
        <FontAwesomeIcon icon={faDotCircle} size='xs' />
      </ColorMustIcon>
      <MustItemText>{title} :</MustItemText>
    </MustItem>
  );
}

export default ColumnTitle;

const MustItem = styled(Grid)`
  display: flex;
  flex-flow: row wrap;
`;

const MustItemText = styled.div`
  font-size: 1rem;
  margin-left: 0.625rem;
`;

const ColorMustIcon = styled.span`
  color: ${brandColor};
`;
