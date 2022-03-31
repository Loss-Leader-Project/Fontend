import React from 'react';
import ColumnTitle from './ColumnTitle';
import styled from 'styled-components';
import MuiInput from 'Components/MuiInput';
import { mobile, tab, pc } from 'styles/theme';
import MuiCheckbox from './MuiCheckbox';

function PaymentInfo({ productData, handleValue, flag, applyPostData }) {
  return (
    <div>
      <Wrapper>
        <ColumnTitle title='결제금액' />
        <AmountInfo>{productData.priceOfCoupon}원</AmountInfo>
      </Wrapper>
      <Wrapper>
        <ColumnTitle title='마일리지사용' />
        <InputWrapper>
          <MuiInput
            name='mileage'
            label={'마일리지'}
            onChange={handleValue}
            value={applyPostData.mileage}
            type='text'
            helperText={`${'마일리지'}을 입력해주세요`}
            size='small'
            flag={flag.mileage}
          />
        </InputWrapper>
        <MuiCheckbox
          name='allUseMileage'
          value={applyPostData.allUseMileage}
          handleValue={handleValue}
          label={'전액사용'}
        />
      </Wrapper>
    </div>
  );
}

export default PaymentInfo;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  ${mobile} {
    justify-content: space-between;
  }
  margin-bottom: 1rem;
`;

const InputWrapper = styled.div`
  width: 40%;
  ${pc} {
    width: 50%;
  }
  ${tab} {
    width: 70%;
  }
  ${mobile} {
    width: 80%;
  }
`;

const AmountInfo = styled.span`
  font-size: 1.2rem;
`;
