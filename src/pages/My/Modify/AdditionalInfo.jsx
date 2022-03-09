import { MenuItem, Select } from '@mui/material';
import Input from 'Components/common/Input';
import React from 'react';
import styled from 'styled-components';
import { useModifyContext } from 'contexts/ModifyProvider';

const AdditionalInfo = () => {
  const { GridCotainer, form, handleFormOnChange, errors } = useModifyContext();
  const { recommendedPerson } = errors;
  const [currentYear, currentMonth, currentDay] = getBirthDay(form.birthDate);
  const year = Array.from({ length: 73 }, (_, idx) => 1950 + idx);
  const month = Array.from({ length: 12 }, (_, idx) => idx + 1);
  const day = Array.from({ length: 31 }, (_, idx) => idx + 1);

  return (
    <>
      <GridCotainer text='생일'>
        <SelectWrapper>
          <SelectBox name='year' suffix='년' array={year} value={currentYear} handleFormOnChange={handleFormOnChange} />
          <SelectBox
            name='month'
            suffix='월'
            array={month}
            value={currentMonth}
            handleFormOnChange={handleFormOnChange}
          />
          <SelectBox name='day' suffix='일' array={day} value={currentDay} handleFormOnChange={handleFormOnChange} />
        </SelectWrapper>
      </GridCotainer>
      <GridCotainer
        text='추천인아이디'
        children={
          <Input
            minLength='4'
            maxLength='18'
            id='recommendedPerson'
            value={form.recommendedPerson}
            onChange={handleFormOnChange}
            placeholder='추천인 아이디에 회원가입시 1000원 지급'
            helperText={recommendedPerson?.message}
            error={recommendedPerson?.isError}
          />
        }
      />
    </>
  );
};

function getBirthDay(value) {
  if (typeof value !== 'string') throw new Error('value is not string');
  const prefix = value.slice(0, 2);
  const month = Number(value.slice(2, 4));
  const day = Number(value.slice(4, 6));
  return [prefix, month, day];
}

function SelectBox({ name, array, value, suffix, handleFormOnChange }) {
  return (
    <CoustomSelect name={name} value={value} onChange={handleFormOnChange}>
      {array.map(item => {
        const strItem = String(item);
        const value = strItem.length > 2 ? strItem.slice(2, 4) : strItem.slice(0, 3);

        return (
          <CoustomMenuItem key={item} value={value}>
            {`${item}${suffix}`}
          </CoustomMenuItem>
        );
      })}
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

export default AdditionalInfo;
