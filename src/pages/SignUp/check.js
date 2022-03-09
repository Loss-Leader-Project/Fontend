export const checkFlag = flag => {
  let returnFlag = false;
  for (let value of Object.values(flag)) {
    if (value === true) returnFlag = true;
  }
  return returnFlag;
};

export const checkBlank = (formData, flag, handleFlag) => {
  let returnFlag = false;

  for (let [key, value] of Object.entries(formData)) {
    if ((value === '' || value === '직접입력') && key in flag) {
      handleFlag(key, true);
      returnFlag = true;
    } else if (value !== '' && key in flag && key !== 'emailSubmit') handleFlag(key, false);
  }

  return returnFlag;
};

const regExp = {
  id: /^[a-z]+[a-z0-9]{4,18}$/g,
  password: /^(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
  email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
  birthday: /^[0-9]{7}$/,
};

export const regExpCheck = (key, value, handleFlag, sethelpText, sethelpText2) => {
  if (key === 'id') {
    value = value.replace(/\s/g, '');

    if (!value.match(regExp.id)) {
      handleFlag('id', true);
      sethelpText !== undefined && sethelpText('영문,숫자를 포함한 5자이상 19자이하로 다시 입력하세요.');
      return true;
    } else {
      handleFlag('id', false);
      sethelpText !== undefined && sethelpText('아이디를 입력하세요');
    }
  }

  if (key === 'password') {
    value = value.replace(/\s/g, '');

    if (!value.match(regExp.password)) {
      handleFlag('password', true);
      sethelpText !== undefined && sethelpText('숫자,특수문자를 포함한 8자이상 16자이하로 다시 입력하세요.');
      return true;
    } else {
      handleFlag('password', false);
      sethelpText !== undefined && sethelpText('비밀번호를 입력하세요.');
    }
  }

  if (key === 'email') {
    value = value.replace(/\s/g, '');

    if (!value.match(regExp.email)) {
      handleFlag('mailId', true);
      handleFlag('email', true);
      sethelpText !== undefined && sethelpText('아이디를 다시 확인하세요');
      sethelpText2 !== undefined && sethelpText2('메일 주소형식을 확인하세요');
      return true;
    } else {
      handleFlag('mailId', false);
      handleFlag('email', false);
      sethelpText !== undefined && sethelpText('메일아이디를 입력하세요');
      sethelpText2 !== undefined && sethelpText2('메일 주소를 입력하세요');
    }
  }

  if (key === 'birthday') {
    value = value.replace(/\s/g, '');

    if (!value.match(regExp.birthday)) {
      handleFlag('birthday', true);
      sethelpText !== undefined && sethelpText('주민번호를 앞에서부터 7자를 입력하세요');
      return true;
    } else {
      handleFlag('birthday', false);
      sethelpText !== undefined && sethelpText('주민번호를 입력하세요');
    }
  }
};
