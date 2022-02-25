import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { brandColor, lightGray, lightDark } from 'styles/theme';

function Pages({ totalPage, currentPage, changeCurrentPage }) {
  const LIMIT_PAGE = 5;
  const [totalArr, setTotalArr] = useState([]);
  const [startEndPage, setStartEndPage] = useState({
    start: 1,
    end: LIMIT_PAGE,
  });

  useEffect(() => {
    const end = totalPage <= LIMIT_PAGE ? totalPage : LIMIT_PAGE;
    setStartEndPage(prev => ({ ...prev, start: 1, end }));
  }, [totalPage]);

  useEffect(() => {
    let pageArr = [];
    const { start, end } = startEndPage;
    for (let i = start; i <= end; i++) {
      pageArr.push(i);
    }
    setTotalArr(pageArr);
  }, [startEndPage]);

  useEffect(() => {
    changeCurrentPage(startEndPage.start);
  }, [startEndPage]);

  const nextButton = () => {
    const { start, end } = startEndPage;
    const isLastPage = totalPage - end > 5 ? end + LIMIT_PAGE : totalPage;
    setStartEndPage(prev => ({ ...prev, start: start + LIMIT_PAGE, end: isLastPage }));
  };

  const prevButton = () => {
    const { start, end } = startEndPage;
    const isLastPage = end - start === 4 ? end - LIMIT_PAGE : end - (end - start + 1);
    setStartEndPage(prev => ({
      ...prev,
      start: start - LIMIT_PAGE,
      end: isLastPage,
    }));
  };

  const { start, end } = startEndPage;
  return (
    <Contain>
      <Button onClick={prevButton} disabled={start === 1}>
        &lt;
      </Button>
      {totalArr.map(pageNum => (
        <Button
          key={pageNum}
          onClick={() => changeCurrentPage(pageNum)}
          aria-current={currentPage === pageNum ? 'page' : null}
        >
          {pageNum}
        </Button>
      ))}
      <Button onClick={nextButton} disabled={totalPage - end <= 0}>
        &gt;
      </Button>
    </Contain>
  );
}

export default Pages;

const Contain = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: ${lightDark};
  color: white;
  font-size: 1rem;

  &:hover {
    background: ${brandColor};
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: ${lightGray};
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: ${brandColor};
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;
