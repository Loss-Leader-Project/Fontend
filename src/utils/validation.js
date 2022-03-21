// @ts-check

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
   * @typedef { (value:object) => boolean } callback
   */

  /**
   * @param {callback} callback
   * @param {boolean} isThrow
   * @returns {string | object}
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
   * @param {object} value
   * @returns {boolean}
   */
  static emptyCheck(value) {
    if (value === '' || value === 0 || value === undefined || value === null) return true;
    if (typeof value === 'object') {
      if (Array.isArray(value)) return value.length === 0;
      return Object.keys(value).length === 0;
    }
    return false;
  }

  /**
   * @param {object} values
   * @returns {object}
   */
  static emptyCheckAll = values => {
    return Object.entries(values).reduce((cur, [key, value]) => {
      return {
        ...cur,
        [`${key}`]: this.emptyCheck(value),
      };
    }, {});
  };

  /**
   * @param {string} idValue
   * @returns {boolean}
   */
  static isIdCheck = idValue => {
    return this.id.test(idValue);
  };
  /**
   * @param {string} pwdValue
   * @returns {boolean}
   */
  static isPasswordCheck = pwdValue => {
    return this.password.test(pwdValue);
  };

  /**
   * @param {string} userNameValue
   * @returns {boolean}
   */
  static isUserNameCheck = userNameValue => {
    return this.username.test(userNameValue);
  };

  static isPhonenumberCheck = phonenumberValue => {
    return this.phonenumber.test(phonenumberValue);
  };

  /**
   * @param {string} emailValue
   * @returns {boolean}
   */
  static isEmailCheck = emailValue => {
    return this.email.test(emailValue);
  };

  /**
   * @param {string} birthDayValue
   * @returns {boolean}
   */
  static isBirthDayCheck = birthDayValue => {
    return this.birthday.test(birthDayValue);
  };

  /**
   * @param {string} key
   * @param {string} message
   * @param {string} value
   * @param {RegExp} rexge
   * @returns {boolean}
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
   * @type { function(): void }
   */
  static setErrorReset = () => {
    this.errors = {};
  };

  /**
   * @param {string} key 에러 프로퍼티 이름
   * @param {string} message 에러 메세지
   * @returns {void}
   */
  static makeError = (key, message) => {
    this.errors[key] = {
      isError: true,
      message,
    };
  };
}
