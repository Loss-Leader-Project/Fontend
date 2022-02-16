import React, { useEffect, useState } from 'react';
import ProductPhoto from './ProductPhoto';
import ProductInfo from './ProductInfo';
import styled from 'styled-components';
import axios from 'axios';
import MenuBar from './MenuBar';

function Detail() {
  const [mainImage, setMainImage] = useState('');
  const [newData, setNewData] = useState({});

  useEffect(() => {
    newDataRQ();
  }, []);

  const newDataRQ = async () => {
    const response = await axios.get('/data/newDetailData.json');
    const newData = response.data;
    setNewData(newData);
    setMainImage(newData.storeFoodImage[0].image);
  };

  return (
    <Contain>
      <TopWrapper>
        <ProductPhoto {...{ newData, mainImage, setMainImage }} />
        <ProductInfo {...{ newData }} />
      </TopWrapper>
      <BottomWrapper>
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
  ${({ theme }) => theme.media.tab} {
    padding: 0 2rem;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 0;
  }
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  ${({ theme }) => theme.media.tab} {
    flex-direction: column;
  }
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 5px solid red;
`;
