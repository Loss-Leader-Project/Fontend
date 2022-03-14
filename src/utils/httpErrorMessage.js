//status에 따른 message 처리 (정환님코드)

export class HTTPError extends Error {
  constructor(status) {
    super();
    this.status = status;
    this.init(status);
  }
  init(status) {
    if (status === undefined) {
      //undefined 가 될 경우는 언제?
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
    } else if (status === 500) {
      this.message = '서버에서 오류가 발생했습니다.';
      this.name = 'Internal Server Error';
    } else if (status === 504) {
      this.message = '시간 초과했습니다.';
      this.name = 'Gateway Timeout';
    } else if (status > 500) {
      //500번때랑 500번때 초과일때 2가지를 설청한 이유?
      this.message = '서버에서 오류가 발생했습니다.';
      this.name = 'Internal Server Error';
    } else if (status >= 400) {
      // 이것도 마찬가지
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
