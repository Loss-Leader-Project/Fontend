import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Coupons from './Coupons';
import { client } from 'utils/api';

const History = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const { data } = await client.get('/data/coupons.json');
        setCoupons(data.data);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchCoupon();
  }, []);

  return (
    <HistoryWrapper>
      <Coupons coupons={coupons} />
    </HistoryWrapper>
  );
};

const HistoryWrapper = styled.div`
  margin-bottom: 1.875rem;
`;

export default History;
