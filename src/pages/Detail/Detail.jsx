import React, { useEffect, useState } from 'react';
import ProductPhoto from './ProductPhoto';
import ProductInfo from './ProductInfo';
import styled from 'styled-components';
import MenuBar from './MenuBar';
import { tab, mobile } from 'styles/theme';
import { getProductDetail } from 'utils/api';
import { useParams } from 'react-router';

function Detail() {
  const [mainImage, setMainImage] = useState('');
  const [productData, setProductData] = useState({});
  const param = useParams();

  useEffect(() => {
    getProductDetail().then(data => {
      setProductData(data);
      setMainImage(data.storeTopData?.storeFoodImageResponseList[0].image);
    });
  }, []);

  return (
    <Contain>
      <TopWrapper>
        <ProductPhoto
          storeFoodImageResponseList={productData?.storeTopData?.storeFoodImageResponseList}
          {...{ mainImage, setMainImage }}
        />
        <ProductInfo storeTopData={productData?.storeTopData} {...{ param }} />
      </TopWrapper>
      <BottomWrapper>
        <MenuBar storeDetailResponse={productData?.storeDetailResponse} />
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
