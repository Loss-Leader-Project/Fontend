import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CouponProvider from 'contexts/CouponProvider';
import Coupons from './Coupons';

const CouponHistory = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const fetchCoupon = async () => {
      const { data } = await axios.get('/data/coupons.json');
      setCoupons(data.data);
    };
    fetchCoupon();
  }, []);

  return (
    <CouponHistoryWrapper>
      <CouponProvider>
        <Coupons coupons={coupons} />
      </CouponProvider>
    </CouponHistoryWrapper>
  );
};

const CouponHistoryWrapper = styled.div`
  margin-bottom: 1.875rem;
`;

export default CouponHistory;
