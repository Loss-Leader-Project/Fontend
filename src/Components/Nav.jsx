import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';

const Nav = () => {
  const [path] = useState('/list');

  const routerLinks = useMemo(
    () => [
      {
        id: 1,
        path,
        text: '전체',
      },
      {
        id: 2,
        path: `${path}/gold`,
        text: '골드',
      },
      {
        id: 3,
        path: `${path}/silver`,
        text: '실버',
      },
      {
        id: 4,
        path: `${path}/hotplay`,
        text: '핫플레이',
      },
    ],
    [path]
  );

  return (
    <NavWrapper>
      <NavTop>
        <NavRouters>
          {routerLinks.map(({ id, path, text }) => (
            <CustomLink key={id} to={path}>
              <span>{text}</span>
            </CustomLink>
          ))}
        </NavRouters>
        <NavSearchWrapper>
          <CoustomSearchIcon />
          <NavSearchInput type='text' placeholder='오늘의 나를 달래줄 음식은?' />
        </NavSearchWrapper>
      </NavTop>
    </NavWrapper>
  );
};

const NavWrapper = styled.nav`
  margin-top: 0.9375rem;
  padding: 0 1.5rem;
  ${({ theme }) => theme.media.mobile} {
    padding: 0;
  }
`;

const NavTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.9375rem;
`;

const NavRouters = styled.div`
  display: flex;

  ${({ theme }) => theme.media.mobile} {
    flex: 1;
  }
`;

const CustomLinkHover = () => css`
  :hover {
    opacity: 0.8;
  }
`;

const CustomLinkBefore = () => css`
  ::before {
    content: '';
    border-left: 1px solid ${({ theme }) => theme.colors.gray};
    width: 1px;
    top: 0;
    bottom: 0;
    position: absolute;
    left: 0;
    height: 60%;
    margin: auto;
  }
`;
const CustomLinkBeforeNone = () => css`
  &:first-child::before {
    display: none;
  }
`;

const CustomLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6.25rem;
  font-weight: 600;
  font-size: 1.125rem;
  padding: 0 0.625rem;
  color: ${({ theme }) => theme.colors.gray};
  position: relative;

  ${CustomLinkHover()}
  ${CustomLinkBefore()}
  ${({ theme }) => theme.media.mobile} {
    flex: 1;
    width: auto;
    ${CustomLinkBeforeNone()}
  }
`;

const NavSearchWrapper = styled.div`
  background: #e2dddd;
  border-radius: 3.125rem;
  padding: 7.5px 35px 7.5px 15px;
  position: relative;
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;

const CoustomSearchIcon = styled(SearchIcon)`
  position: absolute;
  right: 2%;
  top: 0;
  bottom: 0;
  margin: auto;
`;

const NavSearchInputPlaceholder = () => css`
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray};
    font-weight: 600;
  }
`;

const NavSearchInput = styled.input`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.gray};
  letter-spacing: 0.02rem;
  width: 13.75rem;
  ${NavSearchInputPlaceholder()}
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;

export default Nav;
