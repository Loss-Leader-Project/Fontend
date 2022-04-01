import { Checkbox, FormControlLabel, FormGroup, useMediaQuery } from '@mui/material';
import Button from 'Components/Button';
import React, { useState } from 'react';
import styled from 'styled-components';
import { brandColor } from 'styles/theme';
import PasswordModifyForm from './PasswordModifyForm';
import MuiInput from 'Components/MuiInput';
import GridContainer from './GridContainer';
import { useModifyContext } from './ModifyPage';
const USER_ROLE = 'ROLE_USER';

const BasicInfo = () => {
  const { form, handleFormOnChange, errors } = useModifyContext();
  const [popUp, setPopUp] = useState(false);
  const match = useMediaQuery('(max-width:600px)');
  const handlePwdModifyOpen = () => setPopUp(p => !p);
  const { userName, phoneNumber } = errors;
  const { role } = form;
  return (
    <>
      <GridContainer text='아이디' children={<MuiInput value={form.loginId} disabled />} />
      {role === USER_ROLE && (
        <GridContainer
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
      )}
      {popUp && <PasswordModifyForm />}
      <GridContainer
        text='이름'
        children={
          <MuiInput
            inputProps={{ maxLength: 10 }}
            id='userName'
            size='small'
            placeholder='이름을 입력해주세요'
            value={form.userName}
            onChange={handleFormOnChange}
            helperText={userName?.message}
            flag={userName?.isError}
            disabled={role !== USER_ROLE}
          />
        }
      />
      <GridContainer text='이메일'>
        <MuiInput padding='0 0.625rem 0 0' size='small' disabled value={form.email} />
        <EventSubscribe />
      </GridContainer>
      {role === USER_ROLE && (
        <GridContainer text='휴대번호'>
          <MuiInput
            id='phoneNumber'
            size='small'
            inputProps={{ maxLength: 11 }}
            placeholder='- 제외 최대 11자리'
            value={form.phoneNumber}
            onChange={handleFormOnChange}
            flag={phoneNumber?.isError}
            helperText={phoneNumber?.message}
          />
          <EventSubscribe />
        </GridContainer>
      )}
    </>
  );
};

function EventSubscribe() {
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
