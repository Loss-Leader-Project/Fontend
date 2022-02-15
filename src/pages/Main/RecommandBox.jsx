import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const RecommandBox = () => {
  return (
    <Container>
      <TextBox>
        <div>오늘은 </div>
        <div>이거 어때요?</div>
      </TextBox>
      <RandomText>
        <span>삼겹살</span>
      </RandomText>
      <RecommandButton>추천받기</RecommandButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
  height: 150px;
  background-color: #eee;

  ${({ theme }) => theme.media.mobile} {
    flex-flow: column wrap;
    height: 300px;
  }
`;

const TextBox = styled.div`
  font-size: 2rem;
  display: flex;
  flex-flow: column wrap;
  gap: 0.625rem;
  color: ${({ theme }) => theme.colors.lightDark};

  ${({ theme }) => theme.media.mobile} {
    flex-flow: row wrap;
  }
`;

const RandomText = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  height: 70px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.lightDark};
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray};
`;

const RecommandButton = styled(Button)`
  width: 15%;
  &&& {
    font-size: 1.2rem;
    color: white;
    background-color: ${({ theme }) => theme.colors.brandColor};
  }

  ${({ theme }) => theme.media.mobile} {
    width: 50%;
  }
`;

export default RecommandBox;
