import { NaverMap, Marker } from 'react-naver-maps';
import React from 'react';
import styled from 'styled-components';

function NaverMapApi({ longitude, latitude }) {
  const navermaps = window.naver.maps;
  console.log(navermaps);
  return (
    <Contain>
      <NaverMap
        mapDivId={'maps-getting-started-uncontrolled'}
        style={{
          width: '70%',
          height: '30rem',
        }}
        defaultCenter={{ lat: 37.551229, lng: 126.988205 }} //전체화면위치
        defaultZoom={15}
      >
        <Marker
          key={1}
          // eslint-disable-next-line no-undef
          position={new navermaps.LatLng(latitude, longitude)} //마크업
          animation={2}
        />
      </NaverMap>
    </Contain>
  );
}

export default NaverMapApi;

const Contain = styled.div`
  display: flex;
  justify-content: center;
`;
