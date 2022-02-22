import { Grid, useMediaQuery } from '@mui/material';
import Button from 'Components/common/Button';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { gray, lightGray, mobile } from 'styles/theme';
import { OrdersContext } from 'contexts/OrdersProvider';

const Order = ({ date, couponNumber, title, price }) => {
  const { GridItem, two, fivePointFive, twoPointFive } = useContext(OrdersContext);
  const match = useMediaQuery('(max-width:600px)');

  return (
    <GridContainer container direction='row' justifyContent='center' alignItems='center'>
      <GridItem size={two}>
        <DateOrCouponNumber>
          <p className='date'>{date}</p>
          <p className='number'>{couponNumber}</p>
        </DateOrCouponNumber>
      </GridItem>
      <GridItem size={fivePointFive} text={title} />
      <GridItem size={two} text={`${price}원`} />
      <GridItem size={twoPointFive}>
        <Button text='리뷰쓰기' width={match ? '80%' : '100%'} fontSize={match ? '0.75rem' : '0.9375rem'} />
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
    font-weight: 800;
  }
  .number {
    font-size: 1rem;
  }
`;

export default Order;
