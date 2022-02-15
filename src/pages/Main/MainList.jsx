import { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import MainCard from './MainCard';

const randomNum = {
  num1: Math.floor(Math.random() * 7),
  num2: Math.floor(Math.random() * 7) + 7,
  num3: Math.floor(Math.random() * 6) + 14,
};

const MainList = ({ name, title }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const { data } = await axios.get(`/data/mainfood-${name}.json`);
        setItems([data.data[randomNum.num1], data.data[randomNum.num2], data.data[randomNum.num3]]);
      } catch (error) {
        const message = error.response.message ?? error.message ?? error;
        alert(message);
      }
    };

    fetchList();
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
