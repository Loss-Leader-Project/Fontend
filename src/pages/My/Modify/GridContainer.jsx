import { Grid } from '@mui/material';
import React, { memo } from 'react';
import styled from 'styled-components';
import { gray } from 'styles/theme';

const GridContainer = function GridContainerMemo({ text, children }) {
  return (
    <GridContainerWrapper container direction='row' justifyContent='center' alignItems='center' gap={1}>
      <GridItemWrapper item lg={3.5} md={3.5} sm={3.5} xs={2.5}>
        {text}
      </GridItemWrapper>
      <GridItemWrapper item lg={8} md={8} sm={8} xs={9}>
        {children}
      </GridItemWrapper>
    </GridContainerWrapper>
  );
};

const GridContainerWrapper = styled(Grid)`
  margin: 0.9375rem 0;
`;
const GridItemWrapper = styled(Grid)`
  color: ${gray};
`;
export default memo(GridContainer);
