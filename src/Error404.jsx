import React from 'react';
import styled from 'styled-components';
import { brandColor, lightDark } from 'styles/theme';

const Error404 = () => {
  return (
    <ErrorWrap>
      <Emoji>🙀🙀🙀</Emoji>
      <ErrorText>
        서버와의 연결이 <BoldText>불안정</BoldText>합니다 ㅜㅜ{' '}
      </ErrorText>
      <ErrorText>다시 연결을 시도해주세요 🙏</ErrorText>
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
