import { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import Fliters from 'pages/List/Fliters';
import Card from 'pages/List/Card';

const List = ({ name = 'gold' }) => {
  const [items, setItems] = useState([]);
  const [limit, setLimit] = useState(20);

  const handleChange = useCallback(({ target: { value } }) => setLimit(value), []);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const { data } = await axios.get(`/data/food-${name}.json`);
        setItems(data.data);
      } catch (error) {
        const message = error.response.message ?? error.message ?? error;
        alert(message);
      }
    };

    fetchList();
  }, [name]);

  return (
    <ListWrapper>
      <Fliters handleChange={handleChange} limit={limit} />
      <CardsWrapper>{items.map((item, idx) => limit > idx && <Card key={item.id} {...item} />)}</CardsWrapper>
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
