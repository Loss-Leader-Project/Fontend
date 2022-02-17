import React from 'react';
import styled from 'styled-components';

function ProductMenuInfo({ storeMenu }) {
  return (
    <Contain>
      {storeMenu?.map(({ id, name, price }) => {
        return (
          <Wrapper key={id}>
            <Content>{name}</Content>
            <Content>{price}</Content>
          </Wrapper>
        );
      })}
    </Contain>
  );
}

export default ProductMenuInfo;

const Contain = styled.div`
  margin: 2rem 3rem 3rem 0;
  ${({ theme }) => theme.media.tab} {
    margin: 1rem 2rem 2rem 0;
  }
  ${({ theme }) => theme.media.mobile} {
    margin: 0.5rem 2rem 1rem 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 6rem 2rem 6rem;
  ${({ theme }) => theme.media.tab} {
    margin: 0 2rem 1.5rem 2rem;
  }
`;

const Content = styled.div`
  font-size: 1.1rem;
  ${({ theme }) => theme.media.tab} {
    font-size: 0.9rem;
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: 0.8rem;
  }
`;
