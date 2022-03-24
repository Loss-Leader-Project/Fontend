import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BottomReview from './BottomReview';
import TopReview from './TopReview';
import { detailApiURL } from 'utils/apiUrl';
import { ApiRq } from 'utils/apiConfig';

function ProductReview({ avgStar }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [reviewsData, setReviewsData] = useState([]);
  const changeCurrentPage = c => {
    setCurrentPage(c);
  };

  useEffect(() => {
    ApiRq('GET', detailApiURL.REAL_GET_REVIEW, { storeId: 1, page: 0 }).then(data => {
      setReviewsData(data);
    });
  }, []);

  useEffect(() => {
    ApiRq('GET', detailApiURL.REAL_GET_REVIEW, { storeId: 1, page: currentPage - 1 }).then(data => {
      setReviewsData(data);
    });
  }, [currentPage]);

  return (
    <Contain>
      <TopReview
        totalPage={reviewsData?.totalPages}
        reviewCount={reviewsData?.totalElements}
        {...{ currentPage, changeCurrentPage, avgStar }}
      />
      <div>
        {reviewsData?.content?.map(review => {
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
