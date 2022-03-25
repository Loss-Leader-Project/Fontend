import { Grid } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { gray, mobile } from 'styles/theme';
import Title from 'Components/Title';
import GridItem from './GridItem';

const BuysHead = () => {
  const two = 2;
  const fivePointFive = 5.5;
  const twoPointFive = 2.5;

  return (
    <>
      <RecentOrderWrapper>
        <Title text='최근 주문 정보' margin='0' />
        <RecentBuyText>최근 30일 내에 주문하신 내역입니다.</RecentBuyText>
      </RecentOrderWrapper>
      <BuysHeadWrapper container direction='row' justifyContent='center' alignItems='center'>
        <GridItem size={two} text='날짜/주문번호' />
        <GridItem size={fivePointFive} text='상품명' />
        <GridItem size={two} text='상품금액' />
        <GridItem size={twoPointFive} text='확인/리뷰' />
      </BuysHeadWrapper>
    </>
  );
};

const RecentOrderWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.625rem;
`;

const RecentBuyText = styled.span`
  font-weight: 500;
  color: ${gray};
`;

const BuysHeadWrapper = styled(Grid)`
  background-color: rgba(185, 185, 185, 0.2);
  padding: 0.75rem 0;
  margin-top: 0.625rem;
  text-align: center;
  font-size: 1.0625rem;
  font-weight: 600;
  color: ${gray};

  ${mobile} {
    font-size: 0.75rem;
  }
`;

export default BuysHead;
