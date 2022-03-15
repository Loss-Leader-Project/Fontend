import { TextField } from '@mui/material';
import Button from 'Components/Button';
import React from 'react';
import styled from 'styled-components';
import { gray, lightGray, mobile, tab } from 'styles/theme';

const CouponInput = () => {
  return (
    <CouponInputWrapper>
      <CouponInputInnerWrapper>
        <CouponTextFiled placeholder='쿠폰 번호 입력해주세요' />
        <Button text='직접입력' fontSize='15px' />
        <CouponTextInform>
          <p>모바일,이메일 또는 인쇄물 등을 통해 발급받은</p>
          <p>쿠폰 인증 번호를 등록해주세요. </p>
        </CouponTextInform>
      </CouponInputInnerWrapper>
    </CouponInputWrapper>
  );
};

const CouponInputWrapper = styled.div`
  border-top: 1px solid ${lightGray};
  margin-bottom: 6.25rem;
`;
const CouponInputInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 1.5625rem auto;
  gap: 0.9375rem;
  ${tab} {
    width: 80%;
  }
  ${mobile} {
    width: 100%;
  }
`;
const CouponTextFiled = styled(TextField)`
  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
  .MuiOutlinedInput-root {
    border: 1px solid ${lightGray};
    height: 2.5rem;
  }
  .MuiOutlinedInput-input::placeholder {
    text-align: center;
    font-weight: 600;
  }
`;

const CouponTextInform = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  align-items: center;
  font-size: 0.9375rem;
  font-weight: 900;
  color: ${gray};
  opacity: 0.7;
`;

export default CouponInput;
