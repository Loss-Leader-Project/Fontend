import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { tab, mobile, lightDark } from 'styles/theme';
import TopImg from './TopImg';
import ProductInfoSummary from './ProductInfoSummary';
import OrdererInfo from './OrdererInfo';
import PaymentInfo from './PaymentInfo';
import AgreeUsePersonalInfo from './AgreeUsePersonalInfo';
import { getApply, postApply, getApplyTitle } from 'utils/api';
import { useParams } from 'react-router';

function Apply() {
  const [applyGetData, setApplyGetData] = useState([]);
  const [applyTitleData, setApplyTitleData] = useState([]);
  const [applyPostData, setApplyPostData] = useState({
    userName: '',
    phoneNumber: '',
    visitTime: '',
    visitCount: 0,
    mileage: 0,
    agreeUserInfo: false,
  });

  const param = useParams();

  useEffect(() => {
    getApplyTitle().then(data => {
      setApplyTitleData(data.titleData);
    });
  }, []);

  useEffect(() => {
    getApply().then(data => {
      setApplyGetData(data);
    });
  }, []);

  const handleValue = e => {
    const { name, value, checked } = e.target;
    const { userMileage, cuponPrice } = applyGetData;
    let resultValue;
    if (name === 'agreeUserInfo') {
      resultValue = checked;
    } else if (name === 'mileageChecked') {
      if (checked) {
        resultValue = userMileage >= cuponPrice ? cuponPrice : userMileage;
        console.log(resultValue);
      } else {
        resultValue = 0;
      }
    } else {
      resultValue = value;
    }
    setApplyPostData(previousState => {
      return { ...previousState, [name]: resultValue };
    });
  };

  const postRq = () => {
    if (finalPayment !== 0) {
      alert('결제금액이 남았습니다');
      return;
    }
    if (!applyPostData.agreeUserInfo) {
      alert('필수동의사항을 체크해주세요');
      return;
    }
  }; // 백엔드 맞출때 구성

  const finalPayment = (applyGetData?.cuponPrice || 0) - applyPostData?.mileage;
  return (
    <Contain>
      <TopImgWrapper>
        <TopImg {...{ applyGetData }} />
        <ProductInfoSummary {...{ applyGetData }} />
      </TopImgWrapper>
      <InputWrapper>
        {applyTitleData?.map(({ id, title }) => {
          return (
            <Wrapper key={id}>
              <TitleWrapper>
                <Title>{title}</Title>
              </TitleWrapper>
              {title === '주문자 정보' && <OrdererInfo {...{ handleValue }} />}
              {title === '결제 정보' && <PaymentInfo {...{ applyGetData, handleValue, applyPostData }} />}
              {title === '최종 결제금액' && <div>{finalPayment}</div>}
              {title === '개인정보 활용 동의' && <AgreeUsePersonalInfo {...{ handleValue }} />}
            </Wrapper>
          );
        })}
        <button onClick={postRq}>asdasds</button>
      </InputWrapper>
    </Contain>
  );
}

export default Apply;

const Contain = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 10rem;
  padding: 0 2rem;
  ${tab} {
    padding: 0 2rem;
  }
  ${mobile} {
    padding: 0;
  }
`;

const TopImgWrapper = styled.div`
  display: flex;
  flex-direction: row;
  ${tab} {
    flex-direction: column;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  width: 80%;
`;
const Wrapper = styled.div`
  margin-top: 2rem;
`;

const TitleWrapper = styled.div`
  border-bottom: 1px solid ${lightDark};
  padding-left: 2rem;
  margin-bottom: 2rem;
`;

const Title = styled.div`
  color: ${lightDark};
  font-size: 1.5rem;
  font-weight: 600;
  padding: 0.625rem 0;
  margin-top: 1.25rem;
`;
