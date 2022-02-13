import React, { useEffect, useState } from 'react';
import ProductPhoto from './ProductPhoto';
import ProductInfo from './ProductInfo';
import styled from 'styled-components';
import axios from 'axios';

function Detail() {
  const [imageData, setImageData] = useState([]);
  const [mainImage, setMainImage] = useState('');
  const [infoData, setInfoData] = useState([]);

  useEffect(() => {
    getDetailRQ();
  }, []);

  const getDetailRQ = async () => {
    const response = await axios.all([
      axios.get('/data/detailPhoto.json'),
      axios.get('/data/detailInfo.json'),
    ]);
    const photoData = response[0].data.PhotoData.images;
    const mainImageURL = response[0].data.PhotoData.images[0].image;
    const infoData = response[1].data.InfoData;
    setImageData(photoData);
    setMainImage(mainImageURL);
    setInfoData(infoData);
  };

  return (
    <div>
      <TopWrapper>
        <ProductPhoto {...{ imageData, mainImage, setMainImage }} />
        <ProductInfo {...{ infoData }} />
      </TopWrapper>
    </div>
  );
}

export default Detail;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border: 5px solid red;
  width: 55rem;
  margin: 0 auto;
  ${({ theme }) => theme.media.tab} {
    flex-direction: column;
    width: 35rem;
    align-items: center;
  }
  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    width: 27rem;
    align-items: center;
  }
`;
