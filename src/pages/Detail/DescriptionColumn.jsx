import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AvailabilityMeals from './AvailabilityMeals';
import DescriptionMenuInfo from './DescriptionMenuInfo';

function DescriptionColumn({ icon, content, url, serviceMethod, storeMenu }) {
  return (
    <Wrapper>
      <InfoWrapper>
        <FontAwesomeIcon icon={icon} className='infoIcon' />
        <InfoContent>{content}</InfoContent>
      </InfoWrapper>
      {content === '메뉴정보' && <DescriptionMenuInfo {...{ storeMenu }} />}
      {content === '식사유무' && <AvailabilityMeals {...{ serviceMethod }} />}
      {content === '메뉴이미지' && <MenuImage src={url} alt={content} />}
    </Wrapper>
  );
}

export default DescriptionColumn;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2.5rem;
  & .infoIcon {
    color: ${({ theme }) => theme.colors.lightGray};
    width: 5rem;
    font-size: 1.8rem;
    margin: 0 3rem 0 0;
    ${({ theme }) => theme.media.tab} {
      font-size: 1.5rem;
      margin: 0 1rem 0 0;
    }
    ${({ theme }) => theme.media.mobile} {
      font-size: 1.2rem;
      margin: 0 0.2rem 0 0;
    }
  }
`;

const InfoContent = styled.div`
  font-size: 1.2rem;
  ${({ theme }) => theme.media.tab} {
    font-size: 1rem;
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: 0.8rem;
  }
`;

const MenuImage = styled.img`
  width: 80%;
  margin-left: 4rem;
  margin-bottom: 3rem;
  ${({ theme }) => theme.media.mobile} {
    margin-left: 2rem;
  }
`;
