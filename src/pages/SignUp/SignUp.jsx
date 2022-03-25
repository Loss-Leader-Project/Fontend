import { Container } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import SignUpInput from './SignUpInput';
import SignUpEmailCheck from './SignUpEmailCheck';
import SignUpEmailLayout from './SignUpEmailLayout';
import SignUpPostNumberLayout from './SignUpPostNumberLayout';
import { lightDark } from 'styles/theme';
import SignupEmailSubmit from './SignupEmailSubmit';
import SignUpIDLayout from './SignUpIDLayout';
import MuiButton from 'Components/MuiButton';
import { ChangeFlagfalse, checkBlankSignUp, checkFlag } from 'utils/check';
import validation from 'utils/validation';
import { ApiRq } from 'utils/apiConfig';
import { signupApiURL } from 'utils/apiUrl';
import { useHistory } from 'react-router';

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
    emailSubmit: '',
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
    birthday: false,
    emailSubmit: false,
    recommend: false,
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
  const [helpTextEmailSubmit, sethelpTextEmailSubmit] = useState('인증을 완료하세요');
  const [helpTextBirthday, sethelpTextBirthday] = useState('주민번호를 입력하세요');
  const [helpTextRecommend, sethelpTextRecommend] = useState('');

  const checkSamePW = () => {
    let returnFlag = false;
    if (SignupFormData.password !== SignupFormData.passwordCheck) {
      handleFlag('passwordCheck', true);
      sethelpTextPWCheck('입력하신 비밀번호와 일치하지 않습니다. 다시 한번 입력해주세요.');
      returnFlag = true;
    }
    return returnFlag;
  };

  const [emailValidFlag, setEmailValidFlag] = useState(true);

  const history = useHistory();

  const PostSignup = async () => {
    const data = {
      birthDate: SignupFormData.birthday,
      briefAddress: SignupFormData.address === '' ? null : SignupFormData.address,
      confirmPassword: SignupFormData.passwordCheck,
      detailAddress: SignupFormData.detailAddress === '' ? null : SignupFormData.detailAddress,
      email: SignupFormData.mailId + '@' + SignupFormData.email,
      emailCertification: Number(SignupFormData.emailSubmit),
      loginId: SignupFormData.id,
      password: SignupFormData.password,
      phoneNumber: SignupFormData.phone,
      postalCode: SignupFormData.postNumber === '' ? null : SignupFormData.postNumber,
      recommendedPerson: SignupFormData.recommendId === '' ? null : SignupFormData.recommendId,
      userName: SignupFormData.name,
    };

    ChangeFlagfalse(flag, handleFlag);

    if (await checkBlankSignUp(SignupFormData, flag, handleFlag)) return;

    if (await !validation.isIdCheck(SignupFormData.id)) {
      handleFlag('id', true);
      sethelpTextID('영문,숫자를 포함한 5자이상 19자이하로 다시 입력하세요.');
      return;
    }

    if (await !validation.isPasswordCheck(SignupFormData.password)) {
      handleFlag('password', true);
      sethelpTextPW('숫자,특수문자를 포함한 8자이상 16자이하로 다시 입력하세요.');
      return;
    }

    if (await checkSamePW()) return;

    if (await !validation.isEmailCheck(data.email)) {
      handleFlag('mailId', true);
      handleFlag('email', true);
      sethelpTextMailID('아이디를 다시 확인하세요');
      sethelpTextEmail('메일 주소형식을 확인하세요');
      return;
    }

    if (await !validation.isPhonenumberCheck(SignupFormData.phone)) {
      handleFlag('phone', true);
    }

    if (await !validation.isBirthDayCheck(SignupFormData.birthday)) {
      handleFlag('birthday', true);
      sethelpTextBirthday('주민번호를 앞에서부터 7자를 입력하세요');
      return;
    }

    if (emailValidFlag) {
      handleFlag('emailSubmit', true);
      return;
    }

    if (await checkFlag(flag)) return;

    if (SignupFormData.agreeMail === false) alert('메일 수신 동의는 필수사항입니다.');

    ApiRq('post', signupApiURL.LOCAL_POST_SIGNUP, '', data)
      .then(() => {
        alert('회원가입에 성공하셨습니다.');
        history.push('/login');
      })
      .catch(res => {
        switch (res.data.status) {
          case 409:
            sethelpTextID(res.data.message);
            handleFlag('id', true);
            break;
          case 400:
            sethelpTextEmailSubmit(res.data.message);
            handleFlag('emailSubmit', true);
            break;
          case 404:
            sethelpTextRecommend(res.data.message);
            handleFlag('recommend', true);
            break;
          default:
            break;
        }
      });
  };

  return (
    <div>
      <CustomContainer maxWidth='sm'>
        <Title>기본정보</Title>
        <SignUpIDLayout
          itemText='아이디'
          name='id'
          label='아이디를 입력하세요 (공백미포함 영문,숫자포함 5 ~ 19자)'
          flag={flag.id}
          handleValue={handleValue}
          helperText={helpTextID}
          value={SignupFormData.id}
          sethelpText={sethelpTextID}
          handleFlag={handleFlag}
          onKeyUp={PostSignup}
        />
        <SignUpInput
          itemText='비밀번호'
          name='password'
          label='비밀번호를 입력하세요 (공백미포함 숫자,특수문자포함 8 ~ 16자)'
          flag={flag.password}
          type='password'
          value={SignupFormData.password}
          autoComplete='current-password'
          handleValue={handleValue}
          helperText={helpTextPW}
          onKeyUp={PostSignup}
        />
        <SignUpInput
          itemText='비밀번호 확인'
          name='passwordCheck'
          label='비밀번호를 재입력하세요'
          flag={flag.passwordCheck}
          type='password'
          value={SignupFormData.passwordCheck}
          autoComplete='current-password'
          handleValue={handleValue}
          helperText={helpTextPWCheck}
          onKeyUp={PostSignup}
        />
        <SignUpInput
          itemText='이름'
          name='name'
          label='이름을 입력하세요'
          value={SignupFormData.name}
          flag={flag.name}
          handleValue={handleValue}
          helperText='이름을 입력하세요'
          onKeyUp={PostSignup}
        />

        <SignUpEmailLayout
          email={email}
          userEmail={SignupFormData.mailId + '@' + SignupFormData.email}
          flag={flag.email}
          value={{ mailId: SignupFormData.mailId, email: SignupFormData.email }}
          handleValue={handleValue}
          mailHandleChange={mailHandleChange}
          handleFlag={handleFlag}
          helpTextEmail={helpTextEmail}
          sethelpTextMailID={sethelpTextMailID}
          helpTextMailID={helpTextMailID}
          sethelpTextEmail={sethelpTextEmail}
          sethelpTextEmailSubmit={sethelpTextEmailSubmit}
        />
        <SignupEmailSubmit
          value={SignupFormData.emailSubmit}
          flag={flag.emailSubmit}
          helpText={helpTextEmailSubmit}
          handleValue={handleValue}
          handleFlag={handleFlag}
          sethelpText={sethelpTextEmailSubmit}
          setEmailValidFlag={setEmailValidFlag}
        />
        <SignUpEmailCheck
          name='agreeMail'
          checkedAgree={checkedAgreeMail}
          handleChangeAgree={handleChangeAgree}
          label='개인정보 수집 및 메일 수신에 동의합니다. (필수)'
        />
        <SignUpInput
          itemText='휴대폰번호'
          name='phone'
          label='- 없이 입력하세요'
          value={SignupFormData.phone}
          flag={flag.phone}
          handleValue={handleValue}
          helperText='휴대폰번호를 입력하세요'
          onKeyUp={PostSignup}
        />
        <SignUpEmailCheck
          name='agreeSMS'
          checkedAgree={checkedAgreeSMS}
          handleChangeAgree={handleChangeAgree}
          label='정보/이벤트 SMS 수신에 동의합니다. (선택)'
        />

        <SignUpInput
          itemText='전화번호'
          name='tel'
          label='- 없이 입력하세요'
          value={SignupFormData.tel}
          handleValue={handleValue}
          NotMust
          onKeyUp={PostSignup}
        />
        <SignUpPostNumberLayout
          SignupFormData={SignupFormData}
          flag={flag.postNumber}
          value={SignupFormData.postNumber}
          handleValue={handleValue}
          setSignupFormData={setSignupFormData}
          NotMust
        />

        <SignUpInput
          name='address'
          label='주소를 입력하세요'
          flag={flag.address}
          value={SignupFormData.address}
          handleValue={handleValue}
          helperText='주소를 입력하세요'
          NotMust
          onKeyUp={PostSignup}
        />
        <SignUpInput
          name='detailAddress'
          label='상세주소를 입력하세요'
          flag={flag.detailAddress}
          value={SignupFormData.detailAddress}
          handleValue={handleValue}
          helperText='상세주소를 입력하세요'
          NotMust
          onKeyUp={PostSignup}
        />
        <SignUpInput
          itemText='주민번호'
          name='birthday'
          label='주민번호 앞 6자리와 뒷 1숫자를 입력해주세요. (ex 9112021)'
          value={SignupFormData.birthday}
          flag={flag.birthday}
          handleValue={handleValue}
          helperText={helpTextBirthday}
          onKeyUp={PostSignup}
        />

        <Title>부가정보</Title>
        <SignUpInput
          itemText='추천인 아이디'
          name='recommendId'
          label='추천인 아이디를 입력하세요'
          handleValue={handleValue}
          value={SignupFormData.recommendId}
          flag={flag.recommend}
          helperText={helpTextRecommend}
          NotMust
          onKeyUp={PostSignup}
        />
        <MuiButton content='확인' sx={{ margin: '1.25rem 0', height: '3.125rem' }} onClick={PostSignup} />
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
  margin-top: 1.25rem;
`;

const CustomContainer = styled(Container)`
  padding-top: 1.875rem;
`;
