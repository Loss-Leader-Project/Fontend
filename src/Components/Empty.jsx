import React from 'react';
import styled from 'styled-components';
import { mobile } from 'styles/theme';

const Empty = ({ text, color = '#ff422d' }) => <Container color={color}>{`😭😭 ${text} 😭😭`}</Container>;

const Container = styled.div`
  color: white;
  font-size: 2rem;
  text-align: center;
  padding: 100px 0;
  width: 100%;
  background-color: ${({ color }) => color};

  ${mobile} {
    font-size: 1rem;
  }
`;

export default Empty;
