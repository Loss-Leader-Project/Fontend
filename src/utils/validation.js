export default class Validation {
  static id = /^[a-z]+[a-z0-9]{4,18}$/;
  static password = /^(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
  static email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  static phonenumber = /^(010)[0-9]{3,4}[0-9]{4}$/;
  static birthday = /^([0,9])[0-9]{6}$/;
  static username = /^[가-힣]{3,9}$/;
  static errors = {};

  constructor() {
    throw new Error('Unable to create an instance.');
  }

  static init = () => {
    this.setErrorReset();
  };

  /**
   * @param {throw 기능 유무} isThrow
   * @returns string,object
   */
  static check(callback, isThrow = true) {
    this.init();
    const isError = callback(this);
    if (typeof isError === 'object') {
      if (!this.emptyCheck(isError) && isThrow) {
        throw isError;
      }
    } else {
      if (isError && isThrow) {
        throw isError;
      }
    }
    return isError;
  }
  /**
   * @param {검사할 값} value
   * @returns boolean
   */
  static emptyCheck(value) {
    if (typeof value === 'object') {
      if (Array.isArray(value)) return value.length === 0;
      return Object.keys(value).length === 0;
    }
    if (value === '' || value === 0 || value === undefined || value === null) return true;
    return false;
  }
  /**
   * @param {아이디} idValue
   * @returns boolean
   */
  static isIdCheck = idValue => {
    return this.id.test(idValue);
  };
  /**
   * @param {비밀번호} pwdValue
   * @returns boolean
   */
  static isPasswordCheck = pwdValue => {
    return this.password.test(pwdValue);
  };

  /**
   * @param {유저이름} userNameValue
   * @returns boolean
   */
  static isUserNameCheck = userNameValue => {
    return this.username.test(userNameValue);
  };

  static isPhonenumberCheck = phonenumberValue => {
    return this.phonenumber.test(phonenumberValue);
  };

  /**
   * @param {이메일} emailValue
   * @returns boolean
   */
  static isEmailCheck = emailValue => {
    return this.email.test(emailValue);
  };

  /**
   * @param {생년월일} birthDayValue
   * @returns boolean
   */
  static isBirthDayCheck = birthDayValue => {
    return this.birthday.test(birthDayValue);
  };

  /**
   * @param {에러 프로퍼티 키값} key
   * @param {에러 메세지} message
   * @param {검색 할 값} value
   * @param {검색에 필요한 정규식} rexge
   * @returns boolean
   */
  static isPatternCheck = (key, message, value, rexge) => {
    if (!(rexge instanceof RegExp)) throw new Error('rexge is not found');
    if (rexge.test(value)) {
      this.makeError(key, message);
      return true;
    }
    return false;
  };

  /**
   * 에러객체 초기화
   */
  static setErrorReset = () => {
    this.errors = {};
  };

  /**
   * @param {에러객체에 추가 할 프로퍼티} key
   * @param {에러 메세지} message
   */
  static makeError = (key, message) => {
    this.errors[key] = {
      isError: true,
      message,
    };
  };
}
