import React from 'react';
import styled, { css } from 'styled-components';

const Card = ({ rank, imgUrl, discount, title }) => {
  const rankText = rank === '골드' ? `${discount}% 할인` : `${discount} 서비스`;

  return (
    <CardWrapper>
      <CardImgWrapper>
        <img src={`${imgUrl}`} alt='cardImg' />
      </CardImgWrapper>
      <CardRankWrapper>
        <CardRank rank={rank}>{rank}</CardRank>
        <CardSeviceImg src={`${process.env.PUBLIC_URL}/images/food-removebg.png`} alt='card_service_img' />
      </CardRankWrapper>
      <CardTitle>{title}</CardTitle>
      <CardDiscount>{rankText}</CardDiscount>
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

  ${({ theme }) => theme.media.tab} {
    width: 33.333%;
    &:nth-child(n) {
      padding: 0 0.35rem;
    }
  }

  @media screen and (max-width: 700px) {
    width: 50%;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    &:nth-child(n) {
      padding: 0;
    }
  }
`;

const CardRankWrapper = styled.div`
  margin-bottom: 0.313rem;
  display: flex;
  gap: 0.625rem;
`;

const CardRank = styled.span`
  padding: 0.313rem 0.625rem;
  border-radius: 0.313rem;
  font-weight: 600;
  display: inline-block;
  font-size: 0.813rem;
  max-width: 3.125rem;
  text-align: center;

  ${({ rank }) => {
    return rank === '골드'
      ? css`
          background: ${({ theme }) => theme.colors.lightDark};
          color: rgba(240, 230, 140, 1);
        `
      : css`
          background: ${({ theme }) => theme.colors.lightGray};
          color: ${({ theme }) => theme.colors.lightDark};
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
  width: 6.25rem;
  height: 100%;
`;

const CardTitle = styled.h6`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray};
`;

const CardDiscount = styled.div`
  color: ${({ theme }) => theme.colors.brandColor};
`;

export default Card;
