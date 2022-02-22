import { Checkbox, FormControlLabel, FormGroup, useMediaQuery } from '@mui/material';
import Button from 'Components/common/Button';
import Input from 'Components/common/Input';
import { withLayout } from './ModifyPage';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { brandColor } from 'styles/theme';
import { ModifyContext } from 'contexts/ModifyProvider';

const BasicInfo = () => {
  const { GridCotainer } = useContext(ModifyContext);
  const match = useMediaQuery('(max-width:600px)');

  return (
    <>
      <GridCotainer text='아이디' children={<Input width='100%' />} />
      <GridCotainer
        text='비밀번호'
        children={<Button text='비밀번호 설정' width={match ? '50%' : '40%'} fontSize='0.9375rem' />}
      />
      <GridCotainer text='이름' children={<Input width='100%' />} />
      <GridCotainer text='이메일'>
        <Input width='50%' padding='0 0.625rem 0 0' />
        <Input width='50%' padding='0 0 0 0.625rem' />
        <EventChecked />
      </GridCotainer>
      <GridCotainer text='휴대번호'>
        <Input width='100%' />
        <EventChecked />
      </GridCotainer>
    </>
  );
};

function EventChecked() {
  return (
    <FormGroupWrapper>
      <FormControlLabel control={<CustomCheckbox />} label={<span>정보/이벤트 SMS 수신에 동의합니다.</span>} />
    </FormGroupWrapper>
  );
}

const FormGroupWrapper = styled(FormGroup)`
  margin-top: 0.625rem;
`;

const CustomCheckbox = styled(Checkbox)`
  &&& {
    color: ${brandColor};
  }
`;

export default withLayout(BasicInfo);
