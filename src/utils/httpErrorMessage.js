//status에 따른 message 처리 (정환님코드)

export class HTTPError extends Error {
  /**
   * @param {Error}
   * 매개변수로 status message 프로퍼티를 갖는 객체를 보내면 됩니다.
   */
  constructor({ status, message }) {
    super();
    this.status = status;
    this.init(status);
    /**
     * 매개변수로 넘어온 message의 값이 있다면 따로 할당한다.
     */
    if (message) this.setMessage(message);
  }
  init(status) {
    if (status === undefined) {
      this.message = '클라이언트에서 문제가 발생했습니다.';
      this.name = 'Network Error';
    } else if (status === 401) {
      this.message = '권한 없음이없습니다.';
      this.name = 'Unauthorized';
    } else if (status === 403) {
      this.message = '접근권한이 없습니다.';
      this.name = 'Forbidden';
    } else if (status === 404) {
      this.message = '페이지가 없습니다.';
      this.name = 'Not Found';
    } else if (status === 419) {
      this.message = '토큰이 만료되었습니다.';
      this.name = 'Token completion';
    } else if (status === 500) {
      this.message = '서버에서 오류가 발생했습니다.';
      this.name = 'Internal Server Error';
    } else if (status === 504) {
      this.message = '시간 초과했습니다.';
      this.name = 'Gateway Timeout';
    } else if (status > 500) {
      this.message = '서버에서 오류가 발생했습니다.';
      this.name = 'Internal Server Error';
    } else if (status >= 400) {
      this.message = '클라이언트에서 오류가 발생했습니다.';
      this.name = 'Client Error';
    }
  }
  getMessage() {
    return this.message;
  }
  setMessage(message) {
    this.message = message;
  }
  setStatus(status) {
    this.status = status;
  }
  getStatus() {
    return this.status;
  }
  getName() {
    return this.name;
  }
  setName(name) {
    if (name) this.name = name;
  }
  static errorHandler(error) {
    //이거 사용하려면 HTTPError.errorHandler(error이렇게?)
    const message = error?.response?.message ?? error.message ?? error;
    return message;
  }
}
