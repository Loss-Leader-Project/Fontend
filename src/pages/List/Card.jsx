import React from 'react';
import styled from 'styled-components';

const Card = ({ rank, imgUrl, discount, title }) => {
  return (
    <CardWrapper>
      <div>
        <img src={`${process.env.PUBLIC_URL}${imgUrl}`} alt='cardImg' />
      </div>
      <div
        className={`card__rank card__${rank === '골드' ? 'gold' : 'silver'}`}
      >
        <span>{rank}</span>
        <img
          className='card__service'
          src={`${process.env.PUBLIC_URL}/images/food-removebg.png`}
          alt='card_service_img'
        />
      </div>
      <div className='card__title'>{title}</div>
      <p className='card__discount'>
        {rank === '골드' ? `${discount}% 할인` : `${discount} 서비스`}
      </p>
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
  img {
    width: 100%;
    height: 12.5rem;
  }
  .card__rank {
    margin-bottom: 0.313rem;
    display: flex;
    gap: 0.625rem;
    span {
      padding: 0.313rem 0.625rem;
      border-radius: 0.313rem;
      font-weight: 600;
      display: inline-block;
      font-size: 0.813rem;
      max-width: 3.125rem;
      text-align: center;
    }
  }
  .card__gold > span {
    background: ${({ theme }) => theme.colors.lightDark};
    color: rgba(240, 230, 140, 1);
  }
  .card__silver > span {
    background: ${({ theme }) => theme.colors.lightGray};
    color: ${({ theme }) => theme.colors.lightDark};
    font-weight: 900;
  }

  .card__title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1.1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray};
  }
  .card__discount {
    color: ${({ theme }) => theme.colors.brandColor};
  }
  .card__service {
    height: 1.563rem;
    width: 6.25rem;
  }

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
    img {
      height: 15.625rem;
    }
  }
`;

export default Card;
