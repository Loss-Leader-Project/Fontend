import React from 'react';
import styled from 'styled-components';
import { gray, lightGray, mobile } from 'styles/theme';
import { Grid, useMediaQuery } from '@mui/material';
import Button from 'Components/Button';
import GridItem from './GridItem';
import { Link } from 'react-router-dom';

const BuyItem = ({ orderDate, orderNumber, storeName, priceOfCoupon, couponContent, isReview, storeId }) => {
  const match = useMediaQuery('(max-width:600px)');

  const two = 2;
  const fivePointFive = 5.5;
  const twoPointFive = 2.5;
  const text = isReview ? '리뷰 작성 완료' : '리뷰쓰기';
  const productName = `[ ${storeName} ] ${couponContent} 구매`;
  const insertPath = {
    pathname: `/my/review/insert`,
    state: { orderNumber, storeId, productName },
  };

  return (
    <GridContainer container direction='row' justifyContent='center' alignItems='center'>
      <GridItem size={two}>
        <DateOrCouponNumber>
          <p className='date'>{orderDate}</p>
          <p className='number'>{orderNumber}</p>
        </DateOrCouponNumber>
      </GridItem>
      <GridItem size={fivePointFive} text={productName} />
      <GridItem size={two} text={`${priceOfCoupon}원`} />
      <GridItem size={twoPointFive}>
        <Link to={insertPath}>
          <Button
            disabled={isReview}
            text={text}
            width={match ? '80%' : '100%'}
            fontSize={match ? '0.75rem' : '0.9375rem'}
          />
        </Link>
      </GridItem>
    </GridContainer>
  );
};

const GridContainer = styled(Grid)`
  height: 7.5rem;
  border-bottom: 0.125rem solid ${lightGray};
  color: ${gray};
  font-size: 1.25rem;
  font-weight: 500;
  text-align: center;
  ${mobile} {
    font-size: 0.8125rem;
    height: 6.25rem;
  }
`;

const DateOrCouponNumber = styled.div`
  p {
    padding: 0.4688rem 0;
    text-align: center;
    word-break: break-all;
    ${mobile} {
      font-size: 0.75rem;
    }
  }
  .date {
    font-weight: 700;
  }
  .number {
    font-size: 1rem;
  }
`;

export default BuyItem;
