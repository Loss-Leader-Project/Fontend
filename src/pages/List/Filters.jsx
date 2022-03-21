import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { FormControl, MenuItem, Select } from '@mui/material';
import { brandColor, gray } from 'styles/theme';
import qs from 'query-string';
import { useLocation } from 'react-router';
import { useMediaQuery } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Filters = ({ handleChange, size }) => {
  const { pathname, search } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const oldQeury = qs.parse(search);
  const matches = useMediaQuery('(max-width:600px)');

  const makeFullPath = (path, oldQeury, newQeury) =>
    qs.stringifyUrl({
      url: path,
      query: {
        ...oldQeury,
        ...newQeury,
      },
    });

  const onMenubarOpen = useCallback(() => setIsOpen(prev => !prev), []);
  const closeMenubar = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!matches) closeMenubar();
  }, [matches, closeMenubar]);

  const filters = useMemo(
    () => [
      {
        id: 1,
        path: makeFullPath(pathname, oldQeury, { filter: 'star' }),
        text: '인기순',
      },
      {
        id: 2,
        path: makeFullPath(pathname, oldQeury, { filter: 'date' }),
        text: '등록일순',
      },
      {
        id: 3,
        path: makeFullPath(pathname, oldQeury, { filter: 'price', sorting: 'desc' }),
        text: '쿠폰가격 높은순',
      },
      {
        id: 4,
        path: makeFullPath(pathname, oldQeury, { filter: 'price', sorting: 'asc' }),
        text: '쿠폰가격 낮은순',
      },
    ],
    [pathname, oldQeury]
  );

  const menu_bar = matches && (
    <Ul isOpen={isOpen}>
      {filters.map(({ id, path, text }) => (
        <Li key={id} onClick={closeMenubar}>
          <CoustomLink to={path} id={id}>
            <span>{text}</span>
          </CoustomLink>
        </Li>
      ))}
    </Ul>
  );

  return (
    <FiltersWrapper>
      <Title>상품리스트</Title>
      <FiltersTop>
        {matches ? (
          <Hamburger onClick={onMenubarOpen}>
            <FontAwesomeIcon icon={faBars} size='2x' />
          </Hamburger>
        ) : (
          <FiltersTopFirst>
            {filters.map(({ id, path, text }) => (
              <CoustomLink key={id} to={path} id={id}>
                <span>{text}</span>
              </CoustomLink>
            ))}
          </FiltersTopFirst>
        )}
        <CoustomFormControl>
          <CoustomSelect value={size} onChange={handleChange}>
            <CoustomMenuItem value={20}>20개씩</CoustomMenuItem>
            <CoustomMenuItem value={40}>40개씩</CoustomMenuItem>
            <CoustomMenuItem value={60}>60개씩</CoustomMenuItem>
          </CoustomSelect>
        </CoustomFormControl>
        {menu_bar}
      </FiltersTop>
    </FiltersWrapper>
  );
};

const CoustomLink = styled(Link).attrs(({ to }) => ({
  to,
}))`
  font-size: 0.9375rem;
  text-align: center;
  font-weight: 500;
  transition: font-weight 0.25s ease;
  display: block;
  text-align: start;
  padding: 5px 0;
  span {
    color: ${gray};
    text-align: left;
  }
  :hover {
    font-weight: bold;
  }
  &:first-child {
    padding-left: 0;
  }
  ${({ id }) =>
    id === 1 &&
    css`
      span {
        color: ${brandColor};
      }
    `}
`;

const CoustomFormControl = styled(FormControl)`
  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;

const CoustomSelect = styled(Select)`
  &&& {
    height: 1.875rem;
    font-size: 0.813rem;
  }
`;

const CoustomMenuItem = styled(MenuItem)`
  &&& {
    font-size: 0.813rem;
    justify-content: center;
  }
`;

const FiltersWrapper = styled.div`
  padding: 0.3rem;
  margin-top: 1rem;
`;

const FiltersTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const FiltersTopFirst = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
`;

const Title = styled.h1`
  color: ${gray};
  font-weight: 500;
  font-size: 1.2rem;
`;

const Hamburger = styled.div`
  cursor: pointer;
`;

const Ul = styled.ul`
  width: 100%;
  height: 0px;
  overflow: hidden;
  margin-top: 0.625rem;
  opacity: 0;
  transition: height 0.25s ease-in, opacity 0.35s ease-in;

  ${({ isOpen }) =>
    isOpen &&
    css`
      height: 100px;
      overflow: auto;
      overflow-y: hidden;
      opacity: 1;
    `}
`;

const Li = styled.li``;

export default memo(Filters);
