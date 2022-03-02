import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BottomReview from './BottomReview';
import TopReview from './TopReview';
import { getReviews } from 'utils/api';

function ProductReview({ newData }) {
  const { ratingTotal, reviewCount, reviews } = newData;
  const [totalPage, setTotalPage] = useState(21); //백엔드에서줌
  const [currentPage, setCurrentPage] = useState(1); //백엔드에 줘야됨
  const [reviewsData, setReviewsData] = useState([]); //데이터 넣는

  const changeCurrentPage = c => {
    setCurrentPage(c);
  };

  // api 연결할때 필요한 reviews api입니다.
  // useEffect(() => {
  //   getReviews().then(({ data }) => {
  //     setReviewsData(data);
  //   });
  // }, []);

  // useEffect(() => {
  //   getReviews('createdAt', currentPage).then(({ data }) => {
  //     setReviewsData(data);
  //   });
  // }, [currentPage]);

  return (
    <Contain>
      <TopReview {...{ ratingTotal, reviewCount, totalPage, currentPage, changeCurrentPage }} />
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
