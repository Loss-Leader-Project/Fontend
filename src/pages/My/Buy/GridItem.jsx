import { Grid } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { mobile } from 'styles/theme';

const GridItem = ({ size, text, children }) => (
  <Grid item lg={size} md={size} sm={size} xs={size}>
    <TextWrapper>{text}</TextWrapper>
    {children}
  </Grid>
);

const TextWrapper = styled.div`
  padding: 0 0.9375rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${mobile} {
    padding: 0 0.3125rem;
  }
`;

export default GridItem;
