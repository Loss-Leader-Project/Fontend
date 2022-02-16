import React, { createContext, useState } from 'react';
import styled from 'styled-components';
import { Grid } from '@mui/material';
import { gray } from 'styles/theme';

export const ModifyContext = createContext(null);

const ModifyProvider = ({ children }) => {
  const [value] = useState({
    GridCotainer,
  });

  return <ModifyContext.Provider value={value}>{children}</ModifyContext.Provider>;
};

const GridCotainer = ({ text, children, firstSize = 3.5, lastSize = 8 }) => {
  return (
    <GridContainerWrapper container direction='row' justifyContent='center' alignItems='center' gap={1}>
      <GridItemWrapper item lg={firstSize} md={firstSize} sm={firstSize} xs={2.5}>
        {text}
      </GridItemWrapper>
      <GridItemWrapper item lg={lastSize} md={lastSize} sm={lastSize} xs={9}>
        {children}
      </GridItemWrapper>
    </GridContainerWrapper>
  );
};

const GridContainerWrapper = styled(Grid)`
  margin: 0.9375rem 0;
  .MuiOutlinedInput-root {
    height: 2.5rem;
    & fieldset,
    &.Mui-focused fieldset,
    &:hover fieldset {
      border-color: #8a8a8a;
    }
  }
`;
const GridItemWrapper = styled(Grid)`
  color: ${gray};
  font-weight: 900;
`;

export default ModifyProvider;
