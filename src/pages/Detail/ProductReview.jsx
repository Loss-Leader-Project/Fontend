import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BottomReview from './BottomReview';
import TopReview from './TopReview';
import { detailApiURL } from 'utils/apiUrl';
import { ApiRq } from 'utils/apiConfig';

function ProductReview({ avgStar, param }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [reviewsData, setReviewsData] = useState([]);
  const changeCurrentPage = c => {
    setCurrentPage(c);
  };

  useEffect(() => {
    ApiRq('GET', detailApiURL.LOCAL_GET_REVIEW, { storeId: param.productId, page: 0, size: 5 }).then(data => {
      setReviewsData(data?.data);
    });
  }, []);

  useEffect(() => {
    ApiRq('GET', detailApiURL.LOCAL_GET_REVIEW, { storeId: param.productId, page: currentPage - 1, size: 5 }).then(
      data => {
        setReviewsData(data?.data);
      }
    );
  }, [currentPage, param]);

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
