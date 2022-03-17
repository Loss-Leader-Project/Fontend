import Title from 'Components/Title';
import AdditionalInfo from './AdditionalInfo';
import BasicInfo from './BasicInfo';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { mobile } from 'styles/theme';
import Button from 'Components/Button';
import Validation from 'utils/validation';
import { ApiRq } from 'utils/apiConfig';
import { myApiURL } from 'utils/apiUrl';

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

const ModifyPage = () => {
  const [form, setForm] = useState(FORM_INIT);
  const [formInit, setFormInit] = useState(null);
  const [errors, setErrors] = useState({});

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

        Validation.check(
          ({ isIdCheck, isPasswordCheck, emptyCheck, isUserNameCheck, isPhonenumberCheck, errors, makeError }) => {
            if (!emptyCheck(oldPassword) && !isPasswordCheck(oldPassword)) {
              makeError('oldPassword', '현재 비밀번호 조건이 맞지않습니다.');
            }
            if (!emptyCheck(newPassword) && !isPasswordCheck(newPassword)) {
              makeError('newPassword', '새로운 비밀번호 조건이 맞지않습니다.');
            }
            if (!emptyCheck(recommendedPerson) && !isIdCheck(recommendedPerson)) {
              makeError('recommendedPerson', '추천인아이디 조건이 맞지않습니다.');
            }
            if (!emptyCheck(newPasswordConfirm) && !isPasswordCheck(newPasswordConfirm)) {
              makeError('newPasswordConfirm', '새로운 비밀번호 확인 조건이 맞지않습니다.');
            }
            if (!emptyCheck(phoneNumber) && !isPhonenumberCheck(phoneNumber)) {
              makeError('phoneNumber', '휴대번호 조건이 맞지않습니다.');
            }
            if (newPassword !== newPasswordConfirm) {
              makeError('newPassword', '비밀번호가 서로 틀립니다.');
              makeError('newPasswordConfirm', '비밀번호가 서로 틀립니다.');
            }
            if (emptyCheck(phoneNumber)) {
              makeError('phoneNumber', '휴대번호가 빈칸입니다.');
            }
            if (emptyCheck(userName)) {
              makeError('userName', '이름이 빈칸입니다.');
            }
            if (!isUserNameCheck(userName)) {
              makeError('userName', '이름 조건이 맞지않습니다.');
            }
            return errors;
          }
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

        const userId = 1;
        // 회원수정이 완료되면 유저 id값 넣어주면된다.
        await ApiRq('post', myApiURL.GET_USER_INFO_UPDATE(userId), '', payload);
      } catch (error) {
        if (typeof error === 'object') {
          setErrors(error);
        } else {
          alert(error);
        }
      }
    },
    [form]
  );

  const handleReset = () => setForm(formInit);

  useEffect(() => {
    ApiRq('get', myApiURL.MOK_GET_USER_INFO)
      .then(userInfo => {
        setForm(userInfo);
        setFormInit(userInfo);
      })
      .catch(alert);
  }, []);

  const value = useMemo(
    () => ({
      form,
      errors,
      handleFormOnChange,
    }),
    [form, errors, handleFormOnChange]
  );

  return (
    <ModifyContext.Provider value={value}>
      <Form onSubmit={handleModitySubmit}>
        <Title text='기본정보' />
        <Layout>
          <BasicInfo />
        </Layout>
        <Title text='부가정보' />
        <Layout>
          <AdditionalInfo />
        </Layout>
        <ButtonWrapper>
          <Button text='초기화' width='15%' color='#8a8a8a' type='button' onClick={handleReset} />
          <Button text='정보수정' width='15%' type='submit' />
        </ButtonWrapper>
      </Form>
    </ModifyContext.Provider>
  );
};

const Form = styled.form`
  margin-bottom: 0.9375rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.9375rem;

  ${mobile} {
    button {
      width: 50%;
    }
  }
`;
const Layout = styled.div`
  padding: 2.1875rem 3.125rem;
  border-top: 0.0625rem solid #8a8a8a;

  ${mobile} {
    padding: 2.1875rem 1.25rem;
  }
`;

export const useModifyContext = () => useContext(ModifyContext);
export default ModifyPage;
