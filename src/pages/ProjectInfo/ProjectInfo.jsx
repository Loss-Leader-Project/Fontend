import MuiButton from 'Components/MuiButton';
import React from 'react';
import styled from 'styled-components';

function ProjectInfo() {
  return (
    <Container>
      <TitleInfo>프로젝트 소계</TitleInfo>
      <ContentInfo>
        이 프로젝트는 실제 O2O 플랫폼 기반으로 런칭한 사이트 기반으로 만든것입니다. 취지는 손님들이 어느 음식점을 가도
        할인이나 서비스를 받을 수 있게 하고 사장님들은 광고 절약, 음식 낭비 방지등 서로 서로 win win 사업이었습니다.
        디자이너 없이 프론트 3명 백엔드 2명에서 디자인 기획을 보며 시작을 했고 프론트는 디자인보다는 기능 구현에 초점을
        맞추고자 MUI 라이브러리를 주로 사용했고 백엔드는 MiniIO로 이미지 부분을 처리했습니다. 무엇보다 서로 소통하는것이
        중요하기 때문에 금요일 저녁 10시에 회의를 했고 월요일부터 목요일까지는 모각코를 하여 선택적으로 선택하는 시간을
        가졌습니다. 회의내용과 주요한 사항들은 노션에 기록했고 지라를 통해 To do list 를 관리했습니다. 자세한 부분은
        노션이나 문서화를 통해 확인해주세요!
      </ContentInfo>
      <Wrapper>
        <MuiButton
          content={'노션'}
          sx={{ margin: '0 auto', height: '3.125rem', fontSize: '1.5rem', width: '50%' }}
          onClick={() => {
            window.location.href = 'https://typical-wallet-2b3.notion.site/ee2586a2bcd54da792d029b25a40e371';
          }}
        />
      </Wrapper>
    </Container>
  );
}

export default ProjectInfo;

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  display: flex;
  margin-top: 5rem;
`;

const TitleInfo = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 3rem 2rem 2rem 2rem;
`;

const ContentInfo = styled.p`
  font-size: 1.3rem;
  line-height: 2rem;
`;
