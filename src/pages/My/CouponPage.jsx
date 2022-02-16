import Title from 'Components/common/Title';
import CouponHistory from 'Components/coupon/CouponHistory';
import CouponInput from 'Components/coupon/CouponInput';
import React from 'react';

const CouponPage = () => {
  return (
    <div>
      <Title text='쿠폰등록' />
      <CouponInput />
      <Title text='쿠폰내역' />
      <CouponHistory />
    </div>
  );
};

export default CouponPage;
