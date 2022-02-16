import { Grid } from '@mui/material';
import React, { createContext, useState } from 'react';
import styled from 'styled-components';
import { mobile } from 'styles/theme';

export const OrdersContext = createContext(null);

const OrdersProvider = ({ children }) => {
  const [value] = useState({
    two: 2,
    fivePointFive: 5.5,
    twoPointFive: 2.5,
    GridItem,
  });

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
};

const GridItem = ({ size, text, children }) => {
  return (
    <Grid item lg={size} md={size} sm={size} xs={size}>
      <TextWrapper>{text}</TextWrapper>
      {children}
    </Grid>
  );
};

const TextWrapper = styled.div`
  padding: 0 0.9375rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${mobile} {
    padding: 0 0.3125rem;
  }
`;

export default OrdersProvider;
