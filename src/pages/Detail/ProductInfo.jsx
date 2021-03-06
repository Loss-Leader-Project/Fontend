import React from 'react';

import styled from 'styled-components';
import { Rating } from '@mui/material';
import { css } from 'styled-components';
import Tag from '../../Components/Tag';
import { tab, mobile, brandColor, lightDark } from 'styles/theme';

function ProductInfo({ storeTopData, applyPageMove }) {
  const applyButtonURL = `/images/DetailPageApply${storeTopData?.leftCoupon === 0 ? 'Block' : ''}.png`;
  const isApply = storeTopData?.leftCoupon === 0;

  return (
    <Contain>
      <Wrapper>
        <TopInfo>
          <LocationCuponName marginValue='1rem 0 2rem 1rem'>{storeTopData?.briefAddress}</LocationCuponName>
          <TitlePrice color='lightDark'>{storeTopData?.storeName}</TitlePrice>
          <Tag hashTag={storeTopData?.storeHashTagResponseList} className='tag' />
          <Rating
            name='rating'
            defaultValue={0}
            value={storeTopData?.avgStar || null}
            precision={0.5}
            size='large'
            className='rating'
            readOnly
          />
        </TopInfo>
        <TabSizeChange>
          <BottomInfo>
            <LocationCuponName marginValue='0 0 2rem 0'>{`${storeTopData?.couponContent} ${storeTopData?.benefitCondition}`}</LocationCuponName>
            <TitlePrice color='brandColor'>{`${storeTopData?.priceOfCoupon} 원`}</TitlePrice>
          </BottomInfo>
          <div>
            <ResidualCoupons>{`${storeTopData?.leftCoupon}팀 남음`}</ResidualCoupons>
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
  ${tab} {
    height: 30rem;
    margin: 0 4rem 8rem 4rem;
  }
  ${mobile} {
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
    ${mobile} {
      font-size: 0.6rem;
    }
  }
  & .rating {
    color: ${brandColor};
  }
`;

const LocationCuponName = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin: ${({ marginValue }) => marginValue};
  color: ${lightDark};
  ${mobile} {
    font-size: 1rem;
  }
`;

const TitlePrice = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  color: ${({ theme, color }) => theme.colors[color]};
  ${mobile} {
    font-size: 1.7rem;
  }
`;

const TabSizeChange = styled.div`
  display: flex;
  flex-direction: column;
  ${tab} {
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
  color: ${brandColor};
  margin: 1rem 0;
  ${mobile} {
    font-size: 1rem;
  }
`;

const ApplyButton = styled.img.attrs(({ applyButtonURL }) => ({
  alt: 'ApplyButton',
  src: applyButtonURL,
}))`
  width: 13rem;
  margin: 2rem 0;
  ${tab} {
    width: 10rem;
    height: 5rem;
    margin: 0;
  }
  ${mobile} {
    width: 8rem;
    height: 4rem;
    margin-right: 1rem;
  }
  ${({ isApply }) => isApply || CuponImgHover()}
`;
