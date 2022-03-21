import React, { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import Filters from 'pages/List/Filters';
import { useLocation } from 'react-router';
import Pages from 'Components/Pages';
import qs from 'query-string';
import { css } from 'styled-components';
import { brandColor, gray, lightDark, lightGray, mobile, tab } from 'styles/theme';
import { ApiRq } from 'utils/apiConfig';
import { listApiURL } from 'utils/apiUrl';
import { Link } from 'react-router-dom';

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
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  useEffect(() => {
    const _query = makeQuery(currentPage);
    ApiRq('get', listApiURL.GET_LIST(_query))
      .then(({ content, totalPages }) => {
        setItems(content);
        setTotalPage(totalPages);
      })
      .catch(console.log);
  }, [makeQuery, currentPage]);
  return (
    <ListWrapper>
      <Filters handleChange={handleChange} size={currentSize} />
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
  id,
  packaging,
  storeMeal,
  delivery,
  briefAddress,
  storeName,
  thumbnailImage,
  couponGradeName,
  priceOfCoupon,
  benefitCondition,
}) => {
  return (
    <CardWrapper to={`/product/${id}`}>
      <CardImgWrapper>
        <img src={`${process.env.REACT_APP_STORE_IMG_URL}/${thumbnailImage}`} alt='cardImg' />
      </CardImgWrapper>
      <CardRankWrapper>
        <CardRank rank={couponGradeName}>{couponGradeName}</CardRank>
        {packaging && <CardSeviceImg src={`${process.env.PUBLIC_URL}/images/packaging.svg`} alt='serviceImg' />}
        {delivery && <CardSeviceImg src={`${process.env.PUBLIC_URL}/images/delivery.svg`} alt='serviceImg' />}
        {storeMeal && <CardSeviceImg src={`${process.env.PUBLIC_URL}/images/storeMeal.svg`} alt='serviceImg' />}
      </CardRankWrapper>
      <CardTitle>
        <StoreName>{`[ ${briefAddress} ] ${storeName}`}</StoreName>
        {`${benefitCondition}`}
      </CardTitle>
      <CardDiscount>{`${priceOfCoupon}원 할인`}</CardDiscount>
    </CardWrapper>
  );
};

const CardWrapper = styled(Link)`
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

  &:hover img[alt~='cardImg'] {
    transform: scale(1.015);
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
    // Silver로 들어오는걸 방어하기 위해 정규식 사용
    return /.*Silver.*/gi.test(rank)
      ? css`
          background: ${lightGray};
          color: ${lightDark};
        `
      : css`
          background: ${lightDark};
          color: rgba(240, 230, 140, 1);
        `;
  }}
`;

const CardImgWrapper = styled.div`
  overflow: hidden;
  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.2s ease;
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
  line-height: 1.5;
`;

const StoreName = styled.div`
  font-size: 1.125rem;
  font-weight: 900;
  margin-right: 0.3125rem;
  display: inline-block;
`;

const CardDiscount = styled.p`
  color: ${brandColor};
  font-size: 1.125rem;
`;

const ListWrapper = styled.section`
  padding: 0 0.625em;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default List;
