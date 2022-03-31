import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { tab, mobile, lightDark, brandColor } from 'styles/theme';
import TopImg from './TopImg';
import ProductInfoSummary from './ProductInfoSummary';
import OrdererInfo from './OrdererInfo';
import PaymentInfo from './PaymentInfo';
import AgreeUsePersonalInfo from './AgreeUsePersonalInfo';
import { getApplyTitle } from 'utils/api';
import { useHistory, useParams } from 'react-router';
import MuiButton from 'Components/MuiButton';
import { applyApiURL } from 'utils/apiUrl';
import { ApiRq } from 'utils/apiConfig';
import validation from 'utils/validation';
import TokenCheck from 'utils/TokenCheck.js';

function Apply() {
  const history = useHistory();
  const param = useParams();
  const accessToken = localStorage.getItem('access-token');
  const [MockData, setMockData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [applyPostData, setApplyPostData] = useState({
    userName: '',
    phoneNumber: '',
    visitTime: '',
    visitCount: 0,
    mileage: 0,
    allUseMileage: false,
    orderAgree: false,
  });
  const [flag, setFlag] = useState({
    userName: true,
    phoneNumber: true,
    visitTime: true,
    visitCount: true,
    mileage: true,
    orderAgree: true,
  });

  useEffect(() => {
    TokenCheck(
      accessToken =>
        ApiRq('GET', applyApiURL.LOCAL_GET_APPLY, { storeId: param.productId }, null, { Authorization: accessToken }),
      history
    ).then(data => {
      setProductData({ ...data?.data, priceOfCoupon: Number(data?.data.priceOfCoupon) });
    });
  }, [param, accessToken, history]);

  useEffect(() => {
    getApplyTitle().then(data => {
      setMockData(data);
    });
  }, []);

  const handleFlag = (name, value, checked) => {
    let boolean = false;
    let resultValue;
    switch (name) {
      case 'userName':
        if (!validation.isUserNameCheck(value)) {
          boolean = Boolean(value);
        }
        break;
      case 'phoneNumber':
        if (!validation.isPhonenumberCheck(value)) {
          boolean = Boolean(value);
        }
        break;
      case 'visitTime':
        boolean = Boolean(value);
        break;
      case 'visitCount':
        resultValue = Number(value);
        boolean = resultValue >= 0 && resultValue <= 5;
        break;
      case 'mileage':
        resultValue = Number(value);
        boolean = resultValue >= 0 && resultValue <= productData.priceOfCoupon;
        break;
      case 'orderAgree':
        boolean = checked;
        break;
      default:
        break;
    }
    setFlag(previousState => {
      return { ...previousState, [name]: !boolean };
    });
  };

  const handleValue = e => {
    const { name, value, checked } = e.target;
    let resultValue;
    handleFlag(name, value, checked);
    switch (name) {
      case 'orderAgree':
        resultValue = checked;
        break;
      case 'allUseMileage':
        resultValue = checked;
        setApplyPostData(previousState => {
          return { ...previousState, mileage: checked ? productData.priceOfCoupon : 0 };
        });
        break;
      case 'mileage':
        resultValue = Number(value);
        setApplyPostData(previousState => {
          return { ...previousState, allUseMileage: resultValue === Number(productData.priceOfCoupon) };
        });
        break;
      default:
        resultValue = value;
        break;
    }

    setApplyPostData(previousState => {
      return { ...previousState, [name]: resultValue };
    });
  };

  const postRq = () => {
    TokenCheck(
      accessToken =>
        ApiRq(
          'POST',
          applyApiURL.LOCAL_POST_APPLY,
          { storeId: param.productId },
          { ...applyPostData },
          { Authorization: accessToken }
        ),
      history
    ).then(data => {
      alert(data.data.message);
      history.push(`/completion/${data.data.orderNumber}`);
    });
  };

  const finalPayment = (productData.priceOfCoupon || 0) - (applyPostData.mileage || 0);

  const { titleData, orderInfoData } = MockData;

  return (
    <Contain>
      <TopImgWrapper>
        <TopImg {...{ productData }} />
        <ProductInfoSummary {...{ productData }} />
      </TopImgWrapper>
      <InputWrapper>
        {titleData?.map(({ id, title }) => {
          return (
            <Wrapper key={id}>
              <TitleWrapper>
                <Title>{title}</Title>
              </TitleWrapper>
              {title === '주문자 정보' && <OrdererInfo {...{ orderInfoData, handleValue, flag }} />}
              {title === '결제 정보' && <PaymentInfo {...{ productData, handleValue, applyPostData, flag }} />}
              {title === '최종 결제금액' && <FinalPaymentAmount>{finalPayment} 원</FinalPaymentAmount>}
              {title === '개인정보 활용 동의' && <AgreeUsePersonalInfo {...{ handleValue }} />}
            </Wrapper>
          );
        })}
        <MuiButton
          content={'신청하기'}
          onClick={postRq}
          sx={{ margin: '1.25rem 0', height: '3.125rem', fontSize: '1.5rem' }}
        />
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
    align-items: center;
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

const FinalPaymentAmount = styled.div`
  font-size: 1.7rem;
  margin-left: 2rem;
  font-weight: 500;
  color: ${brandColor};
`;
