import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { tab, mobile, lightDark, brandColor } from 'styles/theme';

function ProductInfoSummary({ applyGetData }) {
  const { briefAddress, cuponBenefit, cuponCondition, cuponPrice, storeName } = applyGetData;
  return (
    <div>
      <Title>
        [{briefAddress}] {storeName}
      </Title>
      <CuponName>{cuponCondition}</CuponName>
      <CuponName>{cuponBenefit}</CuponName>
      <CuponPrice>{cuponPrice}원</CuponPrice>
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
  ${mobile} {
    font-size: 1rem;
  }
`;

const CuponName = styled.h1`
  font-size: 1.6rem;
  font-weight: 900;
  margin-bottom: 1rem;
  color: ${({ theme, color }) => theme.colors[color]};
  ${mobile} {
    font-size: 1.3rem;
  }
`;

const CuponPrice = styled.h5`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${brandColor};
  margin: 1rem 0;
  ${mobile} {
    font-size: 1rem;
  }
`;
