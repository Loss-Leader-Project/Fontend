import Input from 'Components/common/Input';
import { useModifyContext } from 'contexts/ModifyProvider';
import React from 'react';

const PasswordModifyForm = () => {
  const { GridCotainer, form, handleFormOnChange } = useModifyContext();
  const { oldPassword, newPassword, newPasswordConfirm } = form;

  const inputRender = (value, id) => {
    return (
      <Input
        placeholder='특수문제 포함 8자~16자(공백 제외)'
        type='password'
        onChange={handleFormOnChange}
        defaultValue={value}
        id={id}
        minLength='8'
        maxLength='16'
      />
    );
  };

  return (
    <div>
      <GridCotainer text='현재비밀번호'>{inputRender(oldPassword, 'oldPassword')}</GridCotainer>
      <GridCotainer text='비밀번호 수정'>{inputRender(newPassword, 'newPassword')}</GridCotainer>
      <GridCotainer text='비밀번호 수정 확인'>{inputRender(newPasswordConfirm, 'newPasswordConfirm')}</GridCotainer>
    </div>
  );
};

export default PasswordModifyForm;
