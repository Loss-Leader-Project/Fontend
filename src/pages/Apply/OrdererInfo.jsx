import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { tab, mobile } from 'styles/theme';
import ApplyInput from './ApplyInput';

function OrdererInfo({ handleValue }) {
  return (
    <div>
      <div>
        <div>
          <span>구매자 : </span>
          <input type='text' name='userName' onChange={handleValue} />
        </div>
      </div>
      <div>
        <div>
          <span>전화번호 : </span>
          <input type='text' name='phoneNumber' onChange={handleValue} />
        </div>
      </div>
      <div>
        <div>
          <span>방문시간 : </span>
          <input type='text' name='visitTime' onChange={handleValue} />
        </div>
      </div>
      <div>
        <div>
          <span>방문인원 : </span>
          <input type='text' name='visitCount' onChange={handleValue} />
        </div>
      </div>
    </div>
  );
}

export default OrdererInfo;
