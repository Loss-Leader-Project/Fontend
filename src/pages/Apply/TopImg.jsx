import React from 'react';
import styled from 'styled-components';
import { tab, mobile } from 'styles/theme';
import { changeImageUrl } from 'utils/changeImageUrl';

function TopImg({ productData }) {
  const imageUrl = [
    {
      id: 1,
      name: 'banner',
      url: 'https://ifh.cc/g/i9wJJl.png',
    },
    {
      id: 2,
      name: 'thumnail',
      url: changeImageUrl(productData.thumbnailImage, '업체'),
    },
  ];

  return (
    <>
      {imageUrl.map(({ id, name, url }) => {
        return <Banner key={id} alt={name} src={url} />;
      })}
    </>
  );
}

export default TopImg;

const Banner = styled.img`
  width: 35%;
  margin-bottom: 50px;
  margin-right: 2rem;
  border: 1px solid rgb(68 68 68 /0.3);
  box-shadow: 1rem 1rem 1rem rgb(68 68 68 /0.3);
  ${tab} {
    width: 70%;
    object-position: center;
  }
  ${mobile} {
    width: 100%;
  } ;
`;
