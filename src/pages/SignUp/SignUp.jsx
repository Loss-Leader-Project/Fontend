import { Button, Container } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import SignUpInput from './SignUpInput';
import SignUpEmailCheck from './SignUpEmailCheck';
import SignUpAdressInput from './SignUpAdressInput';
import SignUpEmailLayout from './SignUpEmailLayout';
import SignUpPostNumberLayout from './SignUpPostNumberLayout';
import { checkBlank, checkFlag, regExpCheck } from 'pages/SignUp/check';
import { brandColor, lightDark } from 'styles/theme';

const SignUp = props => {
  const [email, setEmail] = useState('');

  const mailHandleChange = event => {
    setEmail(event.target.value);
  };

  const [checkedAgreeMail, setCheckedAgreeMail] = useState(false);
  const [checkedAgreeSMS, setCheckedAgreeSMS] = useState(false);

  const handleChangeAgree = event => {
    if (event.target.name === 'agreeMail') setCheckedAgreeMail(event.target.checked);
    if (event.target.name === 'agreeSMS') setCheckedAgreeSMS(event.target.checked);

    setSignupFormData(previousState => {
      return { ...previousState, [event.target.name]: event.target.checked };
    });
  };

  const [SignupFormData, setSignupFormData] = useState({
    id: '',
    password: '',
    passwordCheck: '',
    name: '',
    mailId: '',
    email: '',
    agreeMail: false,
    phone: '',
    agreeSMS: false,
    tel: '',
    postNumber: '',
    address: '',
    detailAddress: '',
    birthday: '',
    recommendId: '',
  });

  const handleValue = e => {
    const { name, value } = e.target;
    setSignupFormData(previousState => {
      return { ...previousState, [name]: value };
    });

    handleFlag(name, value === '');
  };

  const [flag, SetFlag] = useState({
    id: false,
    password: false,
    passwordCheck: false,
    name: false,
    mailId: false,
    email: false,
    phone: false,
    address: false,
    detailAddress: false,
    birthday: false,
    postNumber: false,
  });

  const handleFlag = (key, boolean) => {
    SetFlag(previousState => {
      return { ...previousState, [key]: boolean };
    });
  };

  const [helpTextID, sethelpTextID] = useState('아이디를 입력하세요');
  const [helpTextPW, sethelpTextPW] = useState('비밀번호를 입력하세요');
  const [helpTextPWCheck, sethelpTextPWCheck] = useState('비밀번호를 재입력하세요');
  const [helpTextEmail, sethelpTextEmail] = useState('메일 주소를 입력하세요');
  const [helpTextMailID, sethelpTextMailID] = useState('메일아이디를 입력하세요');

  const checkSamePW = () => {
    let returnFlag = false;
    if (SignupFormData.password !== SignupFormData.passwordCheck) {
      handleFlag('passwordCheck', true);
      sethelpTextPWCheck('입력하신 비밀번호와 일치하지 않습니다. 다시 한번 입력해주세요.');
      returnFlag = true;
    }
    return returnFlag;
  };

  return (
    <div>
      <CustomContainer maxWidth='sm'>
        <Title>기본정보</Title>
        <SignUpInput
          itemText='아이디'
          name='id'
          label='아이디를 입력하세요 (공백미포함 영문,숫자포함 5 ~ 19자)'
          flag={flag.id}
          handleValue={handleValue}
          helperText={helpTextID}
        />
        <SignUpInput
          itemText='비밀번호'
          name='password'
          label='비밀번호를 입력하세요 (공백미포함 숫자,특수문자포함 8 ~ 16자)'
          flag={flag.password}
          password
          autoComplete
          handleValue={handleValue}
          helperText={helpTextPW}
        />
        <SignUpInput
          itemText='비밀번호 확인'
          name='passwordCheck'
          label='비밀번호를 재입력하세요'
          flag={flag.passwordCheck}
          password
          autoComplete
          handleValue={handleValue}
          helperText={helpTextPWCheck}
        />
        <SignUpInput
          itemText='이름'
          name='name'
          label='이름을 입력하세요'
          flag={flag.name}
          handleValue={handleValue}
          helperText='이름을 입력하세요'
        />

        <SignUpEmailLayout
          email={email}
          flag={flag.email}
          handleValue={handleValue}
          mailHandleChange={mailHandleChange}
          helpTextEmail={helpTextEmail}
          helpTextMailID={helpTextMailID}
        />
        <SignUpEmailCheck
          name='agreeMail'
          checkedAgree={checkedAgreeMail}
          handleChangeAgree={handleChangeAgree}
          label='정보/이벤트 메일 수신에 동의합니다. (필수사항)'
        />
        <SignUpInput
          itemText='휴대폰번호'
          name='phone'
          label='- 없이 입력하세요'
          flag={flag.phone}
          handleValue={handleValue}
          helperText='휴대폰번호를 입력하세요'
        />
        <SignUpEmailCheck
          name='agreeSMS'
          checkedAgree={checkedAgreeSMS}
          handleChangeAgree={handleChangeAgree}
          label='정보/이벤트 SMS 수신에 동의합니다. (선택사항)'
        />
        <SignUpInput itemText='전화번호' name='tel' label='- 없이 입력하세요' handleValue={handleValue} NotMust />
        <SignUpPostNumberLayout
          SignupFormData={SignupFormData}
          flag={flag.postNumber}
          handleValue={handleValue}
          setSignupFormData={setSignupFormData}
        />
        <SignUpAdressInput SignupFormData={SignupFormData} flag={flag.address} handleValue={handleValue} />
        <SignUpInput
          name='detailAddress'
          label='상세주소를 입력하세요'
          flag={flag.detailAddress}
          handleValue={handleValue}
          helperText='상세주소를 입력하세요'
          NotMust
        />

        <Title>부가정보</Title>
        <SignUpInput
          itemText='생일'
          name='birthday'
          label='생일을 입력하세요 (ex 20191202)'
          flag={flag.birthday}
          handleValue={handleValue}
          helperText='생일을 입력하세요'
        />
        <SignUpInput
          itemText='추천인 아이디'
          name='recommendId'
          label='추천인 아이디를 입력하세요'
          handleValue={handleValue}
          NotMust
        />
        <SubmitButton
          fullWidth
          onClick={async () => {
            const mail = SignupFormData.mailId + '@' + SignupFormData.email;

            if (await checkBlank(SignupFormData, flag, handleFlag)) return;

            if (await regExpCheck('id', SignupFormData.id, handleFlag, sethelpTextID)) return;

            if (await regExpCheck('password', SignupFormData.password, handleFlag, sethelpTextPW)) return;

            if (await checkSamePW()) return;

            if (await regExpCheck('email', mail, handleFlag, sethelpTextMailID, sethelpTextEmail)) return;

            if (await checkFlag(flag)) return;
          }}
        >
          확인
        </SubmitButton>
      </CustomContainer>
    </div>
  );
};

export default SignUp;

const Title = styled.div`
  color: ${lightDark};
  font-size: 1.25rem;
  border-bottom: 1px solid ${lightDark};
  padding: 0.625rem 0;
`;

const CustomContainer = styled(Container)`
  padding-top: 5rem;
`;

const SubmitButton = styled(Button)`
  &&& {
    background-color: ${brandColor};
    color: white;
    margin: 1.25rem 0;
    height: 3.125rem;
  }
`;
