import React from 'react';
import styled from 'styled-components';
import { gray } from 'styles/theme';

const Title = ({ text, m }) => <StyledTitle m={m}>{text}</StyledTitle>;
Title.defaultProps = {
  m: ' 0.9375rem 0',
};

const StyledTitle = styled.h2`
  font-size: 1.1875rem;
  font-weight: 900;
  color: ${gray};
  margin: ${({ m }) => m};
`;

export default Title;
