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
import { TokenCheck } from 'utils/api';
import { useHistory } from 'react-router-dom';

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
  /*
   * 초기화 버튼에 이용
   */
  const [formInit, setFormInit] = useState(null);
  const [errors, setErrors] = useState({});
  const history = useHistory();

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

  const handleReset = () => setForm(formInit);

  const changeStringNull = value => {
    if (typeof value !== 'string') throw new TypeError('value is not string');
    if (value === '') return null;
    return value;
  };

  /**
   * @param {number} status
   * @param {number} targetStatus
   * @param {string} path
   * @param {Function} callback replace push 등 쓰고 싶은 함수로 유연하게 변경 가능하도록 설계
   */
  const statusCheck = (status, targetStatus, path, callback) => {
    if (status === targetStatus) callback(path);
  };

  const handleStatus = useCallback(
    ({ status, message }) => {
      alert(message);
      statusCheck(status, 200, '/my/coupon', path => history.replace(path));
    },
    [history]
  );

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

        /**
         * 비밀번호, 추천인 아이디 빈 문자열로 요청하지않고 null을 넣어줘야 된다.
         */
        const payload = {
          oldPassword: changeStringNull(oldPassword),
          newPassword: changeStringNull(newPassword),
          newPasswordConfirm: changeStringNull(newPasswordConfirm),
          recommendedPerson: changeStringNull(recommendedPerson),
          birthDate,
          phoneNumber,
          userName,
          email,
          loginId,
        };
        /**
         * 정환님 로그인 구현되면 토큰 값 헤더로 넘기면 됩니다.
         * 지금은 테스트를 위해 임의 값을 넣었습니다.
         */
        await TokenCheck(
          token => ApiRq('patch', myApiURL.GET_USER_INFO_UPDATE, '', payload, { Authorization: token }),
          history
        );

        handleStatus({ status: 200, message: '수정되었습니다.' });
      } catch (error) {
        if ('data' in error) {
          const { code, message } = error.data;
          handleStatus({ status: code, message });
          return;
        }
        setErrors(error);
      }
    },
    [form, handleStatus, history]
  );

  useEffect(() => {
    TokenCheck(null, history)
      .then(({ data }) => {
        const _obj = {
          ...data,
          newPassword: '',
          newPasswordConfirm: '',
          oldPassword: '',
          /**
           * recommendedPerson를 미 입력한 유저는 null로 응답이 온다.
           * Mui rating에 null을 넘겨주면 에러를 발생시킨다.
           * */
          recommendedPerson: data.recommendedPerson ?? '',
        };

        setForm(_obj);
        setFormInit(_obj);
      })
      .catch(({ data }) => {
        const { code, message } = data;
        handleStatus({ status: code, message });
      });
  }, [handleStatus, history]);

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
