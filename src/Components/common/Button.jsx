import React from 'react';
import styled, { css } from 'styled-components';
import { brandColor } from 'styles/theme';

const Button = ({ text, backgroundColor, width, fontSize, ...rest }) => (
  <StyledButton {...{ backgroundColor }} fontSize={fontSize} width={width} rest={rest}>
    {text}
  </StyledButton>
);

Button.defaultProps = {
  width: '100%',
  fontSize: '18px',
};

const StyledButton = styled.button`
  border: none;
  border-radius: 0.3125rem;
  padding: 0.625rem 0;
  color: #fff;
  font-size: 0.9375rem;
  background-color: ${brandColor};
  width: ${({ width }) => width};
  font-size: ${({ fontSize }) => fontSize};
  ${({ backgroundColor }) =>
    backgroundColor &&
    css`
      background-color: ${backgroundColor};
    `};
  ${({ rest }) => css`
    ${{ ...rest }}
  `};
`;

export default Button;
