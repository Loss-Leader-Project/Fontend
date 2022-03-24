import React from 'react';
import styled from 'styled-components';
import { tab, mobile } from 'styles/theme';

function ProductPhoto({ subImages, mainImage, hoverChangeImage }) {
  return (
    <Contain>
      <MainImage alt='thumnail' src={mainImage} />
      <SubPhoto>
        {subImages?.map(({ id, name, image }) => {
          return (
            <SubImageWrapper key={id}>
              <SubImage alt={name} src={image} onClick={hoverChangeImage} />
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
  ${tab} {
    flex-direction: row;
    margin-bottom: 3rem;
  }
  ${mobile} {
    flex-direction: column;
    margin-bottom: 2rem;
  }
`;

const MainImage = styled.img`
  width: 29rem;
  height: 29rem;
  ${tab} {
    width: 80%;
    height: 80%;
    object-position: center;
  }
  ${mobile} {
    width: 100%;
    height: 100%;
  }
`;

const SubPhoto = styled.ul`
  display: flex;
  margin: 0.5rem 0 0 0;
  ${tab} {
    flex-direction: column;
    margin: 0 0 0 1rem;
  }
  ${mobile} {
    flex-direction: row;
    margin: 0.5rem 0 0 0;
  }
`;

const SubImageWrapper = styled.li`
  margin: 0 0.5rem 0 0;
  ${tab} {
    flex-direction: column;
    margin: 0 0 0.5rem 0;
  }
  ${mobile} {
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
  ${tab} {
    width: 100%;
    height: 100%;
    object-position: center;
  }
`;
