import { Checkbox, FormControlLabel, FormGroup, useMediaQuery } from '@mui/material';
import Button from 'Components/common/Button';
import Input from 'Components/common/Input';
import React, { useState } from 'react';
import styled from 'styled-components';
import { brandColor } from 'styles/theme';
import { useModifyContext } from 'contexts/ModifyProvider';
import PasswordModifyForm from './PasswordModifyForm';

const BasicInfo = () => {
  const { GridCotainer, form, handleFormOnChange, errors } = useModifyContext();
  const [popUp, setPopUp] = useState(false);
  const match = useMediaQuery('(max-width:600px)');
  const handlePwdModifyOpen = () => setPopUp(p => !p);
  const { userName, phoneNumber } = errors;

  return (
    <>
      <GridCotainer text='아이디' children={<Input value={form.loginId} disabled />} />
      <GridCotainer
        text='비밀번호'
        children={
          <Button
            onClick={handlePwdModifyOpen}
            type='button'
            text='비밀번호 설정'
            width={match ? '50%' : '40%'}
            fontSize='0.9375rem'
          />
        }
      />
      {popUp && <PasswordModifyForm />}
      <GridCotainer
        text='이름'
        children={
          <Input
            id='userName'
            maxLength='10'
            value={form.userName}
            onChange={handleFormOnChange}
            placeholder='이름을 입력해주세요'
            helperText={userName?.message}
            error={userName?.isError}
          />
        }
      />
      <GridCotainer text='이메일'>
        <Input padding='0 0.625rem 0 0' disabled value={form.email} />
        <EventChecked />
      </GridCotainer>
      <GridCotainer text='휴대번호'>
        <Input
          id='phoneNumber'
          maxLength='11'
          placeholder='- 제외 최대 11자리'
          value={form.phoneNumber}
          onChange={handleFormOnChange}
          error={phoneNumber?.isError}
          helperText={phoneNumber?.message}
        />
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

export default BasicInfo;
