import React from 'react';
import styled from 'styled-components';
import { brandColor, mobile } from 'styles/theme';

const FindIdModalBody = ({ id, valid }) => {
  return (
    <>
      {valid ? (
        <>
          <InnerText>찾으시는 아이디는</InnerText>
          <InnerText>
            <BrandColorSpan>{id}</BrandColorSpan>
          </InnerText>
          <InnerText>입니다.</InnerText>
        </>
      ) : (
        <>
          <InnerText>입력하신 정보와 일치하는</InnerText>
          <InnerText>
            <BrandColorSpan>아이디가 없습니다.</BrandColorSpan>
          </InnerText>
          <InnerText>다시 확인 후 입력하세요.</InnerText>
        </>
      )}
    </>
  );
};

const BrandColorSpan = styled.span`
  color: ${brandColor};
  font-size: 2.5rem;
  border-bottom: 2px solid ${brandColor};
  ${mobile} {
    font-size: 1.5rem;
  }
`;

const InnerText = styled.p`
  margin-top: 1.25rem;
  font-size: 2rem;
  ${mobile} {
    font-size: 1rem;
  }
`;

export default FindIdModalBody;
