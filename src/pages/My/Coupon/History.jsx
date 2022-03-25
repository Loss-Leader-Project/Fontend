import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Coupons from './Coupons';
import { myApiURL } from 'utils/apiUrl';

const History = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetch(myApiURL.GET_COUPONS)
      .then(response => response.json())
      .then(({ data }) => setCoupons(data))
      .catch(alert);
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
