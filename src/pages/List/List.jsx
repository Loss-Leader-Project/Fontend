import React, { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import Fliters from 'pages/List/Fliters';
import { fetchList } from 'utils/api';
import { useLocation } from 'react-router';
import Pages from 'Components/Pages';
import qs from 'query-string';
import { css } from 'styled-components';
import { brandColor, gray, lightDark, lightGray, mobile, tab } from 'styles/theme';

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

  useEffect(() => {
    return () => {
      setCurrentPage(1);
      setTotalPage(0);
      setCurrentSize(20);
    };
  }, [oldQeury]);

  useEffect(() => {
    fetchList(makeQuery(currentPage))
      .then(({ content, totalPages }) => {
        setItems(content);
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

const Card = ({
  packaging,
  storeMeal,
  delivery,
  briefAddress,
  storeName,
  thumbnailImage,
  couponGradeName,
  priceOfCoupon,
}) => {
  return (
    <CardWrapper>
      <CardImgWrapper>
        <img src={thumbnailImage} alt='cardImg' />
      </CardImgWrapper>
      <CardRankWrapper>
        <CardRank rank={couponGradeName}>{couponGradeName}</CardRank>
        {packaging && <CardSeviceImg src={`${process.env.PUBLIC_URL}/images/packaging.svg`} alt='serviceImg' />}
        {delivery && <CardSeviceImg src={`${process.env.PUBLIC_URL}/images/delivery.svg`} alt='serviceImg' />}
        {storeMeal && <CardSeviceImg src={`${process.env.PUBLIC_URL}/images/storeMeal.svg`} alt='serviceImg' />}
      </CardRankWrapper>
      <CardTitle>{`[${briefAddress}] ${storeName}`}</CardTitle>
      <CardDiscount>{`${priceOfCoupon}원 할인`}</CardDiscount>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  width: 25%;
  padding: 0.3rem;
  margin-bottom: 1.563rem;
  flex-direction: column;
  display: flex;
  gap: 0.313rem;

  ${tab} {
    width: 33.333%;
    &:nth-child(n) {
      padding: 0 0.35rem;
    }
  }

  @media screen and (max-width: 700px) {
    width: 50%;
  }

  ${mobile} {
    width: 100%;
    &:nth-child(n) {
      padding: 0;
    }
  }
`;

const CardRankWrapper = styled.div`
  margin-bottom: 0.313rem;
  display: flex;
  gap: 0.3125rem;
`;

const CardRank = styled.span`
  padding: 0.313rem 0.625rem;
  border-radius: 0.313rem;
  font-weight: 600;
  display: inline-block;
  font-size: 0.813rem;
  text-align: center;

  ${({ rank }) => {
    return rank !== 'Silver'
      ? css`
          background: ${lightDark};
          color: rgba(240, 230, 140, 1);
        `
      : css`
          background: ${lightGray};
          color: ${lightDark};
          font-weight: 900;
        `;
  }}
`;

const CardImgWrapper = styled.div`
  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const CardSeviceImg = styled.img`
  max-width: 25px;
  max-height: 25px;
`;

const CardTitle = styled.h6`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1.1rem;
  color: ${gray};
`;

const CardDiscount = styled.div`
  color: ${brandColor};
`;

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
