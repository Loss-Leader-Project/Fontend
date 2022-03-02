import React from 'react';
import styled, { css } from 'styled-components';
import { brandColor, gray, lightDark, lightGray, mobile, tab } from 'styles/theme';

const Card = ({
  packaging,
  storeMeal,
  delivery,
  briefAddress,
  storeName,
  thumbnailImage,
  couponGradeName,
  priceOfCoupon,
}) => {
  return (
    <CardWrapper>
      <CardImgWrapper>
        <img src={thumbnailImage} alt='cardImg' />
      </CardImgWrapper>
      <CardRankWrapper>
        <CardRank rank={couponGradeName}>{couponGradeName}</CardRank>
        {packaging && <CardSeviceImg src={`${process.env.PUBLIC_URL}/images/packaging.svg`} alt='serviceImg' />}
        {delivery && <CardSeviceImg src={`${process.env.PUBLIC_URL}/images/delivery.svg`} alt='serviceImg' />}
        {storeMeal && <CardSeviceImg src={`${process.env.PUBLIC_URL}/images/storeMeal.svg`} alt='serviceImg' />}{' '}
      </CardRankWrapper>
      <CardTitle>{`[${briefAddress}] ${storeName}`}</CardTitle>
      <CardDiscount>{`${priceOfCoupon}원 할인`}</CardDiscount>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  width: 25%;
  padding: 0.3rem;
  margin-bottom: 1.563rem;
  flex-direction: column;
  display: flex;
  gap: 0.313rem;

  ${tab} {
    width: 33.333%;
    &:nth-child(n) {
      padding: 0 0.35rem;
    }
  }

  @media screen and (max-width: 700px) {
    width: 50%;
  }

  ${mobile} {
    width: 100%;
    &:nth-child(n) {
      padding: 0;
    }
  }
`;

const CardRankWrapper = styled.div`
  margin-bottom: 0.313rem;
  display: flex;
  gap: 0.3125rem;
`;

const CardRank = styled.span`
  padding: 0.313rem 0.625rem;
  border-radius: 0.313rem;
  font-weight: 600;
  display: inline-block;
  font-size: 0.813rem;
  text-align: center;

  ${({ rank }) => {
    return rank !== 'Silver'
      ? css`
          background: ${lightDark};
          color: rgba(240, 230, 140, 1);
        `
      : css`
          background: ${lightGray};
          color: ${lightDark};
          font-weight: 900;
        `;
  }}
`;

const CardImgWrapper = styled.div`
  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const CardSeviceImg = styled.img`
  max-width: 25px;
  max-height: 25px;
`;

const CardTitle = styled.h6`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1.1rem;
  color: ${gray};
`;

const CardDiscount = styled.div`
  color: ${brandColor};
`;

export default Card;
