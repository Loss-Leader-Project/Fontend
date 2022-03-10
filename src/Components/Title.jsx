import React from 'react';
import styled from 'styled-components';
import { gray } from 'styles/theme';

const Title = ({ text, margin }) => <StyledTitle margin={margin}>{text}</StyledTitle>;
Title.defaultProps = {
  margin: ' 0.9375rem 0',
};

const StyledTitle = styled.h2`
  font-size: 1.1875rem;
  font-weight: 500;
  color: ${gray};
  margin: ${({ margin }) => margin};
`;

export default Title;
