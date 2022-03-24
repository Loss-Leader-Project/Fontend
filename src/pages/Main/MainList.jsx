import { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import MainCard from './MainCard';
import { ApiRq } from 'utils/apiConfig';
import { mainApiURL } from 'utils/apiUrl';
import { lightDark } from 'styles/theme';
import Empty from 'Components/Empty';

const randomNum = {
  num1: Math.floor(Math.random() * 7),
  num2: Math.floor(Math.random() * 7) + 7,
  num3: Math.floor(Math.random() * 6) + 14,
};

const MainList = ({ name, title }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (name === 'hotplace')
      ApiRq('get', mainApiURL.LOCAL_GET_HOTPLACE).then(res => {
        if (res.data.length > 0)
          setItems([res.data[randomNum.num1], res.data[randomNum.num2], res.data[randomNum.num3]]);
      });
    if (name === 'bestreview')
      ApiRq('get', mainApiURL.LOCAL_GET_BESTREVIEW).then(res => {
        if (res.data.length > 0)
          setItems([res.data[randomNum.num1], res.data[randomNum.num2], res.data[randomNum.num3]]);
      });
  }, [name]);

  return (
    <ListWrapper>
      <Title>{title}</Title>
      <CardsWrapper>
        {name === 'hotplace' && items.length === 0 && <Empty text={'추천음식점이 없습니다'} />}
        {name === 'bestreview' && items.length === 0 && <Empty text={'아직 리뷰가 없습니다'} />}
        {items.map(item => (
          <MainCard name={name} key={name + item.id} {...item} />
        ))}
      </CardsWrapper>
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

const Title = styled.h1`
  color: ${lightDark};
  font-weight: 500;
  font-size: 1.2rem;
  margin-top: 2rem;
`;

export default MainList;
