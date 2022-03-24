import React from 'react';
import styled from 'styled-components';
import MuiCheckbox from './MuiCheckbox';

function AgreeUsePersonalInfo({ handleValue }) {
  return (
    <Contain>
      <MuiCheckbox name='orderAgree' handleValue={handleValue} label={'(필수)'} />
      <p>상품 공급사 개인정보 제공 동의에 대한 내용을 확인하였으며 이에 동의합니다.</p>
    </Contain>
  );
}

export default AgreeUsePersonalInfo;

const Contain = styled.div`
  margin-left: 2rem;
  margin-bottom: 2rem;
`;
