import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Rating } from '@mui/material';
import { css } from 'styled-components';
import Tag from './Tag';

function ProductInfo({ infoData }) {
  const history = useHistory();

  const isApply = infoData.productCount === 0;
  const applyButtonURL = `/images/DetailPageApply${
    infoData.productCount === 0 ? 'Block' : ''
  }.png`;

  const applyPageMove = () => {
    isApply ? alert('상품 준비중 입니다.') : history.push('/apply');
  };

  return (
    <Contain>
      <Wrapper>
        <TopInfo>
          <LocationCuponName marginValue='0.5rem 0 1.5rem 1rem'>
            {infoData?.location}
          </LocationCuponName>
          <TitlePrice color='lightDark'>{infoData?.title}</TitlePrice>
          <Tag infoData={infoData} />
          <Rating
            name='rating'
            defaultValue={0}
            value={infoData?.ratingTotal || null}
            precision={0.5} //백에서 ratingTotal 값 받기
            size='large'
            className='rating'
            readOnly
          />
        </TopInfo>
        <TabSizeChange>
          <BottomInfo>
            <LocationCuponName marginValue='0.5rem 0 1.5rem 0'>
              {infoData?.cuponName}
            </LocationCuponName>
            <TitlePrice color='brandColor'>{`${infoData?.cuponPrice} 원`}</TitlePrice>
            <ResidualCoupons>{`${infoData?.residualCoupons}팀 남음`}</ResidualCoupons>
          </BottomInfo>
          <ApplyButton
            onClick={applyPageMove}
            applyButtonURL={applyButtonURL}
            isApply={isApply}
          />
        </TabSizeChange>
      </Wrapper>
    </Contain>
  );
}

export default ProductInfo;

const Contain = styled.div`
  width: 28rem;
  margin-left: 2rem;
  ${({ theme }) => theme.media.tab} {
    height: 25rem;
  }
  ${({ theme }) => theme.media.mobile} {
    width: 20rem;
    margin-left: 0rem;
    height: 22rem;
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
  margin: 0.5rem 0 3rem 0;
  & .rating {
    color: ${({ theme }) => theme.colors.brandColor};
  }
`;

const LocationCuponName = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin: ${({ marginValue }) => marginValue};
  color: ${({ theme }) => theme.colors.lightDark};
  ${({ theme }) => theme.media.mobile} {
    font-size: 0.9rem;
  }
`;

const TitlePrice = styled.h1`
  font-size: 1.8rem;
  font-weight: 900;
  margin: 0 0 0.8rem 0;
  color: ${({ theme, color }) => theme.colors[color]};
  ${({ theme }) => theme.media.mobile} {
    font-size: 1.5rem;
  }
`;

const ResidualCoupons = styled.h5`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.brandColor};
  ${({ theme }) => theme.media.mobile} {
    font-size: 0.8rem;
  }
`;

const BottomInfo = styled.article`
  display: flex;
  flex-direction: column;
`;

const CuponImgHover = () => css`
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const ApplyButton = styled.img.attrs(({ applyButtonURL }) => ({
  alt: 'ApplyButton',
  src: applyButtonURL,
}))`
  width: 11rem;
  margin: 3rem 0 1.5rem 1rem;
  ${({ theme }) => theme.media.tab} {
    margin: 2rem 1rem 0 0;
    width: 8rem;
    height: 4rem;
  }
  ${({ theme }) => theme.media.mobile} {
    width: 6rem;
    height: 3rem;
  }
  ${({ isApply }) => isApply || CuponImgHover()}
`;

const TabSizeChange = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.media.tab} {
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 2rem;
  }
`;
