import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function ProductPhoto() {
  const [imageData, setImageData] = useState([]);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    axios
      .get('/data/detailPhoto.json')
      .then(res => {
        setMainImage(res.data.PhotoData.images[0].image);
        setImageData(res.data.PhotoData.images);
      })
      .catch(() => {
        console.log('FAIL!!');
      });
  }, []);

  const hoverChangeImage = e => {
    setMainImage(e.target.currentSrc);
  };

  return (
    <Contain>
      <MainPhoto>
        <MainImage alt='thumnail' src={mainImage} />
      </MainPhoto>
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
  width: 37rem;
  height: 48rem;
  border: 5px solid red;
`;

const MainPhoto = styled.main`
  display: flex;
  align-items: center;
`;

const MainImage = styled.img`
  width: 36rem;
  height: 36rem;
`;

const SubPhoto = styled.ul`
  display: flex;
  margin: 2rem 0 0 0;
`;

const SubImageWrapper = styled.li`
  margin: 0 1rem 0 0;
`;

const SubImage = styled.img`
  width: 8.2rem;
  height: 8rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;
