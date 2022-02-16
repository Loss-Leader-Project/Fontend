import { useMediaQuery } from '@mui/material';
import Button from 'Components/common/Button';
import React, { useContext } from 'react';
import { CouponContext } from 'contexts/CouponProvider';

const Coupons = ({ coupons }) => {
  const { two, six, bg, GridItem, GridContainer } = useContext(CouponContext);
  const match = useMediaQuery('(max-width:600px)');

  return (
    <>
      <GridContainer bg={bg} border>
        <GridItem size={two} text='쿠폰명' />
        <GridItem size={two} text='혜택' />
        <GridItem size={six} text='유효기간' />
        <GridItem size={two} text='발급일' />
      </GridContainer>
      {coupons.map(({ id, couponName, validity, point, issueDate }) => (
        <GridContainer key={id} bg={id % 2 === 0 ? bg : ''}>
          <GridItem size={two} text={couponName} />
          <GridItem size={two} text={`${point}원 적립`} />
          <GridItem size={six} text={validity} color>
            <Button text='쿠폰사용' width={match ? '60%' : '30%'} fontSize={match ? '0.625rem' : '0.9375rem'} />
          </GridItem>
          <GridItem size={two} text={issueDate} />
        </GridContainer>
      ))}
    </>
  );
};

export default Coupons;
