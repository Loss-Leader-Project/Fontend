import { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import MainCard from './MainCard';
import { fetchBestreviewList, fetchHotList } from 'utils/api';

const randomNum = {
  num1: Math.floor(Math.random() * 7),
  num2: Math.floor(Math.random() * 7) + 7,
  num3: Math.floor(Math.random() * 6) + 14,
};

const MainList = ({ name, title }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (name === 'hotplace') fetchHotList(randomNum, setItems);
    if (name === 'bestreview') fetchBestreviewList(randomNum, setItems);
  }, [name]);

  return (
    <ListWrapper>
      <Title>{title}</Title>
      <CardsWrapper>
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
  color: ${({ theme }) => theme.colors.lightDark};
  font-weight: 500;
  font-size: 1.2rem;
  margin-top: 2rem;
`;

export default MainList;
