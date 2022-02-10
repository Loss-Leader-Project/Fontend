import React from 'react';
import styled from 'styled-components';

function ProductPhoto({ imageData, mainImage, setMainImage }) {
  const hoverChangeImage = e => {
    setMainImage(e.target.currentSrc);
  };

  return (
    <Contain>
      <MainImage alt='thumnail' src={mainImage} />
      <SubPhoto>
        {imageData?.map(({ id, name, image }) => {
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
  width: 25rem;
  height: 32rem;
  ${({ theme }) => theme.media.mobile} {
    width: 20rem;
    height: 26rem;
  }
  & .asd {
    border: 5px solid red;
  }
`;

const MainImage = styled.img`
  width: 25rem;
  height: 25rem;
  ${({ theme }) => theme.media.mobile} {
    width: 20rem;
    height: 20rem;
  }
`;

const SubPhoto = styled.ul`
  display: flex;
  margin: 0.5rem 0 0 0;
`;

const SubImageWrapper = styled.li`
  margin: 0 0.5rem 0 0;
`;

const SubImage = styled.img`
  width: 5.8rem;
  height: 5.8rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
  ${({ theme }) => theme.media.mobile} {
    width: 4.6rem;
    height: 4.6rem;
  }
`;
