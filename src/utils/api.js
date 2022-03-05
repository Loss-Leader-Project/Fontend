import axios from 'axios';

const client = axios.create({
  // 에러 테스트를 하고 싶다면 8080으로
  // baseURL: 'http://localhost:8080',
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

class HTTPError extends Error {
  constructor(status) {
    super();
    this.status = status;
    this.init(status);
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
    const message = error?.response?.message ?? error.message ?? error;
    return message;
  }
}

// {
//   "status": 409,
//   "timestamp": "2022-03-05T21:37:23.5658878",
//   "error": "CONFLICT",
//   "code": "DUPLICATE_ID",
//   "message": "이미 존재하는 아이디입니다."
// }
client.interceptors.response.use(
  response => Promise.resolve(response),
  axiosError => Promise.reject(new HTTPError(axiosError.status))
);

export const fetchList = async query => {
  try {
    const { data } = await client.get(`/data/food-gold.json`);
    // const { data } = await client.get(`${query}`);
    return data;
  } catch (error) {
    throw error.message;
  }
};

export const getData = async url => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};

const BASE_URL = '/data/';

export const getReviews = async (order = 'createdAt', offset = 0, limit = 5) => {
  try {
    const query = `order=${order}&offset=${offset}&limit=${limit}`;
    const { data } = await axios.get(`${BASE_URL}/detail/review?${query}`);
    return data;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};

export const getDetail = async () => {
  try {
    const { data } = await axios.get('/data/newDetailData.json');
    return data;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};
export default client;
