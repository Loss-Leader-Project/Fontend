import React from 'react';
import MuiInput from 'Components/MuiInput';
import styled from 'styled-components';
import { mobile, tab, pc } from 'styles/theme';
import ColumnTitle from './ColumnTitle';

function OrdererInfo({ handleValue, orderInfoData, flag }) {
  return (
    <div>
      {orderInfoData.map(({ id, title, name, label }) => {
        return (
          <Wrapper key={id}>
            <ColumnTitle {...{ title }} />
            <InputWrapper>
              <MuiInput
                name={name}
                label={label}
                onChange={handleValue}
                type='text'
                helperText={`${label}을 입력해주세요`}
                size='small'
                flag={flag[name]}
              />
            </InputWrapper>
          </Wrapper>
        );
      })}
    </div>
  );
}

export default OrdererInfo;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  ${tab} {
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
