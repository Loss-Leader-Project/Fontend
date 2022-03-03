import React, { useEffect, useState } from 'react';
import ProductPhoto from './ProductPhoto';
import ProductInfo from './ProductInfo';
import styled from 'styled-components';
import MenuBar from './MenuBar';
import { tab, mobile } from 'styles/theme';
import { useParams } from 'react-router';
import { getApiRq } from 'utils/apiConfig';
import { detailApiURL } from 'utils/apiUrl';

function Detail() {
  const [mainImage, setMainImage] = useState('');
  const [newData, setNewData] = useState({});

  const param = useParams();

  useEffect(() => {
    getApiRq(detailApiURL.LOCAL_GET_DETAIL).then(data => {
      setNewData(data);
      setMainImage(data.storeFoodImage[0].image);
    });
  }, []);

  return (
    <Contain>
      <TopWrapper>
        <ProductPhoto {...{ newData, mainImage, setMainImage }} />
        <ProductInfo {...{ newData, param }} />
      </TopWrapper>
      <BottomWrapper>
        <input type='checkbox' />
        <MenuBar {...{ newData }} />
      </BottomWrapper>
    </Contain>
  );
}

export default Detail;

const Contain = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 10rem;
  padding: 0 2rem;

  ${tab} {
    padding: 0 2rem;
  }
  ${mobile} {
    padding: 0;
  }
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  ${tab} {
    flex-direction: column;
  }
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
