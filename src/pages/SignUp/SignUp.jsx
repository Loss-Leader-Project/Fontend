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

  const [helpTextID, sethelpTextID] = useState('???????????? ???????????????');
  const [helpTextPW, sethelpTextPW] = useState('??????????????? ???????????????');
  const [helpTextPWCheck, sethelpTextPWCheck] = useState('??????????????? ??????????????????');
  const [helpTextEmail, sethelpTextEmail] = useState('?????? ????????? ???????????????');
  const [helpTextMailID, sethelpTextMailID] = useState('?????????????????? ???????????????');
  const [helpTextEmailSubmit, sethelpTextEmailSubmit] = useState('????????? ???????????????');
  const [helpTextBirthday, sethelpTextBirthday] = useState('??????????????? ???????????????');
  const [helpTextRecommend, sethelpTextRecommend] = useState('');

  const checkSamePW = () => {
    let returnFlag = false;
    if (SignupFormData.password !== SignupFormData.passwordCheck) {
      handleFlag('passwordCheck', true);
      sethelpTextPWCheck('???????????? ??????????????? ???????????? ????????????. ?????? ?????? ??????????????????.');
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
      sethelpTextID('??????,????????? ????????? 5????????? 19???????????? ?????? ???????????????.');
      return;
    }

    if (await !validation.isPasswordCheck(SignupFormData.password)) {
      handleFlag('password', true);
      sethelpTextPW('??????,??????????????? ????????? 8????????? 16???????????? ?????? ???????????????.');
      return;
    }

    if (await checkSamePW()) return;

    if (await !validation.isEmailCheck(data.email)) {
      handleFlag('mailId', true);
      handleFlag('email', true);
      sethelpTextMailID('???????????? ?????? ???????????????');
      sethelpTextEmail('?????? ??????????????? ???????????????');
      return;
    }

    if (await !validation.isPhonenumberCheck(SignupFormData.phone)) {
      handleFlag('phone', true);
    }

    if (await !validation.isBirthDayCheck(SignupFormData.birthday)) {
      handleFlag('birthday', true);
      sethelpTextBirthday('??????????????? ??????????????? 7?????? ???????????????');
      return;
    }

    if (emailValidFlag) {
      handleFlag('emailSubmit', true);
      return;
    }

    if (await checkFlag(flag)) return;

    if (SignupFormData.agreeMail === false) alert('?????? ?????? ????????? ?????????????????????.');

    ApiRq('post', signupApiURL.LOCAL_POST_SIGNUP, '', data)
      .then(() => {
        alert('??????????????? ?????????????????????.');
        history.push('/login');
      })
      .catch(res => {
        alert('??????????????? ?????????????????????.');

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
        <Title>????????????</Title>
        <SignUpIDLayout
          itemText='?????????'
          name='id'
          label='???????????? ??????????????? (??????????????? ??????,???????????? 5 ~ 19???)'
          flag={flag.id}
          handleValue={handleValue}
          helperText={helpTextID}
          value={SignupFormData.id}
          sethelpText={sethelpTextID}
          handleFlag={handleFlag}
          onKeyUp={PostSignup}
        />
        <SignUpInput
          itemText='????????????'
          name='password'
          label='??????????????? ??????????????? (??????????????? ??????,?????????????????? 8 ~ 16???)'
          flag={flag.password}
          type='password'
          value={SignupFormData.password}
          autoComplete='current-password'
          handleValue={handleValue}
          helperText={helpTextPW}
          onKeyUp={PostSignup}
        />
        <SignUpInput
          itemText='???????????? ??????'
          name='passwordCheck'
          label='??????????????? ??????????????????'
          flag={flag.passwordCheck}
          type='password'
          value={SignupFormData.passwordCheck}
          autoComplete='current-password'
          handleValue={handleValue}
          helperText={helpTextPWCheck}
          onKeyUp={PostSignup}
        />
        <SignUpInput
          itemText='??????'
          name='name'
          label='????????? ???????????????'
          value={SignupFormData.name}
          flag={flag.name}
          handleValue={handleValue}
          helperText='????????? ???????????????'
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
          label='???????????? ?????? ??? ?????? ????????? ???????????????. (??????)'
        />
        <SignUpInput
          itemText='???????????????'
          name='phone'
          label='- ?????? ???????????????'
          value={SignupFormData.phone}
          flag={flag.phone}
          handleValue={handleValue}
          helperText='?????????????????? ???????????????'
          onKeyUp={PostSignup}
        />
        <SignUpEmailCheck
          name='agreeSMS'
          checkedAgree={checkedAgreeSMS}
          handleChangeAgree={handleChangeAgree}
          label='??????/????????? SMS ????????? ???????????????. (??????)'
        />

        <SignUpInput
          itemText='????????????'
          name='tel'
          label='- ?????? ???????????????'
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
          label='????????? ???????????????'
          flag={flag.address}
          value={SignupFormData.address}
          handleValue={handleValue}
          helperText='????????? ???????????????'
          NotMust
          onKeyUp={PostSignup}
        />
        <SignUpInput
          name='detailAddress'
          label='??????????????? ???????????????'
          flag={flag.detailAddress}
          value={SignupFormData.detailAddress}
          handleValue={handleValue}
          helperText='??????????????? ???????????????'
          NotMust
          onKeyUp={PostSignup}
        />
        <SignUpInput
          itemText='????????????'
          name='birthday'
          label='???????????? ??? 6????????? ??? 1????????? ??????????????????. (ex 9112021)'
          value={SignupFormData.birthday}
          flag={flag.birthday}
          handleValue={handleValue}
          helperText={helpTextBirthday}
          onKeyUp={PostSignup}
        />

        <Title>????????????</Title>
        <SignUpInput
          itemText='????????? ?????????'
          name='recommendId'
          label='????????? ???????????? ???????????????'
          handleValue={handleValue}
          value={SignupFormData.recommendId}
          flag={flag.recommend}
          helperText={helpTextRecommend}
          NotMust
          onKeyUp={PostSignup}
        />
        <MuiButton content='??????' sx={{ margin: '1.25rem 0', height: '3.125rem' }} onClick={PostSignup} />
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
