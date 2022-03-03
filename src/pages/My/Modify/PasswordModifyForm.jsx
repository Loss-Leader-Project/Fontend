import Input from 'Components/common/Input';
import { useModifyContext } from 'contexts/ModifyProvider';
import React from 'react';

const PasswordModifyForm = () => {
  const { GridCotainer, form, handleFormOnChange, errors } = useModifyContext();
  const { oldPassword, newPassword, newPasswordConfirm } = errors;

  const inputRender = (value, id, error) => {
    return (
      <Input
        placeholder='특수문자 포함 8자~16자(공백 제외)'
        type='password'
        onChange={handleFormOnChange}
        defaultValue={value}
        id={id}
        minLength='8'
        maxLength='16'
        error={error?.isError}
        helperText={error?.message}
      />
    );
  };

  return (
    <div>
      <GridCotainer text='현재비밀번호'>{inputRender(form.oldPassword, 'oldPassword', oldPassword)}</GridCotainer>
      <GridCotainer text='비밀번호 수정'>{inputRender(form.newPassword, 'newPassword', newPassword)}</GridCotainer>
      <GridCotainer text='비밀번호 수정 확인'>
        {inputRender(form.newPasswordConfirm, 'newPasswordConfirm', newPasswordConfirm)}
      </GridCotainer>
    </div>
  );
};

export default PasswordModifyForm;
