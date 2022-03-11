import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { tab, mobile } from 'styles/theme';

function PaymentInfo({ applyPostData, applyGetData, handleValue }) {
  return (
    <div>
      <div>
        <div>
          <span>결제금액 : </span>
          <span>{applyGetData.cuponPrice}원</span>
        </div>
      </div>
      <div>
        <div>
          <span>마일리지사용 : </span>
          <input type='number' name='mileage' defaultValue={applyPostData.mileageChecked} onChange={handleValue} />
          <label>
            <input type='checkbox' name='mileageChecked' onChange={handleValue} /> 전액사용
          </label>
        </div>
      </div>
    </div>
  );
}

export default PaymentInfo;
