import React from 'react';
import styled from 'styled-components';
import { Rating } from '@mui/material';
import { brandColor, lightGray, lightDark } from 'styles/theme';
import Pages from '../../Components/Pages';

function TopReview({ ratingTotal, reviewCount, totalPage, currentPage, changeCurrentPage }) {
  return (
    <TopWrapper>
      <TotalInfo>
        <TotalReviews>{`총 리뷰 ${reviewCount} 개`}</TotalReviews>
        <TotalRatingInfo>
          <Rating
            name='rating'
            defaultValue={0}
            value={ratingTotal || null}
            precision={0.5}
            className='totalRating'
            readOnly
          />
          <RatingNumberDate fontSize='1.2rem'>{ratingTotal}</RatingNumberDate>
        </TotalRatingInfo>
      </TotalInfo>
      <Pages {...{ totalPage, currentPage, changeCurrentPage }} />
    </TopWrapper>
  );
}

export default TopReview;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 3px solid ${lightGray};
  padding-bottom: 4rem;
`;

const TotalInfo = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TotalReviews = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${lightDark};
`;

const TotalRatingInfo = styled.article`
  display: flex;
  align-items: center;
  margin: 1.5rem 0 0 0;
  & .totalRating {
    color: ${brandColor};
    font-size: 1.7rem;
  }
`;

const RatingNumberDate = styled.p`
  font-size: ${({ fontSize }) => fontSize};
  margin: 0 0 0 0.5rem;
  color: ${lightGray};
`;
