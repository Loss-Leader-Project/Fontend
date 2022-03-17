import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ApiRq } from 'utils/apiConfig';
import { myApiURL } from 'utils/apiUrl';
import Orders from './Orders';
import UserInfo from './UserInfo';

const BuyPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    ApiRq('get', myApiURL.GET_ORDERS)
      .then(({ data }) => setOrders(data))
      .catch(alert);
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
