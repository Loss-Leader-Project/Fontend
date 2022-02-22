import React from 'react';
import styled from 'styled-components';
import BottomReview from './BottomReview';
import TopReview from './TopReview';

function ProductReview({ newData }) {
  const { ratingTotal, reviewCount, reviews } = newData;

  return (
    <Contain>
      <TopReview {...{ ratingTotal, reviewCount }} />
      <div>
        {reviews.map(review => {
          return <BottomReview key={review.id} {...{ review }} />;
        })}
      </div>
    </Contain>
  );
}

export default ProductReview;

const Contain = styled.div`
  width: 80%;
  margin: 5rem auto 0 auto;
`;
