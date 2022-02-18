import { Grid } from '@mui/material';
import React, { createContext, useState } from 'react';
import styled, { css } from 'styled-components';
import { brandColor, mobile, tab } from 'styles/theme';

export const CouponContext = createContext(null);

const CouponProvider = ({ children }) => {
  const [value] = useState({
    two: 2,
    six: 6,
    bg: '#f7f7f7',
    GridItem,
    GridContainer,
  });

  return <CouponContext.Provider value={value}>{children}</CouponContext.Provider>;
};

const GridItem = ({ size, text, color, children }) => (
  <GridItemWrapper item lg={size} md={size} sm={size} xs={size} color={color}>
    <span>{text}</span>
    {children}
  </GridItemWrapper>
);

const GridContainer = ({ bg, border, children }) => (
  <GridContainerWrapper container direction='row' justifyContent='center' alignItems='center' bg={bg} border={border}>
    {children}
  </GridContainerWrapper>
);

const GridContainerWrapper = styled(Grid)`
  padding: 0.4688rem 0;
  text-align: center;
  color: #727272;
  background-color: ${({ bg }) => bg};
  ${({ border }) =>
    border &&
    css`
      border-top: 1px solid #b9b9b9;
      border-bottom: 1px solid #b9b9b9;
    `}
  ${mobile} {
    font-size: 0.75rem;
  }
`;

const GridItemWrapper = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  ${({ color }) =>
    color &&
    css`
      color: ${brandColor};
    `}

  ${tab} {
    &&& {
      flex-direction: column;
      gap: 0.3125rem;
    }
  }
`;

export default CouponProvider;
