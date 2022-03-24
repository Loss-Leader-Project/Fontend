import React, { useEffect, useState } from 'react';
import ProductPhoto from './ProductPhoto';
import ProductInfo from './ProductInfo';
import styled from 'styled-components';
import MenuBar from './MenuBar';
import { tab, mobile } from 'styles/theme';
import { useParams } from 'react-router';
import { detailApiURL } from 'utils/apiUrl';
import { ApiRq } from 'utils/apiConfig';
import { changeImageUrl } from 'utils/changeImageUrl';
import { useHistory } from 'react-router-dom';
import TokenCheck from 'utils/TokenCheck.js';

function Detail() {
  const [mainImage, setMainImage] = useState('');
  const [productData, setProductData] = useState({});
  const [subImages, setSubImages] = useState([]);
  const param = useParams();
  const history = useHistory();
  const accessToken = localStorage.getItem('access-token');

  useEffect(() => {
    TokenCheck(
      accessToken =>
        ApiRq('GET', detailApiURL.LOCAL_GET_DETAIL, { storeId: param.productId }, null, { Authorization: accessToken }),
      null
    ).then(data => {
      setProductData(data?.data);
      imageFirstSetting(data?.data);
    });
  }, [param.productId, accessToken]);

  const imageFirstSetting = productData => {
    const imageUrles = changeImageUrl(productData?.storeTopData?.storeFoodImageResponseList, '업체');
    setSubImages([imageUrles[1], imageUrles[2], imageUrles[3], imageUrles[4]]);
    setMainImage(imageUrles[0].image);
  };

  const clickChangeImage = e => {
    const imageUrles = changeSubImageArr(e.target.id);
    setSubImages(imageUrles);
    setMainImage(e.target.currentSrc);
  };

  const changeSubImageArr = idN => {
    const imageArr = productData.storeTopData?.storeFoodImageResponseList?.filter(({ id }) => {
      return `${id}` !== idN;
    });
    return changeImageUrl(imageArr, '업체');
  };

  const applyPageMove = () => {
    TokenCheck(() => null, history).then(data => {
      const isApply = productData?.storeTopData?.leftCoupon === 0;
      isApply ? alert('상품 준비중 입니다.') : history.push(`/apply/${param.productId}`);
    });
  };

  return (
    <Contain>
      <TopWrapper>
        <ProductPhoto {...{ mainImage, clickChangeImage, subImages }} />
        <ProductInfo storeTopData={productData?.storeTopData} {...{ applyPageMove }} />
      </TopWrapper>
      <BottomWrapper>
        <MenuBar
          avgStar={productData?.storeTopData?.avgStar}
          storeDetailResponse={productData?.storeDetailResponse}
          {...{ param }}
        />
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
