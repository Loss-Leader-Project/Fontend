import React from 'react';
import styled from 'styled-components';
import { brandColor, lightDark } from 'styles/theme';

const Error404 = () => {
  return (
    <ErrorWrap>
      <Emoji>πππ</Emoji>
      <ErrorText>
        μλ²μμ μ°κ²°μ΄ <BoldText>λΆμμ </BoldText>ν©λλ€ γγ{' '}
      </ErrorText>
      <ErrorText>λ€μ μ°κ²°μ μλν΄μ£ΌμΈμ π</ErrorText>
    </ErrorWrap>
  );
};

export default Error404;

const ErrorWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background-color: ${lightDark};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
`;

const Emoji = styled.span`
  font-size: 5rem;
`;

const ErrorText = styled.p`
  font-size: 3rem;
  padding: 50px 0;
`;

const BoldText = styled.span`
  color: ${brandColor};
`;
