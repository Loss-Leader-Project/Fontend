import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function ProductPhoto({ newData, mainImage, setMainImage }) {
  const hoverChangeImage = e => {
    setMainImage(e.target.currentSrc);
  };

  return (
    <Contain>
      <MainImage alt='thumnail' src={mainImage} />
      <SubPhoto>
        {newData?.storeFoodImage?.map(({ id, name, image }) => {
          return (
            <SubImageWrapper key={id}>
              <SubImage alt={name} src={image} onMouseOver={hoverChangeImage} />
            </SubImageWrapper>
          );
        })}
      </SubPhoto>
    </Contain>
  );
}

export default ProductPhoto;

const Contain = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 9rem;
  ${({ theme }) => theme.media.tab} {
    flex-direction: row;
    margin-bottom: 3rem;
  }
  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    margin-bottom: 2rem;
  }
`;

const MainImage = styled.img`
  width: 29rem;
  height: 29rem;
  ${({ theme }) => theme.media.tab} {
    width: 80%;
    height: 80%;
    object-position: center;
  }
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    height: 100%;
  }
`;

const SubPhoto = styled.ul`
  display: flex;
  margin: 0.5rem 0 0 0;
  ${({ theme }) => theme.media.tab} {
    flex-direction: column;
    margin: 0 0 0 1rem;
  }
  ${({ theme }) => theme.media.mobile} {
    flex-direction: row;
    margin: 0.5rem 0 0 0;
  }
`;

const SubImageWrapper = styled.li`
  margin: 0 0.5rem 0 0;
  ${({ theme }) => theme.media.tab} {
    flex-direction: column;
    margin: 0 0 0.5rem 0;
  }
  ${({ theme }) => theme.media.mobile} {
    margin: 0 0.5rem 0 0;
  }
`;

const SubImage = styled.img`
  width: 6.9rem;
  height: 6.9rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
  ${({ theme }) => theme.media.tab} {
    width: 100%;
    height: 100%;
    object-position: center;
  }
`;
