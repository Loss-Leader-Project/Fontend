import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export class HTTPError extends Error {
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
    // const { data } = await client.get(`/list?${query}`);
    const { data } = await client.get(`/data/food-gold.json`);
    return data;
  } catch (error) {
    throw error.message;
  }
};

export const fetchUserInfo = async id => {
  try {
    // const { data } = await client.get(`/userinfo/${id}`);
    const { data } = await client.get(`/data/user.json`);
    return data;
  } catch (error) {
    throw error.message;
  }
};

export const fetchUserInfoUpdate = async (id, payload) => {
  try {
    const { data } = await client.post(`/userinfo/${id}`, payload);
    return data;
  } catch (error) {
    throw error.message;
  }
};
export const fetchCreateReview = async (pathVariable, payload) => {
  try {
    const { data } = await client.post(`/reviwe/${pathVariable}`, payload);
    return data;
  } catch (error) {
    throw error.message;
  }
};

export const getData = async url => {
  try {
    const res = await client.get(url);
    return res;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};

export const checkAccessToken = () => {
  if (localStorage.getItem('access-token')) {
    return true;
  } else {
    return false;
  }
};

// apiCall에는 요청하는 axios 함수 = 함수내에 헤더의 토큰값은 이 함수에서 넣어줌
// history는 useHistory를 가르키는 주소가 할당된 변수
export const TokenCheck = async (apiCall, history) => {
  const accessToken = localStorage.getItem('access-token');
  if (accessToken) {
    // token 체크 api
    const check = await client({
      method: 'GET',
      url: '/user/login-info',
      headers: {
        Authroization: accessToken,
      },
    });
    // check 값이 오류이면
    if (check.data.code === 419) {
      localStorage.removeItem('access-token');
      await client({
        method: 'GET',
        url: '/loss-leader/logout',
      });
      alert('로그인이 만료되었습니다. 다시 로그인하십시오.');
      history.push('/login');
    } else {
      // check 값이 올바르고 인자로 api 함수 안 넣었을때
      // 응답으로 넘어온 유저정보 넘겨줌
      if (check.data && apiCall === undefined) {
        return check;
      }
      // check 값 올바르고 인자로 실행시킬 apiCall 함수가 있을때
      else {
        // 넣어준 api 함수 실행
        const res = await apiCall(accessToken);
        return res;
      }
    }
  } else {
    await client({
      method: 'GET',
      url: '/loss-leader/logout',
    });
    alert('로그인이 만료되었습니다. 다시 로그인하십시오.');
    history.push('/login');
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

export const getMokReviews = async () => {
  try {
    const { data } = await axios.get('/data/reviewData.json');
    return data;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};

export const getProductDetail = async () => {
  try {
    const { data } = await axios.get('/data/DetailData.json');
    return data;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};

export const getApply = async () => {
  try {
    const { data } = await axios({
      method: 'GET',
      url: '/data/applyData.json',
    });
    return data;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};

export const getApplyTitle = async () => {
  try {
    const { data } = await axios({
      method: 'GET',
      url: '/data/applyTitle.json',
    });
    return data;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};

export const postApply = async props => {
  const { userId, productId, userName, phoneNumber, visitTime, visitCount, mileage, agreeUserInfo } = props;
  try {
    const { data } = await axios({
      method: 'POST',
      url: '',
      data: { userName, phoneNumber, visitTime, visitCount, mileage, agreeUserInfo },
    });
    return data;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};
