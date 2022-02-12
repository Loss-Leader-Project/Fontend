import { Button, Container } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import SignUpInput from './SignUpInput';
import SignUpEmailCheck from './SignUpEmailCheck';
import SignUpAdressInput from './SignUpAdressInput';
import SignUpEmailLayout from './SignUpEmailLayout';
import SignUpPostNumberLayout from './SignUpPostNumberLayout';

const inputLayoutData = [
  {
    itemText: '아이디',
    name: 'id',
    label: '아이디를 입력하세요',
    helperText: '아이디를 입력하세요',
  },
  {
    itemText: '비밀번호',
    name: 'password',
    label: '숫자 및 특수문자를 조합하여 입력하세요',
    helperText: '비밀번호를 입력하세요',
    password: true,
    autoComplete: true,
  },
  {
    itemText: '비밀번호 확인',
    name: 'passwordCheck',
    label: '비밀번호를 재입력하세요',
    helperText: '비밀번호를 재입력하세요',
    password: true,
    autoComplete: true,
    NotMust: true,
  },
  {
    itemText: '이름',
    name: 'name',
    label: '이름을 입력하세요',
    helperText: '이름을 입력하세요',
  },
];

const SignUp = props => {
  const [email, setEmail] = useState('');

  const mailHandleChange = event => {
    setEmail(event.target.value);
  };

  const [checkedAgreeMail, setCheckedAgreeMail] = useState(false);
  const [checkedAgreeSMS, setCheckedAgreeSMS] = useState(false);

  const handleChangeAgree = event => {
    console.log(event.target);
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

  const checkBlank = () => {
    for (let [key, value] of Object.entries(SignupFormData)) {
      if ((value === '' || value === '직접입력') && key in flag) handleFlag(key, true);
      else if (value !== '' && key in flag) handleFlag(key, false);
    }
  };

  return (
    <div>
      <CustomContainer maxWidth='sm'>
        <Title>기본정보</Title>
        {inputLayoutData.map(item => (
          <SignUpInput {...item} flag={flag} handleValue={handleValue} key={item.name} />
        ))}
        <SignUpEmailLayout email={email} flag={flag} handleValue={handleValue} mailHandleChange={mailHandleChange} />
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
          flag={flag}
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
          flag={flag}
          handleValue={handleValue}
          setSignupFormData={setSignupFormData}
        />
        <SignUpAdressInput SignupFormData={SignupFormData} flag={flag} handleValue={handleValue} />
        <SignUpInput
          name='detailAddress'
          label='상세주소를 입력하세요'
          flag={flag}
          handleValue={handleValue}
          helperText='상세주소를 입력하세요'
          NotMust
        />

        <Title>부가정보</Title>
        <SignUpInput
          itemText='생일'
          name='birthday'
          label='생일을 입력하세요 (ex 20191202)'
          flag={flag}
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
            await checkBlank();
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
  color: ${({ theme }) => theme.colors.lightDark};
  font-size: 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightDark};
  padding: 0.625rem 0;
`;

const CustomContainer = styled(Container)`
  padding-top: 5rem;
`;

const SubmitButton = styled(Button)`
  &&& {
    background-color: ${({ theme }) => theme.colors.brandColor};
    color: white;
    margin: 1.25rem 0;
    height: 3.125rem;
  }
`;
