import Order from 'pages/My/Buy/Order';
import React from 'react';
import styled from 'styled-components';
import { mobile } from 'styles/theme';
import OrdersHead from './OrdersHead';
import OrdersProvider from 'contexts/OrdersProvider';

const Orders = ({ orders }) => {
  return (
    <OrdersWrapper>
      <OrdersProvider>
        <OrdersHead />
        {orders.map(item => (
          <Order key={item.id} {...item} />
        ))}
      </OrdersProvider>
    </OrdersWrapper>
  );
};

const OrdersWrapper = styled.div`
  margin-top: 4.375rem;
  ${mobile} {
    margin-top: 1.875rem;
  }
`;

export default Orders;
