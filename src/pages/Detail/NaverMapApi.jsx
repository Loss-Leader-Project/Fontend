import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NaverMap, Marker } from 'react-naver-maps';

function NaverMapApi({ latitude, longitude }) {
  const navermaps = window.naver.maps;
  const [asd, setasd] = useState({ center: { lat: 37.3595704, lng: 127.105399 } });

  useEffect(() => {
    Move();
  }, []);

  const Move = () => {
    setasd({ center: { lat: 37.3595704, lng: 127.105399 } });
  };

  return (
    <Contain>
      <NaverMap
        mapDivId='react-naver-map'
        style={{
          width: '70%',
          height: '30rem',
        }}
        defaultCenter={asd.center}
        //전체화면위치
        defaultZoom={15}
      >
        <Marker
          key={1}
          // eslint-disable-next-line no-undef
          position={new navermaps.LatLng(asd.center.lat, asd.center.lng)} //마크업
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
