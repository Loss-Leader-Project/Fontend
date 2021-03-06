import Empty from 'Components/Empty';
import Pages from 'Components/Pages';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { ApiRq } from 'utils/apiConfig';
import { myApiURL } from 'utils/apiUrl';
import Review from './Review';
import validation from 'utils/validation';
import Filter from './Filter';
import qs from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';
import TokenCheck from 'utils/TokenCheck';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('date');

  const [currentPage, setCurrentPage] = useState(1);
  const totalPagesRef = useRef(0);
  const [currentSize] = useState(20);
  const { search } = useLocation();
  const oldQeury = useMemo(() => qs.parse(search), [search]);
  const history = useHistory();

  const makeQuery = useCallback(
    (page = 0) =>
      qs.stringify({
        ...oldQeury,
        size: currentSize,
        page,
      }),
    [oldQeury, currentSize]
  );

  const fetchReviews = useCallback(
    async pageNumber => {
      TokenCheck(async Authorization => {
        const _query = makeQuery(pageNumber - 1);
        const { data } = await ApiRq('get', myApiURL.GET_REVIEWS(_query), null, null, { Authorization });
        const { reviewListing } = data;
        const { number, totalPages } = reviewListing;
        setCurrentPage(number + 1);
        setReviews(reviewListing.content);
        totalPagesRef.current = totalPages;
      }, history);
    },
    [makeQuery, history]
  );

  const handleChange = useCallback(({ target: { value } }) => setCurrentFilter(value), []);
  const handlePageOnChange = useCallback(pageNumber => fetchReviews(pageNumber), [fetchReviews]);
  const handleWindowTop = () =>
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

  useEffect(() => fetchReviews(1), [fetchReviews]);
  useEffect(() => handleWindowTop(), [currentPage]);

  return (
    <div>
      <Filter length={reviews.length} onChange={handleChange} filterValue={currentFilter} />
      <ReviewsWrapper>
        {reviews.length ? reviews.map(item => <Review key={item.id} {...item} />) : <Empty text='????????? ????????????.' />}
      </ReviewsWrapper>
      {validation.emptyCheck(reviews) !== true && (
        <Pages totalPage={totalPagesRef.current} currentPage={currentPage} changeCurrentPage={handlePageOnChange} />
      )}
    </div>
  );
};

const ReviewsWrapper = styled.div`
  padding-top: 0.625rem;
`;

export default ReviewPage;
