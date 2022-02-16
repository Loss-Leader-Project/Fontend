import { MenuItem, Select } from '@mui/material';
import Input from 'Components/common/Input';
import { withLayout } from 'pages/My/ModifyPage';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { ModifyContext } from 'contexts/ModifyProvider';

const AdditionalInfo = () => {
  const { GridCotainer } = useContext(ModifyContext);

  const year = Array.from({ length: 73 }, (_, idx) => 1950 + idx);
  const month = Array.from({ length: 12 }, (_, idx) => idx + 1);
  const day = Array.from({ length: 31 }, (_, idx) => idx + 1);
  return (
    <>
      <GridCotainer text='생일'>
        <SelectWrapper>
          <SelectBox array={year} value={1950} suffix='년' />
          <SelectBox array={month} value={1} suffix='월' />
          <SelectBox array={day} value={1} suffix='일' />
        </SelectWrapper>
      </GridCotainer>
      <GridCotainer
        text='추천인아이디'
        children={<Input width='100%' placeholder='추천인 아이디에 회원가입시 1000원 지급' />}
      />
    </>
  );
};

function SelectBox({ array, value, suffix }) {
  return (
    <CoustomSelect value={value}>
      {array.map(item => (
        <CoustomMenuItem key={item} value={item}>
          {`${item}${suffix}`}
        </CoustomMenuItem>
      ))}
    </CoustomSelect>
  );
}

const SelectWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
`;

const CoustomSelect = styled(Select)`
  flex: 1;
  &&& {
    height: 2.5rem;
    font-size: 0.813rem;
  }
`;

const CoustomMenuItem = styled(MenuItem)`
  &&& {
    font-size: 0.813rem;
    justify-content: center;
  }
`;

export default withLayout(AdditionalInfo);
