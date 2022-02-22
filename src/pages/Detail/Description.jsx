import React from 'react';
import styled from 'styled-components';
import { faPhoneVolume, faCalendar, faClock, faMap, faStore, faBookmark } from '@fortawesome/free-solid-svg-icons';
import DescriptionColumn from './DescriptionColumn';
import { tab, mobile } from 'styles/theme';

function Description({ newData }) {
  const {
    storePhoneNumber,
    operatingTime,
    operatingPeriod,
    roadAddress,
    serviceMethod,
    storeMenu,
    storeMenuImage,
    latitude,
    longitude,
  } = newData;

  return (
    <Contain>
      <DescriptionColumn icon={faPhoneVolume} content={storePhoneNumber} />
      <DescriptionColumn icon={faClock} content={operatingTime} />
      <DescriptionColumn icon={faCalendar} content={operatingPeriod} />
      <DescriptionColumn icon={faMap} content={roadAddress} />
      <DescriptionColumn icon={faStore} content='식사유무' {...{ serviceMethod }} />
      <DescriptionColumn icon={faBookmark} content='메뉴정보' {...{ storeMenu }} />
      <DescriptionColumn icon={faBookmark} content='메뉴이미지' url={storeMenuImage} />
      <DescriptionColumn icon={faMap} content='지도' {...{ longitude, latitude }} />
    </Contain>
  );
}

export default Description;

const Contain = styled.div`
  padding: 5rem 0 0 4rem;
  ${tab} {
    padding: 5rem 0 0 2rem;
  }
  ${mobile} {
    padding: 3rem 0 0 0;
  }
`;
