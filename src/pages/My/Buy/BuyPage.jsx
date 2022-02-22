import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Orders from './Orders';
import UserInfo from './UserInfo';

const BuyPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get(`/data/orders.json`);
      setOrders(data.data);
    };
    fetchOrders();
  }, []);

  return (
    <BuyPageWrapper>
      <UserInfo id='dnr14' point={550} />
      <Orders orders={orders} />
    </BuyPageWrapper>
  );
};

const BuyPageWrapper = styled.div`
  margin-bottom: 0.9375rem;
`;

export default BuyPage;
