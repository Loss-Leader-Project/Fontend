export default class Validation {
  static id = /^[a-z]+[a-z0-9]{4,18}$/;
  static password = /^(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
  static email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  static birthday = /^[0-9]{7}$/;
  static phonenumber = /^(010)[0-9]{3,4}[0-9]{4}$/;
  static check(callback) {
    const isError = callback(this);
    if (isError) throw new Error(isError);
    return isError;
  }
  static emptyCheck(value) {
    if (typeof value === 'object') {
      if (Array.isArray(value)) return value.length === 0 ? true : false;
      return Object.keys(value).length === 0 ? true : false;
    }
    if (value === '' || value === 0 || value === undefined || value === null) return true;
    return false;
  }
}
