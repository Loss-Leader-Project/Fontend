import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { tab, mobile } from 'styles/theme';

function AgreeUsePersonalInfo({ handleValue }) {
  return (
    <div>
      <input type='checkbox' name='agreeUserInfo' onChange={handleValue} />
      <span>(필수)</span>
      <p>상품 공급사 개인정보 제공 동의에 대한 내용을 확인하였으며 이에 동의합니다.</p>
    </div>
  );
}

export default AgreeUsePersonalInfo;
