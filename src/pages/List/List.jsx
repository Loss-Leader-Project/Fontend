import React, { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import Fliters from 'pages/List/Fliters';
import Card from 'pages/List/Card';
import { fetchList } from 'utils/api';
import { useLocation } from 'react-router';
import Pages from 'Components/Pages';
import qs from 'query-string';

const List = () => {
  const [items, setItems] = useState([]);
  const { search } = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [currentSize, setCurrentSize] = useState(20);
  const oldQeury = useMemo(() => qs.parse(search), [search]);

  const makeQuery = useCallback(
    (page = 1) =>
      qs.stringify({
        ...oldQeury,
        size: currentSize,
        page: page - 1,
      }),
    [oldQeury, currentSize]
  );

  const handleChange = useCallback(({ target: { value } }) => {
    setCurrentPage(1);
    setCurrentSize(value);
  }, []);
  const handlePage = useCallback(page => setCurrentPage(page), []);

  // 모두다 쿼리스트링으로 관리하자.
  useEffect(() => {
    return () => {
      setCurrentPage(1);
      setTotalPage(0);
      setCurrentSize(20);
    };
  }, [oldQeury]);

  useEffect(() => {
    fetchList(makeQuery(currentPage))
      .then(({ StoreListingResponse, totalPages }) => {
        setItems(StoreListingResponse);
        setTotalPage(totalPages);
      })
      .catch(message => alert(message));
  }, [makeQuery, currentPage]);

  return (
    <ListWrapper>
      <Fliters handleChange={handleChange} size={currentSize} />
      <CardsWrapper>
        {items.map(item => (
          <Card key={item.id} {...item} />
        ))}
      </CardsWrapper>
      <Pages currentPage={currentPage} totalPage={totalPage} changeCurrentPage={handlePage} />
    </ListWrapper>
  );
};

const ListWrapper = styled.section`
  padding: 0 0.625em;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0.625rem;
`;

export default List;
