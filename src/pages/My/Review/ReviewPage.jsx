import Title from 'Components/Title';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ApiRq } from 'utils/apiConfig';
import { myApiURL } from 'utils/apiUrl';
import Review from './Review';
const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    ApiRq('get', myApiURL.GET_REVIEWS)
      .then(({ data }) => setReviews(data))
      .catch(alert);
  }, []);

  return (
    <div>
      <Title text='리뷰관리' margin='0 0 0.9375rem 0' />
      <ReviewsWrapper>
        {reviews.map(item => (
          <Review key={item.id} {...item} />
        ))}
      </ReviewsWrapper>
    </div>
  );
};

const ReviewsWrapper = styled.div`
  padding-top: 0.625rem;
`;

export default ReviewPage;
