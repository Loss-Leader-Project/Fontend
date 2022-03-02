import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import { flexStyleGroup } from 'styles/theme';

export default function Row({ text, children, isColumn }) {
  return (
    <RowWrapper isColumn={isColumn}>
      <Text>{text}</Text>
      {children}
    </RowWrapper>
  );
}

const RowWrapper = styled.div`
  display: flex;
  height: 40px;
  margin: 5px 0;

  ${({ isColumn }) =>
    isColumn &&
    css`
      flex-direction: column;
      gap: 10px;
    `};
`;
const Text = styled.div`
  width: 150px;
  ${flexStyleGroup('flex-start', 'center')}
  font-weight:900;
  font-size: 20px;
`;
