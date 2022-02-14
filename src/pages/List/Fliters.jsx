import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { FormControl, MenuItem, Select } from '@mui/material';

const Fliters = ({ handleChange, limit }) => {
  const [path] = useState('/list');

  const filters = useMemo(
    () => [
      {
        id: 1,
        path,
        text: '인기순',
      },
      {
        id: 2,
        path,
        text: '등록일순',
      },
      {
        id: 3,
        path,
        text: '쿠폰가격 높은순',
      },
      {
        id: 4,
        path,
        text: '쿠폰가격 낮은순',
      },
    ],
    [path]
  );

  return (
    <FlitersWrapper>
      <Title>상품리스트</Title>
      <FiltersTop>
        <FiltersTopFirst>
          {filters.map(({ id, path, text }) => (
            <CoustomLink key={id} to={path} id={id}>
              <span>{text}</span>
            </CoustomLink>
          ))}
        </FiltersTopFirst>
        <div>
          <CoustomFormControl>
            <CoustomSelect value={limit} onChange={handleChange}>
              <CoustomMenuItem value={20}>20개씩</CoustomMenuItem>
              <CoustomMenuItem value={40}>40개씩</CoustomMenuItem>
              <CoustomMenuItem value={60}>60개씩</CoustomMenuItem>
            </CoustomSelect>
          </CoustomFormControl>
        </div>
      </FiltersTop>
    </FlitersWrapper>
  );
};

const CoustomLink = styled(Link).attrs(({ to }) => ({
  to,
}))`
  font-size: 0.9375rem;
  text-align: center;
  font-weight: 500;
  transition: font-weight 0.25s ease;
  span {
    color: ${({ theme }) => theme.colors.gray};
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
        color: ${({ theme }) => theme.colors.brandColor};
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

const FlitersWrapper = styled.div`
  padding: 0.3rem;
  margin-top: 1rem;
`;

const FiltersTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const FiltersTopFirst = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.gray};
  font-weight: 500;
  font-size: 1.2rem;
  margin-top: 2rem;
`;

export default Fliters;
