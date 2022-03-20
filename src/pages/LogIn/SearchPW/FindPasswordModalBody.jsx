import { Button } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { brandColor, mobile } from 'styles/theme';

const FindPasswordModalBody = ({ handleClose, valid }) => {
  const history = useHistory();

  console.log(valid);

  return (
    <>
      {valid ? (
        <div>
          <InnerText>입력하신 이메일로</InnerText>
          <InnerText>
            <BrandColorSpan>임시비밀번호</BrandColorSpan>가 발송되었습니다.
          </InnerText>
          <InnerText>로그인 페이지로</InnerText>
          <InnerText>돌아가시겠습니까?</InnerText>
          <BtnBox>
            <CutomButton
              onClick={() => {
                history.push('/login');
              }}
            >
              확인
            </CutomButton>
            <CutomButton onClick={handleClose}>닫기</CutomButton>
          </BtnBox>
        </div>
      ) : (
        <div>
          <InnerText>일치하는 회원정보가 없습니다.</InnerText>
          <InnerText>다시 입력해주세요.</InnerText>
          <BtnBox>
            <CutomButton onClick={handleClose}>닫기</CutomButton>
          </BtnBox>
        </div>
      )}
    </>
  );
};

export default FindPasswordModalBody;

const BrandColorSpan = styled.span`
  color: ${brandColor};
  border-bottom: 2px solid ${brandColor};
`;

const InnerText = styled.p`
  margin-top: 1.25rem;
  font-size: 1.5rem;
  ${mobile} {
    font-size: 0.75rem;
  }
`;

const BtnBox = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  ${mobile} {
    margin-top: 10px;
  }
`;

const CutomButton = styled(Button)`
  &&& {
    background-color: ${brandColor};
    color: white;
    margin: 0 10px;

    ${mobile} {
      height: 30px;
      font-size: 0.75rem;
    }
  }
`;
