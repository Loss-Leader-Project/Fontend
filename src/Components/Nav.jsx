import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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
            <Link key={id} to={path}>
              <span>{text}</span>
            </Link>
          ))}
        </NavRouters>
        <NavSearch>
          <SearchIcon />
          <input type='text' placeholder='오늘의 나를 달래줄 음식은?' />
        </NavSearch>
      </NavTop>
    </NavWrapper>
  );
};

const NavWrapper = styled.nav`
  margin-top: 0.9375rem;
  padding: 0 1.5rem;
  ${({ theme }) => theme.media.mobile} {
    padding: 0 0.9375rem;
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
  & > a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 6.25rem;
    font-weight: 600;
    font-size: 1.125rem;
    padding: 0 0.625rem;
    color: ${({ theme }) => theme.colors.gray};
    position: relative;
    ${({ theme }) => theme.media.mobile} {
      flex: 1;
      width: auto;
    }
    :hover {
      opacity: 0.8;
    }
  }
  & > a::before {
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

  ${({ theme }) => theme.media.mobile} {
    flex: 1;
    & > a:first-child::before {
      display: none;
    }
  }
`;

const NavSearch = styled.div`
  background: rgba(226, 221, 221, 0.4);
  border-radius: 3.125rem;
  padding: 0.468rem 2.1875rem 0.468rem 0.9375rem;
  position: relative;
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
  & > input {
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.colors.gray};
    letter-spacing: 0.02rem;
    width: 13.75rem;
    &::placeholder {
      color: ${({ theme }) => theme.colors.gray};
      font-weight: 600;
    }
    ${({ theme }) => theme.media.mobile} {
      width: 100%;
    }
  }
  & > svg {
    position: absolute;
    right: 2%;
    top: 0;
    bottom: 0;
    margin: auto;
  }
`;

export default Nav;
