import React from 'react';
import styled from 'styled-components';
import { faPhoneVolume, faCalendar, faClock, faMap, faStore, faBookmark } from '@fortawesome/free-solid-svg-icons';
import DescriptionColumn from './DescriptionColumn';
import { tab, mobile } from 'styles/theme';

function Description({ storeDetailResponse }) {
  return (
    <Contain>
      <DescriptionColumn icon={faPhoneVolume} title={storeDetailResponse?.storePhoneNumber} />
      <DescriptionColumn icon={faClock} title={storeDetailResponse?.operatingTime} />
      <DescriptionColumn icon={faCalendar} title={storeDetailResponse?.operatingPeriod} />
      <DescriptionColumn icon={faMap} title={storeDetailResponse?.roadAddress} />
      <DescriptionColumn icon={faStore} title='식사유무' content={storeDetailResponse?.content} />
      <DescriptionColumn
        icon={faBookmark}
        title='메뉴정보'
        storeMenuResponseList={storeDetailResponse?.storeMenuResponseList}
      />
      <DescriptionColumn icon={faBookmark} title='메뉴이미지' url={storeDetailResponse?.storeMenuImage} />
      <DescriptionColumn
        icon={faMap}
        title='지도'
        longitude={storeDetailResponse?.longitude}
        latitude={storeDetailResponse?.latitude}
      />
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
