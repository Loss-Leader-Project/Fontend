import React from 'react';
import styled, { css } from 'styled-components';
import { brandColor } from 'styles/theme';

const Button = ({ text, width, fontSize, ...rest }) => {
  return (
    <StyledButton fontSize={fontSize} width={width} {...rest}>
      {text}
    </StyledButton>
  );
};

Button.defaultProps = {
  width: '100%',
  fontSize: '18px',
};

const ButtonHover = css`
  transition: opacity 0.25s ease-in;
  &:hover {
    opacity: 0.8;
  }
`;

const StyledButton = styled.button`
  border: none;
  border-radius: 0.3125rem;
  padding: 0.625rem 0;
  color: #fff;
  font-size: 0.9375rem;
  cursor: pointer;
  background-color: ${brandColor};
  width: ${({ width }) => width};
  font-size: ${({ fontSize }) => fontSize};
  ${({ backgroundColor }) =>
    backgroundColor &&
    css`
      background-color: ${backgroundColor};
    `};

  ${ButtonHover};
`;

export default Button;
