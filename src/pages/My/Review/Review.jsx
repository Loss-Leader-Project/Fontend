import React from 'react';
import styled from 'styled-components';
import Title from 'Components/Title';
import { brandColor, flexStyleGroup, mobile, tab } from 'styles/theme';
import { Rating } from '@mui/material';
import { Link } from 'react-router-dom';

const Review = ({ content, star, userName, imageIdentifyList, storeId, storeName, briefAddress }) => {
  const [image] = imageIdentifyList;
  const url = `${process.env.REACT_APP_REVIEW_IMG_URL}/${image?.imageIdentify ?? 'noimg.jpg'}`;
  // 리뷰 페이지로 이동하게 /review 추가
  const producPath = `/product/${storeId}/review`;
  const html = content.replace(/&lt;/g, '<');
  return (
    <ReviewWrapper to={producPath}>
      <StoreImgWrapper>
        <StoreImg src={url} alt='storeImg' />
      </StoreImgWrapper>
      <ReviewInfoWrapper>
        <Title text={`[ ${briefAddress} ] ${storeName}`} margin='0 0 0.9375rem 0' />
        <ReviewContent dangerouslySetInnerHTML={{ __html: html }} />
        <RatingOrNameWrapper>
          <CustomRating name='read-only' value={star} readOnly />
          <span>{userName}</span>
        </RatingOrNameWrapper>
      </ReviewInfoWrapper>
    </ReviewWrapper>
  );
};

const ReviewWrapper = styled(Link)`
  height: 15.625rem;
  margin-bottom: 1.5625rem;
  ${flexStyleGroup('auto', 'auto')}
  gap:0.9375rem;
  position: relative;

  ${mobile} {
    height: auto;
    position: unset;
    flex-direction: column;
  }
`;

const ReviewInfoWrapper = styled.div`
  min-width: 40%;
  ${mobile} {
    position: relative;
  }
`;

const StoreImgWrapper = styled.div`
  display: inline-block;
  width: 100%;
  max-width: 350px;
  overflow: hidden;
  ${mobile} {
    max-width: 100%;
  }
`;

const StoreImg = styled.img`
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
  transition: transform 0.25s ease-in;
  &:hover {
    transform: scale(1.02);
  }
`;
const ReviewContent = styled.div`
  width: 70%;
  line-height: 1.5;
  color: #a1a1a1;
  font-size: 0.9375rem;
  max-height: 50%;
  margin-bottom: 0.9375rem;
  ${tab} {
    width: 100%;
  }
`;

const RatingOrNameWrapper = styled.div`
  ${flexStyleGroup('auto', 'center')}
  gap:0.625rem;
  color: #8a8a8a;
  font-size: 1.1875rem;
  font-weight: 500;
`;

const CustomRating = styled(Rating)`
  .MuiRating-icon {
    color: ${brandColor};
  }
`;

export default Review;
