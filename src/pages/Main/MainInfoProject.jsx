import React from 'react';
import styled from 'styled-components';
import { brandColor, mobile } from 'styles/theme';

const MainInfoProject = () => {
  return (
    <div>
      <BoldText>
        <InnerText>본 사이트는 실제 서비스를 하는 사이트가 아니라</InnerText>
        <InnerText>
          <ImpactText>프로젝트성 사이트</ImpactText>임을 명시합니다.
        </InnerText>
      </BoldText>
    </div>
  );
};

const BoldText = styled.div`
  font-weight: bold;
  font-size: 2rem;
  ${mobile} {
    font-size: 1rem;
  }
`;

const InnerText = styled.p`
  padding: 0.625rem 0;
`;

const ImpactText = styled.span`
  color: ${brandColor};
`;

export default MainInfoProject;
