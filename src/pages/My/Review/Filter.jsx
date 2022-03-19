import React from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import styled from 'styled-components';
import Title from 'Components/Title';
import { flexStyleGroup } from 'styles/theme';
import { Link } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import qs from 'query-string';

const Filter = ({ length, onChange, filterValue }) => {
  const { path } = useRouteMatch();

  const makeQuery = filterValue =>
    qs.stringifyUrl({
      url: path,
      query: {
        filter: filterValue,
      },
    });

  return (
    <Container>
      <Title text={`리뷰관리 (${length})`} margin='0 0 0.9375rem 0' />
      <CoustomFormControl>
        <CoustomSelect value={filterValue} onChange={onChange}>
          <CoustomMenuItem value='date'>
            <CustomLink to={makeQuery('date')}>날짜순</CustomLink>
          </CoustomMenuItem>
          <CoustomMenuItem value='star'>
            <CustomLink to={makeQuery('star')}>별점순</CustomLink>
          </CoustomMenuItem>
        </CoustomSelect>
      </CoustomFormControl>
    </Container>
  );
};

const CustomLink = styled(Link)`
  display: block;
  padding: 5px 15px;
`;

const Container = styled.div`
  ${flexStyleGroup('space-between', 'center')};
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
    padding: 0;
    font-size: 0.813rem;
    justify-content: center;
  }
`;

export default Filter;
