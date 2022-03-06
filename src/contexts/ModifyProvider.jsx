import React, { createContext, memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Grid } from '@mui/material';
import { gray, mobile } from 'styles/theme';
import validation from 'utils/validation';
import { fetchUserInfo, fetchUserInfoUpdate } from 'utils/api';
import Button from 'Components/common/Button';

const ModifyContext = createContext(null);

const FORM_INIT = {
  loginId: '',
  userName: '',
  oldPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
  email: '',
  phoneNumber: '',
  birthDate: '',
  recommendedPerson: '',
};

const ModifyProvider = ({ children }) => {
  const [form, setForm] = useState(FORM_INIT);
  const [formInit, setFormInit] = useState(null);

  const handleFormOnChange = useCallback(({ target }) => {
    const { id, value, name } = target;
    setForm(prev => {
      if (name) {
        let { birthDate } = prev;
        const _value = String(value).padStart(2, '0');
        if (name === 'year') birthDate = _value + birthDate.slice(2);
        if (name === 'month') birthDate = birthDate.slice(0, 2) + _value + birthDate.slice(4);
        if (name === 'day') birthDate = birthDate.slice(0, 4) + _value;

        return {
          ...prev,
          birthDate,
        };
      }

      return {
        ...prev,
        [id]: value,
      };
    });
  }, []);

  const handleModitySubmit = useCallback(
    async e => {
      e.preventDefault();
      try {
        const {
          oldPassword,
          newPassword,
          newPasswordConfirm,
          birthDate,
          phoneNumber,
          recommendedPerson,
          userName,
          email,
          loginId,
        } = form;

        validation.check(
          ({ password, emptyCheck }) =>
            !emptyCheck(oldPassword) && !password.test(oldPassword) && '현재 비밀번호 조건이 맞지않습니다.'
        );
        validation.check(
          ({ password, emptyCheck }) =>
            !emptyCheck(newPassword) && !password.test(newPassword) && '새로운 비밀번호 조건이 맞지않습니다.'
        );
        validation.check(
          ({ password, emptyCheck }) =>
            !emptyCheck(newPasswordConfirm) &&
            !password.test(newPasswordConfirm) &&
            '새로운 비밀번호 확인 조건이 맞지않습니다.'
        );
        validation.check(() => newPassword !== newPasswordConfirm && '비밀번호가 서로 틀립니다.');
        validation.check(({ emptyCheck }) => emptyCheck(phoneNumber) && '휴대번호가 빈칸입니다.');
        validation.check(
          ({ phonenumber, emptyCheck }) =>
            !emptyCheck(phoneNumber) && !phonenumber.test(phoneNumber) && '휴대번호 조건이 맞지않습니다.'
        );
        validation.check(
          ({ id, emptyCheck }) =>
            !emptyCheck(recommendedPerson) && !id.test(recommendedPerson) && '추천인아이디 조건이 맞지않습니다.'
        );

        const payload = {
          oldPassword,
          newPassword,
          newPasswordConfirm,
          birthDate,
          phoneNumber,
          recommendedPerson,
          userName,
          email,
          loginId,
        };

        // 회원가입이 완료되면 유저 id값 넣어주면된다.
        const { status, message } = await fetchUserInfoUpdate(1, payload);
        if (status !== 200) throw new Error(message);
      } catch (error) {
        alert(error?.message ?? error);
      }
    },
    [form]
  );

  const handleReset = () => setForm(formInit);

  useEffect(() => {
    fetchUserInfo()
      .then(userInfo => {
        setForm(userInfo);
        setFormInit(userInfo);
      })
      .catch(alert);
  }, []);

  const value = useMemo(
    () => ({
      form,
      GridCotainer,
      handleFormOnChange,
    }),
    [form, handleFormOnChange]
  );

  return (
    <ModifyContext.Provider value={value}>
      <Form onSubmit={handleModitySubmit}>
        {children}
        <ButtonWrapper>
          <Button text='초기화' width='15%' color='#8a8a8a' type='button' onClick={handleReset} />
          <Button text='정보수정' width='15%' type='submit' />
        </ButtonWrapper>
      </Form>
    </ModifyContext.Provider>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.9375rem;

  ${mobile} {
    button {
      width: 50%;
    }
  }
`;

const Form = styled.form`
  margin-bottom: 0.9375rem;
`;

const GridCotainer = memo(function GridCotainerMemo({ text, children }) {
  return (
    <GridContainerWrapper container direction='row' justifyContent='center' alignItems='center' gap={1}>
      <GridItemWrapper item lg={3.5} md={3.5} sm={3.5} xs={2.5}>
        {text}
      </GridItemWrapper>
      <GridItemWrapper item lg={8} md={8} sm={8} xs={9}>
        {children}
      </GridItemWrapper>
    </GridContainerWrapper>
  );
});

const GridContainerWrapper = styled(Grid)`
  margin: 0.9375rem 0;
  .MuiOutlinedInput-root {
    height: 2.5rem;
    & fieldset,
    &.Mui-focused fieldset,
    &:hover fieldset {
      border-color: #8a8a8a;
    }
  }
`;
const GridItemWrapper = styled(Grid)`
  color: ${gray};
`;

const useModifyContext = () => useContext(ModifyContext);

export { useModifyContext, ModifyProvider };
