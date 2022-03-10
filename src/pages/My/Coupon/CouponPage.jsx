import Title from 'Components/Title';
import History from './History';
import CouponInput from './CouponInput';
import React from 'react';

const CouponPage = () => {
  return (
    <div>
      <Title text='쿠폰등록' />
      <CouponInput />
      <Title text='쿠폰내역' />
      <History />
    </div>
  );
};

export default CouponPage;
