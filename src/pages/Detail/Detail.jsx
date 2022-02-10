import React from 'react';
import ProductPhoto from './ProductPhoto';
import ProductInfo from './ProductInfo';
import styled from 'styled-components';

function Detail() {
  return (
    <div>
      <TopWrapper>
        <ProductPhoto />
        <ProductInfo />
      </TopWrapper>
    </div>
  );
}

export default Detail;

const TopWrapper = styled.div`
  display: flex;
  border: 5px solid red;
`;
