import React, { memo, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { brandColor, gray, lightGray, tab } from 'styles/theme';

const MyMenu = ({ path = '/my' }) => {
  const menuPages = useMemo(
    () => [
      {
        id: 1,
        text: '구매내역',
        path: `${path}/buy`,
      },
      {
        id: 2,
        text: '쿠폰내역',
        path: `${path}/coupon`,
      },
      {
        id: 3,
        text: '리뷰관리',
        path: `${path}/review`,
      },
      {
        id: 4,
        text: '회원정보변경',
        path: `${path}`,
      },
      {
        id: 5,
        text: '리뷰등록(임시)',
        path: `${path}/review/insert`,
      },
    ],
    [path]
  );

  return (
    <MyMenuWrapper>
      <Title>마이페이지</Title>
      <List>
        {menuPages.map(({ id, path, text }) => (
          <Item key={id}>
            <CoustomLink to={path} exact activeClassName='active'>
              {text}
            </CoustomLink>
          </Item>
        ))}
      </List>
    </MyMenuWrapper>
  );
};

const MyMenuWrapper = styled.div`
  flex: 2;
  text-align: center;
  font-weight: 600;
`;
const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 900;
  color: ${gray};
`;
const List = styled.ul`
  margin-top: 1rem;
  ${tab} {
    display: flex;
    align-items: center;
    margin-bottom: 0.9375rem;
  }
`;

const Item = styled.li`
  flex: 1;
`;

const LinkHover = () => css`
  &:hover {
    color: ${gray};
  }
`;

const LinkActive = () => css`
  &.active {
    color: ${brandColor};
  }
`;

const CoustomLink = styled(NavLink)`
  padding: 0.625rem;
  display: block;
  font-size: 0.875rem;
  color: ${lightGray};
  ${LinkHover()}
  ${LinkActive()}
`;

export default memo(MyMenu);
