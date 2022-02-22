import Title from 'Components/common/Title';
import React from 'react';
import styled from 'styled-components';
import { brandColor, flexStyleGroup, mobile, tab } from 'styles/theme';
import { Rating } from '@mui/material';
import DoNotDisturbOnOutlinedIcon from '@mui/icons-material/DoNotDisturbOnOutlined';

const Review = ({ id, title, content, rating, name, url }) => {
  return (
    <ReviewWrapper>
      <ReviewImg src={url} alt='thumnailImg' />
      <ReviewInfoWrapper>
        <Title text={title} m='0 0 0.9375rem 0' />
        <ReviewContent>{content}</ReviewContent>
        <RatingOrNameWrapper>
          <CustomRating name='read-only' value={rating} readOnly />
          <span>{name}</span>
        </RatingOrNameWrapper>
        <ReviewDeleteWrapper>
          <span>리뷰삭제</span>
          <DoNotDisturbOnOutlinedIcon />
        </ReviewDeleteWrapper>
      </ReviewInfoWrapper>
    </ReviewWrapper>
  );
};

const ReviewWrapper = styled.div`
  height: 15.625rem;
  margin-bottom: 1.5625rem;
  ${flexStyleGroup('auto', 'auto')}
  gap:0.9375rem;

  ${mobile} {
    height: auto;
    flex-direction: column;
  }
`;

const ReviewInfoWrapper = styled.div`
  position: relative;
`;

const ReviewImg = styled.img`
  object-fit: cover;
  object-position: center;
  ${mobile} {
    width: 100%;
    height: 100%;
  }
`;
const ReviewContent = styled.div`
  width: 70%;
  line-height: 1.5;
  color: #a1a1a1;
  font-size: 1.125rem;
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

const ReviewDeleteWrapper = styled.div`
  position: absolute;
  right: 0;
  ${flexStyleGroup('auto', 'center')}
  gap:0.625rem;
  color: #b9b9b9;
  font-size: 1.125rem;
  font-weight: 600;
  top: -0.3125rem;
`;

const CustomRating = styled(Rating)`
  .MuiRating-icon {
    color: ${brandColor};
  }
`;

export default Review;
