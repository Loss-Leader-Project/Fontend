import React from 'react';
import MuiInput from 'Components/MuiInput';
import GridContainer from './GridContainer';
import { useModifyContext } from './ModifyPage';

const PasswordModifyForm = () => {
  const { form, handleFormOnChange, errors } = useModifyContext();
  const { oldPassword, newPassword, newPasswordConfirm } = errors;

  const inputRender = (value, id, error) => {
    return (
      <MuiInput
        placeholder='특수문자 포함 8자~16자(공백 제외)'
        type='password'
        onChange={handleFormOnChange}
        defaultValue={value}
        id={id}
        inputProps={{ minLength: 8, maxLength: 16 }}
        flag={error?.isError}
        helperText={error?.message}
      />
    );
  };

  return (
    <div>
      <GridContainer text='현재비밀번호'>{inputRender(form.oldPassword, 'oldPassword', oldPassword)}</GridContainer>
      <GridContainer text='비밀번호 수정'>{inputRender(form.newPassword, 'newPassword', newPassword)}</GridContainer>
      <GridContainer text='비밀번호 수정 확인'>
        {inputRender(form.newPasswordConfirm, 'newPasswordConfirm', newPasswordConfirm)}
      </GridContainer>
    </div>
  );
};

export default PasswordModifyForm;
