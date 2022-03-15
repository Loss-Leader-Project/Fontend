import { Grid, useMediaQuery } from '@mui/material';
import Button from 'Components/Button';
import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import { brandColor, mobile, tab } from 'styles/theme';

const Coupons = ({ coupons }) => {
  const match = useMediaQuery('(max-width:600px)');

  return (
    <>
      <GridContainerWrapper container direction='row' justifyContent='center' alignItems='center' bg={'#f7f7f7'} border>
        <GridItemWrapper item lg={2} md={2} sm={2} xs={2}>
          <span>쿠폰명</span>
        </GridItemWrapper>
        <GridItemWrapper item lg={2} md={2} sm={2} xs={2}>
          <span>혜택</span>
        </GridItemWrapper>
        <GridItemWrapper item lg={6} md={6} sm={6} xs={6}>
          <span>유효기간</span>
        </GridItemWrapper>
        <GridItemWrapper item lg={2} md={2} sm={2} xs={2}>
          <span>발급일</span>
        </GridItemWrapper>
      </GridContainerWrapper>
      {coupons.map(({ id, couponName, validity, point, issueDate }) => (
        <GridContainerWrapper
          key={id}
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          bg={id % 2 === 0 ? '#f7f7f7' : ''}
        >
          <GridItemWrapper item lg={2} md={2} sm={2} xs={2}>
            <span>{couponName}</span>
          </GridItemWrapper>
          <GridItemWrapper item lg={2} md={2} sm={2} xs={2}>
            <span>{`${point}원 적립`}</span>
          </GridItemWrapper>
          <GridItemWrapper item lg={6} md={6} sm={6} xs={6} color>
            <span>{validity}</span>
            <Button text='쿠폰사용' width={match ? '60%' : '30%'} fontSize={match ? '0.625rem' : '0.9375rem'} />
          </GridItemWrapper>
          <GridItemWrapper item lg={2} md={2} sm={2} xs={2}>
            <span>{issueDate}</span>
          </GridItemWrapper>
        </GridContainerWrapper>
      ))}
    </>
  );
};

const GridContainerWrapper = styled(Grid)`
  padding: 0.4688rem 0;
  text-align: center;
  color: #727272;
  background-color: ${({ bg }) => bg};
  ${({ border }) =>
    border &&
    css`
      border-top: 1px solid #b9b9b9;
      border-bottom: 1px solid #b9b9b9;
    `}
  ${mobile} {
    font-size: 0.75rem;
  }
`;

const GridItemWrapper = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  ${({ color }) =>
    color &&
    css`
      color: ${brandColor};
    `}

  ${tab} {
    &&& {
      flex-direction: column;
      gap: 0.3125rem;
    }
  }
`;

export default Coupons;
