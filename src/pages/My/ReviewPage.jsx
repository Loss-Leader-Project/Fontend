import axios from 'axios';
import Title from 'Components/common/Title';
import Reviews from 'Components/review/Reviews';
import React, { useEffect, useState } from 'react';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await axios.get('/data/reviews.json');
      setReviews(data.data);
    };
    fetchReviews();
  }, []);

  return (
    <div>
      <Title text='리뷰관리' m='0 0 0.9375rem 0' />
      <Reviews reviews={reviews} />
    </div>
  );
};

export default ReviewPage;
