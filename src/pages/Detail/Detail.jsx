import React, { useEffect, useState } from 'react';
import ProductPhoto from './ProductPhoto';
import ProductInfo from './ProductInfo';
import styled from 'styled-components';
import MenuBar from './MenuBar';
import { tab, mobile } from 'styles/theme';
import { useParams } from 'react-router';
import { detailApiURL } from 'utils/apiUrl';
import { ApiRq } from 'utils/apiConfig';
import { changeImageUrl } from './changeImageUrl';
import { useHistory } from 'react-router-dom';

function Detail() {
  const [mainImage, setMainImage] = useState('');
  const [productData, setProductData] = useState({});
  const [subImages, setSubImages] = useState([]);
  const param = useParams();
  const history = useHistory();

  useEffect(() => {
    ApiRq('GET', detailApiURL.REAL_GET_DETAIL, { storeId: param.productId }).then(data => {
      const imageUrles = changeImageUrl(data?.storeTopData?.storeFoodImageResponseList, '업체');
      setSubImages([imageUrles[1], imageUrles[2], imageUrles[3], imageUrles[4]]);
      setMainImage(imageUrles[0].image);
      setProductData(data);
    });
  }, []);

  const hoverChangeImage = e => {
    const imageUrles = changeSubImageArr(e.target.alt);
    setSubImages(imageUrles);
    setMainImage(e.target.currentSrc);
  };

  const changeSubImageArr = hoverName => {
    const imageArr = productData.storeTopData?.storeFoodImageResponseList?.filter(({ name }) => {
      return name !== hoverName;
    });
    return changeImageUrl(imageArr, '업체');
  };

  const applyPageMove = () => {
    const isApply = productData?.storeTopData?.leftCoupon === 0;
    isApply ? alert('상품 준비중 입니다.') : history.push(`/apply/${param.productId}`);
  };

  return (
    <Contain>
      <TopWrapper>
        <ProductPhoto {...{ mainImage, hoverChangeImage, subImages }} />
        <ProductInfo storeTopData={productData?.storeTopData} {...{ applyPageMove }} />
      </TopWrapper>
      <BottomWrapper>
        <MenuBar avgStar={productData?.storeTopData?.avgStar} storeDetailResponse={productData?.storeDetailResponse} />
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
