import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { tab, mobile } from 'styles/theme';
import TopImg from 'pages/Apply/TopImg';
import ProductInfoSummary from 'pages/Apply/ProductInfoSummary';
import MuiButton from 'Components/MuiButton';
import { useHistory, useParams } from 'react-router';
import { applyApiURL } from 'utils/apiUrl';
import { ApiRq } from 'utils/apiConfig';
import TokenCheck from 'utils/TokenCheck.js';

function Completion() {
  const [applyGetData, setApplyGetData] = useState([]);

  const history = useHistory();
  const accessToken = localStorage.getItem('access-token');
  const param = useParams();

  useEffect(() => {
    TokenCheck(
      accessToken =>
        ApiRq('GET', applyApiURL.LOCAL_GET_COMPLETION, { orderNumber: param.orderNumber }, null, {
          Authorization: accessToken,
        }),
      null
    ).then(data => {
      setApplyGetData(data.data);
    });
  }, [param, accessToken]);

  const pageMove = page => {
    history.push(page);
  };

  return (
    <Contain>
      <TopImgWrapper>
        <TopImg productData={applyGetData} />
        <ProductInfoSummary productData={applyGetData} />
      </TopImgWrapper>
      <InfoWrapper>
        <OrderInfos>이름 : {applyGetData.userName}</OrderInfos>
        <OrderInfos>인원수 : {applyGetData.visitCount}</OrderInfos>
        <OrderInfos>시간 : {applyGetData.visitTime}</OrderInfos>
        <Info>신청이 완료되었습니다</Info>
      </InfoWrapper>

      <Wrapper>
        <MuiButton
          content={'구매내역 보러가기'}
          onClick={() => pageMove('/my/buy')}
          sx={{ margin: '1.25rem 0', marginRight: '1rem', height: '4rem', fontSize: '1.5rem' }}
        />
        <MuiButton
          content={'메인페이지'}
          onClick={() => pageMove('/')}
          sx={{ margin: '1.25rem 0', marginLeft: '1rem', height: '4rem', fontSize: '1.5rem' }}
        />
      </Wrapper>
    </Contain>
  );
}

export default Completion;

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

const Wrapper = styled.div`
  display: flex;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e9ecef;
`;

const Info = styled.p`
  font-size: 2rem;
  font-weight: 700;
  margin: 1rem;
`;

const OrderInfos = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 0.5rem;
`;
