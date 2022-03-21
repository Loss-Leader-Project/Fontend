import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NaverMap, Marker } from 'react-naver-maps';

function NaverMapApi({ latitude, longitude }) {
  const navermaps = window.naver.maps;
  const [asd, setasd] = useState({ center: { lat: latitude, lng: longitude } });

  useEffect(() => {
    Move();
  }, []);

  const Move = () => {
    setasd({ center: { lat: latitude, lng: longitude } });
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
        defaultZoom={15}
      >
        <Marker key={1} position={new navermaps.LatLng(asd.center.lat, asd.center.lng)} animation={2} />
      </NaverMap>
    </Contain>
  );
}

export default NaverMapApi;

const Contain = styled.div`
  display: flex;
  justify-content: center;
`;
