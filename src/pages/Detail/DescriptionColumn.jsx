import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AvailabilityMeals from './AvailabilityMeals';
import DescriptionMenuInfo from './DescriptionMenuInfo';
import NaverMapApi from './NaverMapApi';
import { tab, mobile, lightGray } from 'styles/theme';
import { changeImageUrl } from './changeImageUrl';

function DescriptionColumn({
  icon,
  title,
  image,
  storeMeal,
  packaging,
  delivery,
  storeMenuResponseList,
  longitude,
  latitude,
}) {
  const imageUrl = changeImageUrl(image, '업체');
  return (
    <Wrapper>
      <InfoWrapper>
        <FontAwesomeIcon icon={icon} className='infoIcon' />
        <InfoContent>{title}</InfoContent>
      </InfoWrapper>
      {title === '메뉴정보' && <DescriptionMenuInfo {...{ storeMenuResponseList }} />}
      {title === '식사유무' && <AvailabilityMeals {...{ storeMeal, packaging, delivery }} />}
      {title === '메뉴이미지' && <MenuImage src={imageUrl} alt={title} />}
      {title === '지도' && <NaverMapApi {...{ longitude, latitude }} />}
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
    color: ${lightGray};
    width: 5rem;
    font-size: 1.8rem;
    margin: 0 3rem 0 0;
    ${tab} {
      font-size: 1.5rem;
      margin: 0 1rem 0 0;
    }
    ${mobile} {
      font-size: 1.2rem;
      margin: 0 0.2rem 0 0;
    }
  }
`;

const InfoContent = styled.div`
  font-size: 1.2rem;
  ${tab} {
    font-size: 1rem;
  }
  ${mobile} {
    font-size: 0.8rem;
  }
`;

const MenuImage = styled.img`
  align-self: center;
  width: 70%;
  margin-left: 4rem;
  margin-bottom: 3rem;
  ${mobile} {
    margin-left: 2rem;
  }
`;
