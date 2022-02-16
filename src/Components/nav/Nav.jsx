import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import { gray, mobile, tab } from 'styles/theme';

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
  ${mobile} {
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

  ${mobile} {
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
    border-left: 0.0625rem solid ${gray};
    width: 0.0625rem;
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
  position: relative;

  color: ${gray};
  ${CustomLinkHover()}
  ${CustomLinkBefore()}
  ${mobile} {
    flex: 1;
    width: auto;
    ${CustomLinkBeforeNone()}
    font-size: 1rem;
  }
`;

const NavSearchWrapper = styled.div`
  background: #e2dddd;
  border-radius: 3.125rem;
  padding: 0.4688rem 2.1875rem 0.4688rem 0.9375rem;
  position: relative;
  ${tab} {
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
    color: ${gray};
    font-weight: 600;
  }
`;

const NavSearchInput = styled.input`
  border: none;
  background: transparent;
  letter-spacing: 0.02rem;
  width: 13.75rem;
  color: ${gray};
  ${NavSearchInputPlaceholder()}
  ${tab} {
    width: 100%;
  }
`;

export default Nav;
