import React from 'react';
import styled from 'styled-components';
import { brandColor, flexStyleGroup, gray, lightDark, mobile } from 'styles/theme';

const UserInfo = ({ id, mileage }) => {
  return (
    <UserInfoWrapper>
      <UserInfoInnerWrapper>
        <UserId>
          <p>{id} 님,</p>
          <p>즐거운 쇼핑 되세요</p>
        </UserId>
        <UserPoint>
          <p>{id}님의 마일리지</p>
          <p className='mileage'>{mileage}P</p>
        </UserPoint>
      </UserInfoInnerWrapper>
    </UserInfoWrapper>
  );
};
const UserInfoWrapper = styled.div`
  padding: 0.9375rem 1.875rem;
  background-color: rgba(185, 185, 185, 0.2);
`;
const UserInfoInnerWrapper = styled.div`
  display: flex;
  opacity: 0.8;
  width: 85%;
  margin: 0 auto;
  height: 5.625rem;
  ${mobile} {
    width: 100%;
  }
`;

const UserId = styled.div`
  flex: 7;
  font-weight: 900;
  font-size: 1.375rem;
  gap: 0.625rem;
  color: ${lightDark};
  ${flexStyleGroup('center', 'auto', 'column')}
  ${mobile} {
    flex: 6;
    font-size: 1.125rem;
  }
`;
const UserPoint = styled.div`
  flex: 3;
  text-align: right;
  font-weight: 900;
  gap: 0.625rem;
  color: ${gray};
  ${flexStyleGroup('center', 'auto', 'column')}
  ${mobile} {
    flex: 4;
    font-size: 0.75rem;
  }
  .mileage {
    color: ${brandColor};
    font-size: 1.5625rem;
  }
`;

export default UserInfo;
