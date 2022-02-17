import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Rating } from '@mui/material';
import { css } from 'styled-components';
import Tag from './Tag';

function ProductInfo({ newData }) {
  const history = useHistory();
  const { briefAddress, storeName, ratingTotal, cuponCondition, cuponBenefit, cuponPrice, leftCoupon, hashTag } =
    newData;

  const isApply = leftCoupon === 0;
  const applyButtonURL = `/images/DetailPageApply${leftCoupon === 0 ? 'Block' : ''}.png`;

  const applyPageMove = () => {
    isApply ? alert('상품 준비중 입니다.') : history.push('/apply');
  };

  return (
    <Contain>
      <Wrapper>
        <TopInfo>
          <LocationCuponName marginValue='1rem 0 2rem 1rem'>{briefAddress}</LocationCuponName>
          <TitlePrice color='lightDark'>{storeName}</TitlePrice>
          <Tag hashTag={hashTag} className='tag' />
          <Rating
            name='rating'
            defaultValue={0}
            value={ratingTotal || null}
            precision={0.5} //백에서 ratingTotal 값 받기
            size='large'
            className='rating'
            readOnly
          />
        </TopInfo>
        <TabSizeChange>
          <BottomInfo>
            <LocationCuponName marginValue='0 0 2rem 0'>{`${cuponCondition} ${cuponBenefit}`}</LocationCuponName>
            <TitlePrice color='brandColor'>{`${cuponPrice} 원`}</TitlePrice>
          </BottomInfo>
          <div>
            <ResidualCoupons>{`${leftCoupon}팀 남음`}</ResidualCoupons>
            <ApplyButton onClick={applyPageMove} applyButtonURL={applyButtonURL} isApply={isApply} />
          </div>
        </TabSizeChange>
      </Wrapper>
    </Contain>
  );
}

export default ProductInfo;

const Contain = styled.div`
  height: 39rem;
  margin-left: 2rem;
  ${({ theme }) => theme.media.tab} {
    height: 30rem;
    margin: 0 4rem 8rem 4rem;
  }
  ${({ theme }) => theme.media.mobile} {
    height: 22rem;
    margin: 0 0 4rem 0;
  }
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const TopInfo = styled.header`
  display: flex;
  flex-direction: column;

  & .tag {
    margin-top: 1rem;
    ${({ theme }) => theme.media.mobile} {
      font-size: 0.6rem;
    }
  }
  & .rating {
    color: ${({ theme }) => theme.colors.brandColor};
  }
`;

const LocationCuponName = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin: ${({ marginValue }) => marginValue};
  color: ${({ theme }) => theme.colors.lightDark};
  ${({ theme }) => theme.media.mobile} {
    font-size: 1rem;
  }
`;

const TitlePrice = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  color: ${({ theme, color }) => theme.colors[color]};
  ${({ theme }) => theme.media.mobile} {
    font-size: 1.7rem;
  }
`;

const TabSizeChange = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.media.tab} {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 0 2rem 0;
  }
`;

const BottomInfo = styled.article`
  margin: auto 0;
`;

const CuponImgHover = () => css`
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const ResidualCoupons = styled.h5`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.brandColor};
  margin: 1rem 0;
  ${({ theme }) => theme.media.mobile} {
    font-size: 1rem;
  }
`;

const ApplyButton = styled.img.attrs(({ applyButtonURL }) => ({
  alt: 'ApplyButton',
  src: applyButtonURL,
}))`
  width: 13rem;
  margin: 2rem 0;
  ${({ theme }) => theme.media.tab} {
    width: 10rem;
    height: 5rem;
    margin: 0;
  }
  ${({ theme }) => theme.media.mobile} {
    width: 8rem;
    height: 4rem;
    margin-right: 1rem;
  }
  ${({ isApply }) => isApply || CuponImgHover()}
`;
