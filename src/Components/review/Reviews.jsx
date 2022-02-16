import React from 'react';
import styled from 'styled-components';
import Review from './Review';

const Reviews = ({ reviews }) => {
  return (
    <ReviewsWrapper>
      {reviews.map(item => (
        <Review key={item.id} {...item} />
      ))}
    </ReviewsWrapper>
  );
};

const ReviewsWrapper = styled.div`
  padding-top: 0.625rem;
`;

export default Reviews;
