import React from 'react';
import styled from 'styled-components';
import { lightDark, brandColor } from 'styles/theme';

function ProductInfoSummary({ productData }) {
  const { briefAddress, benefitCondition, couponContent, priceOfCoupon, storeName } = productData;
  return (
    <div>
      <Title>
        [{briefAddress}] {storeName}
      </Title>
      <CuponName>{benefitCondition}</CuponName>
      <CuponName>{couponContent}</CuponName>
      <CuponPrice>{priceOfCoupon}원</CuponPrice>
    </div>
  );
}

export default ProductInfoSummary;

const Title = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${lightDark};
  line-height: 2rem;
`;

const CuponName = styled.h1`
  font-size: 1.6rem;
  font-weight: 900;
  margin-bottom: 1rem;
  color: ${({ theme, color }) => theme.colors[color]};
`;

const CuponPrice = styled.h5`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${brandColor};
  margin: 1rem 0;
`;
