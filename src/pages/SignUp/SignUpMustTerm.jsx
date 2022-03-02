import React from 'react';
import styled from 'styled-components';

const SignUpMustTerm = () => {
  return (
    <Box>
      <p>
        (주)로스리더는 아래의 목적으로 개인정보를 수집 및 이용하며, 회원의 개인정보를 안전하게 취급하는데 최선을 다하고
        있습니다.
      </p>
      <InnerLayoutBox>
        <InnerTitle>1. 수집목적</InnerTitle>
        <BoldText>- 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산</BoldText>
        <BoldText>- 민원사무 처리</BoldText>
        <BoldText>- 재화 또는 서비스 제공</BoldText>
        <BoldText>- 추천인 아이디 활용</BoldText>
      </InnerLayoutBox>
      <InnerLayoutBox>
        <InnerTitle>2. 수집항목</InnerTitle>

        <p>회원가입 시</p>
        <p>(필수) 아이디, 비밀번호, 이메일, 이름, 성별, 생년월일, 휴대폰번호, CI/DI, 내/외국인정보, 본인인증결과</p>
      </InnerLayoutBox>
      <InnerLayoutBox>
        <p>본인인증 시</p>
        <p>(필수) 이름, 성별, 생년월일, 휴대폰번호, CI/DI, 내/외국인정보, 본인인증결과</p>
      </InnerLayoutBox>
      <InnerLayoutBox>
        <p>소셜 계정(카카오)을 통한 회원가입 시</p>
        <p>(필수) 로그인 정보 식별값, 성별, 생년월일, 휴대폰번호, 이메일</p>
      </InnerLayoutBox>
      <InnerLayoutBox>
        <p>간편 로그인 시(소셜 계정 연동)</p>
        <p>
          당사는 고객의 편의를 위해 간편로그인(카카오, Apple) 방식을 제공하고 있습니다. 이와 같은 로그인 시 당사가
          고객의 개인정보를 추가 수집하지 않으며, 다만 로그인 정보 식별값만 비교하고 있습니다.
        </p>
      </InnerLayoutBox>
      <InnerLayoutBox>
        <InnerTitle>3. 보유기간</InnerTitle>
        <BoldText>
          수집된 정보는 회원탈퇴 요청 5일 후 지체없이 파기됩니다. 다만 내부 방침에 의해 서비스 부정이용기록은 부정 가입
          및 이용 방지를 위하여 회원 탈퇴 시점으로부터 최대 1년간 보관 후 파기하며, 관계법령에 의해 보관해야 하는 정보는
          법령이 정한 기간 동안 보관한 후 파기합니다. 서비스 제공을 위해 필요한 최소한의 개인정보이므로 동의를 해 주셔야
          서비스 이용이 가능합니다.
        </BoldText>
      </InnerLayoutBox>
      <InnerLayoutBox>
        <InnerTitle>4. 동의 거부시 불이익</InnerTitle>
        <p>
          귀하는 개인정보 제공 등에 관해 동의하지 않을 권리가 있습니다. 다만, 필수수집 동의를 하지 않을 경우 가입이
          제한될 수 있습니다.
        </p>
      </InnerLayoutBox>
    </Box>
  );
};

export default SignUpMustTerm;

const Box = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  overflow: auto;
`;

const BoldText = styled.p`
  font-weight: bold;
`;

const InnerLayoutBox = styled.div`
  margin-top: 1.875rem;
`;

const InnerTitle = styled.p`
  padding-bottom: 0.625rem;
`;
